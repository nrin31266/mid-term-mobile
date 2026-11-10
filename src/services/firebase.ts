import { FirebaseError, getApp, getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, initializeAuth } from 'firebase/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

import { authPersistence } from './auth-persistence';
import { emulatorHost, firebaseConfig, firebaseMode } from './firebase-config';

export function getFirebase() {
  if (firebaseMode !== 'emulator' && firebaseMode !== 'cloud') {
    throw new Error('Chưa cấu hình môi trường. Xem hướng dẫn chạy trong README.');
  }
  if (firebaseMode === 'cloud' && !firebaseConfig.apiKey) {
    throw new Error('Thiếu Firebase API key. Điền .env.local theo README.');
  }
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  let auth;
  try { auth = initializeAuth(app, { persistence: authPersistence }); }
  catch (error) {
    if (!(error instanceof FirebaseError) || error.code !== 'auth/already-initialized') throw error;
    auth = getAuth(app);
  }
  const storage = getStorage(app);
  if (firebaseMode === 'emulator') {
    if (!auth.emulatorConfig) connectAuthEmulator(auth, `http://${emulatorHost}:9099`, { disableWarnings: true });
    connectStorageEmulator(storage, emulatorHost, 9199);
  }
  return { auth, storage };
}
