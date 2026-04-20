# Nguyễn Đức Chung — CV Website

CV cá nhân xây dựng bằng Jekyll, hỗ trợ đa ngôn ngữ (VI / EN / ZH), có thể deploy lên GitHub Pages.

## Tính năng

- **Hai cột** — sidebar (ảnh, liên hệ, kỹ năng, học vấn) + nội dung chính (kinh nghiệm, dự án)
- **Đa ngôn ngữ** — chuyển đổi VI / EN / ZH ngay trên trang, lưu lựa chọn vào `localStorage`
- **In CV** — in trực tiếp từ trình duyệt, tự động ẩn các nút điều khiển
- **Xuất PDF** — tạo file PDF qua `html2pdf.js`, tên file tự động theo tên + ngày
- **Top menu bar** — thanh điều hướng sticky nằm ngoài khung CV, chứa nút đổi ngôn ngữ, in và xuất PDF
- **Responsive** — hiển thị tốt trên desktop, tablet và mobile
- **Nội dung tách biệt** — toàn bộ dữ liệu CV lưu trong `_data/*.yml`, không cần chỉnh HTML

## Cấu trúc dự án

```
.
├── _data/              # Dữ liệu CV (YAML)
│   ├── profile.yml     # Thông tin cá nhân, ảnh, liên hệ, sở thích
│   ├── experience.yml  # Kinh nghiệm làm việc
│   ├── education.yml   # Học vấn
│   ├── skills.yml      # Kỹ năng theo nhóm
│   ├── projects.yml    # Dự án nổi bật
│   └── i18n.yml        # Nhãn UI cho VI / EN / ZH
├── _includes/          # Các partial HTML (experience, projects, ...)
├── _layouts/
│   ├── default.html    # Layout gốc (head + body)
│   └── home.html       # Layout CV hai cột + top menu
├── assets/
│   ├── css/main.css    # Toàn bộ stylesheet
│   └── js/main.js      # i18n, exportPDF, initLanguage
├── imgs/               # Ảnh đại diện
├── tests/              # Unit tests (Vitest + jsdom)
├── _config.yml         # Cấu hình Jekyll
└── index.html          # Entry point
```

## Cập nhật nội dung CV

Chỉnh sửa các file YAML trong `_data/` — không cần động vào HTML:

| File | Nội dung |
|---|---|
| `_data/profile.yml` | Họ tên, ảnh, tóm tắt, liên hệ, sở thích |
| `_data/experience.yml` | Lịch sử công việc |
| `_data/education.yml` | Học vấn |
| `_data/skills.yml` | Kỹ năng theo nhóm |
| `_data/projects.yml` | Dự án nổi bật |
| `_data/i18n.yml` | Nhãn UI cho VI / EN / ZH |

## Phát triển cục bộ

### Yêu cầu

- Ruby 3.0+
- Bundler: `gem install bundler`
- Node.js (để chạy tests)

### Cài đặt

```bash
bundle install
npm install
```

### Chạy local

```bash
bundle exec jekyll serve
```

Truy cập tại `http://localhost:4000/jekyll-cv-website`.

Với live reload:

```bash
bundle exec jekyll serve --livereload
```

### Chạy tests

```bash
npm test
```

## Deploy lên GitHub Pages

1. Push repository lên GitHub.
2. Vào **Settings → Pages** của repository.
3. Chọn **Source**: nhánh `main`, thư mục `/ (root)`, nhấn **Save**.
4. GitHub Pages tự build và deploy bằng Jekyll.
5. Site sẽ có tại `https://<username>.github.io/jekyll-cv-website`.

> Cập nhật `url` và `baseurl` trong `_config.yml` cho khớp với username và tên repository của bạn trước khi deploy.

## Ghi chú về `.nojekyll`

Dự án này dùng Jekyll build mặc định của GitHub Pages — **không** cần file `.nojekyll`.

Chỉ thêm `.nojekyll` nếu bạn pre-build `_site/` cục bộ và push trực tiếp lên branch deploy (ví dụ qua CI/CD pipeline).
