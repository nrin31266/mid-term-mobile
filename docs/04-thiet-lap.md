# Thiết lập môi trường

Kiểm tra ngày 10/11/2026. Phần nền tảng C1 đang chạy cloud; CRUD/ảnh trong form còn ở các mốc tiếp theo.

| Thành phần | Trạng thái |
| --- | --- |
| Node / pnpm | 24.22.2 / 11.22.0, một `pnpm-lock.yaml` cho app và server |
| Expo / React Native | SDK ~58.0.23 / 0.88.1, đã đọc tài liệu SDK 58 |
| Firebase CLI / MCP | 15.34.1, đăng nhập đúng project; MCP đọc môi trường thành công |
| Google Cloud SDK | 592.0.0, cài từ nguồn Google; ADC đã được người thực hiện cho phép, quota project đúng |
| Java | OpenJDK 25.0.4; Emulator chạy được, có cảnh báo Java Unsafe từ thư viện |
| Firebase JS / Admin / Functions | 13.2.0 / 14.5.0 / 7.4.0; hai gói server tách trong `server/package.json` |
| Expo modules | ImagePicker, ImageManipulator, DocumentPicker, FileSystem, Sharing đã cài bằng Expo installer; manifest/lockfile giữ phiên bản |
| Auth | Email/Password bật; admin demo có claim, credential giữ riêng |
| Firestore / Storage | Rules đã kiểm thử và deploy; chặn client đọc hash, Storage chỉ admin đúng prefix |
| Hosting / API | Site `memberdesk-801885728284`, Function `memberdeskApi`, HTTPS; không sửa app/site cũ |

ADC đặt trong cấu hình gcloud cá nhân, không đóng gói hoặc commit. File `docs/private/cloud-admin.json` có quyền 0600, chỉ chứa credential tài khoản demo. Không chạy `firebase login:list --json` để chụp vì kết quả có thể chứa token.

## Kiểm tra đã chạy

- Lint và TypeScript đã qua sau khi sửa hydration hook và bỏ bộ tab starter không còn dùng. Không tắt rule để né lỗi.
- Test quyền API 2/2; Auth/rules trên Emulator 9/9 (có JWT thật, tài khoản bị khóa, wildcard cũ, giới hạn Storage).
- Export web cloud và deploy Hosting/Function thành công.
- `MEMBERDESK_ENV=cloud node scripts/check-cloud.mjs`: đăng nhập admin, API HTTPS 200, thiếu token 401, Firestore client bị chặn, upload/tải lại JPEG 2.108 byte khớp. Ghi đè/khách bị chặn, fixture vừa tạo đã dọn sau kiểm tra tham chiếu.
- Trình duyệt cloud: đăng nhập sai hiện lỗi; đúng vào trang quản trị; tải lại giữ phiên; đăng xuất rồi truy cập `/` bị đưa về `/sign-in`.

Biên nhận: [cloud-access-check.json](submition/evidence/cloud-access-check.json). Đây là chẩn đoán kết nối, chưa chứng minh toàn bộ nghiệp vụ/ảnh mobile. Kiểm tra trước mỗi checkpoint phải có output mới theo mã đang commit.

## Lỗi starter đã xử lý

Lần kiểm tra ban đầu có `react-hooks/set-state-in-effect` ở `use-color-scheme.web.ts:11` và lỗi ref `TabTriggerSlotProps`/`Pressable` ở `app-tabs.web.tsx:38`. Hook chuyển sang snapshot hydration; bộ tab mẫu không còn caller sau khi chuyển sang Stack nên đã bỏ. Không có ảnh terminal lúc phát hiện lỗi, chỉ có ghi chú và ảnh source/kết quả kiểm tra sau sửa.

## Skill local

Tám skill trong `.agents/skills/`: `firebase-basics`, `firebase-auth-basics`, `firebase-firestore`, `firestore-rules-creation`, `firebase-security-rules-auditor`, `expo-native-ui`, `expo-design-system`, `agent-desktop`. Nguồn/cách cài ở [tài liệu 06](06-ai-workflow.md). Không cài global thêm.

## File google-services.json đã gửi

File Downloads thuộc đúng project nhưng hai client là `com.nrin31266.ecommercemultivendor` và `com.nrin31266.shoppingapp`. Không lấy package/appId của ứng dụng cũ. Bài dùng Firebase JS SDK với web app riêng MemberDesk, ID `1:801885728284:web:7791451d89f78a77db79d9`; config public trong `src/services/firebase-config.ts`. Không cần chép `google-services.json` này vào Expo Go.

Config client không phải quyền truy cập. Quyền nằm ở Auth, API và rules; credential server không được đặt trong `EXPO_PUBLIC_*`.

## Lệnh chạy

Xem [README gốc](../README.md) cho cloud/Emulator. Không chạy `--fix`, tạo native project hay EAS build chỉ để kiểm tra.

## Chi phí và phạm vi

Project hiện có Blaze; không đổi billing hoặc tạo bucket mới. Function/site riêng được tạo theo yêu cầu triển khai cloud trong phase này. `maxInstances: 1` giúp hạn chế số máy chạy, không phải trần chi phí. Chưa kiểm tra hóa đơn chi tiết, chưa có cam kết miễn phí. Không bật các sản phẩm Firebase không thuộc bài.

## Nguồn chính thức

- [Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/), [chỉ mục Expo](https://docs.expo.dev/llms.txt), [Firebase trong Expo](https://docs.expo.dev/guides/using-firebase/).
- [Firebase CLI](https://firebase.google.com/docs/cli), [Firebase skills](https://firebase.google.com/docs/ai-assistance/agent-skills).
- [Auth Admin](https://firebase.google.com/docs/auth/admin/verify-id-tokens), [Functions options](https://firebase.google.com/docs/functions/manage-functions), [Hosting rewrite](https://firebase.google.com/docs/hosting/functions).
- [Firestore quota](https://firebase.google.com/docs/firestore/quotas), [Storage billing](https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024).
