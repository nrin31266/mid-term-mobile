# Ý tưởng và phạm vi đã chốt

## Trạng thái và mục tiêu

**Đã chốt triển khai ngày 10/11/2026** khi bạn yêu cầu “bắt đầu làm (full)”. Xây **MemberDesk — quản lý thành viên câu lạc bộ**, phân hệ admin dùng chung source Expo/React Native trên web và Android. Mục tiêu: phủ từng tiêu chí trong [ảnh đề gốc](submition/references/assignment-requirements.png), có chức năng nâng cao hữu ích và giao diện hoàn chỉnh; không cam kết điểm khi chưa được giảng viên chấm.

Firebase: Nguyen Van Rin (`crested-mercury-452707-e8`), bucket Storage hiện có, Console hiển thị Blaze. Theo yêu cầu mới, triển khai web/API cloud trong phase này; giữ billing và bucket cũ, dùng Function/site riêng. GitHub: https://github.com/nrin31266/mid-term-mobile.

## Lựa chọn sản phẩm

| Hướng | Đánh giá |
| --- | --- |
| Quản lý người dùng thuần CRUD | Đúng phần cốt lõi nhưng ít điểm khác biệt |
| **MemberDesk cho câu lạc bộ** | Đề xuất chọn: bốn trường đủ cho hồ sơ, thẻ thành viên và luồng ảnh mobile |
| Quản lý sinh viên/nhân sự đầy đủ | Cần mã số, lớp, chức vụ… không phù hợp yêu cầu cấm thêm trường |

Bối cảnh câu lạc bộ giúp trình bày và thiết kế; không tự thêm dữ liệu nghiệp vụ ngoài đề.

## Phần bắt buộc

1. **Đăng nhập admin** bằng Firebase Auth, đăng xuất, chặn màn hình và API khi chưa đủ quyền. Có trạng thái khởi tạo phiên, đăng nhập sai, mất mạng, phiên hết hạn. Không đăng ký admin công khai.
2. **Thêm và hiển thị trên web:** form email, mật khẩu, họ tên, hình ảnh; xem trước ảnh; lưu Firestore thật, tải lại còn dữ liệu. Danh sách có ảnh/tên/email và trạng thái đã đặt mật khẩu; chi tiết không trả hash về client.
3. **Sửa:** tên/email/ảnh, đặt lại mật khẩu khi cần. Bỏ trống mật khẩu khi sửa nghĩa là giữ nguyên. Email trùng bị từ chối ở server, kể cả hai lượt ghi đồng thời.
4. **Xóa:** xác nhận rõ tên/email; hủy giữ nguyên dữ liệu; chỉ báo thành công sau server. Tải lại xác minh hồ sơ đã mất.
5. **Mobile:** admin đăng nhập, xem danh sách/chi tiết, thêm/sửa hồ sơ, chọn ảnh thư viện hoặc chụp camera, xem trước và lưu Storage. Mở lại hồ sơ và làm mới web thấy cùng ảnh, không phụ thuộc URI local.
6. **CSDL đúng bốn trường:** `email`, `matkhau`, `hoten`, `hinhanh`. ID nằm ngoài document; không thêm vai trò, thời gian, trạng thái hay trường tìm kiếm.
7. **Bài nộp:** Word chi tiết có lệnh thật, ảnh thao tác/CSDL; JSON dữ liệu thật kèm ảnh/hướng dẫn khôi phục; source GitHub; link video mở được. Giữ hai ảnh Word đã có.

Đề ghi “phân hệ admin”, vì vậy đăng nhập dành cho quản trị viên. Thành viên trong danh sách không có tài khoản đăng nhập riêng trong phạm vi này.

“Hiển thị mật khẩu” được đề xuất nghiệm thu bằng trường mật khẩu có nút hiện/ẩn khi nhập và trạng thái đã đặt khi xem hồ sơ. `matkhau` lưu hash có salt, không lưu/đọc lại mật khẩu thô. Phải giải thích rõ trong báo cáo; nếu giảng viên bắt buộc xem lại mật khẩu cũ thì cần thống nhất cách nghiệm thu an toàn.

## Chức năng nâng cao đã chốt

Dấu “…” được cụ thể hóa thành bốn nhóm. Khi duyệt tài liệu này, đây là phần cần hoàn thành, không chỉ là gợi ý có thể bỏ.

| Nhóm | Hành vi cụ thể | Cách chứng minh |
| --- | --- | --- |
| Tra cứu kết hợp | Tìm tên/email không dấu, không phân biệt hoa thường; lọc có/thiếu ảnh; sắp xếp tên/email tăng giảm; phân trang 10 hồ sơ, đếm kết quả. Đổi điều kiện trở về trang đầu | Tìm “nguyen” ra “Nguyễn”, kết hợp lọc/sắp xếp, đổi trang và kiểm tra rỗng |
| Nhập và sao lưu JSON có kiểm tra | Admin xuất đúng bốn trường; nhập file có bước xem trước số hợp lệ/lỗi/trùng; file sai không ghi. Email đã tồn tại được bỏ qua và báo rõ, không ghi đè ngầm | Nhập file đúng/sai/thừa trường/trùng; xuất rồi khôi phục ở Emulator. JSON có hash chỉ dành cho admin và dữ liệu giả |
| Quy trình ảnh hoàn chỉnh | Cắt vuông khi nền tảng hỗ trợ, xem trước, nén JPEG, tiến độ upload và thử lại. Hủy/từ chối quyền/ảnh lớn/mất mạng giữ form và ảnh cũ | So sánh kích thước trước/sau, camera/thư viện, lỗi mạng rồi thử lại |
| Thẻ thành viên sử dụng được | Thẻ có ảnh/tên/email từ dữ liệu đã lưu; bản in riêng trên web để in hoặc lưu PDF qua trình duyệt. Không in mật khẩu/ID/thời gian giả | Sửa hồ sơ rồi xem thẻ cập nhật, bản in/PDF sạch nút quản trị, cùng thẻ trên Android |

Tra cứu/sắp xếp trên tập demo tối đa 200 hồ sơ tải qua API; phân trang ở giao diện, không quảng cáo tìm kiếm Firestore trên dữ liệu lớn. JSON nhập tối đa 200 hồ sơ và 2 MiB, kiểm tra toàn bộ trước xác nhận, ghi nguyên tử nhóm mới bằng transaction kiểm tra trùng; gặp xung đột phải đọc/kiểm tra lại. Khôi phục ảnh dùng công cụ server theo [tài liệu ảnh](07-image-upload.md), không hứa upload cả thư mục từ form JSON.

Nén/xem trước/progress/thử lại có trên web và Android. Cắt ảnh bằng công cụ native khi hỗ trợ; web chọn ảnh và nhận bản vuông qua xử lý, không hứa cùng hộp cắt native trên mọi nền tảng.

## Chất lượng giao diện và vận hành

- Web có thanh công cụ, bảng khi rộng/thẻ khi hẹp, trang chi tiết và form rõ ràng. Android dùng thẻ, nút chính dễ bấm, form cuộn tránh bàn phím và vùng an toàn.
- Tông xanh đậm/nền sáng, ảnh đại diện nổi bật; kiểu chữ/khoảng cách thống nhất theo theme đang có. UI/lỗi tiếng Việt, code tiếng Anh.
- Đủ đang tải/rỗng/không tìm thấy/lỗi có thử lại/thành công; chống lưu hai lần, xác nhận khi rời form đã sửa.
- Nhãn truy cập, focus bàn phím web, tương phản dễ đọc, vùng chạm tối thiểu 44 điểm. Tên/email dài và ảnh hỏng có xử lý; danh sách mobile ảo hóa.
- Làm mới khi vào lại màn hình hoặc bấm làm mới; sau ghi lấy lại dữ liệu server. Demo hai nền tảng có bước làm mới rõ, không tuyên bố realtime/offline.
- Kiểm thử web và Android thật/giả lập. Chỉ ghi đã kiểm thử iOS khi có kết quả chạy thật.

## Kiến trúc và giới hạn trước khi chốt

Firebase JS SDK cho Auth/Storage; Firestore lưu hồ sơ. API Node chạy trên Function riêng, xác minh token/claim admin; phần CRUD sẽ băm scrypt có salt. Client không đọc collection chứa hash. Xem [kiến trúc](03-kien-truc-va-du-lieu.md).

Web/API đã triển khai trên Hosting và Function riêng bằng HTTPS theo yêu cầu cloud. Emulator và API loopback vẫn dành cho kiểm thử. Dùng hồ sơ giả, không hứa Blaze luôn miễn phí; cấu hình hạn chế instance không phải trần tiền.

File `google-services.json` đã nhận đúng project nhưng dành cho hai package Android khác (`ecommercemultivendor`, `shoppingapp`). JS SDK dùng cấu hình web app phù hợp; không gắn file này hay đổi package theo app cũ. File này không phải credential máy chủ.

## Kiểm tra độ sẵn sàng

| Mục | Hiện tại và việc cần làm |
| --- | --- |
| Rà đề/nâng cao | Đã triển khai CRUD, ảnh Android và bốn nhóm nâng cao; theo dõi nghiệm thu ở tài liệu 05 |
| Skill | Tám skill nằm trong `.agents/skills/` của dự án |
| Storage | IAM và SDK admin upload/tải lại đã qua; rules riêng đã kiểm thử/deploy, không gia hạn wildcard cũ |
| Cloud trước triển khai | Kiểm tra rules/app cũ; thiết lập admin, credential server, cấu hình web app và rules riêng đã kiểm thử; không tự bật billing |
| Source | Đã sửa hydration hook, bỏ tab starter không dùng; lint/typecheck đã qua ở C1 |
| Word/minh chứng | Giữ hai ảnh cũ; chụp đủ bước, ghi chú ở từng checkpoint; ráp Word cuối bài |
| GitHub | Có remote; commit/push và xác minh mỗi checkpoint lớn theo tài liệu 05 |

## Ngoài phạm vi

Chat, AI, thông báo đẩy, nhiều cấp quyền, đăng nhập từng thành viên, nhật ký, thùng rác, offline và realtime. Những phần này tăng rủi ro hoặc cần dữ liệu vượt bốn trường. Ưu tiên đủ đề, nâng cao demo được và hoàn thiện.

Đang triển khai theo bản đã chốt; thay đổi cloud chỉ trong phạm vi của bài. Checkpoint và ảnh cần chụp ở [kế hoạch thực hiện](05-ke-hoach-va-bai-nop.md).
