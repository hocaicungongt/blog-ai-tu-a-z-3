# Góc nhỏ của mình

Blog tĩnh tiếng Việt chia sẻ kiến thức học AI cho người mới, xây bằng Vite và HTML/CSS/JavaScript thuần, không có backend. Blog hỗ trợ tìm kiếm không dấu, giao diện điện thoại và chế độ tối theo máy.

## Chạy trên máy

Cài [Node.js](https://nodejs.org/) phiên bản 22.12 trở lên. Mở terminal trong thư mục dự án rồi chạy:

```bash
npm install
npm run dev
```

Mở địa chỉ được terminal hiển thị để xem blog.

## Thêm bài mới

Tạo file `.md` trong thư mục `posts/`, ví dụ `posts/lam-quen-voi-ai.md`. Đặt tên file không dấu, dùng dấu gạch ngang giữa các từ.

```markdown
---
title: Làm quen với AI
date: 2026-10-29
excerpt: Những bước đầu tiên để tìm hiểu AI một cách đơn giản.
---

## Bắt đầu từ đâu?

Viết nội dung bài ở đây. Có thể dùng **chữ đậm**, danh sách và ảnh Markdown.
```

Giữ đủ ba trường `title`, `date`, `excerpt`; ngày viết theo dạng `YYYY-MM-DD`. Blog tự đưa bài mới nhất lên đầu. Bài ví dụ có đường dẫn `#/bai/lam-quen-voi-ai`.

## Build và triển khai

```bash
npm run build
npm run preview
```

Bản build nằm trong thư mục `dist/`; lệnh `preview` dùng để xem thử bản này trên máy.

Dự án dùng Vercel để deploy miễn phí. Khi nhập kho mã nguồn vào Vercel, chọn **Vite**, lệnh build **`npm run build`** và thư mục đầu ra **`dist`**. Sau khi deploy, Vercel cung cấp đường dẫn để chia sẻ blog.
