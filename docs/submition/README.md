# Chỉ mục báo cáo và minh chứng

Cập nhật ngày 10/11/2026. Ảnh đề là tư liệu yêu cầu; ảnh chức năng chỉ được ghi đã có khi chụp ứng dụng chạy thật. Mỗi checkpoint chụp đủ bước, ghi chú ngắn, cập nhật chỉ mục rồi commit/push cùng source. Cuối bài mới ráp Word.

## Tư liệu hiện có

| Tư liệu | Nội dung đã xác minh | Phân loại |
| --- | --- | --- |
| [Word hiện tại](submition.docx) — ảnh thứ nhất | Lệnh tạo Expo SDK 58, kết quả cài dependency và thông báo tạo thành công | Ảnh do người thực hiện đã chuẩn bị, giữ nguyên |
| Word — ảnh thứ hai | Lệnh chạy Android, Metro và emulator hiển thị starter Expo | Bằng chứng chạy starter; chưa phải hồ sơ mobile |
| [Ảnh đề gốc](references/assignment-requirements.png) | Tiêu chí 8,0 + 1,5 + 0,5; bốn trường và các file/link phải nộp | Tư liệu tham chiếu, không phải chức năng hoàn thành |
| [JPEG chẩn đoán](evidence/storage-upload-check.jpg), [biên nhận](evidence/storage-upload-check.json) | Upload/tải lại khớp 2.108 byte bằng IAM quản trị | Bằng chứng kỹ thuật; không thay ảnh SDK/mobile |

Word giữ nguyên file của bạn và hai ảnh gốc. Không sao chép lại hai ảnh Word thành bộ ảnh mới để tránh nhầm đã chụp thêm. Không upload ảnh người dùng thật để thử Storage.

## Danh sách cần chụp trong quá trình làm

Tên ảnh theo dạng `c2-01-web-create.png`: mốc, số thứ tự, nội dung. Chụp thêm bước thì thêm số tiếp theo, không ghi đè ảnh trước. Tên dưới đây là dự kiến, **chưa phải file/ảnh đã tồn tại**. Với cặp trước/sau, dùng hậu tố `before`, `after`, `cancel` khi chụp. Chú thích phải phản ánh kết quả thật, không chép nguyên kết quả dự kiến nếu thao tác lỗi.

| Mốc | Tên ảnh dự kiến | Chú thích và điều cần nhìn rõ | Tiêu chí | Trạng thái |
| --- | --- | --- | --- | --- |
| C1 | `c1-01-install-commands.png` | Lệnh cài và phiên bản thư viện thực dùng, không có credential | S02 | Chưa chụp |
| C1 | `c1-02-admin-login.png`, `c1-03-login-error.png` | Đăng nhập đúng/sai; lỗi tiếng Việt; không lộ mật khẩu | R05 | Chưa chụp |
| C1 | `c1-04-access-denied.png` | Chưa đăng nhập/không admin không vào được nghiệp vụ | R05 | Chưa chụp |
| C2 | `c2-01-web-create.png` | Form đủ email/mật khẩu/họ tên/ảnh trước lưu, dùng dữ liệu giả | R03–R04 | Chưa chụp |
| C2 | `c2-02-web-list.png`, `c2-03-web-detail.png` | Hồ sơ tồn tại sau tải lại, cùng ảnh đã lưu | R03–R04 | Chưa chụp |
| C2 | `c2-04-firestore-four-fields.png` | Project/collection/doc thật với đúng bốn trường | R02, R11, S03 | Chưa chụp |
| C2 | `c2-05-storage-avatar.png` | Object ảnh demo đúng bucket/prefix, không chụp token | R02, S03 | Chưa chụp |
| C2 | `c2-06-validation-error.png` | Email trùng/dữ liệu sai bị từ chối, không báo lưu thành công | R03 | Chưa chụp |
| C3 | `c3-01-edit-before.png`, `c3-02-edit-after.png` | Sửa email/tên/ảnh và kết quả sau tải lại | R07 | Chưa chụp |
| C3 | `c3-03-delete-cancel.png`, `c3-04-delete-after.png` | Hủy giữ hồ sơ; xác nhận xóa rồi tải lại mất hồ sơ | R06 | Chưa chụp |
| C4 | `c4-01-mobile-camera.png`, `c4-02-mobile-library.png` | Chọn/chụp trong luồng thật trên thiết bị Android | R09 | Chưa chụp |
| C4 | `c4-03-mobile-upload.png`, `c4-04-mobile-retry.png` | Ảnh xem trước/progress; mất mạng rồi thử lại không mất form | R08–R09 | Chưa chụp |
| C4 | `c4-05-mobile-profile.png`, `c4-06-web-same-profile.png` | Mở lại Android và làm mới web thấy cùng hồ sơ/ảnh | R09–R10 | Chưa chụp |
| C5 | `c5-01-search-filter-sort.png`, `c5-02-pagination.png` | Tìm không dấu kết hợp lọc/sắp xếp và đổi trang đúng | R08 | Chưa chụp |
| C5 | `c5-03-json-preview.png`, `c5-04-json-error.png` | File đúng có xem trước; file sai không ghi, trùng không ghi đè | R08, S04 | Chưa chụp |
| C5 | `c5-05-restore-result.png` | Dữ liệu xuất/ảnh khôi phục được ở môi trường thử | S04 | Chưa chụp |
| C5 | `c5-06-member-card.png`, `c5-07-card-print.png` | Thẻ từ dữ liệu đã lưu và bản in/PDF không có mật khẩu | R08 | Chưa chụp |
| C6 | `c6-01-verification.png` | Lint/typecheck/kiểm thử thực tế sau hoàn thiện | S01–S02 | Chưa chụp |
| C6 | `c6-02-github-checkpoints.png`, `c6-03-video.png` | Lịch sử checkpoint và link demo truy cập được | S05–S06 | Chưa chụp |

## Cách ghi nhận mỗi ảnh

Có thể khoanh đỏ, đóng khung hoặc thêm mũi tên để chỉ lệnh, nút bấm hay kết quả, giống hai ảnh ban đầu. Đánh dấu ít, dễ nhìn, không che bằng chứng. Giữ ảnh gốc riêng; không sửa nội dung UI hoặc kết quả. Bản có đánh dấu thêm hậu tố `-marked.png`, ví dụ `c2-01-web-create-marked.png`.

Sau khi chụp: thêm link file thật, thời điểm/thiết bị hoặc trình duyệt, thao tác/lệnh, kết quả quan sát, mã yêu cầu và vị trí trong Word. Không dùng vị trí trang dự kiến; chỉ ghi trang sau render cuối. Nếu ảnh có bí mật/thông tin ngoài bài, chụp lại vùng phù hợp trước khi đưa vào Git.

Cuối bài ráp ảnh/ghi chú thành Word. Báo cáo phải có ảnh và giải thích ngắn, không chỉ dẫn người chấm sang thư mục ảnh. Chưa có JSON/video hoàn chỉnh; chỉ cập nhật thành đã có khi file thật và link mở được. File khóa Word và bản render QA không đưa Git.
