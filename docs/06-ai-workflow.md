# Cách AI làm việc và công cụ đã thiết lập

Cập nhật ngày 10/11/2026. Tài liệu mô tả trạng thái thực tế, không thay thế các ràng buộc trong `AGENTS.md`.

## Tham khảo Lyreo có chọn lọc

Đã đọc `AGENTS.md` và phần quy trình phát triển của dự án `lyreo-platform` trên máy. Áp dụng cách đọc tài liệu theo mức ảnh hưởng, xác định nguồn dữ liệu đúng, bảo toàn phần người dùng đã làm và kết thúc bằng bằng chứng. Không đưa Spring Boot, Docker, CodeGraph, monorepo hay hệ thống Make của Lyreo vào bài Expo nhỏ.

`AGENTS.md` được viết lại bằng tiếng Anh, quy định cách AI chọn tài liệu/skill, thực hiện, kiểm tra, chụp ảnh và báo cáo. Không tạo thêm `AGENT.md` trùng tên gần giống.

## Skill đã cài thực tế

| Nhóm | Skill | Nguồn và phạm vi |
| --- | --- | --- |
| Thiết kế mobile | `expo-native-ui` | Đội Expo, bố cục native, điều khiển và hành vi từng nền tảng |
| Nhất quán giao diện | `expo-design-system` | Đội Expo, màu/khoảng cách/kiểu chữ; tái sử dụng theme đang có |
| Điều khiển desktop | `agent-desktop` | Vercel Labs, chụp màn hình và thao tác qua accessibility |
| Firebase | Bốn skill đã cài ở tài liệu 04 | Thiết lập, Auth, Firestore và rà soát rules |

Các skill đã chuyển vào **`.agents/skills/` của dự án**, không phải thư mục global hoặc dependency ứng dụng. Đã đối chiếu checksum đầy đủ rồi bỏ đúng bảy bản global đã cài trong cuộc trò chuyện này; giữ nguyên skill hệ thống/cá nhân. Có thể cần lượt mới để xuất hiện tự động; trong lúc đó đọc bằng đường dẫn local. Không giả định mọi ví dụ upstream hợp với SDK đang dùng; docs SDK 58 và manifest vẫn quyết định API.

Nguồn đã kiểm tra: [Expo skills](https://github.com/expo/skills), [agent-desktop](https://github.com/vercel-labs/agent-desktop). Hai skill Expo hiện nằm ở `plugins/expo/skills/expo-native-ui` và `plugins/expo/skills/expo-design-system`, không dùng đường dẫn `building-native-ui` đã cũ trên kết quả tìm kiếm.

## Nguồn và cài lại đúng phạm vi

| Skill | Repository và đường dẫn nguồn |
| --- | --- |
| Bốn skill Firebase | `firebase/agent-skills`, `skills/<tên-skill>` |
| Hai skill Expo | `expo/skills`, `plugins/expo/skills/expo-native-ui` và `plugins/expo/skills/expo-design-system` |
| Desktop | `vercel-labs/agent-desktop`, `skills/agent-desktop` |

Bản local đầy đủ được commit để clone cùng dự án. Nội dung/tiếng Anh upstream trong skill bên thứ ba được giữ, chỉ dọn khoảng trắng thừa cuối dòng; tài liệu do dự án viết vẫn tiếng Việt. Không coi hướng dẫn upstream là quyền thay đổi cloud hay vượt yêu cầu người dùng. Không có skill tự chạy khi ứng dụng mở.

Nếu cần cài mới, dùng helper của skill-installer với đích **tuyệt đối** `<repo>/.agents/skills` và tên/path chính thức ở bảng trên. Không chạy lại khi thư mục đích đã có; xem diff trước khi cập nhật. Ví dụ từ thư mục repo trên máy hiện tại:

```bash
python /home/nguyenvanrin/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo expo/skills \
  --path plugins/expo/skills/expo-native-ui plugins/expo/skills/expo-design-system \
  --dest /home/nguyenvanrin/PersonalProjects/mid-term-mobile/.agents/skills
```

Lệnh minh họa cài mới; **không chạy đè bản đang có**. Không cài thêm design framework: hai skill Expo đủ cho layout và theme hiện tại.

## CLI và MCP

Đã cài `agent-desktop` **1.2.0** qua npm chính thức. CLI có trường phiên bản giao thức JSON 2.6; không nhầm đó với phiên bản package.

- `agent-desktop` MCP: cấu hình cá nhân global, có biến môi trường trỏ tới phiên KDE/Wayland của laptop này. Đã bắt tay MCP, thấy 67 công cụ và gọi status thành công.
- Firebase MCP: cấu hình tại `.codex/config.toml` của repository, chạy bằng Firebase CLI 15.34.1 đã đăng nhập. Đã thấy đúng tám công cụ, đọc project và Storage Rules thành công.
- Tám công cụ Firebase chỉ đọc/kiểm tra: project, môi trường, app, SDK config, đọc rules, kiểm tra rules, truy vấn collection và lấy URL object đã có. Không có deploy, xóa, tạo project hay đổi Auth.
- MCP cấu hình mới cần nạp lại Codex/chat để được tích hợp vào danh sách công cụ. Bài thử dùng kết nối MCP stdio trực tiếp, không chỉ kiểm tra file cấu hình.

Không cần cài thêm Firebase plugin song song vì dễ trùng server. Không đổi chính sách phê duyệt toàn app hoặc quyền IAM để cài công cụ.

## Chụp màn hình: đã thử thành công

`agent-desktop status` nhận accessibility; sau khi truyền biến phiên desktop, CLI đọc được danh sách ứng dụng. Đã chụp thành công PNG **2561 × 1601** bằng portal Wayland tại `/tmp/midterm-desktop-check.png`. Ảnh toàn màn hình có thanh chat/dự án khác nên không đưa vào Git hoặc Word.

Phiên shell từ Codex ban đầu không có DISPLAY/WAYLAND_DISPLAY. Trên laptop hiện tại, các socket đã kiểm tra tồn tại:

```bash
XDG_RUNTIME_DIR=/run/user/1000 \
DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus \
WAYLAND_DISPLAY=wayland-0 DISPLAY=:0 \
agent-desktop screenshot /tmp/midterm-desktop-check.png
```

Đây là cấu hình máy hiện tại, không phải giá trị cố định cho mọi máy. Không dùng sudo, không khởi động lại bus và không tự trả lời hộp cấp quyền. Wayland có giới hạn thao tác chuột, focus và chụp từng cửa sổ; chụp được toàn màn hình không có nghĩa điều khiển được mọi ứng dụng.

Trước khi chụp báo cáo: mở đúng màn hình, kiểm tra không có token/mật khẩu, chỉ giữ vùng cần chứng minh, đặt tên ảnh rõ nghĩa và thêm chú thích tiếng Việt. Giữ hai ảnh Word hiện có. Chỉnh file Word trực tiếp, render/kiểm tra từng trang sau chỉnh sửa theo skill tài liệu.

## Quy trình checkpoint và ảnh báo cáo

Thực hiện bảng checkpoint trong tài liệu 05: kiểm thử → mở màn hình thật → chụp đủ bước/kiểm tra ảnh → ghi chú ngắn/cập nhật chỉ mục → commit/push → xác minh commit remote. Cuối bài mới ráp Word, giữ hai ảnh gốc; render rồi xem hết các trang. Chụp ngay khi làm từng bước quan trọng, gồm lệnh cài/chạy, cấu hình Console, cây source, code chính, thao tác UI, CSDL và kiểm thử. Không đợi cuối mới dựng lại toàn bộ bằng chứng. Code chụp từ editor có tên file/số dòng, kèm file/hàm/commit và ảnh chạy liên quan. Công cụ chụp: browser cho web, Agent Desktop cho desktop/Console, ADB cho Android theo thiết bị đã xác định.

[Chỉ mục minh chứng](submition/README.md) ghi ảnh đã có và ảnh còn thiếu. Hai ảnh Word cũ là bằng chứng khởi tạo/chạy starter, không chứng minh CRUD. Ảnh upload mẫu chỉ chứng minh IAM; ảnh đề là tư liệu tham chiếu. Không tạo ảnh terminal giả hoặc ảnh mockup rồi gọi là kết quả chạy.

## Kiểm tra cuối phần thiết lập

- Agent Desktop CLI, screenshot và MCP status: thành công.
- Firebase MCP project/rules: thành công.
- Ảnh Storage upload/tải lại: thành công với tài khoản quản trị; xem tài liệu 07 về giới hạn SDK.
- Lint/typecheck đã chạy lại: vẫn hai lỗi code mẫu ở tài liệu 04, chưa sửa source app.
- Word giữ nguyên bản của bạn với hai ảnh gốc; cuối bài mới ráp theo hướng dẫn mới. Chưa triển khai tính năng, thay rules, tạo claim admin hay quay video.
