# mid-term-mobile

Đồ án giữa kỳ Lập trình đa nền tảng: **MemberDesk — quản lý thành viên** bằng Expo/React Native và Firebase.

Hiện tại: lên ý tưởng, thiết lập công cụ và tài liệu; chưa triển khai nghiệp vụ. Thiết kế đang chờ duyệt.

- [Bộ tài liệu tiếng Việt](docs/README.md)
- [Ý tưởng và phạm vi](docs/01-y-tuong-va-pham-vi.md)
- [Đối chiếu tiêu chí chấm](docs/02-doi-chieu-de-bai.md)
- [Kiến trúc và dữ liệu](docs/03-kien-truc-va-du-lieu.md)
- [Thiết lập và kết quả kiểm tra](docs/04-thiet-lap.md)
- [Kế hoạch thực hiện và bài nộp](docs/05-ke-hoach-va-bai-nop.md)
- [AI, skill và MCP](docs/06-ai-workflow.md)
- [Upload ảnh Storage đã kiểm tra](docs/07-image-upload.md)

## Chạy dự án mẫu

```bash
pnpm install --frozen-lockfile
pnpm exec expo start
pnpm exec expo start --web
pnpm exec expo lint
pnpm exec tsc --noEmit
```

Dự án dùng Expo SDK 58 và pnpm. Xem các lỗi nền đã phát hiện trong tài liệu thiết lập; hiện chưa đạt lint/typecheck sạch.

Code/định danh tiếng Anh; comment ngắn ở chỗ quan trọng bằng tiếng Việt. Tài liệu tiếng Việt, riêng AGENTS.md tiếng Anh. Dữ liệu chỉ có email, matkhau, hoten, hinhanh theo đề.

Repository: https://github.com/nrin31266/mid-term-mobile
