# Nguyễn Đức Chung — CV Website

CV cá nhân xây dựng bằng Jekyll, hỗ trợ đa ngôn ngữ (VI / EN / ZH), deploy trên GitHub Pages.

🔗 **Live:** [ndchungict.github.io/cv](https://ndchungict.github.io/cv)

---

## Tính năng

- **Hai cột** — sidebar (ảnh, liên hệ, kỹ năng, học vấn, sở thích) + nội dung chính (kinh nghiệm, dự án)
- **Đa ngôn ngữ** — chuyển đổi VI / EN / ZH ngay trên trang, lưu lựa chọn vào `localStorage`
- **Font chữ chuẩn** — Latin dùng Segoe UI/Roboto; tiếng Trung dùng Noto Serif SC (宋体) cho nội dung và Noto Sans SC (黑体) cho tiêu đề
- **Xuất PDF** — tạo file PDF qua `html2pdf.js`, tên file tự động theo định dạng `yyyy-MM-dd-Name-LANG.pdf`
- **In CV** — in trực tiếp từ trình duyệt, tự động ẩn các nút điều khiển
- **Top menu bar** — thanh điều hướng sticky nằm ngoài khung CV, chứa link mạng xã hội, nút đổi ngôn ngữ, in và xuất PDF
- **Responsive** — hiển thị tốt trên desktop, tablet và mobile
- **Nội dung tách biệt** — toàn bộ dữ liệu CV lưu trong `_data/*.yml`, không cần chỉnh HTML

---

## Cấu trúc dự án

```
.
├── _data/                    # Dữ liệu CV (YAML)
│   ├── profile.yml           # Thông tin cá nhân, ảnh, liên hệ, sở thích (VI/EN/ZH)
│   ├── experience.yml        # Kinh nghiệm làm việc (VI/EN/ZH)
│   ├── education.yml         # Học vấn (VI/EN/ZH)
│   ├── skills.yml            # Kỹ năng theo nhóm (VI/EN/ZH)
│   ├── projects.yml          # Dự án nổi bật (VI/EN/ZH)
│   └── i18n.yml              # Nhãn UI cho VI / EN / ZH
├── _includes/                # Partial HTML
│   ├── head.html             # <head>: meta, fonts, scripts
│   ├── header.html           # Header (nếu dùng)
│   ├── footer.html           # Footer
│   ├── experience.html       # Section kinh nghiệm
│   ├── projects.html         # Section dự án
│   ├── skills.html           # Section kỹ năng (main)
│   ├── education.html        # Section học vấn (main)
│   └── about.html            # Section giới thiệu
├── _layouts/
│   ├── default.html          # Layout gốc (head + body)
│   └── home.html             # Layout CV hai cột + top menu + sidebar
├── assets/
│   ├── css/main.css          # Toàn bộ stylesheet (layout, print, CJK fonts)
│   └── js/main.js            # i18n, renderProfile/Experience/Skills/..., exportPDF
├── imgs/                     # Ảnh đại diện và icon liên hệ
├── tests/                    # Unit tests (Vitest + jsdom)
│   ├── helpers/              # DOM fixture, i18n data, JS module helpers
│   └── setup.test.js         # Test suite chính
├── _config.yml               # Cấu hình Jekyll
├── Gemfile                   # Ruby dependencies (github-pages)
├── package.json              # Node dependencies (Vitest, jsdom, fast-check)
└── index.html                # Entry point
```

---

## Cập nhật nội dung CV

Chỉnh sửa các file YAML trong `_data/` — không cần động vào HTML hay JS:

| File | Nội dung |
|---|---|
| `_data/profile.yml` | Họ tên, ảnh, tóm tắt, địa chỉ, liên hệ, sở thích — theo từng ngôn ngữ |
| `_data/experience.yml` | Lịch sử công việc, trách nhiệm, thành tích |
| `_data/education.yml` | Học vấn, trường, chuyên ngành, năm |
| `_data/skills.yml` | Kỹ năng theo nhóm (Coding, Testing Framework, Tools, DevOps, AI) |
| `_data/projects.yml` | Dự án nổi bật, vai trò, mô tả |
| `_data/i18n.yml` | Nhãn UI (nav, buttons, section titles) cho VI / EN / ZH |

Mỗi file YAML có cấu trúc theo key ngôn ngữ `vi:`, `en:`, `zh:`. Ví dụ:

```yaml
# _data/profile.yml
vi:
  name: "Nguyễn Đức Chung"
  title: "Automation Test Engineer"
en:
  name: "Nguyen Duc Chung"
  title: "Automation Test Engineer"
zh:
  name: "阮德鍾"
  title: "自动化测试工程师"
```

---

## Phát triển cục bộ

### Yêu cầu

- Ruby `3.3.5` (xem `.ruby-version`)
- Bundler: `gem install bundler`
- Node.js `18+` (để chạy tests)

### Cài đặt

```bash
bundle install
npm install
```

### Chạy local

```bash
bundle exec jekyll serve
```

Truy cập tại `http://localhost:4000/cv`.

Với live reload:

```bash
bundle exec jekyll serve --livereload
```

### Chạy tests

```bash
npm test
```

Tests dùng **Vitest** + **jsdom** + **fast-check** (property-based testing). Các test nằm trong `tests/`.

---

## Deploy lên GitHub Pages

1. Push repository lên GitHub.
2. Vào **Settings → Pages** của repository.
3. Chọn **Source**: nhánh `main`, thư mục `/ (root)`, nhấn **Save**.
4. GitHub Pages tự build và deploy bằng Jekyll.
5. Site sẽ có tại `https://<username>.github.io/cv`.

> Cập nhật `url` và `baseurl` trong `_config.yml` cho khớp với username và tên repository trước khi deploy.

```yaml
# _config.yml
url: "https://<username>.github.io"
baseurl: "/cv"
```

---

## Xuất PDF

Nhấn nút **Xuất PDF** trên top menu. File được tạo bằng `html2pdf.js` với:

- Tên file: `yyyy-MM-dd-Nguyen-Duc-Chung-VI.pdf` (tự động theo ngày và ngôn ngữ hiện tại)
- Khổ giấy: A4, portrait
- Độ phân giải: scale 2x (nét, rõ chữ)
- Font tiếng Trung: Noto Serif SC / Noto Sans SC (load từ Google Fonts)
- Link liên hệ: hiển thị đầy đủ trên 1 dòng, không bị cắt

---

## Ghi chú

- Dự án dùng Jekyll build mặc định của GitHub Pages — **không** cần file `.nojekyll`.
- Chỉ thêm `.nojekyll` nếu pre-build `_site/` cục bộ và push trực tiếp lên branch deploy (ví dụ qua CI/CD pipeline).
- Sidebar dùng ID riêng (`sidebar-skills-list`, `sidebar-education-list`) để tránh xung đột với các section trong main content khi JS re-render theo ngôn ngữ.
