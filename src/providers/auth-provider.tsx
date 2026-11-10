import { FirebaseError } from 'firebase/app';
import { getIdTokenResult, onIdTokenChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { createContext, use, useEffect, useState, type PropsWithChildren } from 'react';

import { getFirebase } from '@/services/firebase';

type AuthSession = { user: User | null; admin: boolean; loading: boolean; error: string };
type AuthContextValue = AuthSession & { logIn: (email: string, password: string) => Promise<void>; logOut: () => Promise<void> };
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [client] = useState(() => {
    try { return { auth: getFirebase().auth, error: '' }; }
    catch (error) { return { auth: null, error: (error as Error).message }; }
  });
  const [session, setSession] = useState<AuthSession>({ user: null, admin: false, loading: !!client.auth, error: client.error });
  useEffect(() => {
    const auth = client.auth;
    if (!auth) return;
    let active = true;
    let revision = 0;
      const unsubscribe = onIdTokenChanged(auth, async (user) => {
        const current = ++revision;
        try {
          const admin = user ? (await getIdTokenResult(user)).claims.admin === true : false;
          if (active && current === revision) setSession({ user, admin, loading: false,
            error: user && !admin ? 'Tài khoản này chưa có quyền quản trị.' : '' });
        } catch {
          if (active && current === revision) setSession({ user: null, admin: false, loading: false,
            error: 'Chưa kiểm tra được phiên. Kiểm tra mạng rồi đăng nhập lại.' });
        }
      });
      return () => { active = false; unsubscribe(); };
  }, [client.auth]);

  async function logIn(email: string, password: string) {
    try {
      const { auth } = getFirebase();
      const result = await signInWithEmailAndPassword(auth, email.trim(), password);
      if ((await getIdTokenResult(result.user)).claims.admin !== true) {
        await signOut(auth);
        throw new Error('Tài khoản này chưa có quyền quản trị.');
      }
    } catch (error) {
      if (!(error instanceof FirebaseError)) throw error;
      if (error.code === 'auth/network-request-failed') throw new Error('Không kết nối được. Kiểm tra mạng rồi thử lại.');
      if (error.code === 'auth/too-many-requests') throw new Error('Bạn đã thử quá nhiều lần. Vui lòng đợi rồi thử lại.');
      throw new Error('Email hoặc mật khẩu chưa đúng. Vui lòng kiểm tra lại.');
    }
  }
  return <AuthContext value={{ ...session, logIn, logOut: () => signOut(getFirebase().auth) }}>{children}</AuthContext>;
}

export function useAuth() {
  const context = use(AuthContext);
  if (!context) throw new Error('useAuth cần AuthProvider.');
  return context;
}
