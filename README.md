# 🎵 KHO ÂM THANH ONLINE - WEB APP

> **Audio Library Web App** - Ứng dụng web quản lý và chia sẻ âm thanh, tích hợp với Tool qua PostMessage API.

---

## 📋 MỤC LỤC

1. [Tổng quan](#1-tổng-quan)
2. [Tính năng](#2-tính-năng)
3. [Tech Stack](#3-tech-stack)
4. [Cài đặt & Chạy](#4-cài-đặt--chạy)
5. [Cấu trúc thư mục](#5-cấu-trúc-thư-mục)
6. [Cách sử dụng](#6-cách-sử-dụng)
7. [Tích hợp với Tool](#7-tích-hợp-với-tool)
8. [Tùy chỉnh](#8-tùy-chỉnh)
9. [Deploy lên GitHub Pages](#9-deploy-lên-github-pages)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. TỔNG QUAN

**Audio Library Web App** là một ứng dụng web tĩnh (static web app) cho phép:

✅ Duyệt và quản lý danh sách âm thanh  
✅ Tìm kiếm và lọc theo thể loại  
✅ Nghe thử audio trước khi sử dụng  
✅ Gửi file audio tới Tool qua **PostMessage API** (tránh CORS)  
✅ Responsive design, hoạt động tốt trên mọi thiết bị  

### 🎯 Use Cases

- **Kho âm thanh cho Tool AI Voice**: Chọn audio và inject vào tool
- **Library âm thanh cho Video Editor**: Chọn nhạc nền, giọng nói
- **Sound Effect Library**: Quản lý hiệu ứng âm thanh
- **Podcast/Audiobook Manager**: Duyệt và phát audio

---

## 2. TÍNH NĂNG

### 2.1. Core Features

- ✅ **Danh sách âm thanh** với thông tin chi tiết (title, category, size, duration)
- ✅ **Tìm kiếm** theo tên hoặc mô tả
- ✅ **Lọc** theo thể loại (Nhạc, Giọng nói, Hiệu ứng, Môi trường)
- ✅ **Pagination** (6 items mỗi trang)
- ✅ **Preview modal** với audio player
- ✅ **PostMessage API** gửi file tới parent window

### 2.2. UI/UX Features

- ✅ **Dracula Theme** (dark mode, màu sắc đẹp mắt)
- ✅ **Responsive** (mobile, tablet, desktop)
- ✅ **Smooth animations** (hover, transitions, fade in/out)
- ✅ **Toast notifications** (success, error, warning)
- ✅ **Loading states** (spinner khi tải)
- ✅ **Empty states** (khi không có kết quả)

### 2.3. Developer Features

- ✅ **Vanilla JavaScript** (không cần framework)
- ✅ **Modular code** (dễ maintain)
- ✅ **Console logging** (debug-friendly)
- ✅ **Error handling** (try-catch, fallbacks)
- ✅ **Comments** (code dễ hiểu)

---

## 3. TECH STACK

### Frontend

- **HTML5**: Structure
- **CSS3**: Styling (Dracula Theme, CSS Variables, Flexbox, Grid)
- **JavaScript (ES6+)**: Logic (Vanilla JS, no frameworks)

### Libraries

- **Font Awesome 6**: Icons
- **None**: Không dùng jQuery, React, Vue, etc.

### APIs

- **PostMessage API**: Communication với parent window
- **Fetch API**: Load audio files
- **FileReader API**: Convert Blob to Base64

---

## 4. CÀI ĐẶT & CHẠY

### 4.1. Yêu cầu

- Trình duyệt hiện đại (Chrome, Firefox, Edge, Safari)
- (Optional) Local server cho development

### 4.2. Chạy local (Simple)

**Cách 1: Mở trực tiếp file HTML**

```bash
# Double-click vào index.html
# hoặc
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

⚠️ **Lưu ý**: Một số tính năng (CORS) có thể không hoạt động khi mở file trực tiếp.

**Cách 2: Dùng Python Simple Server**

```bash
# Python 3
cd audio-library-web
python -m http.server 8000

# Mở trình duyệt: http://localhost:8000
```

**Cách 3: Dùng VS Code Live Server**

```bash
# Cài extension "Live Server"
# Right-click vào index.html → "Open with Live Server"
```

**Cách 4: Dùng Node.js http-server**

```bash
npm install -g http-server
cd audio-library-web
http-server -p 8000

# Mở trình duyệt: http://localhost:8000
```

---

## 5. CẤU TRÚC THƯ MỤC

```
audio-library-web/
├── index.html          # HTML structure
├── styles.css          # CSS styling (Dracula Theme)
├── script.js           # JavaScript logic
├── README.md           # Documentation (this file)
└── (optional) audio/   # Folder chứa audio files (nếu host local)
    ├── sample1.mp3
    ├── sample2.mp3
    └── ...
```

---

## 6. CÁCH SỬ DỤNG

### 6.1. Duyệt danh sách

1. Mở web app (localhost hoặc GitHub Pages)
2. Xem danh sách âm thanh (6 items/trang)
3. Dùng **pagination** để chuyển trang

### 6.2. Tìm kiếm

1. Gõ từ khóa vào ô **"Tìm kiếm âm thanh..."**
2. Kết quả tự động lọc theo tên hoặc mô tả

### 6.3. Lọc theo thể loại

1. Chọn thể loại từ dropdown:
   - **Tất cả**: Hiển thị tất cả
   - **Nhạc**: Chỉ nhạc nền
   - **Giọng nói**: Chỉ giọng nói
   - **Hiệu ứng âm thanh**: Chỉ sound effects
   - **Âm thanh môi trường**: Chỉ ambience

### 6.4. Nghe thử

1. Click nút **"Nghe thử"** trên audio item
2. Modal mở ra với audio player
3. Click play để nghe
4. Click **"Sử dụng file này"** để gửi tới Tool
5. Click **"Đóng"** hoặc X để thoát

### 6.5. Sử dụng file

1. Click nút **"Sử dụng"** trên audio item
2. Web app sẽ:
   - Tải file audio từ URL
   - Convert sang Base64
   - Gửi PostMessage tới parent window (Tool)
3. Toast notification hiển thị trạng thái

---

## 7. TÍCH HỢP VỚI TOOL

### 7.1. Embed trong Iframe

**Trong Tool của bạn**:

```html
<!-- HTML -->
<button id="open-audio-library-btn">📁 Kho Âm Thanh</button>

<div id="audio-library-modal" style="display: none;">
    <div class="modal-card">
        <button id="close-audio-library-btn">&times;</button>
        <iframe 
            id="audio-library-iframe" 
            src="https://your-domain.com/audio-library-web/"
            style="width: 100%; height: 100%; border: none;">
        </iframe>
    </div>
</div>
```

```javascript
// JavaScript
const openBtn = document.getElementById('open-audio-library-btn');
const modal = document.getElementById('audio-library-modal');
const iframe = document.getElementById('audio-library-iframe');

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});
```

### 7.2. Nhận PostMessage

**Trong Tool của bạn**:

```javascript
window.addEventListener('message', async function(event) {
    // [1] Security: Check origin
    if (event.origin !== 'https://your-domain.com') {
        console.log('Rejected message from:', event.origin);
        return;
    }
    
    // [2] Check message type
    if (event.data && event.data.type === 'USE_AUDIO') {
        const { fileName, fileData, metadata } = event.data;
        
        try {
            // [3] Convert Base64 to Blob
            const byteCharacters = atob(fileData);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'audio/mpeg' });
            
            // [4] Create File object
            const file = new File([blob], fileName, { type: 'audio/mpeg' });
            
            // [5] Inject to file input
            const fileInput = document.getElementById('your-file-input');
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;
            
            // [6] Trigger change event
            fileInput.dispatchEvent(new Event('change', { bubbles: true }));
            
            console.log('✅ Audio file injected:', fileName);
            
        } catch (error) {
            console.error('❌ Error:', error);
        }
    }
});
```

### 7.3. Message Format

**Web App gửi**:

```javascript
{
    type: 'USE_AUDIO',
    fileName: 'audio.mp3',
    fileData: 'base64_string_here',  // Base64 (no prefix)
    url: 'https://...',  // Backup URL
    metadata: {
        title: 'Tên âm thanh',
        category: 'music',
        size: '2.5 MB',
        duration: '3:45'
    }
}
```

---

## 8. TÙY CHỈNH

### 8.1. Thêm/Sửa audio trong danh sách

**Mở `script.js`**, tìm `AUDIO_LIBRARY`:

```javascript
const AUDIO_LIBRARY = [
    {
        id: 1,
        title: "Tên âm thanh",
        fileName: "file-name.mp3",
        category: "music", // hoặc "voice", "sound-effect", "ambience"
        size: "2.5 MB",
        duration: "3:45",
        url: "https://your-cdn.com/audio.mp3",
        description: "Mô tả âm thanh"
    },
    // Thêm items mới ở đây...
];
```

### 8.2. Đổi màu sắc (Theme)

**Mở `styles.css`**, tìm `:root`:

```css
:root {
    /* Dracula Theme Colors */
    --bg-primary: #282a36;    /* Màu nền chính */
    --bg-secondary: #44475a;  /* Màu nền phụ */
    --accent-cyan: #8be9fd;   /* Màu accent chính */
    --accent-green: #50fa7b;  /* Màu success */
    /* ... */
}
```

### 8.3. Đổi số items mỗi trang

**Mở `script.js`**, tìm `itemsPerPage`:

```javascript
const itemsPerPage = 6;  // Đổi thành 9, 12, etc.
```

### 8.4. Đổi URL domain (Security)

**Mở `script.js`**, tìm hàm `useAudio()`:

```javascript
// Đổi targetOrigin từ '*' thành domain cụ thể
window.parent.postMessage(message, 'https://your-tool-domain.com');
```

**Trong Tool**, đổi origin check:

```javascript
if (event.origin !== 'https://your-audio-library-domain.com') {
    return;
}
```

---

## 9. DEPLOY LÊN GITHUB PAGES

### 9.1. Tạo GitHub Repository

```bash
# [1] Tạo repo mới trên GitHub: audio-library-web

# [2] Clone repo về local
git clone https://github.com/your-username/audio-library-web.git

# [3] Copy files vào repo
cp -r audio-library-web/* audio-library-web-repo/

# [4] Commit và push
cd audio-library-web-repo
git add .
git commit -m "Initial commit: Audio Library Web App"
git push origin main
```

### 9.2. Enable GitHub Pages

1. Vào **Settings** của repo
2. Chọn **Pages** ở sidebar
3. **Source**: Chọn `main` branch, `/root` folder
4. Click **Save**
5. Đợi 1-2 phút, site sẽ live tại:
   ```
   https://your-username.github.io/audio-library-web/
   ```

### 9.3. Update URL trong Tool

**Trong Tool của bạn**:

```html
<iframe 
    src="https://your-username.github.io/audio-library-web/"
    ...>
</iframe>
```

```javascript
// Check origin
if (event.origin !== 'https://your-username.github.io') {
    return;
}
```

---

## 10. TROUBLESHOOTING

### 10.1. PostMessage không hoạt động

**Problem**: Tool không nhận được PostMessage

**Solution**:
1. ✅ Check console logs: `console.log('PostMessage sent:', message)`
2. ✅ Check origin matching: `event.origin === 'https://...'`
3. ✅ Đảm bảo web app chạy trong iframe
4. ✅ Check CORS settings

### 10.2. Audio không load được

**Problem**: Click "Nghe thử" nhưng không play được

**Solution**:
1. ✅ Check URL audio có hợp lệ không
2. ✅ Check CORS headers của audio server
3. ✅ Thử audio URL trực tiếp trong trình duyệt
4. ✅ Đổi sang audio URL khác (test)

### 10.3. File không inject vào Tool

**Problem**: Tool không nhận được file

**Solution**:
1. ✅ Check console logs trong Tool
2. ✅ Check `fileInput` có đúng ID không
3. ✅ Check Base64 conversion có lỗi không
4. ✅ Check DataTransfer API support

### 10.4. Styling bị lỗi

**Problem**: UI trông không đúng

**Solution**:
1. ✅ Check `styles.css` đã load chưa
2. ✅ Check browser cache (Ctrl+Shift+R để clear)
3. ✅ Check browser compatibility (dùng Chrome/Firefox mới nhất)

### 10.5. GitHub Pages không hoạt động

**Problem**: Site không load sau khi deploy

**Solution**:
1. ✅ Check Settings → Pages → Source đã chọn đúng branch
2. ✅ Đợi 2-5 phút sau khi push
3. ✅ Check có file `index.html` ở root folder
4. ✅ Check repository visibility (public)

---

## 📚 REFERENCES

- **PostMessage API**: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
- **FileReader API**: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
- **GitHub Pages**: https://pages.github.com/
- **Dracula Theme**: https://draculatheme.com/

---

## 🎓 CREDITS

- **Theme**: Dracula Theme
- **Icons**: Font Awesome 6
- **Audio samples**: SoundHelix (demo purposes)

---

## 📝 LICENSE

MIT License - Free to use and modify

---

## 🚀 NEXT STEPS

1. ✅ Test web app locally
2. ✅ Customize audio list
3. ✅ Deploy to GitHub Pages
4. ✅ Integrate with your Tool
5. ✅ Test PostMessage communication
6. ✅ Add more features (upload, delete, edit, etc.)

---

**Happy Coding! 🎵**

Nếu có câu hỏi hoặc gặp vấn đề, hãy tạo issue trên GitHub repo.

