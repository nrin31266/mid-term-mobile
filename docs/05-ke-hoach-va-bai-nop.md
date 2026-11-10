# Kế hoạch thực hiện và bài nộp

## 0 — Duyệt ý tưởng

Duyệt MemberDesk, admin login, ưu tiên hạn mức miễn phí, ảnh nhỏ trên Storage, URL trong Firestore và API Node local. Thống nhất cách nghiệm thu nếu giảng viên yêu cầu đọc lại mật khẩu cũ hoặc đăng nhập từng thành viên. Chưa code tính năng trước khi duyệt.

## 1 — Nền tảng và quyền

Xử lý hai lỗi code mẫu đã ghi ở tài liệu 04, chạy lint/typecheck. Kiểm tra chỉ đọc dịch vụ, database, rules và dữ liệu project cũ. Chọn collection riêng, cài SDK bằng Expo installer, thiết lập credential API và admin qua công cụ tin cậy. Kiểm thử rule riêng cho prefix Storage của bài vì rule hiện tại hết hạn; không kéo dài rule public. Kiểm thử quyền/schema/hash trong Emulator trước khi thay đổi cloud. Không mở server ra internet để demo.

Nghiệm thu: login/logout hoạt động, không token/không admin bị từ chối, không ảnh hưởng ứng dụng cũ. Thay đổi credential hoặc quyền cloud phải xem xét cụ thể ở thời điểm làm.

## 2 — Phần 8 điểm trên web

Xây form và danh sách đủ bốn trường, kiểm tra dữ liệu/email trùng, mật khẩu và ảnh. Chứng minh dữ liệu còn sau tải lại. Có trạng thái đang tải, rỗng và lỗi; server lỗi thì không báo lưu thành công. Chụp form, danh sách, chi tiết và CSDL thật.

## 3 — Sửa và xóa

Sửa tên/email/ảnh; ô mật khẩu trống khi sửa nghĩa là giữ hash, không băm chuỗi rỗng. Nhập/xác nhận mật khẩu mới khi muốn thay. Đổi email qua transaction. Xóa xác nhận rõ người bị xóa, hủy giữ nguyên. Sau ghi tải lại danh sách từ API.

## 4 — Android và ảnh

Thư viện/camera, xử lý hủy/từ chối quyền, nén JPEG, xem trước, upload Storage rồi lưu URL. Form cuộn, tránh bàn phím. Hồ sơ mở lại còn ảnh; web tải lại thấy cùng ảnh. Android cần host LAN/giả lập phù hợp vì localhost trên điện thoại không phải máy dev. Chốt CORS/firewall khi triển khai, chỉ dùng dữ liệu giả trong LAN HTTP.

## 5 — Điểm nhấn và kiểm thử

Thêm tìm kiếm không dấu, lọc thiếu ảnh và thẻ xem trước sau khi đủ phần bắt buộc. Kiểm thử nhỏ nhưng có ý nghĩa cho logic:

- Schema đúng bốn trường, thiếu/thừa trường bị từ chối, ảnh/chuỗi vượt giới hạn.
- Tạo trùng đồng thời, đổi email sang email đã có, transaction không làm mất hồ sơ.
- Salt khác nhau, không lộ hash qua API; sửa không nhập mật khẩu giữ hash cũ.
- Không token/không admin bị từ chối; rules không cho đọc hash trực tiếp.
- Hủy ảnh/từ chối camera/lỗi mạng không làm mất dữ liệu form.
- JSON thật xuất rồi nhập lại được vào môi trường thử, giữ đủ bốn trường và ảnh.

Chạy lint, typecheck, kiểm thử nghiệp vụ, web và Android trước khi báo hoàn thành. Chỉ tuyên bố đã kiểm thử iOS nếu thực sự chạy iOS.

## 6 — Báo cáo và gói nộp

Tiếp tục bản Word hiện có, không ghi như thể phần chưa làm đã hoàn thành. Cấu trúc báo cáo:

1. Đề bài, mục tiêu và bảng đối chiếu.
2. Công nghệ, phiên bản, hạn mức miễn phí và trạng thái Blaze hiện có.
3. Khởi tạo/cài thư viện, lệnh thật đã chạy.
4. Dữ liệu bốn trường, ảnh và bảo vệ mật khẩu.
5. Login, thêm, xem, sửa, xóa, nhập ảnh mobile.
6. Ảnh thao tác/CSDL có số và chú thích.
7. Kiểm thử, lỗi gặp và cách giải quyết thực tế.
8. Hướng dẫn chạy, giới hạn API local, hướng phát triển.
9. Link source/video và tên file CSDL nộp kèm.

Ảnh cần chụp: môi trường, cấu hình Firebase không bí mật, login, form đủ trường, danh sách web, sửa, xóa, chọn/chụp ảnh Android, hồ sơ sau tải lại, Firestore bốn trường, JSON/nhập lại, kiểm tra cuối. Không chụp service account/token/OTP/mật khẩu thật. Dùng hồ sơ giả.

## Video khoảng 4–6 phút

1. Giới thiệu hai nền tảng, login admin.
2. Thêm web, tải lại chứng minh lưu thật.
3. Sửa email/tên, tìm kiếm, lọc và xem thẻ.
4. Chọn/chụp ảnh Android, lưu và mở lại trên web.
5. Hủy xóa rồi xác nhận xóa một hồ sơ demo.
6. Mở Firestore bốn trường, xuất JSON, giới thiệu source/cách chạy.

Thử mở GitHub/video bằng tài khoản người chấm hoặc cửa sổ chưa đăng nhập. Nộp CSDL riêng; link console không thay file JSON. Chưa có JSON cuối, video hay báo cáo kết quả vì app chưa triển khai.
