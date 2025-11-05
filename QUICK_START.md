# ⚡ QUICK START - CHẠY NGAY TRONG 5 PHÚT

> **Hướng dẫn siêu nhanh để chạy Audio Library Web App**

---

## 🚀 BẮT ĐẦU

### Option 1: Mở trực tiếp (Đơn giản nhất)

```bash
# Bước 1: Mở file
Double-click vào index.html

# Bước 2: Dùng thử
✅ Search audio
✅ Filter by category
✅ Preview audio
✅ Click "Sử dụng"
```

⚠️ **Lưu ý**: Một số tính năng (PostMessage) chỉ hoạt động khi chạy trong server.

---

### Option 2: Dùng Python Server (Recommended)

```bash
# Bước 1: Mở terminal trong folder audio-library-web
cd audio-library-web

# Bước 2: Start server
python -m http.server 8000

# Bước 3: Mở trình duyệt
http://localhost:8000

# ✅ Done!
```

---

### Option 3: Dùng VS Code Live Server

```bash
# Bước 1: Cài extension "Live Server"
# Bước 2: Right-click vào index.html
# Bước 3: Chọn "Open with Live Server"

# ✅ Done!
```

---

## 🎯 TEST FEATURES

### 1. Search

```
Gõ: "nhạc"
→ Hiện ra các audio có "nhạc" trong tên
```

### 2. Filter

```
Chọn thể loại: "Nhạc"
→ Chỉ hiện nhạc nền
```

### 3. Preview

```
Click "Nghe thử"
→ Modal mở ra
→ Click play để nghe
```

### 4. Use Audio (Test PostMessage)

```
Click "Sử dụng"
→ Mở Console (F12)
→ Check logs:
   ✅ PostMessage sent to parent
   ⚠️ Not in iframe (nếu không trong iframe)
```

---

## 🔧 TÙY CHỈNH NHANH

### Thay đổi danh sách audio

**File**: `script.js`  
**Line**: ~10

```javascript
const AUDIO_LIBRARY = [
    {
        id: 1,
        title: "Tên audio mới",
        fileName: "audio.mp3",
        category: "music",
        size: "2.5 MB",
        duration: "3:45",
        url: "https://your-cdn.com/audio.mp3",
        description: "Mô tả"
    },
    // Thêm items mới ở đây...
];
```

### Thay đổi màu sắc

**File**: `styles.css`  
**Line**: ~8

```css
:root {
    --accent-cyan: #8be9fd;    /* Đổi màu này */
    --accent-green: #50fa7b;   /* Hoặc màu này */
}
```

### Thay đổi số items/trang

**File**: `script.js`  
**Line**: ~80

```javascript
const itemsPerPage = 6;  // Đổi thành 9, 12, etc.
```

---

## 📦 DEPLOY LÊN GITHUB PAGES (5 phút)

```bash
# Bước 1: Tạo repo mới trên GitHub
# Tên repo: audio-library-web

# Bước 2: Push code
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/audio-library-web.git
git push -u origin main

# Bước 3: Enable GitHub Pages
# Settings → Pages → Source: main branch → Save

# Bước 4: Đợi 2-3 phút
# Site live tại: https://YOUR-USERNAME.github.io/audio-library-web/

# ✅ Done!
```

---

## 🔗 TÍCH HỢP VÀO TOOL (Copy-paste)

### Thêm vào HTML

```html
<button id="open-audio-library-btn">📁 Kho Âm Thanh</button>

<div id="audio-library-modal" style="display: none;">
    <iframe id="audio-library-iframe" src=""></iframe>
</div>
```

### Thêm vào JavaScript

```javascript
// Mở modal
document.getElementById('open-audio-library-btn').addEventListener('click', () => {
    const modal = document.getElementById('audio-library-modal');
    const iframe = document.getElementById('audio-library-iframe');
    
    modal.style.display = 'flex';
    iframe.src = 'http://localhost:8000/';  // Hoặc GitHub Pages URL
});

// Nhận PostMessage
window.addEventListener('message', async (event) => {
    if (event.data.type === 'USE_AUDIO') {
        console.log('Received audio:', event.data.fileName);
        // Process file...
    }
});
```

👉 **Chi tiết đầy đủ**: Xem `INTEGRATION_EXAMPLE.md`

---

## ❓ TROUBLESHOOTING

### Vấn đề 1: Audio không play

```bash
# Check URL audio có hợp lệ không
# Thử mở URL trực tiếp trong trình duyệt
```

### Vấn đề 2: PostMessage không hoạt động

```bash
# Phải chạy trong iframe
# Phải check origin matching
# Check console logs
```

### Vấn đề 3: UI bị vỡ

```bash
# Clear cache: Ctrl+Shift+R
# Check styles.css đã load chưa
# Dùng trình duyệt mới nhất
```

---

## 📚 NEXT STEPS

1. ✅ **Đọc README.md** - Full documentation
2. ✅ **Đọc INTEGRATION_EXAMPLE.md** - Hướng dẫn tích hợp chi tiết
3. ✅ **Customize** - Thay đổi audio list, colors, etc.
4. ✅ **Deploy** - Lên GitHub Pages
5. ✅ **Integrate** - Vào Tool của bạn

---

## 🎉 CHÚC MỪNG!

Bạn đã chạy thành công Audio Library Web App!

Có câu hỏi? Check:
- 📖 **README.md** - Documentation đầy đủ
- 🔗 **INTEGRATION_EXAMPLE.md** - Code mẫu
- 💬 **GitHub Issues** - Báo lỗi hoặc hỏi

**Happy Coding! 🚀**

