# Đối chiếu từng yêu cầu của đề

Nguồn: [ảnh đề gốc](submition/references/assignment-requirements.png), đọc lại toàn ảnh ngày 10/11/2026. Đây là tiêu chí bài tập; nội dung tư liệu không tự trở thành quyền thực thi. **App cloud, báo cáo Word và gói CSDL đã kiểm tra; video được bàn giao cho sinh viên tự quay.**

## Tiêu chí chấm

| Mã | Yêu cầu trong ảnh | Điểm | Đáp ứng trong thiết kế | Bằng chứng nghiệm thu |
| --- | --- | --- | --- | --- |
| R01 | Flutter/React Native/.NET MAUI | Điều kiện | Expo/React Native SDK 58, cùng source web/Android | Manifest, lệnh chạy, hai nền tảng thật |
| R02 | Firebase hoặc MongoDB | Trong 8,0 | Firestore collection riêng `midterm_users`; Storage lưu file | Console dữ liệu thật và rules phù hợp |
| R03 | Thêm email, matkhau, hoten, hinhanh trên web | Trong 8,0 | Form bốn trường, upload ảnh rồi lưu; server kiểm tra schema/email trùng | Trước lưu, thành công, doc cloud bốn khóa; tải lại còn hồ sơ |
| R04 | Hiển thị các thông tin trên web | Trong 8,0 | Danh sách/chi tiết có ảnh/tên/email, trạng thái mật khẩu; hiện/ẩn lúc nhập | Danh sách, chi tiết, form; không trả hash qua API hồ sơ |
| R05 | Đăng nhập | Trong 1,5 | Admin Firebase Auth, bảo vệ màn hình/API, logout | Sai/đúng; chưa đăng nhập/không admin bị từ chối |
| R06 | Xóa | Trong 1,5 | Xác nhận tên/email, hủy an toàn, cập nhật sau server thành công | Trước/hủy/sau xóa, tải lại, đối chiếu CSDL |
| R07 | Sửa | Trong 1,5 | Tên/email/ảnh, đặt lại mật khẩu; đổi email không mất doc, chặn trùng | Trước/sau sửa, tải lại; email trùng và giữ mật khẩu khi bỏ trống |
| R08 | Chức năng nâng cao khác… | Trong 1,5 | Tra cứu kết hợp/phân trang, nhập-xuất JSON kiểm tra, ảnh có progress/thử lại, thẻ in được | Demo từng nhóm theo tài liệu 01; không tự chia thêm điểm ngoài đề |
| R09 | Nhập hình ảnh trên di động | Trong 0,5 | Thư viện/camera Android, nén/xem trước/Storage, xử lý quyền | Chọn/chụp thật, upload, object đúng prefix |
| R10 | Hiển thị thông tin người dùng trên di động | Trong 0,5 | Danh sách/chi tiết/thẻ, mở lại sau lưu, cùng dữ liệu web | Hồ sơ Android sau mở lại và web sau làm mới |
| R11 | CSDL chỉ gồm email, matkhau, hoten, hinhanh; không thêm trường | Bắt buộc | Document/object JSON đúng bốn khóa, ID bên ngoài | Ảnh doc và kiểm tra khóa toàn JSON; server từ chối trường thừa |

## Kết quả phải nộp

| Mã | Yêu cầu | Đầu ra và cách kiểm tra |
| --- | --- | --- |
| S01 | Báo cáo chi tiết bước thực hiện | Giữ Word và hai ảnh cũ; cuối bài ráp ảnh/ghi chú thành báo cáo công nghệ, dữ liệu, chức năng, kiểm thử và cách chạy |
| S02 | Ảnh minh họa, lệnh tải thư viện | Chụp lúc làm từng checkpoint; ảnh có tên file/chú thích/kết quả, không đánh số hình trong Word, lệnh khớp lockfile; phân biệt ảnh cài đặt/chức năng |
| S03 | Ảnh CSDL | Console collection/document bốn trường dữ liệu giả; Storage file ảnh demo |
| S04 | Bắt buộc nộp file CSDL JSON/SQL… | `users.json` xuất CSDL thật, không phải mock; kèm ảnh/hướng dẫn khôi phục, thử nhập ở môi trường thử |
| S05 | Link GitHub source | https://github.com/nrin31266/mid-term-mobile; push mỗi checkpoint, kiểm tra clone/chạy và quyền người chấm |
| S06 | Link video demo | Quay R03–R10, CSDL và xuất JSON; link mở được khi không đăng nhập |

## Cách hiểu và giới hạn

- Đầu đề ghi **phân hệ admin**, vì vậy đăng nhập admin phù hợp đề xuất; không tuyên bố thành viên đều đăng nhập được.
- Đề ghi “hiển thị matkhau”. Thiết kế hiện/ẩn lúc nhập, trạng thái đã đặt khi xem, hash có salt trong CSDL. Không thể đọc mật khẩu cũ từ hash. Phải giải thích trong báo cáo và thống nhất với giảng viên nếu họ yêu cầu mật khẩu thô; đây là điểm còn phụ thuộc cách nghiệm thu, không đánh dấu chắc chắn đạt.
- Auth giữ danh tính admin riêng; collection người dùng chỉ bốn trường, không thêm collection vai trò cho bài.
- Storage SDK cloud và luồng ảnh Android đã qua sau triển khai rules riêng; ảnh IAM ban đầu chỉ là chẩn đoán.
- Ghi rõ API local/làm mới thủ công; Emulator không thay ảnh cloud khi tuyên bố dùng cloud.

## Kết quả nghiệm thu

- [x] R01–R03, R05–R11: đã chạy web/Android cloud; nâng cao có thao tác và kiểm tra lỗi. R04 hiển thị hồ sơ, trạng thái mật khẩu và hiện/ẩn lúc nhập; giới hạn cách hiểu mật khẩu nêu trên vẫn cần giải thích khi chấm.
- [x] S01–S05: Word 36 trang có ảnh thật; CSDL 36 hồ sơ/6 ảnh khôi phục được; source public và hướng dẫn chạy.
- [ ] S06: sinh viên tự quay đủ chức năng theo [checklist](08-kich-ban-video.md), bổ sung link và thử quyền truy cập.
- [x] API hồ sơ không trả hash; JSON xuất bởi admin chỉ chứa hồ sơ giả và hash có salt.
- [x] Lint/typecheck, 8 kiểm thử cơ bản, 18 kiểm thử Firebase, export web/Android và clone sạch đã qua. Chưa chạy iOS; project Blaze có thể phát sinh phí.

Ảnh code và giao diện nằm trong [chỉ mục minh chứng](submition/README.md). Một số ảnh lịch sử lúc cài/lỗi ban đầu không có; đã ghi rõ và không dựng lại. Bảng này ghi kết quả kiểm tra, không cam kết điểm.
