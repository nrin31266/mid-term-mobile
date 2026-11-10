# Kiến trúc và dữ liệu đề xuất

## Phương án hạn chế phát sinh chi phí

Giữ Expo/React Native SDK 58. Firebase JS SDK đăng nhập admin. Cloud Firestore Standard lưu người dùng trong hạn mức miễn phí. Console project đã chọn hiện hiển thị Blaze; phương án không yêu cầu đổi billing hay cấp thêm dịch vụ. `hinhanh` chứa URL JPEG đã upload vào bucket Storage hiện có theo xác nhận của người thực hiện. Không cần tạo bucket mới; chưa đề xuất triển khai Functions.

API Node nhỏ chạy trên máy demo dùng Firebase Admin SDK truy cập Firestore. Mỗi request xác minh ID token Firebase Auth và claim `admin`. API băm mật khẩu bằng `node:crypto` scrypt bất đồng bộ với salt ngẫu nhiên; chọn tham số qua kiểm thử. API hồ sơ không trả `matkhau`, không ghi credential vào log. Ảnh upload qua Storage SDK sau khi có rules đúng quyền, rồi API kiểm tra URL/object trước khi lưu hồ sơ.

Luồng: giao diện → Firebase Auth → ID token gửi API → kiểm tra quyền/schema → Firestore. ID trả cho giao diện nằm ngoài payload lưu trong document.

Đánh đổi: ưu tiên hạn mức miễn phí của dịch vụ hiện có nhưng vẫn phải chạy API trên máy và cho Android truy cập mạng LAN; không bảo đảm Blaze sẽ không phát sinh phí. Đây chưa phải hệ thống cloud hoạt động độc lập 24/7. Khi muốn public phải chốt nơi host API/HTTPS và hạn mức riêng; không tự thay đổi billing.

## Bốn trường

Collection dự kiến `midterm_users`, cần kiểm tra tên chưa trùng nghiệp vụ cũ trước khi tạo.

| Trường | Kiểu | Quy tắc |
| --- | --- | --- |
| `email` | string | Trim, chuẩn hóa nhất quán, hợp lệ và duy nhất |
| `matkhau` | string | Bản băm chứa phiên bản, tham số, salt và hash; không lưu mật khẩu thô |
| `hoten` | string | Trim, bắt buộc, giới hạn độ dài |
| `hinhanh` | string | URL ảnh JPEG trên Storage; rỗng nếu chưa có ảnh; hồ sơ nghiệm thu chính phải có ảnh |

Không thêm `id`, `role`, `createdAt`, `updatedAt`, `status` hoặc `searchName`. Claim admin nằm trong dịch vụ Auth, không phải collection vai trò.

Khóa document dự kiến SHA-256 của email chuẩn hóa. Tạo dùng thao tác create có điều kiện để tránh trùng đồng thời. Đổi email dùng transaction: kiểm tra khóa đích chưa có, chuyển đủ bốn trường, xóa khóa cũ nguyên tử; giao diện nhận lại ID mới. Không chỉ kiểm tra email trùng trên client.

Đăng nhập là admin. Mật khẩu thành viên được quản lý theo đề không đồng nghĩa tài khoản Firebase Auth tương ứng đã được tạo. Không ngầm đồng bộ hai kho mật khẩu.

## Ảnh và hiệu năng

Chọn phương án Storage theo yêu cầu mới của người thực hiện, thay phương án base64 dự phòng ban đầu. Đã upload/tải lại JPEG mẫu 2.108 byte thành công bằng credential quản trị. Storage Rules hiện hết hạn từ 03/08/2026 nên app SDK chưa được xác nhận có quyền upload. Chi tiết và bằng chứng nằm trong [quy trình upload](07-image-upload.md).

- JPEG tối đa 512 × 512, mục tiêu 200 KiB, từ chối trên 500 KiB sau xử lý. Client, rules và phía tin cậy phải kiểm tra tương ứng.
- Object UUID mới ở `midterm-mobile/avatars/`; không ghi đè theo email. Upload thành công rồi mới lưu URL, giữ ảnh cũ nếu thao tác lỗi.
- Không lưu ảnh base64 hay URI `file://` vào Firestore. Document người dùng chỉ chứa bốn trường, không có trường đường dẫn Storage phụ.
- Demo 10–30 hồ sơ, danh sách có giới hạn; tải lại khi vào màn hình/nút làm mới. Chưa hứa đồng bộ thời gian thực.
- Chỉ bỏ index `matkhau`/`hinhanh` nếu có nhu cầu và sau khi kiểm tra cấu hình đang dùng; không tự thay index toàn project.

## Quyền và credential

Client không đọc/ghi trực tiếp collection chứa hash. Rules chặn truy cập trực tiếp; Admin SDK bỏ qua rules nên API bắt buộc kiểm tra token, claim và schema. Rules wildcard cũ có thể cho phép truy cập dù thêm rule deny mới: phải đọc rules hiện tại và kiểm thử thực tế trước khi deploy. Không ghi đè rules toàn project cá nhân. Nếu không cô lập an toàn được, đề xuất project riêng trước khi thay đổi.

API cần giới hạn request, dung lượng, chiều dài chuỗi, CORS origin cụ thể, lỗi không rò dữ liệu và kiểm tra admin từ token đã xác minh. Không cho client tự gán claim. HTTPS khi truy cập công khai; LAN HTTP chỉ dùng hồ sơ giả để phát triển/demo.

Firestore cloud qua Admin SDK cần Application Default Credentials hoặc credential máy chủ quản lý riêng. `firebase login` của CLI không tự cung cấp credential cho Admin SDK. Không đặt khóa trong `EXPO_PUBLIC_*` hoặc Git. Chưa tạo key, tài khoản admin hay claim trong bước lên ý tưởng.

## JSON bài nộp

Xuất JSON ứng dụng bằng công cụ máy chủ có quyền để có định dạng dễ nộp/nhập lại; không phụ thuộc định dạng managed export của dịch vụ. File dạng array, mỗi object đúng bốn trường, khôi phục ID từ email khi nhập. Dùng dữ liệu giả và mật khẩu demo đã băm, không dùng tài khoản thật.

Nhập lại phải kiểm tra toàn bộ schema, trùng email, hash và URL ảnh trước khi ghi. Kèm bản sao ảnh demo để khôi phục được, xem tài liệu 07. Chỉ thử ở Emulator hoặc collection thử được chỉ định; không ghi đè dữ liệu cloud cũ. Chưa tạo JSON giả rồi gọi là CSDL đã triển khai.
