# Upload ảnh bằng Firebase Storage

## Kết luận đã kiểm tra ngày 10/11/2026

**Storage của project Nguyen Van Rin dùng được.** Bucket hiện có là `crested-mercury-452707-e8.firebasestorage.app`, vùng US-CENTRAL1, project đang hiển thị Blaze. Không cần tạo bucket mới hoặc thay gói thanh toán.

Đã tạo một JPEG mẫu không chứa thông tin thật, upload bằng tài khoản Firebase CLI quản trị, tải xuống rồi so sánh từng byte: **khớp hoàn toàn, 2.108 byte**. Ảnh thử còn ở:

`midterm-demo/diagnostics/upload-check-20261110-88e03207-0b85-4c8f-af1f-ab6f1972de4f.jpg`

Bằng chứng local: [ảnh JPEG đã tải lại](submition/evidence/storage-upload-check.jpg) và [biên nhận kiểm tra](submition/evidence/storage-upload-check.json). Đây là ảnh mẫu và metadata thật, không phải ảnh chụp một chức năng app đã hoàn thành. Không upload hai ảnh báo cáo cá nhân có sẵn để thử.

## Rule cũ và kết quả SDK mới

Storage Rules đang chạy có điều kiện:

```text
allow read, write: if request.time < timestamp.date(2026, 8, 3);
```

Ngày kiểm tra là 10/11/2026 nên điều kiện này đã hết hạn. Đọc bằng Firebase MCP xác nhận chỉ có rule wildcard đó. Credential quản trị qua Google Cloud IAM có thể upload, nhưng không chứng minh phiên Firebase Auth của app có quyền upload qua SDK.

Đã sao lưu rules cũ vào vùng ignored, kiểm thử rồi deploy rule riêng: admin có thể tạo/đọc JPEG tối đa 500 KiB, tên UUID-v4 dưới `midterm-mobile/avatars/`. Chặn ghi đè bằng `resource == null`, update/delete/list phía client. Wildcard cũ không được gia hạn. Các ảnh cũ không bị dọn.

Kiểm tra cloud bằng Firebase JS SDK đã qua: admin upload/tải lại JPEG 2.108 byte khớp; ghi đè và khách upload đều bị từ chối. File thử có UUID mới được dọn sau khi xác nhận không hồ sơ nào tham chiếu. [Biên nhận cloud](submition/evidence/cloud-access-check.json) và `scripts/check-cloud.mjs` ghi cách kiểm tra; không có token/URL tải/credential trong biên nhận.

Đây là bước kiểm tra SDK độc lập. Luồng chọn ảnh, tiến độ, lưu hồ sơ và mở lại trên Android vẫn thuộc C2/C4, chưa hoàn thành ở C1. Emulator đã kiểm tra cả sai prefix/MIME/dung lượng và tài khoản không admin. Rules kiểm tra MIME/size; API còn phải xác minh nội dung JPEG thật trước lưu hồ sơ.

## Phương án đã điều chỉnh

Dùng Storage lưu file, Firestore lưu **URL ảnh trong `hinhanh`**. Vẫn đúng bốn trường `email`, `matkhau`, `hoten`, `hinhanh`; không thêm `storagePath`, timestamp hoặc loại ảnh vào document người dùng. Object path có thể lấy lại từ Storage ref/URL thuộc bucket đã cho phép.

Không dùng base64 trong Firestore làm phương án chính nữa. API Node chạy trên Function riêng để băm mật khẩu và CRUD an toàn; phạm vi đã được duyệt, đang triển khai.

## Luồng upload của ứng dụng

1. Admin đăng nhập Firebase Auth.
2. Chọn ảnh/chụp camera bằng `expo-image-picker`; xử lý hủy và từ chối quyền.
3. Dùng `expo-image-manipulator` xử lý ảnh tối đa 512 × 512, JPEG, mục tiêu không quá 200 KiB; từ chối nếu vượt 500 KiB sau xử lý. Kiểm tra cùng giới hạn ở server/rules.
4. Trên web, Firebase JS SDK nhận Blob/File của ảnh đã xử lý. Trên Android/iOS, chuyển dữ liệu ảnh thành dạng SDK hỗ trợ theo tài liệu môi trường hiện hành và kiểm thử thực tế; không gửi chuỗi `file://` như nội dung file.
5. Tạo tên object UUID mới tại `midterm-mobile/avatars/<uuid>.jpg`, upload bằng `uploadBytes` hoặc `uploadBytesResumable` nếu cần tiến độ. Không đặt tên theo email để tránh lộ thông tin cá nhân và lỗi khi đổi email.
6. Sau upload thành công, lấy URL bằng `getDownloadURL`. Gửi URL cùng dữ liệu form tới API; API kiểm tra URL đúng bucket/prefix, object tồn tại và đúng loại/dung lượng trước khi ghi Firestore.
7. Hiển thị bằng `expo-image` từ URL đã lưu. Tải lại app và mở trên web để chứng minh ảnh không còn phụ thuộc file local.

Luồng này đã chạy trên Chrome và Android. Mã hiện tại dùng `uploadBytesResumable`; Blob native lấy qua XHR, đối chiếu số byte rồi mới upload.

## Lỗi và thay ảnh

Giữ URL cũ trong hồ sơ cho đến khi file mới upload và Firestore ghi thành công. Khi request lỗi hoặc hết thời gian, không xóa ảnh ngay: server có thể đã lưu dù client chưa nhận kết quả. File bỏ dở và ảnh cũ được dọn bằng lệnh riêng sau kiểm tra tham chiếu, không xóa theo vòng đời form.

```bash
MEMBERDESK_ENV=cloud node scripts/cleanup-avatars.mjs
MEMBERDESK_ENV=cloud node scripts/cleanup-avatars.mjs --apply
```

Lệnh đầu chỉ xem số file đủ điều kiện. Lệnh thứ hai xóa JPEG đúng prefix, không còn hồ sơ nào dùng và đã tạo hơn 24 giờ. Không động file của app khác. `--include-recent` chỉ dùng khi đã dừng các luồng chọn/upload ảnh; không bật mặc định. Với Emulator phải đặt đủ ba host như lệnh API trong README.

Khi dọn thật, công cụ tạo document rỗng `memberdesk_internal/image_cleanup`. Create/update/delete và import đọc khóa trong transaction, tạm trả 503 nếu khóa tồn tại; API kiểm tra file ảnh sau khi đọc khóa để không ghi lại ảnh đã dọn. Công cụ đọc toàn bộ tham chiếu rồi xóa có điều kiện generation, cuối cùng bỏ khóa. Rules chặn client truy cập namespace này. Document thành viên vẫn đúng bốn trường; khóa không nằm trong `midterm_users` và không được export.

Nếu công cụ bị tắt đột ngột, khóa có thể còn và các thao tác ghi bị chặn. Chỉ người quản trị mới xóa document khóa sau khi xác nhận không còn tiến trình dọn. Không đặt thời gian tự mở khóa trong khi lệnh cũ có thể vẫn đang chạy.

URL tải có token hoạt động như một liên kết có quyền truy cập; không đưa ảnh thật/link riêng tư vào Git hoặc log. Với bài demo dùng dữ liệu giả. Rules kiểm tra MIME/size chưa thay thế việc xác minh nội dung ảnh ở phía tin cậy.

## Xuất dữ liệu để nộp

JSON người dùng vẫn đủ bốn trường. Chỉ nộp URL cloud có thể làm ảnh mất nếu bucket bị dọn, nên kèm thư mục ảnh demo và hướng dẫn khôi phục. Đề xuất gói gồm `users.json`, `images/` và README tiếng Việt. Bản JSON di động có thể ghi đường dẫn tương đối ở `hinhanh`; khi nhập lại, công cụ upload ảnh trước rồi thay bằng URL mới, không thêm trường. Giữ riêng bản export nguyên gốc nếu cần đối chiếu URL đã dùng. Form import JSON trong app chỉ nhận URL cloud hợp lệ; bản có đường dẫn tương đối và thư mục ảnh phải đi qua công cụ khôi phục server, không nhập trực tiếp qua form.

Trước nộp phải thử khôi phục trên môi trường thử, không ghi đè cloud đang dùng. Gói cuối đã có 36 hồ sơ/6 ảnh thật và bản portable, đã khôi phục vào Emulator; xem docs/submition/database/README.md.

## Tài liệu chính thức

- [Upload file với Firebase JS SDK](https://firebase.google.com/docs/storage/web/upload-files)
- [Storage Security Rules](https://firebase.google.com/docs/storage/security)
- [Expo ImagePicker SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/imagepicker/)
- [Expo ImageManipulator SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/imagemanipulator/)
## Kiểm tra luồng app ngày 10/11/2026

Chrome đã chọn ảnh, xử lý JPEG 512 × 512, upload Storage và lưu hồ sơ Lê Bảo Trân. Tải lại trang vẫn còn dữ liệu. Android Pixel 8 API 36 chạy Expo Go SDK 58 đã chọn/cắt ảnh, upload và mở hồ sơ từ cloud.

Lần thử Android đầu gặp lỗi Blob từ `Uint8Array`. Đổi sang `fetch(file://)` lại đọc về 14 byte “File not found” ở URI cache của Expo Go; server đã từ chối ảnh đó. Đã chuyển sang XHR lấy Blob native, đối chiếu số byte trước upload và thử thành công trên cùng máy ảo. File lỗi không còn tham chiếu đã được dọn, không sửa hồ sơ đã lưu.

Ảnh chân dung mẫu lấy từ Pexels, nguồn ở `submition/demo-assets/README.md`. Dữ liệu minh họa dùng tên Việt có dấu, có Nguyễn Văn Rin; bộ 36 hồ sơ để thử phân trang sẽ có cả hồ sơ không ảnh.

Android đã thử tắt mạng khi upload: hết 60 giây hiện lỗi, tên/email/ảnh xem trước vẫn giữ. Bật mạng rồi bấm lưu lại đã mở được hồ sơ cloud. Từ chối quyền camera hiện hướng dẫn và giữ hồ sơ cũ. Đã cho quyền lại, chụp/cắt/lưu từ camera ảo, đối chiếu ảnh trên Chrome rồi trả hồ sơ về ảnh chân dung. Hủy camera giữ ảnh cũ; force-stop/mở app vẫn có phiên và ảnh.

Kiểm thử Emulator 16/16 có giữ ảnh dùng chung, bảo vệ ảnh mới, chặn ghi khi dọn, dọn file không còn tham chiếu và không ghi URL đã bị dọn. Cloud đã dọn 6 file không tham chiếu khi dừng upload, giữ 3 ảnh đang dùng; kiểm tra sau dọn tải được mọi ảnh và không còn khóa. Biên nhận và ảnh thật ở chỉ mục minh chứng. Ảnh terminal/cấu hình còn thiếu; chưa kiểm thử iOS.
