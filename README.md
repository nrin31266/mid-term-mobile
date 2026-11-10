# mid-term-mobile

MemberDesk — đồ án quản lý thành viên bằng Expo SDK 58 và Firebase. Đang làm C1–C6; hiện có đăng nhập admin và nền tảng cloud, chưa hoàn thành CRUD/mobile/gói nộp.

Web: https://memberdesk-801885728284.web.app · [Tài liệu](docs/README.md) · [Đối chiếu đề](docs/02-doi-chieu-de-bai.md) · [Minh chứng](docs/submition/README.md)

## Chạy với cloud

Cần Node 24, pnpm 11. App dùng config web public; không cần ADC hay key server khi kết nối API cloud.

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm exec expo start --web
# Hoặc mở Expo Go SDK 58 trên thiết bị để chạy mobile
pnpm exec expo start
```

Dùng tài khoản admin được cấp riêng. Không có mật khẩu mặc định trong Git. Máy đang triển khai có file ignored `docs/private/cloud-admin.json`; không chia sẻ/chụp file đó. Tài khoản thành viên được quản lý không phải tài khoản đăng nhập Firebase Auth.

## Thử bằng Emulator

Cần Java và Firebase CLI. Các lệnh chạy ở những terminal riêng:

```bash
pnpm emulators
pnpm seed:emulator
pnpm api:emulator
pnpm web:emulator
```

Credential demo sinh ngẫu nhiên ở `docs/private/emulator-admin.json`. Web Emulator dùng loopback; Android emulator cần host laptop `10.0.2.2` cho API và Firebase Emulator qua biến môi trường. Không trộn biến host Emulator vào cloud.

## Kiểm tra và triển khai

```bash
pnpm exec expo lint
pnpm exec tsc --noEmit
pnpm test
# Tắt Emulator đang chạy trước khi dùng emulators:exec
pnpm test:firebase
pnpm build:web:cloud
```

Chỉ người có quyền project mới triển khai; xem ranh giới tài nguyên trong [kiến trúc](docs/03-kien-truc-va-du-lieu.md). Không đổi billing/bucket hay dùng site/Function của app cũ.

```bash
firebase deploy --project crested-mercury-452707-e8 --only firestore:rules,storage --non-interactive
firebase deploy --project crested-mercury-452707-e8 --only functions:memberdesk --non-interactive
firebase deploy --project crested-mercury-452707-e8 --only hosting:memberdesk --non-interactive
```

ADC chỉ dùng trên máy quản trị. Function dùng danh tính runtime, không chứa credential local. Project đang Blaze, có thể phát sinh phí theo sử dụng.

Code/commit tiếng Anh, comment quan trọng ngắn bằng tiếng Việt; UI/docs tiếng Việt, riêng `AGENTS.md` tiếng Anh. Tám skill local ở `.agents/skills/`. Mỗi checkpoint lớn kiểm tra, chụp đủ bước, commit/push và xác minh GitHub. Word giữ hai ảnh cũ và ráp cuối C6.

Source: https://github.com/nrin31266/mid-term-mobile
