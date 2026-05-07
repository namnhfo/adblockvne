# Changelog - AdBlock Pilot VnExpress Overseas

## [2026-05-05]
### Added
- **UI/UX V2.0**: Triển khai chiến lược 3 cấp độ mới (Nudge, Value Exchange, Hard Wall).
- **Inline Toast (L1)**: Tự động thu nhỏ thành Pinned Icon sau 10s.
- **Content Fade-out (L2)**: Làm mờ nội dung từ Paragraph 3, hỗ trợ nút "Bỏ qua" và Sticky Bar.
- **Smart Guide (L3)**: Tự động nhận diện Browser (Chrome/Safari...) và hiển thị GIF hướng dẫn < 1MB.
- **Track A Simulation**: Thêm tính năng mô phỏng phục hồi quảng cáo qua Optima Network.
- **100% Fidelity Template**: Clone hoàn hảo bài báo "Không nên mua ôtô nếu sống ở nội thành" với đầy đủ Header, Ads và Layout VnExpress.

### Changed
- Cập nhật `adblock_pilot_spec.md` khớp với thiết kế UI/UX mới.
- Chuyển đổi toàn bộ Asset sang Absolute URL (Vnecdn) để đảm bảo tính toàn vẹn giao diện.
- Tái cấu trúc CSS dự án (`adblock.css`) để tương thích với hệ thống CSS của VnExpress.

### Fixed
- Lỗi vỡ layout 2 cột trên môi trường Local.
- Lỗi hiển thị Font chữ Noto Serif và Logo SVG.
