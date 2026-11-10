import { onRequest } from 'firebase-functions/v2/https';
import { createHandler } from './api.mjs';
import { backendAuth, backendBucket, backendDatabase } from './firebase.mjs';
import { createMemberStore } from './members.mjs';

const handler = createHandler(backendAuth('cloud'), [
  'https://memberdesk-801885728284.web.app',
  'https://memberdesk-801885728284.firebaseapp.com',
  'http://localhost:8081', 'http://127.0.0.1:8081',
], createMemberStore(backendDatabase('cloud'), backendBucket('cloud'), 'cloud'));

export const memberdeskApi = onRequest({
  region: 'us-central1', memory: '256MiB', cpu: 'gcf_gen1', concurrency: 1,
  minInstances: 0, maxInstances: 1, timeoutSeconds: 30, invoker: 'public',
}, (request, response) => {
  if (request.url.startsWith('/api/')) request.url = request.url.slice(4);
  return handler(request, response);
});
