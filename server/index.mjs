import { createApi } from './api.mjs';
import { backendAuth } from './firebase.mjs';

const origins = (process.env.API_ALLOWED_ORIGINS ?? 'http://localhost:8081,http://127.0.0.1:8081').split(',');
const server = createApi(backendAuth(), origins);
server.requestTimeout = 15_000;
server.headersTimeout = 10_000;
server.maxHeadersCount = 32;
server.listen(Number(process.env.API_PORT ?? 3001), process.env.API_HOST ?? '127.0.0.1', () => {
  console.info(`MemberDesk API (${process.env.MEMBERDESK_ENV}) đang chạy, cổng ${process.env.API_PORT ?? 3001}.`);
});
