import { createServer } from 'node:http';
import { ApiError, requireAdmin } from './access.mjs';

export function createHandler(auth, origins = ['http://localhost:8081', 'http://127.0.0.1:8081']) {
  const requests = new Map();
  return async (request, response) => {
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Vary', 'Origin');
    const send = (status, body) => { response.writeHead(status); response.end(JSON.stringify(body)); };
    try {
      const origin = request.headers.origin;
      if (origin && !origins.includes(origin)) throw new ApiError(403, 'Nguồn truy cập chưa được cho phép.');
      if (origin) response.setHeader('Access-Control-Allow-Origin', origin);
      if (request.method === 'OPTIONS') {
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
        response.writeHead(204); response.end(); return;
      }
      const now = Date.now();
      for (const [key, value] of requests) if (value.until <= now) requests.delete(key);
      const ip = request.socket.remoteAddress;
      const budget = requests.get(ip) ?? { count: 0, until: now + 60_000 };
      if (requests.size >= 256 && !requests.has(ip)) throw new ApiError(429, 'Máy chủ đang bận.');
      requests.set(ip, budget);
      if (++budget.count > 120) throw new ApiError(429, 'Bạn thao tác quá nhanh. Vui lòng đợi một phút.');
      if (request.method === 'GET' && request.url === '/health') {
        send(200, { ready: true }); return;
      }
      const token = await requireAdmin(request.headers.authorization, auth);
      if (request.method === 'GET' && request.url === '/session') {
        send(200, { uid: token.uid, email: token.email ?? '' }); return;
      }
      throw new ApiError(404, 'Không tìm thấy nội dung.');
    } catch (error) {
      // Không trả stack/token hay thông tin credential cho client.
      send(error instanceof ApiError ? error.status : 500,
        { error: error instanceof ApiError ? error.message : 'Máy chủ gặp lỗi. Vui lòng thử lại.' });
    }
  };
}

export function createApi(...args) { return createServer(createHandler(...args)); }
