# Checkpoint thực hiện và bài nộp

## Nguyên tắc đã chốt về quy trình

**Mỗi checkpoint lớn phải commit và push GitHub**, kèm source, tài liệu, ảnh và ghi chú của mốc đó. Không dồn hết lên GitHub cuối bài. Đây là quy trình được yêu cầu; tính năng trong tài liệu 01 vẫn chờ duyệt trước khi làm.

Một checkpoint chỉ hoàn thành khi: chạy kiểm tra, chụp đủ các bước, ghi chú ngắn và cập nhật chỉ mục ảnh, soát diff/bí mật, commit tiếng Anh, push và xác minh SHA remote. **Cuối bài (C6) mới ráp ảnh và ghi chú vào Word**, giữ hai ảnh bạn đã làm; render và xem hết các trang sau khi ráp. Nếu lỗi, ghi kết quả thật và trạng thái chưa đạt; không tạo tag “hoàn tất” giả. Mốc kế hoạch chỉ cập nhật docs; ảnh chức năng chưa có thì ghi chưa chụp.

## Các mốc và đầu ra

| Mốc | Phạm vi và điều kiện nghiệm thu | Ảnh và ghi chú | Commit dự kiến |
| --- | --- | --- | --- |
| C0 — Kế hoạch, công cụ | Rà đề, skill local, kiểm tra config Firebase, chốt bốn nhóm nâng cao, ghi lỗi nền và giới hạn | Giữ hai ảnh khởi tạo; lưu ảnh đề, ghi phần kế hoạch và thiết lập trong docs | `docs: finalize scope and project-local tooling` |
| C1 — Nền tảng, quyền | Sửa hai lỗi starter; cài SDK đúng Expo; kiểm tra project cũ; admin login/logout; API/credential; rules riêng kiểm thử trước cloud | Lệnh cài thật, cấu hình không bí mật, login đúng/sai, truy cập bị chặn, kết quả kiểm thử quyền | `feat: establish secure admin access` |
| C2 — Web và CSDL | Form đủ bốn trường, upload ảnh, thêm/danh sách/chi tiết, tải lại còn; lỗi/schema/email trùng; không lộ hash | Form, danh sách, chi tiết, Firestore bốn trường, object Storage và lỗi hợp lệ | `feat: add persistent web member management` |
| C3 — Sửa/xóa | Sửa tên/email/ảnh, đặt lại/giữ mật khẩu; transaction đổi email; hủy/xác nhận xóa, server lỗi không báo thành công | Trước/sau sửa, chặn trùng, hủy/sau xóa, CSDL sau tải lại | `feat: complete member editing and deletion` |
| C4 — Android/ảnh | Camera/thư viện, hủy/quyền/mất mạng, nén/xem trước/progress/thử lại; profile mở lại, web thấy cùng ảnh | Các bước trên Android và web sau làm mới; ghi thiết bị/SDK/lệnh thực tế | `feat: complete mobile profiles and image workflow` |
| C5 — Nâng cao/hoàn thiện | Tra cứu kết hợp/phân trang, JSON kiểm tra/xem trước/nhập lại, thẻ in/PDF, trạng thái UI và truy cập | Ảnh từng nhóm, file sai không ghi, khôi phục thử, bản in/PDF, kiểm thử nghiệp vụ | `feat: deliver advanced member tools` |
| C6 — Gói nộp | Chạy từ clone sạch, kiểm tra dữ liệu giả/schema, Word đầy đủ, JSON/ảnh khôi phục, video/GitHub mở được | Báo cáo cuối, CSDL thật, ảnh, README chạy, link video, bảng nghiệm thu R01–R11/S01–S06 | `docs: package verified coursework submission` |

Các commit có thể tách nhỏ khi cần; vẫn phải push ở tất cả mốc lớn. C1 chỉ bắt đầu sau khi duyệt. Những cloud change cần làm trong phạm vi được duyệt phải xem rules/consumer trước; không đổi billing hoặc mở public để cho chạy nhanh.

## Chụp đủ quy trình, code và kết quả

Không chỉ chụp màn hình sau khi xong. Mỗi phần cần lưu các bước quan trọng: lệnh cài/chạy, cấu hình trong Console, cấu trúc source, code xử lý, thao tác và kết quả kiểm tra. Danh sách chi tiết theo C1–C6 nằm trong [chỉ mục minh chứng](submition/README.md).

Ví dụ phần thêm hồ sơ: cài thư viện → cấu hình Firebase → code kiểm tra bốn trường/băm mật khẩu/API tạo → code form → nhập và lưu → danh sách sau tải lại → document Firestore → thử email trùng. Phần ảnh mobile cũng có code xin quyền/chọn/nén/upload, thao tác trên thiết bị và kết quả mở lại.

Chụp code từ source thật, có tên file/số dòng, khoảng 15–35 dòng đọc được. Ghi đường dẫn/hàm/commit và ảnh kết quả liên quan. Không dùng ảnh code thay kiểm thử. Code đổi thì cập nhật ảnh cũ bị sai.

## Quy tắc chụp ảnh và đưa vào Word

Ảnh lưu tại `docs/submition/screenshots/`, tên tiếng Anh có mã bước. Chụp đủ từng bước, đúng trình tự lúc làm; không dùng mockup thay ảnh app, không dựng terminal giả. Mỗi ảnh có số, chú thích tiếng Việt, bước/lệnh thao tác, kết quả quan sát và mã tiêu chí trong [chỉ mục minh chứng](submition/README.md). Log kiểm thử là bằng chứng bổ sung, không thay ảnh UI/CSDL mà đề yêu cầu.

- Web: chụp đủ vùng chứng minh form/danh sách/chi tiết/lỗi; không để dữ liệu app khác trong khung.
- Android: xác định thiết bị bằng ADB, chụp camera/thư viện trong luồng thật và kết quả sau lưu/mở lại. Không coi ảnh starter là hồ sơ hoàn thành.
- Firebase: hiện rõ project/collection/document bốn trường và ảnh Storage demo; không chụp service account/token/OTP, không dùng dữ liệu thật.
- Đánh dấu: dùng khoanh đỏ, khung hoặc mũi tên đơn giản như hai ảnh có sẵn; thêm nhãn ngắn nếu cần. Không che chữ/nút hay sửa kết quả. Giữ bản chụp gốc ở vùng riêng để đối chiếu; ảnh đưa vào báo cáo chỉ thêm dấu chỉ dẫn.
- Word: để cuối bài mới ráp; giữ hai ảnh đã có, thêm ảnh theo trình tự và chú thích từ ghi chú từng mốc. Render rồi xem hết các trang, chữ/ảnh phải đọc được.
- GitHub: mỗi mốc commit/push source, docs và ảnh đã lọc; C6 thêm Word hoàn chỉnh. Xác minh remote. Ảnh toàn màn hình thô/private giữ ở `/tmp` hoặc `docs/private/`, không đưa Git.

Khi chỉ mới lập kế hoạch, ảnh chức năng còn thiếu được ghi “chưa chụp”; không điền bằng hình minh họa thành công giả.

## Kiểm thử cần hoàn thành

- Schema đúng bốn trường; thiếu/thừa trường, chuỗi/ảnh quá giới hạn bị từ chối ở server.
- Tạo trùng đồng thời; đổi email sang email đã có; transaction lỗi không làm mất hồ sơ.
- Scrypt có salt khác nhau; giữ hash khi không đặt mật khẩu mới; hash không xuất hiện trong API hồ sơ/log.
- Không token/không admin bị từ chối; Firestore không đọc trực tiếp hash; Storage chặn sai quyền/prefix/loại/kích thước, không ảnh hưởng app cũ.
- Hủy ảnh/quyền bị từ chối/mất mạng giữ form và ảnh cũ; chỉ dọn file do thao tác này tạo, không xóa ảnh đang được tham chiếu.
- Tìm không dấu/lọc/sắp xếp/phân trang kết hợp đúng; giới hạn demo được báo rõ; không kết quả và tên dài hiển thị tốt.
- JSON sai không ghi; xác nhận lại kiểm tra server; trùng được bỏ qua; xuất/nhập lại đúng schema và ảnh ở môi trường thử.
- Thẻ phản ánh dữ liệu đã lưu; bản in/PDF không mật khẩu/nút quản trị.
- Lint, typecheck và kiểm thử nghiệp vụ; chạy web và Android, thử clone sạch. Không tuyên bố đã test iOS khi chưa chạy.

## Cách viết và cấu trúc báo cáo Word

Viết ngắn, tự nhiên như người làm bài kể lại: làm gì, chạy lệnh nào, kết quả ra sao. Có lỗi thì ghi lỗi và cách sửa thật. Tránh mở bài dài, câu sáo rỗng, lặp ý hoặc giọng quảng cáo. Không kể lại cách AI suy nghĩ hay tự khen sản phẩm.

1. Đề bài/mục tiêu/bảng đối chiếu.
2. Công nghệ/phiên bản/cấu hình máy/trạng thái Blaze và giới hạn.
3. Khởi tạo/cài thư viện với lệnh thật và ảnh gốc đã có.
4. Bốn trường dữ liệu, hash, Auth, Storage và quyền truy cập.
5. Các bước login, thêm/xem/sửa/xóa trên web.
6. Android: nhập ảnh, hiển thị, mở lại và đối chiếu web.
7. Bốn nhóm nâng cao, ảnh thao tác và kết quả.
8. CSDL cloud, export/khôi phục, kiểm thử/lỗi/cách xử lý.
9. Cách clone/chạy API và app, giới hạn LAN, file nộp, link GitHub/video.

API Node local cần credential server riêng và địa chỉ truy cập đúng từ Android; localhost trên điện thoại không phải laptop. Không mở API ra internet. Dữ liệu demo giả dùng trong LAN HTTP; khi public phải có HTTPS/host và chốt chi phí riêng.

## Gói CSDL và video

Gói cuối có `users.json` xuất thật, `images/` chứa ảnh demo và `README.md` tiếng Việt hướng dẫn khôi phục. Không đưa credential/admin thật vào gói. Bản export giữ URL cloud để đối chiếu; bản di động có thể dùng đường dẫn ảnh tương đối và công cụ server tải lại/thay URL theo tài liệu 07. Kiểm tra key toàn bộ file; link Console không thay file CSDL.

Video khoảng 5–7 phút: login → thêm web/tải lại → sửa/đặt mật khẩu → tìm/lọc/phân trang → camera/thư viện Android/lưu/web làm mới → hủy và xác nhận xóa → JSON xem trước/nhập → thẻ/bản in → CSDL bốn trường/source/hướng dẫn chạy. Dùng dữ liệu giả, tránh token. Quay xong thử link ở cửa sổ chưa đăng nhập.

Hiện chưa có JSON cuối hay video; báo cáo chỉ ghi phần đã làm. Theo dõi file/ảnh có thật trong [chỉ mục minh chứng](submition/README.md).
