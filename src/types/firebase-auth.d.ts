import type AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/auth';

// SDK có export native ở runtime; khai báo mặc định của web chưa liệt kê hàm này.
declare module 'firebase/auth' {
  export function getReactNativePersistence(storage: typeof AsyncStorage): Persistence;
}
