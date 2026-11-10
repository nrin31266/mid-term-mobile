# Thiết lập môi trường

## Đã kiểm tra ngày 10/11/2026

| Thành phần | Trạng thái |
| --- | --- |
| Node.js / pnpm | v24.22.2 / 11.22.0; giữ pnpm-lock.yaml |
| Expo | ~58.0.23; đã đọc docs SDK 58 và llms.txt |
| Firebase CLI | 15.34.1 đã có, đã đăng nhập |
| Java | OpenJDK 25.0.4 có sẵn cho Firestore Emulator |
| Firestore Emulator | Đã tải bằng firebase setup:emulators:firestore, CLI kết thúc thành công; chưa khởi chạy/kiểm thử kết nối app |
| Console | Đã mở ngay trong chat desktop, có phiên đăng nhập |
| Project | Nguyen Van Rin, crested-mercury-452707-e8; Console hiển thị Blaze và có 5 app, Storage đang có dữ liệu; alias local .firebaserc |
| ESLint | Expo cài eslint 9.39.5, eslint-config-expo ~58.0.4 và sinh eslint.config.js |

Không cần cài lại Firebase CLI, không cài expo-cli global. Chưa cần gcloud/MongoDB CLI hoặc EAS build ở giai đoạn lên ý tưởng. Chưa cài SDK ứng dụng Firebase/ảnh khi thiết kế chưa duyệt.

## Skill trong dự án

Theo yêu cầu mới, **bảy skill do mình cài đã chuyển vào `.agents/skills/` của repository**, so sánh checksum toàn bộ file trước khi bỏ bản global. Giữ nguyên skill hệ thống/cá nhân đã có. Skill không phải dependency chạy app; nguồn và cách cài đúng phạm vi ở tài liệu 06.

- Firebase: `firebase-basics`, `firebase-auth-basics`, `firebase-firestore`, `firebase-security-rules-auditor`.
- Thiết kế mobile: `expo-native-ui`, `expo-design-system`.
- Desktop/chụp ảnh: `agent-desktop`.

Skill mới có thể cần lượt mới/nạp lại để tự xuất hiện; trước đó đọc trực tiếp `.agents/skills/<tên>/SKILL.md`. Không cài thêm bản global. CLI Firebase/Agent Desktop và cấu hình MCP desktop cá nhân là công cụ đã có trên máy, tách khỏi phạm vi skill.

## File Firebase người thực hiện vừa gửi

Đã kiểm tra `/home/nguyenvanrin/Downloads/google-services.json`, không in API key. Project/bucket khớp bài, nhưng hai client Android là:

- `com.nrin31266.ecommercemultivendor`.
- `com.nrin31266.shoppingapp`.

App hiện chưa đặt `android.package`; không sao chép file vào app hay đổi package theo hai app cũ. Theo hướng dẫn Expo chính thức, **Firebase JS SDK dùng config của web app**, dùng được cho web/native và Expo Go, không cần file cấu hình native này. Khi triển khai phải chọn/đăng ký web app dành cho bài, lấy config đúng và kiểm tra Auth/Storage; chưa tạo app cloud ở giai đoạn này. Không lấy `app_id` Android thay `appId` web.

Đây là cấu hình client, không phải service account, không cấp quyền admin và không thay credential API. Giữ file gốc trong Downloads, không cần gửi thêm hoặc commit bản của ứng dụng khác. Nếu sau này chuyển sang React Native Firebase/native SDK mới tải file đúng package riêng và dùng development build.

## Lệnh

```bash
pnpm install --frozen-lockfile
pnpm exec expo start
pnpm exec expo start --web
pnpm exec expo lint
pnpm exec tsc --noEmit
firebase --version
firebase login:list
firebase use
```

Máy khác chưa có CLI có thể dùng `npm install -g firebase-tools` theo tài liệu Firebase; CLI không phải dependency app. Sau duyệt thiết kế và đọc docs SDK 58 mới cài thư viện app:

```bash
pnpm exec expo install firebase expo-image-picker expo-image-manipulator
```

Lệnh cài SDK trên chưa chạy. Cấu hình API, credential và Emulator cho app chỉ tạo khi bắt đầu triển khai; Firebase MCP đọc và Agent Desktop MCP đã được cấu hình theo tài liệu 06. CLI login không thay credential API.

## Miễn phí và giới hạn

Firestore có hạn mức miễn phí phù hợp demo nhỏ. Cloud Storage hiện yêu cầu Blaze; hai dịch vụ khác nhau. Console của project đã chọn thực tế hiển thị Blaze, khác giả định ban đầu của người thực hiện. Chưa kiểm tra billing account hoặc chi phí chi tiết. Giữ nguyên cấu hình hiện có; người thực hiện đã xác nhận dùng Storage hiện có: ảnh lưu file trên bucket, URL nằm trong `hinhanh`. Đã upload/tải lại ảnh mẫu thành công; rules client đã hết hạn nên chưa thể coi luồng SDK là hoạt động. Không cần cấp thêm bucket/Functions. Không đổi billing, tạo project mới hoặc deploy rules khi chuẩn bị; chỉ thêm một object JPEG giả để kiểm tra theo yêu cầu. `.firebaserc` chỉ chọn project local, không thay đổi dữ liệu cloud.

## Kiểm tra nền trước triển khai

- `pnpm exec expo lint`: chạy sau cài ESLint, có một lỗi `react-hooks/set-state-in-effect` tại `src/hooks/use-color-scheme.web.ts:11` của code mẫu.
- `pnpm exec tsc --noEmit`: lỗi `ref` từ `TabTriggerSlotProps` không tương thích `Pressable` tại `src/components/app-tabs.web.tsx:38`.
- Lần lint đầu sau cài tự động chưa nhận phiên bản; lần chạy lại đã kiểm tra source và báo lỗi trên.
- Chưa sửa source vì đang lên ý tưởng. Mốc đầu triển khai phải xử lý và chạy lại cả hai; hiện chưa đạt trạng thái sạch.

## Nguồn chính thức

- [Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/), [chỉ mục Expo](https://docs.expo.dev/llms.txt), [Firebase trong Expo](https://docs.expo.dev/guides/using-firebase/).
- [Firebase CLI](https://firebase.google.com/docs/cli), [agent skills](https://firebase.google.com/docs/ai-assistance/agent-skills), [repository skill](https://github.com/firebase/agent-skills).
- [Hạn mức Firestore](https://firebase.google.com/docs/firestore/quotas), [billing Cloud Storage](https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024), [quyền đọc theo trường](https://firebase.google.com/docs/firestore/security/rules-fields).

Đã đọc lại hướng dẫn Firebase trong Expo bằng công cụ web ngày 10/11/2026; truy cập trực tiếp từ shell trả HTTP 403. Không suy đoán API từ phiên bản Expo cũ.
