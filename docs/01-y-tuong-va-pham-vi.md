# Ý tưởng và phạm vi

## Trạng thái

Đề xuất chờ người thực hiện duyệt trước khi code tính năng. Đã chọn Firebase **Nguyen Van Rin**, Console hiện hiển thị Blaze (khác giả định ban đầu chưa bật thanh toán); ưu tiên không phát sinh phí; GitHub `nrin31266/mid-term-mobile`.

## Các hướng

| Hướng | Lợi thế | Hạn chế |
| --- | --- | --- |
| Quản lý người dùng thuần CRUD | Nhanh, ít màn hình | Khó tạo dấu ấn |
| **MemberDesk — quản lý thành viên** | Khớp bốn trường, có thẻ hồ sơ và luồng ảnh đẹp | Cần chăm chút web/mobile |
| Quản lý sinh viên/nhân viên đầy đủ | Nhiều nghiệp vụ | Thường cần lớp, mã số, chức vụ, trái yêu cầu không thêm trường |

Đề xuất MemberDesk: sổ thành viên cho một câu lạc bộ nhỏ. Đây là bối cảnh trình bày; dữ liệu vẫn chỉ là người dùng theo đề.

## Luồng chính

1. Quản trị viên đăng nhập email/mật khẩu qua Firebase Auth.
2. Web hiển thị danh sách và form thêm đủ email, mật khẩu, họ tên, hình ảnh.
3. Chi tiết cho sửa tên/email/ảnh hoặc đặt mật khẩu mới; không đọc lại mật khẩu cũ.
4. Xóa có xác nhận ghi rõ người bị xóa; hủy không thay đổi dữ liệu.
5. Android cho chọn ảnh thư viện hoặc chụp camera, xem trước, lưu và xem lại hồ sơ sau tải lại.
6. Web tải lại cùng hồ sơ để chứng minh dữ liệu/ảnh được lưu chung.

Phạm vi đăng nhập là **quản trị viên**. Thành viên được quản lý chưa có đăng ký/đăng nhập riêng. Nếu giảng viên yêu cầu tất cả thành viên đăng nhập được, cần bổ sung thiết kế trước khi triển khai.

## Màn hình và phong cách

- Đăng nhập: form ngắn, lỗi tiếng Việt, trạng thái đang xử lý, không đăng ký công khai.
- Danh sách: web dùng không gian rộng, mobile dùng thẻ và vùng bấm dễ thao tác.
- Thêm/sửa: dùng lại form; xem trước ảnh tròn và thẻ thành viên khi nhập.
- Chi tiết: tên, email, ảnh và thao tác quản trị; không hiện hash.
- Tông xanh đậm/nền sáng, tương phản rõ, nhãn đầy đủ, bàn phím không che nút lưu.

## Điểm sáng tạo vừa đủ

1. Tìm email/họ tên không dấu tiếng Việt, không thêm trường tìm kiếm vào CSDL.
2. Lọc “thiếu ảnh” dựa trên `hinhanh`, giúp hoàn thiện hồ sơ.
3. Xem trước thẻ thành viên ngay khi nhập, không thêm mã hoặc QR.
4. Thu nhỏ ảnh và báo ảnh quá lớn trước khi gửi để tiết kiệm dung lượng.

Xuất JSON là phần phục vụ bài nộp, cần làm dù không tính là sáng tạo. Chưa làm chat, AI, thông báo đẩy, phân quyền nhiều cấp, thùng rác hay nhật ký vì tăng phạm vi và cần dữ liệu khác.

## Điều kiện duyệt

Chấp nhận Firestore trong hạn mức miễn phí, ảnh JPEG trên Storage và URL trong `hinhanh`, API Node chạy trên máy demo để băm mật khẩu, và đăng nhập admin. Bảng đối chiếu hướng tới đủ yêu cầu; không cam kết điểm số khi chưa triển khai và nghiệm thu.
