import { randomBytes } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { backendAuth } from '../server/firebase.mjs';

const mode = process.env.MEMBERDESK_ENV;
if (!['emulator', 'cloud'].includes(mode)) throw new Error('Chọn môi trường emulator hoặc cloud.');
const auth = backendAuth();
const filename = `docs/private/${mode}-admin.json`;
let credentials;
let fresh = false;
try { credentials = JSON.parse(await readFile(filename, 'utf8')); }
catch (error) {
  if (error.code !== 'ENOENT') throw error;
  fresh = true;
  credentials = { email: mode === 'cloud' ? 'admin.memberdesk@example.com' : 'admin@memberdesk.test', password: randomBytes(18).toString('base64url') };
}
let user;
try {
  user = await auth.getUserByEmail(credentials.email);
  if (fresh) throw new Error('Email đã có nhưng thiếu file credential riêng; không tự đổi mật khẩu.');
}
catch (error) {
  if (error.code !== 'auth/user-not-found') throw error;
  user = await auth.createUser({ ...credentials, displayName: 'Quản trị MemberDesk' });
}
await auth.setCustomUserClaims(user.uid, { ...user.customClaims, admin: true });
await mkdir('docs/private', { recursive: true });
await writeFile(filename, `${JSON.stringify(credentials, null, 2)}\n`, { mode: 0o600 });
console.info(`Đã chuẩn bị admin ${mode}. Thông tin đăng nhập ở ${filename} (không đưa vào Git).`);
