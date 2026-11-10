import { backendAuth } from '../server/firebase.mjs';

const uid = process.argv[2];
if (!uid || process.argv.length !== 3) throw new Error('Cách chạy: node scripts/grant-admin.mjs <uid>');
const auth = backendAuth();
const user = await auth.getUser(uid);
if (user.disabled) throw new Error('Không cấp quyền cho tài khoản đã bị khóa.');
await auth.setCustomUserClaims(user.uid, { ...user.customClaims, admin: true });
console.info('Đã cấp claim admin cho UID được chỉ định; đăng nhập lại để nhận quyền.');
