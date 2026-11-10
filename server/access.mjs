export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const invalidTokenCodes = new Set([
  'auth/argument-error', 'auth/id-token-expired', 'auth/id-token-revoked',
  'auth/invalid-id-token', 'auth/user-disabled', 'auth/user-not-found',
]);

export async function requireAdmin(authorization, auth) {
  const match = typeof authorization === 'string' && /^Bearer ([^\s]{1,8192})$/.exec(authorization);
  if (!match) throw new ApiError(401, 'Vui lòng đăng nhập lại.');
  let token;
  try {
    // Kiểm tra cả tài khoản bị khóa và phiên đã thu hồi.
    token = await auth.verifyIdToken(match[1], true);
  } catch (error) {
    if (invalidTokenCodes.has(error.code)) throw new ApiError(401, 'Phiên đăng nhập không còn hợp lệ.');
    throw new ApiError(503, 'Chưa xác minh được phiên. Vui lòng thử lại.');
  }
  if (token.admin !== true) throw new ApiError(403, 'Tài khoản này chưa có quyền quản trị.');
  return token;
}
