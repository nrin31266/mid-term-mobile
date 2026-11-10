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

## Luồng upload dự kiến của ứng dụng

1. Admin đăng nhập Firebase Auth.
2. Chọn ảnh/chụp camera bằng `expo-image-picker`; xử lý hủy và từ chối quyền.
3. Dùng `expo-image-manipulator` xử lý ảnh tối đa 512 × 512, JPEG, mục tiêu không quá 200 KiB; từ chối nếu vượt 500 KiB sau xử lý. Kiểm tra cùng giới hạn ở server/rules.
4. Trên web, Firebase JS SDK nhận Blob/File của ảnh đã xử lý. Trên Android/iOS, chuyển dữ liệu ảnh thành dạng SDK hỗ trợ theo tài liệu môi trường hiện hành và kiểm thử thực tế; không gửi chuỗi `file://` như nội dung file.
5. Tạo tên object UUID mới tại `midterm-mobile/avatars/<uuid>.jpg`, upload bằng `uploadBytes` hoặc `uploadBytesResumable` nếu cần tiến độ. Không đặt tên theo email để tránh lộ thông tin cá nhân và lỗi khi đổi email.
6. Sau upload thành công, lấy URL bằng `getDownloadURL`. Gửi URL cùng dữ liệu form tới API; API kiểm tra URL đúng bucket/prefix, object tồn tại và đúng loại/dung lượng trước khi ghi Firestore.
7. Hiển thị bằng `expo-image` từ URL đã lưu. Tải lại app và mở trên web để chứng minh ảnh không còn phụ thuộc file local.

Các tên API SDK ở trên là hướng dẫn từ tài liệu chính thức, chưa phải code đã triển khai. Quyền admin/SDK và việc chuyển dữ liệu ảnh trên mobile vẫn cần kiểm thử.

## Lỗi và thay ảnh

Giữ URL cũ cho đến khi file mới upload và Firestore ghi thành công. Ghi hồ sơ thất bại thì xóa file mới do thao tác đó tạo, trong phạm vi được phép, để tránh file rác. Sau thay ảnh thành công chỉ dọn ảnh cũ khi xác nhận không còn hồ sơ tham chiếu. Không xóa file của app khác và không xóa ảnh mẫu đã lưu làm bằng chứng trong bước kiểm tra này.

URL tải có token hoạt động như một liên kết có quyền truy cập; không đưa ảnh thật/link riêng tư vào Git hoặc log. Với bài demo dùng dữ liệu giả. Rules kiểm tra MIME/size chưa thay thế việc xác minh nội dung ảnh ở phía tin cậy.

## Xuất dữ liệu để nộp

JSON người dùng vẫn đủ bốn trường. Chỉ nộp URL cloud có thể làm ảnh mất nếu bucket bị dọn, nên kèm thư mục ảnh demo và hướng dẫn khôi phục. Đề xuất gói gồm `users.json`, `images/` và README tiếng Việt. Bản JSON di động có thể ghi đường dẫn tương đối ở `hinhanh`; khi nhập lại, công cụ upload ảnh trước rồi thay bằng URL mới, không thêm trường. Giữ riêng bản export nguyên gốc nếu cần đối chiếu URL đã dùng. Form import JSON trong app chỉ nhận URL cloud hợp lệ; bản có đường dẫn tương đối và thư mục ảnh phải đi qua công cụ khôi phục server, không nhập trực tiếp qua form.

Trước nộp phải thử khôi phục trên môi trường thử, không ghi đè cloud đang dùng. Chưa tạo gói dữ liệu nộp cuối vì app chưa triển khai.

## Tài liệu chính thức

- [Upload file với Firebase JS SDK](https://firebase.google.com/docs/storage/web/upload-files)
- [Storage Security Rules](https://firebase.google.com/docs/storage/security)
- [Expo ImagePicker SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/imagepicker/)
- [Expo ImageManipulator SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/imagemanipulator/)
