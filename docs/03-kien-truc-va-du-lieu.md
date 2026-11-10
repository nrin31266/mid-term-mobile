# Kiến trúc và dữ liệu đề xuất

## Cloud và môi trường thử

Theo yêu cầu triển khai cloud ngày 10/11/2026, web và API dùng HTTPS, hoạt động độc lập với laptop. Giữ project Blaze và bucket đang có, không đổi billing.

Ứng dụng dùng **một codebase Expo + React Native + TypeScript**. Các màn hình trong `src/app/`, component và service dùng chung Android/iOS/Web, bố cục thay đổi theo kích thước. Không có dự án frontend web thứ hai. Firebase đăng ký web app MemberDesk vì dùng JavaScript SDK cả trong Expo Go; tên nền tảng của đăng ký SDK không giới hạn nền tảng chạy app. `server/` là API, không phải frontend web riêng. iOS chưa được chạy thử trên laptop Linux.

- Web Expo SDK 58: https://memberdesk-801885728284.web.app, site riêng `memberdesk-801885728284`.
- API Node 22: Function gen 2 `memberdeskApi`, codebase `memberdesk`, vùng `us-central1`. Hosting chuyển `/api/**` tới Function. Không sửa Function `app` và site mặc định của project cũ.
- Firebase Auth Email/Password đăng nhập admin, claim `admin: true`. API xác minh token và tài khoản bị khóa/thu hồi. Đã kiểm tra phiên HTTPS; CRUD/băm mật khẩu thuộc C2–C3, chưa hoàn thành ở C1.
- Firestore Standard `(default)`, collection riêng `midterm_users`. Client bị chặn hoàn toàn; Admin SDK chỉ truy cập sau kiểm tra quyền ở API.
- Khóa dọn ảnh tạm dùng document rỗng `memberdesk_internal/image_cleanup`, chỉ server đọc/ghi. Không phải hồ sơ và không nằm trong JSON nộp bài; xem tài liệu 07.
- Storage giữ bucket cũ; prefix `midterm-mobile/avatars/`. Admin SDK của Function dùng danh tính runtime, không đóng gói key. ADC trên laptop phục vụ cấu hình/kiểm thử, không gửi lên app.

Function đặt `minInstances: 0`, `maxInstances: 1`, RAM 256 MiB, concurrency 1, timeout 30 giây. Có thể khởi động chậm và phát sinh phí theo sử dụng/lưu artifact; đây không phải cam kết miễn phí hay giới hạn tiền cứng. Không bật thêm các sản phẩm Firebase không thuộc bài.

Luồng: giao diện → Firebase Auth → ID token gửi API → kiểm tra quyền/schema → Firestore. Ảnh upload qua SDK rồi gửi URL cho API kiểm tra trước khi lưu. ID document nằm ngoài bốn trường dữ liệu.

Emulator Auth/Firestore/Storage và API loopback vẫn dùng để thử lỗi/quyền/khôi phục mà không tác động dữ liệu cloud. Chế độ cloud/emulator phải chọn rõ ràng, không trộn host hay credential.

## Bốn trường

Collection `midterm_users` đã kiểm tra trống trước triển khai; không dùng dữ liệu các app cũ.

| Trường | Kiểu | Quy tắc |
| --- | --- | --- |
| `email` | string | Trim, chuẩn hóa nhất quán, hợp lệ và duy nhất |
| `matkhau` | string | Bản băm chứa phiên bản, tham số, salt và hash; không lưu mật khẩu thô |
| `hoten` | string | Trim, bắt buộc, giới hạn độ dài |
| `hinhanh` | string | URL ảnh JPEG trên Storage; rỗng nếu chưa có ảnh; hồ sơ nghiệm thu chính phải có ảnh |

Không thêm `id`, `role`, `createdAt`, `updatedAt`, `status` hoặc `searchName`. Claim admin nằm trong dịch vụ Auth, không phải collection vai trò.

Khóa document dự kiến SHA-256 của email chuẩn hóa. Tạo dùng thao tác create có điều kiện để tránh trùng đồng thời. Đổi email dùng transaction: kiểm tra khóa đích chưa có, chuyển đủ bốn trường, xóa khóa cũ nguyên tử; giao diện nhận lại ID mới. Không chỉ kiểm tra email trùng trên client.

Đăng nhập là admin. Mật khẩu thành viên được quản lý theo đề không đồng nghĩa tài khoản Firebase Auth tương ứng đã được tạo. Không ngầm đồng bộ hai kho mật khẩu. Đề nói phân hệ admin nên không yêu cầu thành viên tự đăng nhập trong phạm vi đã đề xuất.

## Ảnh và hiệu năng

Chọn Storage thay base64. Đã kiểm tra upload/tải lại JPEG 2.108 byte bằng cả IAM và SDK đăng nhập admin. Rules riêng chặn khách, ghi đè, sai prefix/loại/dung lượng; wildcard cũ vẫn hết hạn. Luồng ảnh trong form/mobile chưa triển khai ở C1. Chi tiết và bằng chứng nằm trong [quy trình upload](07-image-upload.md).

- JPEG tối đa 512 × 512, mục tiêu 200 KiB, từ chối trên 500 KiB sau xử lý. Client, rules và phía tin cậy phải kiểm tra tương ứng.
- Object UUID mới ở `midterm-mobile/avatars/`; không ghi đè theo email. Upload thành công rồi mới lưu URL, giữ ảnh cũ nếu thao tác lỗi.
- Không lưu ảnh base64 hay URI `file://` vào Firestore. Document người dùng chỉ chứa bốn trường, không có trường đường dẫn Storage phụ.
- Demo dự kiến 36 hồ sơ theo yêu cầu thử phân trang, có và không có ảnh; API giới hạn tối đa 200 hồ sơ. Tìm không dấu/lọc/sắp xếp trên tập đã tải, phân trang giao diện 10 hồ sơ. Khi vượt 200 phải báo giới hạn, không âm thầm bỏ kết quả. Tải lại khi vào màn hình/nút làm mới; sau ghi lấy dữ liệu server, chưa hứa realtime.
- Chỉ bỏ index `matkhau`/`hinhanh` nếu có nhu cầu và sau khi kiểm tra cấu hình đang dùng; không tự thay index toàn project.

## Quyền và credential

MemberDesk có đăng ký app riêng, nhưng Auth, Firestore và Storage vẫn là tài nguyên của project dùng chung. App ID và API key không tạo ranh giới dữ liệu. Collection/prefix riêng, rules và API kiểm tra admin mới bảo vệ phần của bài.

Ngày 10/11: tách key `MemberDesk web` (bốn API Firebase, referrer Hosting/localhost:8081) và `MemberDesk native` (bốn API, dùng Expo Go). Key lấy từ `.env.local` ignored; client key vẫn có trong bản build. Key Browser cũ còn được app `NgyenVanRin 8.2 9lessons` dùng; chưa thu hồi để tránh làm hỏng app đó. GitHub alert lịch sử chưa được đóng như đã thu hồi. Biến môi trường không xóa key khỏi lịch sử Git.

Client không đọc/ghi trực tiếp collection chứa hash. Rules chặn truy cập trực tiếp; Admin SDK bỏ qua rules nên API bắt buộc kiểm tra token, claim và schema. Rules wildcard cũ có thể cho phép truy cập dù thêm rule deny mới: phải đọc rules hiện tại và kiểm thử thực tế trước khi deploy. Không ghi đè rules toàn project cá nhân. Nếu không cô lập an toàn được, đề xuất project riêng trước khi thay đổi.

API cần giới hạn request, dung lượng, chiều dài chuỗi, CORS origin cụ thể, lỗi không rò dữ liệu và kiểm tra admin từ token đã xác minh. Không cho client tự gán claim. HTTPS khi truy cập công khai; LAN HTTP chỉ dùng hồ sơ giả để phát triển/demo.

Firestore cloud qua Admin SDK cần Application Default Credentials hoặc credential máy chủ quản lý riêng. `firebase login` của CLI không tự cung cấp credential cho Admin SDK. Không đặt khóa trong `EXPO_PUBLIC_*` hoặc Git. Đã tạo tài khoản admin demo và claim, credential chỉ giữ trong file ignored quyền 0600; không tạo service-account key.

## JSON bài nộp

Xuất JSON ứng dụng bằng công cụ máy chủ có quyền để có định dạng dễ nộp/nhập lại; không phụ thuộc định dạng managed export của dịch vụ. File dạng array, mỗi object đúng bốn trường, khôi phục ID từ email khi nhập. Dùng dữ liệu giả và mật khẩu demo đã băm, không dùng tài khoản thật.

Nhập JSON qua UI là chức năng admin nâng cao: tối đa 2 MiB/200 hồ sơ, đúng bốn khóa, tất cả trường là chuỗi và đúng giới hạn. Kiểm tra email trùng trong file, cấu trúc/phiên bản/tham số hash được cho phép, URL đúng bucket/prefix và object tồn tại. Không nhận plaintext từ luồng import. Một dòng không hợp lệ thì không ghi cả file. Server trả bản xem trước chỉ có tên/email/kết quả, không phản chiếu hash. Trước khi xác nhận ghi phải kiểm tra lại phía server, không tin kết quả kiểm tra từ client.

Bỏ qua email đã tồn tại và báo số lượng; không tự cập nhật hồ sơ cũ. Ghi nhóm mới trong một transaction, đọc khóa trước khi ghi để xử lý xung đột. Không nhận tham số scrypt tùy ý từ JSON: chỉ chấp nhận cấu hình đã cho phép để tránh làm cạn tài nguyên. Export có hash là thao tác admin riêng, không lẫn vào API hồ sơ; chỉ dữ liệu giả được nộp/Git.

Gói sao lưu kèm bản ảnh demo và hướng dẫn khôi phục ở tài liệu 07. Form JSON nhận URL cloud hợp lệ; công cụ server mới xử lý ảnh của gói di động. Khôi phục chỉ thử ở Emulator/collection thử được chỉ định, không ghi đè cloud cũ. Chưa tạo JSON giả rồi gọi là CSDL đã triển khai.

## Luồng thẻ thành viên

Thẻ hiển thị từ hồ sơ đã lưu, chỉ ảnh/tên/email. Web có trang in riêng dùng khả năng in/lưu PDF của trình duyệt; không cần dịch vụ PDF cloud. Mobile xem thẻ toàn màn hình. Thẻ không phải chứng nhận xác thực, không có mã/thời hạn/QR giả và không lưu document phụ.

## JSON và bản sao di động — C5

API admin có `GET /members/export`, `POST /members/import/preview` và `POST /members/import`. Preview chỉ trả tên/email/trạng thái; hash chỉ có trong bản xuất. Server nhận tối đa 2 MiB, 200 hồ sơ; kiểm tra đúng bốn trường, định dạng scrypt, email trùng và nội dung ảnh. Xác nhận kiểm tra lại trong transaction có khóa dọn ảnh; file lỗi không ghi, email đã có được bỏ qua.

Tra cứu chạy trên tập tối đa 200 hồ sơ, phân trang giao diện 10 hồ sơ. Tìm không dấu kết hợp lọc ảnh và sắp tên/email; đổi điều kiện reset trang. Thẻ đọc hồ sơ đã lưu; CSS in ẩn các nút/header quản trị.

`scripts/member-backup.mjs` xuất dữ liệu cloud cùng ảnh/checksum; bản portable thay URL bằng đường dẫn `images/`. Khôi phục chỉ nhận project Emulator `demo-memberdesk`, kiểm tra đường dẫn/checksum, tải ảnh mới rồi nhập nguyên tử qua cùng store. Không có lệnh ghi đè cloud. Hướng dẫn trong `submition/database/README.md`.
