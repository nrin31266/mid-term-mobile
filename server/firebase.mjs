import { applicationDefault, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

export const cloudProjectId = 'crested-mercury-452707-e8';
export const emulatorProjectId = 'demo-memberdesk';

export function backendOptions(environment = process.env) {
  const mode = environment.MEMBERDESK_ENV;
  const hosts = ['FIREBASE_AUTH_EMULATOR_HOST', 'FIRESTORE_EMULATOR_HOST', 'FIREBASE_STORAGE_EMULATOR_HOST'];
  if (mode === 'emulator') {
    const ports = [9099, 8080, 9199];
    if (hosts.some((key, index) => environment[key] !== `127.0.0.1:${ports[index]}`)) {
      throw new Error('Emulator cần đủ ba host loopback đúng cổng.');
    }
    return { projectId: emulatorProjectId, storageBucket: `${emulatorProjectId}.appspot.com` };
  }
  if (mode !== 'cloud' || hosts.some((key) => environment[key])) {
    throw new Error('Chọn MEMBERDESK_ENV=emulator hoặc cloud; không trộn hai môi trường.');
  }
  return { projectId: cloudProjectId, storageBucket: `${cloudProjectId}.firebasestorage.app`, credential: applicationDefault() };
}

export function backendApp(mode = process.env.MEMBERDESK_ENV) {
  const options = backendOptions({ ...process.env, MEMBERDESK_ENV: mode });
  return getApps()[0] ?? initializeApp(options);
}

export function backendAuth(mode) {
  return getAuth(backendApp(mode));
}

export function backendDatabase(mode) { return getFirestore(backendApp(mode)); }
export function backendBucket(mode) { return getStorage(backendApp(mode)).bucket(); }
