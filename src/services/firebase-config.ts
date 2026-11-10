import { Platform } from 'react-native';

export const firebaseMode = process.env.EXPO_PUBLIC_FIREBASE_MODE;
export const emulatorHost = process.env.EXPO_PUBLIC_EMULATOR_HOST ?? '127.0.0.1';

// Cấu hình web công khai; credential Admin SDK luôn nằm ngoài ứng dụng.
export const firebaseConfig = firebaseMode === 'emulator' ? {
  apiKey: 'demo-memberdesk-key', projectId: 'demo-memberdesk',
  authDomain: 'demo-memberdesk.firebaseapp.com', storageBucket: 'demo-memberdesk.appspot.com',
  appId: '1:000000000000:web:memberdesk',
} : {
  apiKey: (Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_FIREBASE_WEB_API_KEY
    : process.env.EXPO_PUBLIC_FIREBASE_API_KEY) ?? '',
  projectId: 'crested-mercury-452707-e8',
  authDomain: 'crested-mercury-452707-e8.firebaseapp.com',
  storageBucket: 'crested-mercury-452707-e8.firebasestorage.app',
  messagingSenderId: '801885728284',
  appId: '1:801885728284:web:7791451d89f78a77db79d9',
};
