# Chỉ mục báo cáo và minh chứng

Cập nhật ngày 10/11/2026. Ảnh đề là tư liệu yêu cầu; ảnh chức năng chỉ được ghi đã có khi chụp ứng dụng chạy thật. Mỗi checkpoint chụp đủ bước, ghi chú ngắn, cập nhật chỉ mục rồi commit/push cùng source. Word cuối đã ráp và kiểm tra 36 trang; video sinh viên tự quay.

## Tư liệu hiện có

| Tư liệu | Nội dung đã xác minh | Phân loại |
| --- | --- | --- |
| [Word hiện tại](submition.docx) — ảnh thứ nhất | Lệnh tạo Expo SDK 58, kết quả cài dependency và thông báo tạo thành công | Ảnh do người thực hiện đã chuẩn bị, giữ nguyên |
| Word — ảnh thứ hai | Lệnh chạy Android, Metro và emulator hiển thị starter Expo | Bằng chứng chạy starter; chưa phải hồ sơ mobile |
| [Ảnh đề gốc](references/assignment-requirements.png) | Tiêu chí 8,0 + 1,5 + 0,5; bốn trường và các file/link phải nộp | Tư liệu tham chiếu, không phải chức năng hoàn thành |
| [JPEG chẩn đoán](evidence/storage-upload-check.jpg), [biên nhận](evidence/storage-upload-check.json) | Upload/tải lại khớp 2.108 byte bằng IAM quản trị | Bằng chứng kỹ thuật; không thay ảnh SDK/mobile |

Word giữ nguyên file của bạn và hai ảnh gốc. Không sao chép lại hai ảnh Word thành bộ ảnh mới để tránh nhầm đã chụp thêm. Không upload ảnh người dùng thật để thử Storage.

## Danh sách cần chụp trong quá trình làm

Cần cả **bước làm, code và kết quả chạy**, không chỉ ảnh giao diện cuối. Hai ảnh bạn đã chụp là mẫu cho phần khởi tạo. Danh sách dưới đây theo dõi từng mốc. C1–C6 có ảnh code, thao tác web/Android và khôi phục; các ảnh lịch sử còn thiếu vẫn ghi rõ dưới đây.

Tên ảnh theo dạng `c2-01-schema-code.png`: checkpoint, số thứ tự, nội dung. Bản khoanh vùng thêm `-marked.png`. Số dưới đây dùng để chuẩn bị; khi có thêm bước quan trọng thì thêm ảnh, không ghi đè hoặc bỏ qua vì đã đủ số lượng. Chỉ đổi tên dự kiến khi chưa có ảnh và cập nhật chỉ mục cùng lúc.

Không đặt số lượng ảnh làm mục tiêu. Một ảnh có thể thể hiện cả lệnh và kết quả nếu vẫn rõ; bước dài thì chụp thêm. Lưu đủ bộ ảnh có ý nghĩa, cuối bài sắp vào Word theo từng phần, tránh lặp nhiều ảnh giống nhau.

### C1 — Môi trường, cấu hình và đăng nhập

| Ảnh dự kiến | Loại | Nội dung cần thấy | Tiêu chí | Trạng thái |
| --- | --- | --- | --- | --- |
| `c1-01-env-versions-marked.png` | Bước làm | Terminal: phiên bản Node, pnpm, Expo CLI; Firebase CLI ghi riêng trong tài liệu 04 | R01, S02 | Đã chụp; có bản khoanh vùng |
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
| `c1-13-admin-guard-code-marked.png` | Code | Server xác minh token và claim admin; chặn request thiếu quyền | R05 | Đã chụp lại bằng VS Code, có bản khoanh vùng |
| `c1-14-rules-before.png` | Bước làm | Kiểm tra rules hiện có, vùng dữ liệu dùng chung và rule Storage hết hạn | R02, S01 | Rule cũ hết hạn hiện trong c1-15; bản sao trước deploy giữ riêng, không đưa Git |
| `c1-15-rules-code.png` | Code | Rules giới hạn collection/prefix/quyền/loại ảnh/dung lượng của bài | R02, R05, R11 | Đã chụp hai file c1-15-firestore-rules-code và c1-15-storage-rules-code |
| `c1-16-emulators-running-marked.png` | Bước làm | Lệnh khởi chạy Emulator và cổng dịch vụ đã lên | S02 | Đã chụp lệnh/cổng/ready, có bản khoanh vùng |
| `c1-17-auth-rules-tests.png` | Kiểm tra | Kết quả cho có/không token, không admin, sai prefix và quá dung lượng | R05, R09 | Đã chụp: 9/9, exit 0; PERMISSION_DENIED là nhánh cố ý thử bị chặn |
| `c1-18-admin-login.png` | Kết quả | Giao diện và kết quả đăng nhập đúng bằng tài khoản demo | R05 | Đã chụp cloud, file thực tế .jpg; tải lại giữ phiên |
| `c1-19-login-error.jpg` | Kết quả | Đăng nhập sai hiện lỗi dễ hiểu, không lộ credential | R05 | Đã chụp lại Chrome giao diện hiện tại, crop riêng form lỗi |
| `c1-20-access-denied.png` | Kết quả | Truy cập khi chưa đăng nhập/không admin bị chặn; logout không vào lại được | R05 | Đã chụp cloud sau logout, file thực tế .jpg; mở / bị đưa về /sign-in |

### Ghi chú ảnh C1 đã có

Ảnh chụp ngày 10/11/2026 trên laptop KDE, cửa sổ VS Code/Konsole bên trái hoặc tab trình duyệt. Các ảnh 08, 09 đã chụp lại từ VS Code sau khi tách key; ảnh 18 và 23 chụp Chrome 1675 × 882 rồi crop. Các ảnh IAB cũ còn dùng chỉ ghi đúng nguồn, sẽ thay khi chụp lại luồng tương ứng. Bản không đánh dấu bị trùng với bản `-marked` đã bỏ khỏi bộ nộp, giữ riêng trong `docs/private/raw/`. Hai ảnh Word gốc không đổi. Ảnh chưa có lúc cài/lỗi cũ không được dựng lại.

Code gốc ở commit `feat: establish secure cloud admin access`; ảnh 08/09/23 theo commit `fix: isolate MemberDesk client API keys`. Tra SHA bằng `git log --all --grep` theo tiêu đề. Lần sửa key được đối chiếu với ảnh đăng nhập Chrome 18 và biên nhận cloud mới.

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
| [19 — Sai mật khẩu](screenshots/c1-19-login-error.jpg) | Nhập mật khẩu sai, lỗi tiếng Việt; không lộ mật khẩu/token | R05 |
| [21 — Hosting](screenshots/c1-21-hosting-site-marked.jpg), [domain](screenshots/c1-21-hosting-domains.jpg) | Console: site riêng và hai domain mặc định; crop bỏ email tài khoản | Web cloud ảnh 18–20 |
| [22 — Dependency](screenshots/c1-22-installed-packages.png) | Kiểm tra `package.json` sau cài, không phải ảnh lệnh cài ban đầu | Manifest/lockfile và export web |
| [23 — Key riêng](screenshots/c1-23-memberdesk-api-keys.jpg) | Chrome: hai key MemberDesk có API restriction; web thêm referrer, không mở giá trị key | Biên nhận `api-key-restrictions.json`, cloud và ảnh 18 |
| [24 — Android](screenshots/c1-24-android-admin-session.png) | Pixel8_API36, Expo Go SDK 58, cùng source chạy qua Metro:8082/ADB reverse; đăng nhập admin cloud bằng key native mới | Chỉ xác nhận đăng nhập; chưa phải hồ sơ/camera C4 |
| [20 — Guard UI](screenshots/c1-20-access-denied.jpg) | Đăng xuất rồi truy cập `/`, router đưa về `/sign-in` | R05 |

[Biên nhận cloud](evidence/cloud-access-check.json): admin Auth/API 200, thiếu token 401, Firestore deny, Storage SDK upload/download khớp, overwrite/guest bị chặn. Fixture mới đã dọn; chưa phải hồ sơ/ảnh mobile hoàn thành.

### C2 — Thêm, xem và lưu dữ liệu trên web

| Ảnh dự kiến | Loại | Nội dung cần thấy | Tiêu chí | Trạng thái |
| --- | --- | --- | --- | --- |
| `c2-01-schema-code.png` | Code | Kiểm tra đúng bốn khóa, email, họ tên, mật khẩu và URL ảnh | R03, R11 | Đã chụp VS Code: validateMember, đúng bốn khóa và giới hạn chuỗi |
| `c2-02-password-hash-code.png` | Code | Scrypt có salt ngẫu nhiên; không lưu mật khẩu thô | R03, R11 | Crop từ cùng ảnh VS Code: hashPassword/profile; tên file và đoạn đối chiếu trong ghi chú C2 |
| `c2-03-member-store-code.png` | Code | API thêm, đọc và chặn email trùng | R03–R04 | Đã chụp VS Code: list/get/create, khóa dọn và transaction |
| `c2-04-profile-response-code.png` | Code | API danh sách/chi tiết bỏ hash khỏi dữ liệu trả về | R04 | Gộp vào ảnh 03 và hàm profile ở ảnh 02; tránh ảnh trùng |
| `c2-05-member-form-code.png` | Code | Chọn ảnh, submit, kiểm tra và chống bấm hai lần | R03–R04 | Đã chụp VS Code: choose/save của MemberForm |
| `c2-06-web-create-before.jpg` | Thao tác | Nhập đủ email/mật khẩu/họ tên/ảnh, xem trước khi lưu | R03–R04 | Đã chụp lại Chrome sau góp ý: Lê Bảo Trân, ảnh áo dài, 45 KB, mật khẩu che |
| `c2-07-web-upload.png` | Thao tác | Ảnh đang upload và trạng thái lưu; không báo thành công sớm | R03 | Chưa chụp |
| `c2-08-web-list.jpg` | Kết quả | Danh sách vừa thêm có tên/email/ảnh | R04 | Đã chụp Chrome sau làm mới; ba hồ sơ giả từ web và Android |
| `c2-09-web-detail.png` | Kết quả | Chi tiết hồ sơ đã lưu, ảnh và trạng thái đã đặt mật khẩu | R04 | Gộp vào ảnh 10 sau tải lại để tránh trùng |
| `c2-10-web-detail-reloaded.jpg` | Kết quả | Tải lại trình duyệt, hồ sơ vẫn còn | R02–R04 | Đã chụp lại Chrome: Nguyễn Minh Anh, ảnh chân dung, nút sửa/xóa mới |
| `c2-11-firestore-four-fields-marked.jpg` | CSDL | Console hiển thị document đúng email, matkhau, hoten, hinhanh | R02, R11, S03 | Đã chụp Chrome Console; bốn trường, URL và hash bị rút gọn sẵn trong Console |
| `c2-12-storage-avatar.jpg` | CSDL | File ảnh demo đúng bucket/prefix, không lộ token tải | R02, S03 | Đã chụp Chrome Console: đúng prefix, ba object JPEG; không mở download token |
| `c2-13-duplicate-email.jpg` | Kiểm tra | Thêm email đã có bị từ chối, không tạo thêm document | R03 | Đã chụp Chrome: server từ chối email trùng, form còn nguyên |
| `c2-14-invalid-schema.png` | Kiểm tra | Request thiếu/thừa trường bị server từ chối; dùng request demo không bí mật | R11 | Test schema/API đã qua; chưa có ảnh terminal |

### Ghi chú C2 ngày 10/11/2026

Chrome đã thêm hồ sơ có ảnh chân dung và từ chối email trùng. Firestore lưu đúng bốn trường; API chỉ trả trạng thái có mật khẩu. Android đã chọn/cắt ảnh rồi lưu lên cùng cloud sau khi sửa lỗi Blob. Xem lỗi và cách sửa thật ở tài liệu 07.

Ảnh 01 và 02 lấy từ VS Code, `server/member-validation.mjs`: `validateMember`, `hashPassword`, `profile`. Đối chiếu với test schema/salt và ảnh Console 11, form 06, hồ sơ 10. Source ở commit `feat: add persistent member creation and profiles`. Đã bổ sung ảnh code API/form ở mốc C4; ảnh terminal và tiến độ web còn thiếu, chưa coi bộ minh chứng C2 là hoàn tất. Một ảnh bắt nhầm cửa sổ khi đổi focus đã loại khỏi bộ nộp; tạm ngừng chuyển focus trong lúc người dùng đang làm việc.

`pnpm test`: 6/6; `pnpm test:firebase`: 13/13, exit 0. Có kiểm tra tạo trùng đồng thời, giới hạn 200, JPEG giả/quá kích thước, Auth và rules. Android export, lint và TypeScript đã qua. Log đầy đủ giữ riêng, không đưa Git. Word và hai ảnh khởi tạo chưa sửa.

Tên và email là dữ liệu minh họa; nguồn ảnh ở `demo-assets/README.md`. Theo yêu cầu mới sẽ seed khoảng 36 hồ sơ ở C5 để thử tìm/lọc/sắp xếp/phân trang, có cả ảnh người, cảnh Việt Nam và hồ sơ thiếu ảnh.

### C3 — Sửa, xóa và kiểm tra dữ liệu

| Ảnh dự kiến | Loại | Nội dung cần thấy | Tiêu chí | Trạng thái |
| --- | --- | --- | --- | --- |
| `c3-01-update-delete-code.png` | Code | Cập nhật, giữ/đặt mật khẩu, transaction đổi email và xóa | R06–R07 | Đã chụp VS Code: update/remove và khóa dọn ảnh |
| `c3-02-email-transaction-code.png` | Code | Transaction đổi email | R07 | Gộp vào ảnh 01, thấy đủ kiểm tra đích và set/delete nguyên tử |
| `c3-03-delete-api-code.png` | Code | Xóa đúng document và bảo vệ ảnh tham chiếu | R06 | Gộp remove vào ảnh 01; ảnh dùng chung được giữ, dọn riêng ở C4 |
| `c3-04-delete-confirm-code.png` | Code | Xóa qua API, chỉ về danh sách khi server thành công | R06 | Đã chụp VS Code: MemberScreen.remove; ảnh hộp xác nhận riêng ở 09 |
| `c3-05-edit-before.jpg` | Thao tác | Form đổi tên/email/ảnh trước khi lưu | R07 | Đã chụp Chrome: Nguyễn Văn Rin, rin@example.com, ảnh mới, mật khẩu trống |
| `c3-06-edit-after.jpg` | Kết quả | Sau lưu/tải lại, UI và CSDL có thay đổi tương ứng | R07, S03 | Đã chụp Chrome sau tải lại; kiểm tra riêng hash không đổi |
| `c3-07-edit-duplicate-email.jpg` | Kiểm tra | Đổi sang email trùng bị chặn, hồ sơ cũ còn nguyên | R07 | Đã chụp lỗi baotran@example.com; server trả 409 |
| `c3-08-delete-cancel.jpg` | Thao tác | Mở xác nhận rồi hủy, hồ sơ không mất | R06 | Đã chụp hộp có đúng tên/email; Hủy rồi tải lại còn hồ sơ |
| `c3-09-delete-confirm.jpg`, `c3-09-delete-after.jpg` | Kết quả | Xác nhận xóa, tải lại và tìm không còn hồ sơ | R06, S03 | Đã chụp Chrome với import.preview@example.com; Firestore xác minh document không còn, 36 hồ sơ khác giữ nguyên |
| `c3-10-crud-tests.png` | Kiểm tra | Test transaction/email trùng/giữ mật khẩu và lỗi server | R06–R07, R11 | Chưa chụp |
| `c3-11-unsaved-cancel.jpg` | Thao tác | Rời form đã sửa rồi chọn Hủy | R07 | Đã chụp Chrome; nội dung và ảnh chọn được giữ để lưu tiếp |

### Ghi chú C3 ngày 10/11/2026

Đã deploy PATCH/DELETE và giao diện sửa/xóa lên Function/site MemberDesk. Đổi email dùng transaction; mật khẩu trống giữ hash mới nhất, có nhập mới thì băm lại. Chrome đã sửa tên/email/ảnh thành Nguyễn Văn Rin, tải lại còn đúng dữ liệu; email trùng bị chặn. Hủy xóa và hủy rời form không làm mất hồ sơ/nội dung.

`pnpm test`: 6/6; Firebase Emulator: 15/15; lint, TypeScript và export web đều qua. `MEMBERDESK_ENV=cloud node scripts/check-crud-cloud.mjs` kiểm tra API cloud thật: tạo, đổi email, giữ/đặt lại mật khẩu, chặn trùng, xóa, GET sau xóa 404. Hồ sơ thử của script đã dọn. Biên nhận không chứa hash/token: [CRUD API](evidence/cloud-crud-api-check.json), [đối chiếu hồ sơ đã sửa](evidence/cloud-crud-check.json). Đã bổ sung ảnh code update/remove ở C4. Đã bổ sung ảnh hộp xác nhận và kết quả tìm không còn hồ sơ nhập thử sau tải lại; Admin SDK xác minh document không còn. Code remove hiện có trong ảnh 04. Còn ảnh Console sau xóa và terminal; chưa đánh dấu đủ minh chứng C3.

Ảnh Chrome 05–08, 11 dùng source ở commit `feat: complete member editing and deletion`. Ảnh 05/11 đối chiếu `MemberForm`; ảnh 06/07 đối chiếu `createMemberStore.update`; ảnh 08 đối chiếu `MemberScreen`/`ConfirmDialog`. Đã thay ảnh C2 06/08/10/13 sau góp ý giao diện và dữ liệu. Bản cũ không giữ trong bộ nộp; bản chụp thô ở vùng riêng. Hai ảnh gốc trong Word giữ nguyên.

### C4 — Chạy Android và xử lý ảnh

| Ảnh dự kiến | Loại | Nội dung cần thấy | Tiêu chí | Trạng thái |
| --- | --- | --- | --- | --- |
| `c4-01-mobile-config-code.png` | Code | Cấu hình app/quyền ảnh và API host dùng trên Android; chỉ chụp cấu hình mẫu | R09–R10, S01 | Chưa chụp |
| `c4-02-image-picker-resize-code.png` | Code | Xin quyền, chọn/cắt/nén ảnh và hủy | R08–R09 | Đã chụp VS Code: pickAvatar, giới hạn ảnh và JPEG |
| `c4-03-image-picker-code.png` | Code | Mở camera/thư viện, nhận ảnh từ thiết bị | R09 | Gộp vào ảnh 02 |
| `c4-04-image-resize-code.png` | Code | Xử lý JPEG vuông và giới hạn dung lượng | R08–R09 | Gộp vào ảnh 02 |
| `c4-05-image-upload-code.png` | Code | Object UUID, Blob, tiến độ, timeout và lấy URL | R08–R09 | Đã chụp VS Code: uploadAvatar, đối chiếu Blob.size |
| `c4-06-image-cleanup-code.png` | Code | Dọn riêng ảnh không còn tham chiếu, bảo vệ file mới | R09 | Đã chụp VS Code: cleanupAvatars; khóa ghi và generation |
| `c4-07-run-android.png` | Bước làm | ADB xác định thiết bị, lệnh mở Expo và kết quả trên emulator | R01, S02 | Chưa chụp |
| `c4-08-permission-state-marked.png`, `c4-08-camera-denied.png` | Thao tác | Từ chối camera và giữ form | R09 | Đã chụp ADB; chỉ ảnh hộp quyền có mũi tên đỏ |
| `c4-09-mobile-library.png`, `c4-10-mobile-crop.png` | Thao tác | Thư viện và cắt vuông | R09 | Đã chụp lại ADB bằng hai ảnh chân dung; bỏ ảnh MA cũ |
| `c4-10-mobile-camera.png` | Thao tác | Mở camera và chụp | R09 | Đã chụp ADB; camera ảo của emulator, không phải webcam laptop |
| `c4-11-mobile-preview.png` | Thao tác | Xem trước sau chọn/cắt/nén | R08–R09 | Đã chụp lại: Nguyễn Minh Anh, ảnh chân dung, 46 KB |
| `c4-12-mobile-upload.png` | Thao tác | Tiến độ upload, khóa bấm lưu | R08–R09 | Đã chụp trạng thái 0% lúc thử mất mạng; kết quả thử lại ở ảnh 14 |
| `c4-13-mobile-retry.png` | Kiểm tra | Mất mạng giữ dữ liệu và cho thử lại | R08–R09 | Đã chụp lỗi sau timeout 60 giây; bật mạng và lưu lại thành công |
| `c4-14-mobile-profile.png` | Kết quả | Mở lại app/hồ sơ, thông tin và ảnh vẫn hiện | R10 | Đã chụp lại sau force-stop/mở Expo Go; giữ phiên và ảnh chân dung |
| `c4-15-web-same-profile.jpg` | Kết quả | Web thấy ảnh vừa lưu trên Android | R02, R09–R10 | Đã chụp Chrome sau tải lại |

### Ghi chú C4 ngày 10/11/2026

Thiết bị `emulator-5554`, Pixel8_API36, Expo Go SDK 58; Metro cổng 8082 qua ADB reverse. Đã chọn/cắt ảnh chân dung, xem trước, thử upload mất mạng, bật mạng rồi lưu lại; force-stop/mở app vẫn giữ phiên và ảnh. Đã từ chối camera, cho quyền lại, chụp/cắt/lưu ảnh camera ảo và làm mới Chrome thấy cùng ảnh. Sau kiểm tra đã đổi hồ sơ về ảnh chân dung; hủy camera không đổi ảnh cũ.

Ảnh bổ sung: `c4-16-camera-preview.png`, `c4-17-camera-profile.png`, `c4-18-web-camera-profile.jpg` ghi đúng bước thử camera; `c4-19-cleanup-rules-code.png` là rules chặn khóa nội bộ. Ảnh camera có họa tiết của camera ảo Android, không gọi là ảnh người/cảnh Việt Nam. Bộ ảnh MA cũ đã bỏ khỏi bản nộp. Mọi ảnh code lấy trực tiếp từ VS Code bên trái sau khi người dùng tạm ngưng gõ; đã crop và soát không có chat/credential.

Code ảnh 02/05 là `src/services/avatars.ts`, `pickAvatar`/`uploadAvatar`; ảnh 06 là `server/image-cleanup.mjs`, `cleanupAvatars`; ảnh 19 là `firestore.rules`. `MemberForm.choose/save` ở ảnh C2-05; update/remove và chặn ghi khi dọn ở C3-01. Đối chiếu runtime ảnh 08–18, source theo commit `feat: verify mobile images and protect avatar cleanup`.

Emulator 16/16; lint/TypeScript và 6 test cơ bản qua. Rules/Function đã deploy riêng; kiểm tra SDK cloud vẫn chặn đọc collection/hash, khóa dọn, ghi đè và khách upload. Lệnh dọn cloud sau khi dừng upload đã xóa 6 file không tham chiếu, giữ 3 ảnh đang dùng và bỏ khóa; [biên nhận](evidence/cloud-avatar-cleanup.json). [Đối chiếu ảnh](evidence/mobile-image-cloud-check.json) kiểm tra mọi ảnh còn tham chiếu và JPEG Android 512 × 512 tải HTTPS được. Mặc định lệnh dọn vẫn giữ ảnh mới 24 giờ. Còn ảnh chạy Android/terminal, cấu hình mobile và một số kiểm tra form cần bổ sung; chưa đánh dấu đủ bộ minh chứng C4. Chưa thử iOS.

### C5 — Chức năng nâng cao và khôi phục

| Ảnh dự kiến | Loại | Nội dung cần thấy | Tiêu chí | Trạng thái |
| --- | --- | --- | --- | --- |
| `c5-01-search-code.png` | Code | Chuẩn hóa dấu tiếng Việt, kết hợp lọc/sắp xếp và reset trang | R08 | Đã chụp VS Code: normalizeSearch/selectMembers, không dấu và phân trang 10 |
| `c5-02-search-filter-sort.png` | Thao tác | Tìm không dấu, chọn bộ lọc và thứ tự; kết quả khớp | R08 | Đã chụp Chrome, file .jpg: nguyen + Có ảnh + Email Z–A, 4 kết quả |
| `c5-03-pagination.png` | Kết quả | Đổi trang/đếm kết quả; trạng thái rỗng và giới hạn được báo rõ | R08 | Đã chụp Chrome, file .jpg: trang 4/4 có 6 hồ sơ; ảnh search-empty riêng |
| `c5-04-json-validator-code.png` | Code | Kiểm tra toàn file JSON: bốn khóa, hash cho phép, URL, dung lượng | R08, R11 | Đã chụp VS Code: inspectImport, schema/hash/ảnh/email trùng |
| `c5-05-json-import-code.png` | Code | Transaction import, kiểm tra lại server và bỏ qua email đã có | R08 | Đã chụp VS Code: exportJson/previewImport/importJson, khóa và transaction |
| `c5-06-json-export-code.png` | Code | Export admin đúng bốn trường; không đi qua API hồ sơ thường | R08, S04 | Đã chụp lại VS Code member-files.ts sau sửa Android/await ghi file; exportJson ở ảnh 05, tải thật ở json-export-result.jpg |
| `c5-07-json-export-file.png` | CSDL | File xuất thật mở trong editor, dùng hồ sơ giả; không phải JSON viết tay | R11, S04 | Chưa chụp |
| `c5-08-json-preview.png` | Thao tác | Chọn file, xem số hợp lệ/trùng/lỗi trước khi xác nhận | R08 | Đã chụp Chrome, file .jpg: 1 mới, 1 đã có, 0 lỗi |
| `c5-09-json-error-marked.jpg` | Kiểm tra | File sai bị chặn, CSDL không bị ghi một phần | R08, R11 | Đã chụp Chrome, file .jpg: 1 hợp lệ/1 lỗi thừa trường, nút nhập khóa |
| `c5-10-json-import-result.png` | Kết quả | Xác nhận nhập file đúng; số thêm/bỏ qua khớp CSDL | R08, S03–S04 | Đã chụp Chrome, file .jpg: thêm 1/bỏ qua 1; đối chiếu Firestore; sau đó xóa fixture qua UI |
| `c5-11-restore-command.png` | Bước làm | Lệnh khôi phục gói JSON/ảnh ở Emulator hoặc collection thử được chọn | S02, S04 | Chưa chụp |
| `c5-12-restore-result.png` | Kết quả | Mở dữ liệu và ảnh sau khôi phục, kiểm tra đúng bốn trường | R11, S04 | Đã có ở C6-04/C6-05, không lưu bản trùng |
| `c5-13-member-card-code.png` | Code | Thẻ dùng hồ sơ đã lưu, bản in loại nút quản trị và mật khẩu | R08 | Đã chụp lại VS Code sau khi dùng MemberAvatar; khớp thẻ web/Android |
| `c5-14-card-print.png` | Kết quả | Thẻ web và hộp xem trước bản in/PDF, chữ/ảnh đọc được | R08 | Có ảnh thẻ Chrome và render PDF A4 bằng Chromium chạy nền; chưa có ảnh hộp in native |
| `c5-15-mobile-card.png` | Kết quả | Thẻ tương ứng trên Android, tên/email dài không vỡ bố cục | R08, R10 | Đã chụp ADB Pixel8_API36: Nguyễn Văn Rin, cùng ảnh/tên/email |

### Ghi chú C5 ngày 10/11/2026

Đã seed 33 hồ sơ mới bằng API nhập, giữ ba hồ sơ cũ: tổng 36, 25 có ảnh/11 không ảnh. Tên giả Việt Nam gồm Nguyễn Văn Rin; ảnh chân dung/áo dài và Hội An có nguồn ở demo-assets. Trên Chrome đã chuyển bốn trang, trang cuối sáu hồ sơ; tìm không dấu kết hợp lọc/sắp xếp, thử không kết quả. Android cho cùng bốn kết quả với `nguyen`/Có ảnh/Email Z–A; ảnh `c5-16-mobile-search.png`.

JSON Chrome: file thừa trường bị khóa nhập, file đúng preview 1 mới/1 đã có rồi thêm 1/bỏ qua 1. Nút xuất tạo file tải xuống 37 hồ sơ đúng bốn trường; đối chiếu toàn bộ với Firestore. Sau khi xác nhận đã xóa đúng hồ sơ thử qua UI, tải lại tìm không còn, CSDL về 36 hồ sơ. [Biên nhận](evidence/cloud-json-ui-check.json). Chrome download event không báo dù file đã lưu trong Downloads; kiểm tra file thật thay vì nhấn tải lặp.

Bản PDF [Nguyễn Văn Rin](evidence/member-rin-card.pdf) được tạo từ trang cloud bằng Chromium chạy nền, CSS media print: một trang A4, ảnh/tên/email, không nút/ID/hash. Đã render và đọc text PDF; không gọi đây là ảnh hộp in Chrome native. Thẻ Android có cùng dữ liệu.

Gói [database](database/README.md) xuất thật 36 hồ sơ/6 ảnh, bản portable và checksum. Lệnh restore chạy bằng Firebase Emulator đã thêm 36/bỏ qua 0, kiểm tra schema và nội dung ảnh; ảnh giao diện khôi phục đã có ở C6. Công cụ chỉ cho restore vào demo-memberdesk, không ghi đè cloud.

Kiểm tra C5: lint/TypeScript qua; 8 test cơ bản và 18 test Firebase qua. Có cảnh báo Java Unsafe từ Storage Emulator và Node listener warning của môi trường, không có test fail. Web và Android production export đã qua trước seed; Function/site C5 deploy thành công. Code ảnh theo commit `feat: deliver advanced member tools`; ảnh tìm ↔ selectMembers, JSON ↔ inspectImport/importJson, thẻ ↔ MemberCard/CSS in. Android từng lỗi READ với cache DocumentPicker; sửa dùng File.pickFileAsync (SDK 58) và URI được cấp quyền, đọc lại thành công. Đã mở share sheet users.json rồi hủy; không gửi qua Drive/Gmail. Ảnh 17 ghi lỗi thật, 18 kết quả sau sửa, 19 share sheet. Đã thêm await ghi file trước khi chia sẻ. Đã chụp lại code file/thẻ và giao diện khôi phục ở C6. Không có ảnh riêng mở JSON trong editor; file thật và biên nhận kiểm tra đi kèm. Word đã ráp; video sinh viên tự quay.

### C6 — Kiểm tra cuối và gói nộp

| File thật | Nội dung đã kiểm tra | Tiêu chí | Trang Word |
| --- | --- | --- | --- |
| [Backup](screenshots/c6-01-backup-code.png) | VS Code `scripts/member-backup.mjs`, exportBackup/restoreBackup; đối chiếu khôi phục bên dưới | S01, S04 | 32 |
| [Kiểu Expo](screenshots/c6-02-clean-type-config.png) | VS Code `tsconfig.json`, thêm expo/types sau lỗi clone sạch | S01, S05 | Giải thích ở 33 |
| [Kiểm tra clone](screenshots/c6-03-clean-checks.png) | Terminal thật: lint, tsc, 8 test; config theo bản sửa C6 | S02, S05 | 33 |
| [Danh sách khôi phục](screenshots/c6-04-restored-list.jpg) | Chrome Emulator từ clone sạch: 36 hồ sơ, 4 trang | S04, S05 | 34 |
| [Hồ sơ khôi phục](screenshots/c6-05-restored-profile.jpg) | Nguyễn Văn Rin và ảnh từ gói portable | R10, S04 | 34 |

C6 kiểm tra clone public ở commit `6ee9d10` kèm bản sửa `tsconfig.json` được đưa vào checkpoint cuối. Lần đầu TypeScript thiếu kiểu CSS do chưa sinh expo-env.d.ts; khai báo expo/types trực tiếp giúp clone sạch kiểm tra được trước khi chạy Expo. Không bỏ hoặc tắt kiểm tra. [Biên nhận clone](evidence/clean-clone-check.json) ghi rõ base commit/bản sửa, install, 8 test cơ bản, 18 Firebase, web export và khôi phục. Android export ở repo chính cũng qua.

[Đối chiếu cloud cuối](evidence/final-cloud-data-check.json): 36 document đúng bốn khóa, khớp toàn bộ users.json; hồ sơ quay thử đã dọn. Ảnh Console bốn trường dùng C2-11; không tạo ảnh mới trùng nội dung. Một số ảnh terminal cài ban đầu/restore và lịch sử GitHub chưa chụp riêng; kết quả thật có biên nhận và lịch sử Git, không dựng lại.

### Báo cáo cuối và video

[Báo cáo Word](submition.docx): **Nguyễn Văn Rin — 23IT231 — Phát triển ứng dụng di động đa nền tảng (5)**. Times New Roman, body 13 pt; tiêu đề và chú thích hình không đánh số. Giữ nguyên nội dung khởi tạo và hai ảnh gốc, đối chiếu byte ảnh. Đã render và xem đủ 36 trang; bản render QA giữ riêng.

| Trang sau render | Nội dung |
| --- | --- |
| 1–4 | Thông tin sinh viên, yêu cầu, hai ảnh khởi tạo gốc |
| 5–10 | Công cụ, cấu trúc, đăng nhập/quyền, Storage và schema |
| 11–16 | Code và thao tác thêm, xem, sửa, xóa |
| 17–22 | Chọn/chụp/cắt/nén/upload, mất mạng/thử lại và web cùng dữ liệu |
| 23–31 | Tra cứu/phân trang, nhập/xuất JSON, thẻ và PDF |
| 32–36 | Backup, clone sạch/khôi phục, kiểm thử/giới hạn và cách chạy |

Video chưa có link: sinh viên tự quay theo [checklist và phím quay](../08-kich-ban-video.md). S06 còn chờ bổ sung; không đưa bản quay thử tự động vào bài nộp.

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

Cuối bài ráp ảnh/ghi chú thành Word. Báo cáo phải có ảnh và giải thích ngắn, không chỉ dẫn người chấm sang thư mục ảnh. JSON/ảnh đã có và khôi phục được; video chờ sinh viên quay và bổ sung link. File khóa Word và bản render QA không đưa Git.
