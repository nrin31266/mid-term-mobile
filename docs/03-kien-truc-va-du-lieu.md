# Kiến trúc và dữ liệu đề xuất

## Phương án hạn chế phát sinh chi phí

Giữ Expo/React Native SDK 58. Firebase JS SDK đăng nhập admin. Cloud Firestore Standard lưu người dùng trong hạn mức miễn phí. Console project đã chọn hiện hiển thị Blaze; phương án không yêu cầu đổi billing hay cấp thêm dịch vụ. `hinhanh` chứa data URI JPEG thu nhỏ; không dùng Cloud Storage/Functions trong phương án này.

API Node nhỏ chạy trên máy demo dùng Firebase Admin SDK truy cập Firestore. Mỗi request xác minh ID token Firebase Auth và claim `admin`. API băm mật khẩu bằng `node:crypto` scrypt bất đồng bộ với salt ngẫu nhiên; chọn tham số qua kiểm thử. API hồ sơ không trả `matkhau`, không ghi credential vào log.

Luồng: giao diện → Firebase Auth → ID token gửi API → kiểm tra quyền/schema → Firestore. ID trả cho giao diện nằm ngoài payload lưu trong document.

Đánh đổi: Firebase miễn phí nhưng phải chạy API trên máy và cho Android truy cập mạng LAN. Đây chưa phải hệ thống cloud hoạt động độc lập 24/7. Khi muốn public phải chốt nơi host API/HTTPS và hạn mức riêng; không tự thay đổi billing.

## Bốn trường

Collection dự kiến `midterm_users`, cần kiểm tra tên chưa trùng nghiệp vụ cũ trước khi tạo.

| Trường | Kiểu | Quy tắc |
| --- | --- | --- |
| `email` | string | Trim, chuẩn hóa nhất quán, hợp lệ và duy nhất |
| `matkhau` | string | Bản băm chứa phiên bản, tham số, salt và hash; không lưu mật khẩu thô |
| `hoten` | string | Trim, bắt buộc, giới hạn độ dài |
| `hinhanh` | string | JPEG data URI sau nén; rỗng nếu chưa có ảnh; hồ sơ nghiệm thu chính phải có ảnh |

Không thêm `id`, `role`, `createdAt`, `updatedAt`, `status` hoặc `searchName`. Claim admin nằm trong dịch vụ Auth, không phải collection vai trò.

Khóa document dự kiến SHA-256 của email chuẩn hóa. Tạo dùng thao tác create có điều kiện để tránh trùng đồng thời. Đổi email dùng transaction: kiểm tra khóa đích chưa có, chuyển đủ bốn trường, xóa khóa cũ nguyên tử; giao diện nhận lại ID mới. Không chỉ kiểm tra email trùng trên client.

Đăng nhập là admin. Mật khẩu thành viên được quản lý theo đề không đồng nghĩa tài khoản Firebase Auth tương ứng đã được tạo. Không ngầm đồng bộ hai kho mật khẩu.

## Ảnh và hiệu năng

- Đề xuất tối đa 384 × 384, JPEG; nhị phân tối đa 100 KiB và toàn data URI tối đa 140 KiB. Client/API đều kiểm tra; máy chủ xác minh chữ ký và giải mã được, không chỉ tin MIME.
- Firestore giới hạn document 1 MiB; base64 tăng khoảng một phần ba. Giới hạn ảnh cố ý thấp hơn trần document.
- Không lưu ảnh nguyên bản lớn hoặc đường dẫn file tạm; giữ ảnh cũ nếu xử lý ảnh mới thất bại.
- Tắt index `hinhanh` và `matkhau` trong phạm vi collection sau khi kiểm tra index hiện có.
- Demo 10–30 hồ sơ, danh sách có giới hạn; tải lại khi vào màn hình/nút làm mới. Chưa hứa đồng bộ thời gian thực.

## Quyền và credential

Client không đọc/ghi trực tiếp collection chứa hash. Rules chặn truy cập trực tiếp; Admin SDK bỏ qua rules nên API bắt buộc kiểm tra token, claim và schema. Rules wildcard cũ có thể cho phép truy cập dù thêm rule deny mới: phải đọc rules hiện tại và kiểm thử thực tế trước khi deploy. Không ghi đè rules toàn project cá nhân. Nếu không cô lập an toàn được, đề xuất project riêng trước khi thay đổi.

API cần giới hạn request, dung lượng, chiều dài chuỗi, CORS origin cụ thể, lỗi không rò dữ liệu và kiểm tra admin từ token đã xác minh. Không cho client tự gán claim. HTTPS khi truy cập công khai; LAN HTTP chỉ dùng hồ sơ giả để phát triển/demo.

Firestore cloud qua Admin SDK cần Application Default Credentials hoặc credential máy chủ quản lý riêng. `firebase login` của CLI không tự cung cấp credential cho Admin SDK. Không đặt khóa trong `EXPO_PUBLIC_*` hoặc Git. Chưa tạo key, tài khoản admin hay claim trong bước lên ý tưởng.

## JSON bài nộp

Xuất JSON ứng dụng bằng công cụ máy chủ có quyền; không dựa vào managed export yêu cầu billing. File dạng array, mỗi object đúng bốn trường, khôi phục ID từ email khi nhập. Dùng dữ liệu giả và mật khẩu demo đã băm, không dùng tài khoản thật.

Nhập lại phải kiểm tra toàn bộ schema, trùng email, hash và ảnh trước khi ghi. Chỉ thử ở Emulator hoặc collection thử được chỉ định; không ghi đè dữ liệu cloud cũ. Chưa tạo JSON giả rồi gọi là CSDL đã triển khai.
