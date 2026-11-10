# Dữ liệu nộp bài

Xuất từ cloud MemberDesk ngày 10/11/2026: 36 hồ sơ giả, 25 có ảnh, 11 chưa có ảnh; gồm Nguyễn Văn Rin. Sáu file JPEG được nhiều hồ sơ dùng chung. Tên và email là dữ liệu minh họa, không phải danh tính người trong ảnh. Nguồn ảnh ở `../demo-assets/README.md`.

- `users.json`: bản xuất đúng bốn trường, giữ URL cloud để đối chiếu.
- `users-portable.json`: cùng dữ liệu, `hinhanh` là đường dẫn ảnh trong gói hoặc chuỗi rỗng.
- `images/`: file ảnh thật tải từ Storage, JPEG vuông tối đa 512 px/500 KiB.
- `manifest.json`: số hồ sơ, thời điểm xuất và checksum ảnh; không phải collection người dùng.

`matkhau` là scrypt có salt, không có mật khẩu thô. Hồ sơ này không phải tài khoản Firebase Auth. Không dùng bản sao này cho dữ liệu cá nhân thật.

## Khôi phục thử

Ở thư mục gốc repo, cài `pnpm install --frozen-lockfile`, có Java và Firebase CLI. Không cần credential cloud để khôi phục. Tắt Emulator cũ trước khi chạy:

```bash
firebase emulators:exec --project demo-memberdesk --only auth,firestore,storage 'MEMBERDESK_ENV=emulator FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099 FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 FIREBASE_STORAGE_EMULATOR_HOST=127.0.0.1:9199 node scripts/member-backup.mjs restore docs/submition/database'
```

Đã chạy thật: thêm 36, bỏ qua 0, sáu ảnh kiểm tra nội dung được; schema đúng bốn trường. `emulators:exec` tự dừng khi xong, dữ liệu không được giữ sau khi dừng.

Muốn mở giao diện sau khôi phục: chạy `pnpm emulators` ở terminal riêng; trong terminal khác đặt ba biến host như trên rồi chạy lệnh restore, `pnpm seed:emulator`, `pnpm api:emulator` và `pnpm web:emulator`. Tài khoản demo sinh riêng ở `docs/private/emulator-admin.json`, không có trong Git.

Công cụ chỉ khôi phục vào `demo-memberdesk` bằng loopback. Email đã có được bỏ qua. Sửa đường dẫn/checksum/JSON sẽ làm kiểm tra thất bại; lỗi sau khi tải ảnh có thể để lại file chưa tham chiếu, dùng công cụ dọn ảnh của bài trong Emulator sau khi xác minh không còn upload.

## Xuất lại từ cloud

Chỉ người quản trị có ADC mới chạy, chọn thư mục mới chưa tồn tại:

```bash
MEMBERDESK_ENV=cloud node scripts/member-backup.mjs export /tmp/memberdesk-backup
```

Không sửa hash hoặc ghi đè `users.json` bằng file viết tay. Gói hiện tại lấy dữ liệu đã lưu; ảnh được đối chiếu checksum trước khi khôi phục.
