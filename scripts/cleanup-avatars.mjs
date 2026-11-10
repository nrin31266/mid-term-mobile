import { cleanupAvatars } from '../server/image-cleanup.mjs';
import { backendBucket, backendDatabase } from '../server/firebase.mjs';

const args = process.argv.slice(2);
if (args.some((arg) => !['--apply', '--include-recent'].includes(arg))) throw new Error('Chỉ nhận --apply và --include-recent.');
const result = await cleanupAvatars(backendDatabase(), backendBucket(), process.env.MEMBERDESK_ENV, {
  apply: args.includes('--apply'), minimumAgeMs: args.includes('--include-recent') ? 0 : 24 * 60 * 60 * 1000,
});
console.info(JSON.stringify(result, null, 2));
