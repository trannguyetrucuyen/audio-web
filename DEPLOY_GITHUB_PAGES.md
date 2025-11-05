# 🚀 HƯỚNG DẪN DEPLOY LÊN GITHUB PAGES

> Deploy Audio Library Web lên GitHub Pages trong 5 phút!

---

## 📋 CHUẨN BỊ

### Bước 1: Tạo GitHub Account
- Truy cập: https://github.com
- Đăng ký tài khoản (nếu chưa có)

### Bước 2: Cài Git
```bash
# Kiểm tra đã cài Git chưa
git --version

# Nếu chưa có, tải tại:
# https://git-scm.com/downloads
```

---

## 🎯 DEPLOY (3 BƯỚC ĐƠN GIẢN)

### **BƯỚC 1: Tạo Repository trên GitHub**

1. Đăng nhập GitHub
2. Click nút **"New"** (góc trên bên trái) hoặc truy cập: https://github.com/new
3. Điền thông tin:
   - **Repository name**: `audio-library` (hoặc tên bạn thích)
   - **Public** (chọn Public)
   - **KHÔNG** tick "Add a README file"
4. Click **"Create repository"**

---

### **BƯỚC 2: Push Code lên GitHub**

Mở **Terminal/PowerShell** trong thư mục `audio-library-web`:

```bash
# Bước 1: Khởi tạo Git
git init

# Bước 2: Add tất cả files
git add .

# Bước 3: Commit
git commit -m "Initial commit: Audio Library Web App"

# Bước 4: Thêm remote (THAY YOUR-USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR-USERNAME/audio-library.git

# Bước 5: Đổi branch sang main
git branch -M main

# Bước 6: Push lên GitHub
git push -u origin main
```

**Lưu ý**: 
- Thay `YOUR-USERNAME` bằng username GitHub của bạn
- Nếu yêu cầu đăng nhập, nhập username + password (hoặc Personal Access Token)

---

### **BƯỚC 3: Enable GitHub Pages**

1. Vào repository vừa tạo trên GitHub
2. Click **Settings** (tab trên cùng)
3. Kéo xuống phần **"Pages"** (menu bên trái)
4. Trong **"Source"**:
   - Branch: Chọn **`main`**
   - Folder: Chọn **`/ (root)`**
5. Click **"Save"**
6. Đợi 1-2 phút...

✅ **XONG!** Website của bạn sẽ live tại:
```
https://YOUR-USERNAME.github.io/audio-library/
```

---

## 🔄 CẬP NHẬT CODE (Sau khi đã deploy)

Mỗi khi sửa code, chạy lệnh:

```bash
# Bước 1: Add changes
git add .

# Bước 2: Commit
git commit -m "Update: mô tả thay đổi"

# Bước 3: Push
git push

# Đợi 1-2 phút → Website tự động cập nhật!
```

---

## 🎨 TÙY CHỈNH DOMAIN (Optional)

### Sử dụng Custom Domain

1. Mua domain (VD: `audiolib.com`)
2. Vào **Settings → Pages**
3. Nhập domain vào **"Custom domain"**
4. Cấu hình DNS:
   ```
   Type: CNAME
   Name: www
   Value: YOUR-USERNAME.github.io
   ```

---

## ⚡ SCRIPT NHANH (Copy-Paste)

Tạo file `deploy.sh` trong thư mục `audio-library-web`:

```bash
#!/bin/bash

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."

git add .
echo "📝 Enter commit message:"
read commit_message
git commit -m "$commit_message"
git push

echo "✅ Deployed! Wait 1-2 minutes for changes to appear."
echo "🌐 Visit: https://YOUR-USERNAME.github.io/audio-library/"
```

Chạy script:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🐛 TROUBLESHOOTING

### Vấn đề 1: Git không được nhận dạng
```bash
# Cài Git từ: https://git-scm.com/downloads
# Restart Terminal sau khi cài
```

### Vấn đề 2: Permission denied (publickey)
```bash
# Dùng HTTPS thay vì SSH:
git remote set-url origin https://github.com/YOUR-USERNAME/audio-library.git
```

### Vấn đề 3: Không thấy website sau khi deploy
- Đợi 2-5 phút
- Check Settings → Pages có hiện "Your site is live at..."
- Clear browser cache (Ctrl+Shift+R)

### Vấn đề 4: 404 Page Not Found
- Đảm bảo file `index.html` ở root folder
- Check branch đã chọn đúng `main`

### Vấn đề 5: Audio không load được
- URL audio phải public
- Check CORS policy của audio server
- Thử audio URL trực tiếp trong browser

---

## 📱 TEST WEBSITE

Sau khi deploy, test các tính năng:

✅ Search hoạt động  
✅ Filter theo category  
✅ Preview audio  
✅ Click "Sử dụng" (check console logs)  
✅ Pagination  
✅ Responsive trên mobile  

---

## 🎯 NEXT STEPS

### 1. **Thêm Google Analytics**
```html
<!-- Thêm vào <head> của index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. **Thêm Favicon**
```html
<!-- Thêm vào <head> của index.html -->
<link rel="icon" href="favicon.ico" type="image/x-icon">
```

### 3. **SEO Optimization**
```html
<!-- Thêm vào <head> của index.html -->
<meta name="description" content="Kho âm thanh chuyên nghiệp với hàng trăm file audio chất lượng cao">
<meta name="keywords" content="audio, music, sound effects, voice">
<meta property="og:title" content="Audio Library Pro">
<meta property="og:description" content="Kho âm thanh chuyên nghiệp">
<meta property="og:image" content="preview-image.jpg">
```

---

## 🔗 LINKS HỮU ÍCH

- **GitHub Pages Docs**: https://pages.github.com/
- **Git Documentation**: https://git-scm.com/doc
- **Markdown Guide**: https://guides.github.com/features/mastering-markdown/

---

## ✅ CHECKLIST TRƯỚC KHI DEPLOY

- [ ] Đã test local (http://localhost:8000)
- [ ] Đã commit tất cả changes
- [ ] Đã kiểm tra console không có lỗi
- [ ] Đã test responsive trên mobile
- [ ] Audio URLs đều hoạt động
- [ ] Đã đọc hướng dẫn deploy

---

## 🎉 HOÀN THÀNH!

Chúc mừng! Bạn đã deploy thành công Audio Library lên GitHub Pages!

**Website của bạn**:
```
https://YOUR-USERNAME.github.io/audio-library/
```

Share link này cho bạn bè và đồng nghiệp! 🚀

---

**Made with ❤️ by Audio Library Team**

