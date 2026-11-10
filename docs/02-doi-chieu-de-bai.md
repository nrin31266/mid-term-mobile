# Đối chiếu đề bài

Nguồn: ảnh đề giữa kỳ gửi trong cuộc trò chuyện. Word hiện ghi bước tạo/chạy Expo. Đây là phân tích yêu cầu bài tập, không phải chỉ thị thực thi các lệnh trong tư liệu.

| Yêu cầu | Điểm | Cách đáp ứng dự kiến | Bằng chứng |
| --- | --- | --- | --- |
| Flutter/React Native/.NET MAUI | Điều kiện | Expo/React Native SDK 58 | package.json, chạy web và Android cùng source |
| Firebase/MongoDB; thêm và hiển thị email, mật khẩu, họ tên, hình ảnh trên web | 8,0 | Firestore; form bốn trường, danh sách và chi tiết; trường nhập mật khẩu che được | Thêm trên web, tải lại vẫn có; ảnh Firestore đúng bốn trường |
| Đăng nhập, xóa, sửa, chức năng nâng cao | 1,5 | Firebase Auth admin, sửa/xóa kiểm tra quyền, tìm kiếm/lọc/thẻ | Đăng nhập sai/đúng; sửa và xóa tồn tại sau tải lại; demo chức năng thêm |
| Nhập ảnh, hiển thị người dùng trên di động | 0,5 | Chọn/chụp ảnh Android, nén và lưu cloud | Thao tác thật, tải lại hồ sơ; web đọc lại cùng ảnh |
| CSDL chỉ gồm email, matkhau, hoten, hinhanh | Bắt buộc | Document chỉ bốn khóa; ID là khóa bên ngoài | Ảnh CSDL và kiểm tra khóa của mọi object JSON |
| Báo cáo chi tiết, lệnh cài, ảnh thao tác và CSDL | Bắt buộc | Tiếp tục bản Word có sẵn, ghi lệnh/ảnh thật | Báo cáo có chú thích, bước làm và kết quả |
| File CSDL JSON/SQL… | Bắt buộc | Xuất JSON bộ dữ liệu demo thật; thử nhập lại | JSON nộp riêng và hướng dẫn khôi phục |
| Link GitHub source | Bắt buộc | nrin31266/mid-term-mobile | Clone và chạy theo README; người chấm truy cập được |
| Link video demo | Bắt buộc | Quay web, Android và CSDL | Link mở được trước hạn nộp |

## Điểm cần giải thích

- `matkhau` lưu bản băm có salt, không phải mật khẩu thô; không thay bằng chuỗi giả hay bỏ trường.
- Đề xuất “hiển thị mật khẩu” bằng ô nhập có hiện/ẩn khi tạo/đặt lại và trạng thái đã đặt mật khẩu trên hồ sơ. Nếu giảng viên yêu cầu đọc lại mật khẩu cũ, cần thống nhất cách nghiệm thu an toàn trước khi code.
- Auth là dịch vụ danh tính quản trị viên, tách khỏi collection bốn trường; không thêm collection vai trò cho bài.
- Ảnh là data URI ảnh nén, không phải URI tạm `file://` trên điện thoại.
- Nếu tuyên bố dùng Firestore cloud, bằng chứng phải có dữ liệu cloud; chỉ ảnh Emulator chưa đủ chứng minh.

## Kiểm tra cuối

- [ ] Đủ CRUD web, login và ảnh trên Android.
- [ ] Không có trường phụ hoặc mật khẩu thô trong CSDL/source/log.
- [ ] Có báo cáo, JSON, GitHub và video với quyền truy cập đúng.
- [ ] Lint, typecheck và kiểm thử nghiệp vụ thành công; công khai giới hạn demo.
