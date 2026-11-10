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

Cần cả **bước làm, code và kết quả chạy**, không chỉ ảnh giao diện cuối. Hai ảnh bạn đã chụp là mẫu cho phần khởi tạo. Danh sách dưới đây theo dõi từng mốc. C1 đã có ảnh thật; các mốc C2–C6 vẫn chưa chụp.

Tên ảnh theo dạng `c2-01-schema-code.png`: checkpoint, số thứ tự, nội dung. Bản khoanh vùng thêm `-marked.png`. Số dưới đây dùng để chuẩn bị; khi có thêm bước quan trọng thì thêm ảnh, không ghi đè hoặc bỏ qua vì đã đủ số lượng. Chỉ đổi tên dự kiến khi chưa có ảnh và cập nhật chỉ mục cùng lúc.

Không đặt số lượng ảnh làm mục tiêu. Một ảnh có thể thể hiện cả lệnh và kết quả nếu vẫn rõ; bước dài thì chụp thêm. Lưu đủ bộ ảnh có ý nghĩa, cuối bài sắp vào Word theo từng phần, tránh lặp nhiều ảnh giống nhau.

### C1 — Môi trường, cấu hình và đăng nhập

| Ảnh dự kiến | Loại | Nội dung cần thấy | Tiêu chí | Trạng thái |
| --- | --- | --- | --- | --- |
| `c1-01-env-versions.png` | Bước làm | Terminal: phiên bản Node, pnpm, Expo CLI; Firebase CLI ghi riêng trong tài liệu 04 | R01, S02 | Đã chụp; có bản khoanh vùng |
| `c1-02-starter-errors.png` | Kiểm tra | Hai lỗi lint/typecheck ban đầu và lệnh thật | S01–S02 | Không có ảnh lúc lỗi ban đầu; ghi lỗi lịch sử ở tài liệu 04, không dựng lại |
| `c1-03-starter-fix-code.png` | Code | Đoạn sửa lỗi starter, khoanh đúng phần thay đổi | S01 | Đã chụp VS Code; hook hydration, bộ tab starter đã bỏ vì không dùng |
| `c1-04-starter-checks.png` | Kết quả | Chạy lại lint/typecheck sau sửa; lỗi còn thì ghi đúng | S01–S02 | Đã chụp; lint/typecheck và 2 test API qua |
| `c1-05-project-structure.png` | Bước làm | Cây thư mục app, component, service, API; giải thích vai trò ngắn | R01, S01 | Đã chụp Explorer/source thật trong VS Code |
| `c1-06-install-packages.png` | Bước làm | Lệnh Expo cài SDK/thư viện và kết quả thực tế | S02 | Không có ảnh lúc cài; dùng ảnh kiểm tra dependency hiện tại ở c1-22 |
| `c1-07-firebase-project-apps.png` | Bước làm | Chọn đúng project và kiểm tra app có sẵn trước khi cấu hình | R02, S01 | Kiểm tra project gộp ảnh Console c1-10 và config c1-08; không chụp dữ liệu app cũ |
| `c1-08-firebase-web-config.png` | Bước làm | Cấu hình web app dành cho bài; không dùng app Android cũ | R02, S01 | Đã chụp config web app riêng trong VS Code |
| `c1-09-firebase-init-code.png` | Code | Khởi tạo Firebase từ config, không chứa credential server | R02, S01 | Đã chụp VS Code |
| `c1-10-auth-provider.png` | Bước làm | Thiết lập phương thức đăng nhập admin trong Console | R05, S01 | Đã chụp, file thực tế .jpg; có bản khoanh vùng |
| `c1-11-admin-claim-code.png` | Code | Công cụ cấp claim admin đúng tài khoản demo; không chụp mật khẩu/token | R05, S01 | Đã chụp công cụ cấp claim, không mở credential |
| `c1-12-api-config.png` | Bước làm | Cấu hình mẫu API và địa chỉ kết nối, không mở file credential thật | S01–S02 | Đã chụp Function HTTPS và giới hạn instance |
| `c1-13-admin-guard-code.png` | Code | Server xác minh token và claim admin; chặn request thiếu quyền | R05 | Đã chụp lại bằng VS Code, có bản khoanh vùng |
| `c1-14-rules-before.png` | Bước làm | Kiểm tra rules hiện có, vùng dữ liệu dùng chung và rule Storage hết hạn | R02, S01 | Rule cũ hết hạn hiện trong c1-15; bản sao trước deploy giữ riêng, không đưa Git |
| `c1-15-rules-code.png` | Code | Rules giới hạn collection/prefix/quyền/loại ảnh/dung lượng của bài | R02, R05, R11 | Đã chụp hai file c1-15-firestore-rules-code và c1-15-storage-rules-code |
| `c1-16-emulators-running.png` | Bước làm | Lệnh khởi chạy Emulator và cổng dịch vụ đã lên | S02 | Đã chụp lệnh/cổng/ready, có bản khoanh vùng |
| `c1-17-auth-rules-tests.png` | Kiểm tra | Kết quả cho có/không token, không admin, sai prefix và quá dung lượng | R05, R09 | Đã chụp: 9/9, exit 0; PERMISSION_DENIED là nhánh cố ý thử bị chặn |
| `c1-18-admin-login.png` | Kết quả | Giao diện và kết quả đăng nhập đúng bằng tài khoản demo | R05 | Đã chụp cloud, file thực tế .jpg; tải lại giữ phiên |
| `c1-19-login-error.png` | Kết quả | Đăng nhập sai hiện lỗi dễ hiểu, không lộ credential | R05 | Đã chụp cloud, file thực tế .jpg; có bản khoanh vùng |
| `c1-20-access-denied.png` | Kết quả | Truy cập khi chưa đăng nhập/không admin bị chặn; logout không vào lại được | R05 | Đã chụp cloud sau logout, file thực tế .jpg; mở / bị đưa về /sign-in |

### Ghi chú ảnh C1 đã có

Ảnh chụp ngày 10/11/2026 trên laptop KDE, chỉ cửa sổ VS Code/Konsole bên trái hoặc riêng tab IAB 1280 × 720. Đã crop, kiểm tra credential/nội dung riêng; chưa đưa vào Word. Các ảnh code dưới đây cùng checkpoint commit `feat: establish secure cloud admin access` (tra SHA bằng `git log --all --grep` với tiêu đề này), sẽ dùng cùng ảnh chạy tương ứng. Ảnh chưa chụp lúc cài/lỗi cũ không được dựng lại.

| File ảnh | Nguồn/code và điều đã quan sát | Ảnh/kết quả liên quan |
| --- | --- | --- |
| [03 — Hook](screenshots/c1-03-starter-fix-code.png) | `src/hooks/use-color-scheme.web.ts`, `useColorScheme`: snapshot server/client | 04 kiểm tra; 18 web chạy |
| [04 — Checks](screenshots/c1-04-starter-checks.png) | Lệnh lint → tsc → pnpm test thật; 2/2, không bỏ qua lỗi trước | R01/S01–S02 |
| [05 — Source](screenshots/c1-05-project-structure.png) | `src/app`, `services`, `providers`, `server` tách rõ | R01/S01 |
| [08 — Web config](screenshots/c1-08-firebase-web-config.png) | `src/services/firebase-config.ts`, cấu hình public và chế độ cloud/emulator | 10 Auth; 18 phiên thật |
| [09 — Init](screenshots/c1-09-firebase-init-code.png) | `getFirebase` trong `src/services/firebase.ts`: khởi tạo/persistence/Emulator | 18–20 |
| [10 — Auth](screenshots/c1-10-auth-provider-marked.jpg) | Console đã Save, Email/Password Enabled; đúng project | 18–19 |
| [11 — Claim](screenshots/c1-11-admin-claim-code.png) | `scripts/grant-admin.mjs`: giữ claim cũ, chặn tài khoản bị khóa | 17 test JWT/disabled; biên nhận cloud |
| [12 — API cloud](screenshots/c1-12-api-config.png) | `server/cloud.mjs`, `memberdeskApi`, CORS origin và instance | 18; biên nhận cloud |
| [13 — Guard](screenshots/c1-13-admin-guard-code-marked.png) | `server/access.mjs`, `requireAdmin`: verify/revoked/admin | 04/17 và cloud 401/200 |
| [15 — Firestore](screenshots/c1-15-firestore-rules-code.png) | Deny collection bài; loại khỏi wildcard cũ; dữ liệu cũ vẫn có quyền như trước | 17; cloud query bị chặn |
| [15 — Storage](screenshots/c1-15-storage-rules-code.png) | Admin/prefix/UUID/JPEG/500 KiB/không ghi đè; wildcard hết hạn giữ nguyên | 17; SDK cloud upload/download |
| [16 — Emulator](screenshots/c1-16-emulators-running-marked.png) | `pnpm emulators`, ready và cổng; cảnh báo Java có thật | Tiền đề kiểm thử, không thay cloud |
| [17 — Rules](screenshots/c1-17-auth-rules-tests.png) | Lần chạy `pnpm test:firebase`, 9/9 và code 0; Emulator tự dừng | R05/R09 |
| [18 — Admin](screenshots/c1-18-admin-login.jpg) | Đăng nhập admin trên Hosting, API `/session` xác nhận quyền; tải lại vẫn còn | R05 |
| [19 — Sai mật khẩu](screenshots/c1-19-login-error-marked.jpg) | Nhập mật khẩu sai, lỗi tiếng Việt; không lộ mật khẩu/token | R05 |
| [21 — Hosting](screenshots/c1-21-hosting-site-marked.jpg), [domain](screenshots/c1-21-hosting-domains.jpg) | Console: site riêng và hai domain mặc định; crop bỏ email tài khoản | Web cloud ảnh 18–20 |
| [22 — Dependency](screenshots/c1-22-installed-packages.png) | Kiểm tra `package.json` sau cài, không phải ảnh lệnh cài ban đầu | Manifest/lockfile và export web |
| [20 — Guard UI](screenshots/c1-20-access-denied.jpg) | Đăng xuất rồi truy cập `/`, router đưa về `/sign-in` | R05 |

[Biên nhận cloud](evidence/cloud-access-check.json): admin Auth/API 200, thiếu token 401, Firestore deny, Storage SDK upload/download khớp, overwrite/guest bị chặn. Fixture mới đã dọn; chưa phải hồ sơ/ảnh mobile hoàn thành.

### C2 — Thêm, xem và lưu dữ liệu trên web

| Ảnh dự kiến | Loại | Nội dung cần thấy | Tiêu chí | Trạng thái |
| --- | --- | --- | --- | --- |
| `c2-01-schema-code.png` | Code | Kiểm tra đúng bốn khóa, email, họ tên, mật khẩu và URL ảnh | R03, R11 | Chưa chụp |
| `c2-02-password-hash-code.png` | Code | Scrypt có salt ngẫu nhiên; không lưu mật khẩu thô | R03, R11 | Chưa chụp |
| `c2-03-create-api-code.png` | Code | API tạo hồ sơ, kiểm tra email trùng đồng thời ở server | R03 | Chưa chụp |
| `c2-04-profile-response-code.png` | Code | API danh sách/chi tiết bỏ hash khỏi dữ liệu trả về | R04 | Chưa chụp |
| `c2-05-member-form-code.png` | Code | Form và xử lý submit, hiện/ẩn mật khẩu, lỗi và chống bấm hai lần | R03–R04 | Chưa chụp |
| `c2-06-web-create-before.png` | Thao tác | Nhập đủ email/mật khẩu/họ tên/ảnh, xem trước khi lưu | R03–R04 | Chưa chụp |
| `c2-07-web-upload.png` | Thao tác | Ảnh đang upload và trạng thái lưu; không báo thành công sớm | R03 | Chưa chụp |
| `c2-08-web-list.png` | Kết quả | Danh sách vừa thêm có tên/email/ảnh | R04 | Chưa chụp |
| `c2-09-web-detail.png` | Kết quả | Chi tiết hồ sơ đã lưu, ảnh và trạng thái đã đặt mật khẩu | R04 | Chưa chụp |
| `c2-10-web-reload.png` | Kết quả | Tải lại trình duyệt, hồ sơ vẫn còn | R02–R04 | Chưa chụp |
| `c2-11-firestore-four-fields.png` | CSDL | Console hiển thị document đúng email, matkhau, hoten, hinhanh | R02, R11, S03 | Chưa chụp |
| `c2-12-storage-avatar.png` | CSDL | File ảnh demo đúng bucket/prefix, không lộ token tải | R02, S03 | Chưa chụp |
| `c2-13-duplicate-email.png` | Kiểm tra | Thêm email đã có bị từ chối, không tạo thêm document | R03 | Chưa chụp |
| `c2-14-invalid-schema.png` | Kiểm tra | Request thiếu/thừa trường bị server từ chối; dùng request demo không bí mật | R11 | Chưa chụp |

### C3 — Sửa, xóa và kiểm tra dữ liệu

| Ảnh dự kiến | Loại | Nội dung cần thấy | Tiêu chí | Trạng thái |
| --- | --- | --- | --- | --- |
| `c3-01-update-api-code.png` | Code | Cập nhật hồ sơ; mật khẩu trống thì giữ hash, nhập mới thì băm lại | R07 | Chưa chụp |
| `c3-02-email-transaction-code.png` | Code | Đổi email qua transaction, không mất hồ sơ hoặc ghi đè email cũ | R07 | Chưa chụp |
| `c3-03-delete-api-code.png` | Code | Kiểm tra quyền rồi xóa đúng document; xử lý ảnh được tham chiếu | R06 | Chưa chụp |
| `c3-04-delete-confirm-code.png` | Code | Hộp xác nhận đúng người và nhánh hủy không gửi lệnh xóa | R06 | Chưa chụp |
| `c3-05-edit-before.png` | Thao tác | Hồ sơ và form trước khi đổi tên/email/ảnh | R07 | Chưa chụp |
| `c3-06-edit-after.png` | Kết quả | Sau lưu/tải lại, UI và CSDL có thay đổi tương ứng | R07, S03 | Chưa chụp |
| `c3-07-edit-duplicate-email.png` | Kiểm tra | Đổi sang email trùng bị chặn, hồ sơ cũ còn nguyên | R07 | Chưa chụp |
| `c3-08-delete-cancel.png` | Thao tác | Mở xác nhận rồi hủy, hồ sơ không mất | R06 | Chưa chụp |
| `c3-09-delete-after.png` | Kết quả | Xác nhận xóa, tải lại danh sách và đối chiếu CSDL | R06, S03 | Chưa chụp |
| `c3-10-crud-tests.png` | Kiểm tra | Test transaction/email trùng/giữ mật khẩu và lỗi server | R06–R07, R11 | Chưa chụp |

### C4 — Chạy Android và xử lý ảnh

| Ảnh dự kiến | Loại | Nội dung cần thấy | Tiêu chí | Trạng thái |
| --- | --- | --- | --- | --- |
| `c4-01-mobile-config-code.png` | Code | Cấu hình app/quyền ảnh và API host dùng trên Android; chỉ chụp cấu hình mẫu | R09–R10, S01 | Chưa chụp |
| `c4-02-image-permission-code.png` | Code | Xin quyền, từ chối quyền và hủy thao tác | R09 | Chưa chụp |
| `c4-03-image-picker-code.png` | Code | Mở camera/thư viện, nhận ảnh từ thiết bị | R09 | Chưa chụp |
| `c4-04-image-resize-code.png` | Code | Xử lý JPEG vuông, kích thước/dung lượng; giữ ảnh xem trước | R08–R09 | Chưa chụp |
| `c4-05-image-upload-code.png` | Code | Object UUID, upload/tiến độ và lấy URL trước khi lưu hồ sơ | R08–R09 | Chưa chụp |
| `c4-06-image-save-cleanup-code.png` | Code | Giữ ảnh cũ khi lỗi, chỉ dọn file mới hoặc ảnh không còn tham chiếu | R09 | Chưa chụp |
| `c4-07-run-android.png` | Bước làm | ADB xác định thiết bị, lệnh mở Expo và kết quả trên emulator | R01, S02 | Chưa chụp |
| `c4-08-permission-state.png` | Thao tác | Hộp quyền và xử lý khi từ chối/hủy; form không mất | R09 | Chưa chụp |
| `c4-09-mobile-library.png` | Thao tác | Chọn ảnh trong thư viện thật | R09 | Chưa chụp |
| `c4-10-mobile-camera.png` | Thao tác | Mở camera, chụp và chấp nhận ảnh trong luồng thật | R09 | Chưa chụp |
| `c4-11-mobile-preview.png` | Thao tác | Ảnh sau xử lý, xem trước và dung lượng trước/sau | R08–R09 | Chưa chụp |
| `c4-12-mobile-upload.png` | Thao tác | Lưu ảnh, quan sát tiến độ và kết quả | R08–R09 | Chưa chụp |
| `c4-13-mobile-retry.png` | Kiểm tra | Mất mạng rồi thử lại; dữ liệu form/ảnh cũ còn nguyên | R08–R09 | Chưa chụp |
| `c4-14-mobile-profile.png` | Kết quả | Mở lại app/hồ sơ, thông tin và ảnh vẫn hiện | R10 | Chưa chụp |
| `c4-15-web-same-profile.png` | Kết quả | Làm mới web thấy đúng hồ sơ và ảnh vừa lưu trên Android | R02, R09–R10 | Chưa chụp |

### C5 — Chức năng nâng cao và khôi phục

| Ảnh dự kiến | Loại | Nội dung cần thấy | Tiêu chí | Trạng thái |
| --- | --- | --- | --- | --- |
| `c5-01-search-code.png` | Code | Chuẩn hóa dấu tiếng Việt, kết hợp lọc/sắp xếp và reset trang | R08 | Chưa chụp |
| `c5-02-search-filter-sort.png` | Thao tác | Tìm không dấu, chọn bộ lọc và thứ tự; kết quả khớp | R08 | Chưa chụp |
| `c5-03-pagination.png` | Kết quả | Đổi trang/đếm kết quả; trạng thái rỗng và giới hạn được báo rõ | R08 | Chưa chụp |
| `c5-04-json-validator-code.png` | Code | Kiểm tra toàn file JSON: bốn khóa, hash cho phép, URL, dung lượng | R08, R11 | Chưa chụp |
| `c5-05-json-import-code.png` | Code | Transaction import, kiểm tra lại server và bỏ qua email đã có | R08 | Chưa chụp |
| `c5-06-json-export-code.png` | Code | Export admin đúng bốn trường; không đi qua API hồ sơ thường | R08, S04 | Chưa chụp |
| `c5-07-json-export-file.png` | CSDL | File xuất thật mở trong editor, dùng hồ sơ giả; không phải JSON viết tay | R11, S04 | Chưa chụp |
| `c5-08-json-preview.png` | Thao tác | Chọn file, xem số hợp lệ/trùng/lỗi trước khi xác nhận | R08 | Chưa chụp |
| `c5-09-json-error.png` | Kiểm tra | File sai bị chặn, CSDL không bị ghi một phần | R08, R11 | Chưa chụp |
| `c5-10-json-import-result.png` | Kết quả | Xác nhận nhập file đúng; số thêm/bỏ qua khớp CSDL | R08, S03–S04 | Chưa chụp |
| `c5-11-restore-command.png` | Bước làm | Lệnh khôi phục gói JSON/ảnh ở Emulator hoặc collection thử được chọn | S02, S04 | Chưa chụp |
| `c5-12-restore-result.png` | Kết quả | Mở dữ liệu và ảnh sau khôi phục, kiểm tra đúng bốn trường | R11, S04 | Chưa chụp |
| `c5-13-member-card-code.png` | Code | Thẻ dùng hồ sơ đã lưu, bản in loại nút quản trị và mật khẩu | R08 | Chưa chụp |
| `c5-14-card-print.png` | Kết quả | Thẻ web và hộp xem trước bản in/PDF, chữ/ảnh đọc được | R08 | Chưa chụp |
| `c5-15-mobile-card.png` | Kết quả | Thẻ tương ứng trên Android, tên/email dài không vỡ bố cục | R08, R10 | Chưa chụp |

### C6 — Kiểm tra cuối và gói nộp

| Ảnh dự kiến | Loại | Nội dung cần thấy | Tiêu chí | Trạng thái |
| --- | --- | --- | --- | --- |
| `c6-01-clean-clone-install.png` | Bước làm | Clone sạch và cài theo README; không chụp auth Git/credential | S02, S05 | Chưa chụp |
| `c6-02-start-api-web.png` | Bước làm | Lệnh khởi động API/app và kết nối được; không lộ biến môi trường thật | S01–S02 | Chưa chụp |
| `c6-03-verification.png` | Kiểm tra | Lint/typecheck/test cuối và kết quả thực tế | S01–S02 | Chưa chụp |
| `c6-04-submission-files.png` | Kết quả | Thư mục nộp có Word, JSON thật, ảnh và hướng dẫn khôi phục | S01, S04 | Chưa chụp |
| `c6-05-github-checkpoints.png` | Kết quả | Lịch sử các checkpoint đã push, source/docs/ảnh truy cập được | S05 | Chưa chụp |
| `c6-06-video.png` | Kết quả | Video demo và quyền truy cập bằng cửa sổ không đăng nhập | S06 | Chưa chụp |
| `c6-07-final-cloud-schema.png` | CSDL | Kiểm tra cuối dữ liệu cloud và mọi object JSON đúng bốn khóa | R11, S03–S04 | Chưa chụp |

## Chụp các đoạn code quan trọng

Mở **source thật trong trình soạn thảo**, hiện tên file và số dòng. Chụp khoảng 15–35 dòng đủ đọc; đoạn dài thì chia ảnh. Không chụp nguyên file dài rồi thu nhỏ, không dựng ảnh code bằng công cụ vẽ. Có thể khoanh hàm/điều kiện cần giải thích, nhưng không che nhánh xử lý lỗi.

Ghi kèm đường dẫn file, tên hàm và commit chứa đoạn đó. Khi code thay đổi làm ảnh cũ sai, chụp lại và ghi rõ bản nào dùng trong báo cáo. Các dòng trong bảng là nội dung cần chứng minh, chưa phải tên file/hàm đã được tạo.

Ảnh code phải đi cùng kết quả thực thi: chẳng hạn ảnh kiểm tra email trùng đi cùng ảnh app từ chối trùng; ảnh upload đi cùng object Storage và hồ sơ mở lại được. Không coi việc chụp source là đã kiểm thử.

## Dùng công cụ theo công việc

- Terminal: lệnh cài, chạy app/API/Emulator, kiểm thử, Git và khôi phục dữ liệu. Chụp lệnh thật cùng output, không dựng lại terminal giả.
- Trình soạn thảo: cấu trúc thư mục, config mẫu và code đang dùng. Dùng cách sửa file phù hợp rồi mở đoạn liên quan để chụp; không cần gõ lại từng ký tự chỉ để tạo ảnh.
- Chrome hoặc web trong chat desktop: thao tác app web, Firebase Console và kiểm tra GitHub/video. Dùng trình duyệt đang kết nối được; không hứa mọi cửa sổ đều điều khiển được.
- Android/ADB: chọn đúng thiết bị, chạy và chụp các bước mobile. Agent Desktop dùng cho cửa sổ desktop phù hợp; tôn trọng hộp cấp quyền của hệ điều hành.

Chụp ngay trong lúc làm, ghi thời điểm và kết quả. Nếu một bước đã xong trước khi chụp, chỉ ghi kiểm tra lại cấu hình/code hiện có, không kể như vừa thực hiện lần đầu. Không đổi dữ liệu cloud hoặc chạy lại thao tác nguy hiểm chỉ để có ảnh.

## Cách ghi nhận mỗi ảnh

Có thể khoanh đỏ, đóng khung hoặc thêm mũi tên để chỉ lệnh, nút bấm hay kết quả, giống hai ảnh ban đầu. Đánh dấu ít, dễ nhìn, không che bằng chứng. Giữ ảnh gốc riêng; không sửa nội dung UI hoặc kết quả. Bản có đánh dấu thêm hậu tố `-marked.png`, ví dụ `c2-06-web-create-before-marked.png`.

Sau khi chụp: thêm link file thật, thời điểm/thiết bị hoặc trình duyệt, thao tác/lệnh, kết quả quan sát, mã yêu cầu và vị trí trong Word. Không dùng vị trí trang dự kiến; chỉ ghi trang sau render cuối. Nếu ảnh có bí mật/thông tin ngoài bài, chụp lại vùng phù hợp trước khi đưa vào Git.

Cuối bài ráp ảnh/ghi chú thành Word. Báo cáo phải có ảnh và giải thích ngắn, không chỉ dẫn người chấm sang thư mục ảnh. Chưa có JSON/video hoàn chỉnh; chỉ cập nhật thành đã có khi file thật và link mở được. File khóa Word và bản render QA không đưa Git.
