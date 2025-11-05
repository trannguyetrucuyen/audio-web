# 🔗 HƯỚNG DẪN TÍCH HỢP VÀO TOOL

> **Document này hướng dẫn chi tiết cách tích hợp Audio Library Web App vào Tool hiện tại.**

---

## 📋 MỤC LỤC

1. [Tổng quan Flow](#1-tổng-quan-flow)
2. [Code mẫu đầy đủ](#2-code-mẫu-đầy-đủ)
3. [Step-by-step Implementation](#3-step-by-step-implementation)
4. [Testing](#4-testing)
5. [Production Checklist](#5-production-checklist)

---

## 1. TỔNG QUAN FLOW

```
┌────────────────────────────────────────────────────────┐
│                    MAIN TOOL                           │
│                                                        │
│  [Button: 📁 Kho Âm Thanh]                            │
│         │                                              │
│         ▼ Click                                        │
│  ┌──────────────────────────────────────────────┐     │
│  │ Modal (display: flex)                        │     │
│  │  ┌────────────────────────────────────────┐  │     │
│  │  │ Iframe                                 │  │     │
│  │  │ src: audio-library-web/                │  │     │
│  │  │                                        │  │     │
│  │  │  [Audio List]                          │  │     │
│  │  │  [Search, Filter, Preview]             │  │     │
│  │  │  [Button: Sử dụng] ────────────────────┼──┼─►   │
│  │  └────────────────────────────────────────┘  │     │
│  └──────────────────────────────────────────────┘     │
│                   │                                    │
│                   ▼ PostMessage                        │
│         window.addEventListener('message')             │
│                   │                                    │
│                   ▼ Process                            │
│         1. Convert Base64 → Blob                       │
│         2. Create File object                          │
│         3. Inject to file input                        │
│         4. Trigger change event                        │
│                   │                                    │
│                   ▼                                    │
│         [File Input] ✅ File loaded                    │
└────────────────────────────────────────────────────────┘
```

---

## 2. CODE MẪU ĐẦY ĐỦ

### 2.1. HTML Structure (Thêm vào APP_HTML)

```html
<!-- ================================
     AUDIO LIBRARY BUTTON & MODAL
     ================================ -->

<!-- Button mở Kho Âm Thanh (thêm vào toolbar) -->
<button id="open-audio-library-btn" class="audio-library-btn">
    <i class="fas fa-music"></i>
    📁 Kho Âm Thanh Online
</button>

<!-- Modal chứa Iframe -->
<div id="audio-library-modal" class="audio-library-modal" style="display: none;">
    <div class="audio-library-modal-card">
        <div class="audio-library-modal-header">
            <h3>📁 Kho Âm Thanh Online</h3>
            <button id="close-audio-library-btn" class="audio-library-close-btn">&times;</button>
        </div>
        <div class="audio-library-modal-body">
            <iframe 
                id="audio-library-iframe" 
                src="" 
                style="width: 100%; height: 100%; border: none; border-radius: 8px; background: #282a36;">
            </iframe>
        </div>
    </div>
</div>
```

### 2.2. CSS Styles (Thêm vào SCRIPT_CSS)

```css
/* ================================
   AUDIO LIBRARY STYLES
   ================================ */

/* Button */
.audio-library-btn {
    background: linear-gradient(135deg, #8be9fd 0%, #79dce9 100%);
    color: #282a36;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(139, 233, 253, 0.3);
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.audio-library-btn:hover {
    background: linear-gradient(135deg, #79dce9 0%, #6bc5d8 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(139, 233, 253, 0.4);
}

/* Modal */
.audio-library-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.audio-library-modal-card {
    background: #44475a;
    border-radius: 16px;
    width: 80vw;
    height: 90vh;
    max-width: 1400px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.audio-library-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 2px solid #6272a4;
}

.audio-library-modal-header h3 {
    color: #8be9fd;
    font-size: 1.5rem;
    margin: 0;
}

.audio-library-close-btn {
    background: none;
    border: none;
    color: #6272a4;
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
}

.audio-library-close-btn:hover {
    background: #6272a4;
    color: #f8f8f2;
}

.audio-library-modal-body {
    flex: 1;
    padding: 10px;
    overflow: hidden;
}
```

### 2.3. JavaScript Logic (Thêm vào Main Payload)

```javascript
// ================================
// AUDIO LIBRARY MODAL LOGIC
// ================================

(function initAudioLibrary() {
    const openBtn = document.getElementById('open-audio-library-btn');
    const closeBtn = document.getElementById('close-audio-library-btn');
    const modal = document.getElementById('audio-library-modal');
    const iframe = document.getElementById('audio-library-iframe');
    
    // Cấu hình
    const AUDIO_LIBRARY_URL = 'https://your-username.github.io/audio-library-web/';
    // Hoặc local: 'http://localhost:8000/'
    
    // ====================================
    // [1] MỞ MODAL
    // ====================================
    if (openBtn && modal && iframe) {
        openBtn.addEventListener('click', function() {
            // Show modal
            modal.style.display = 'flex';
            
            // Lazy load iframe (chỉ load khi mở modal)
            if (!iframe.src || iframe.src === 'about:blank') {
                iframe.src = AUDIO_LIBRARY_URL;
                console.log('📂 Loading Audio Library:', AUDIO_LIBRARY_URL);
            }
            
            addLogEntry('📂 Đã mở kho âm thanh online', 'info');
        });
    }
    
    // ====================================
    // [2] ĐÓNG MODAL (Nút X)
    // ====================================
    if (closeBtn && modal && iframe) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            
            // Clear iframe để dừng audio và free memory
            iframe.src = 'about:blank';
            
            addLogEntry('📂 Đã đóng kho âm thanh online', 'info');
        });
    }
    
    // ====================================
    // [3] ĐÓNG MODAL (Click background)
    // ====================================
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                if (iframe) {
                    iframe.src = 'about:blank';
                }
                addLogEntry('📂 Đã đóng kho âm thanh online', 'info');
            }
        });
    }
    
    // ====================================
    // [4] ĐÓNG MODAL (ESC key)
    // ====================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
            if (iframe) {
                iframe.src = 'about:blank';
            }
            addLogEntry('📂 Đã đóng kho âm thanh online', 'info');
        }
    });
})();

// ================================
// POSTMESSAGE HANDLER
// ================================

window.addEventListener('message', async function(event) {
    // ========================================
    // [1] SECURITY CHECK: Kiểm tra origin
    // ========================================
    const ALLOWED_ORIGINS = [
        'https://your-username.github.io',
        'http://localhost:8000',  // For local testing
        'http://127.0.0.1:8000'   // For local testing
    ];
    
    if (!ALLOWED_ORIGINS.includes(event.origin)) {
        console.log('⚠️ Rejected message from:', event.origin);
        return;
    }
    
    // ========================================
    // [2] CHECK MESSAGE TYPE
    // ========================================
    if (event.data && event.data.type === 'USE_AUDIO') {
        const { fileName, fileData, url, metadata } = event.data;
        
        console.log('📥 Received PostMessage:', {
            fileName,
            hasFileData: !!fileData,
            url,
            metadata
        });
        
        // [2.1] Validate
        if (!fileName) {
            console.error('❌ Missing fileName');
            addLogEntry('❌ Lỗi: Thiếu tên file', 'error');
            return;
        }
        
        if (!fileData && !url) {
            console.error('❌ Missing fileData or url');
            addLogEntry('❌ Lỗi: Thiếu dữ liệu file', 'error');
            return;
        }
        
        try {
            addLogEntry(`📥 Đang tải file: ${fileName}...`, 'info');
            
            let blob;
            
            // ========================================
            // [3] CONVERT FILE DATA TO BLOB
            // ========================================
            
            if (fileData) {
                // ====================================
                // [3.1] Có fileData (Base64) → Blob
                // ====================================
                addLogEntry('📥 Nhận dữ liệu file trực tiếp (tránh CORS)', 'info');
                
                if (typeof fileData === 'string') {
                    // Base64 string
                    const byteCharacters = atob(fileData);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    blob = new Blob([byteArray], { type: 'audio/mpeg' });
                    
                } else if (fileData instanceof ArrayBuffer) {
                    // ArrayBuffer
                    blob = new Blob([fileData], { type: 'audio/mpeg' });
                    
                } else {
                    throw new Error('Định dạng fileData không hợp lệ');
                }
                
                console.log('✅ Blob created from fileData, size:', blob.size);
                
            } else {
                // ====================================
                // [3.2] Không có fileData → Tải từ URL
                // ====================================
                addLogEntry('⚠️ Tải từ URL (có thể bị CORS)', 'warning');
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                blob = await response.blob();
                
                console.log('✅ Blob loaded from URL, size:', blob.size);
            }
            
            // ========================================
            // [4] CREATE FILE OBJECT
            // ========================================
            const file = new File([blob], fileName, { 
                type: blob.type || 'audio/mpeg',
                lastModified: Date.now()
            });
            
            console.log('✅ File object created:', {
                name: file.name,
                size: file.size,
                type: file.type
            });
            
            // ========================================
            // [5] INJECT TO FILE INPUT
            // ========================================
            
            // THAY ĐỔI ID này thành file input của Tool bạn
            const fileInput = document.getElementById('gemini-file-input');
            
            if (!fileInput) {
                console.error('❌ File input not found: #gemini-file-input');
                addLogEntry('❌ Lỗi: Không tìm thấy ô tải file', 'error');
                return;
            }
            
            // [5.1] Tạo DataTransfer và gán file
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;
            
            // [5.2] Trigger 'change' event
            fileInput.dispatchEvent(new Event('change', { bubbles: true }));
            
            // ========================================
            // [6] SUCCESS NOTIFICATION
            // ========================================
            addLogEntry(`✅ Đã tải file "${fileName}" thành công!`, 'success');
            
            console.log('✅ File injected successfully');
            
            // Show toast (nếu có SweetAlert)
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: '✅ Đã tải file thành công',
                    text: `File "${fileName}" đã được tải từ kho âm thanh`,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
            }
            
        } catch (error) {
            // ========================================
            // [7] ERROR HANDLING
            // ========================================
            console.error('❌ Error processing audio file:', error);
            addLogEntry(`❌ Lỗi: ${error.message}`, 'error');
            
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: '❌ Lỗi tải file',
                    text: error.message || 'Không thể tải file. Vui lòng thử lại.',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
            }
        }
    }
});
```

---

## 3. STEP-BY-STEP IMPLEMENTATION

### Step 1: Thêm Button vào UI

**Vị trí đề xuất**: Toolbar hoặc Settings panel

```javascript
// Trong APP_HTML, thêm button ở vị trí phù hợp
const APP_HTML = `
    <!-- ... existing code ... -->
    
    <div class="toolbar">
        <button id="open-audio-library-btn" class="audio-library-btn">
            📁 Kho Âm Thanh Online
        </button>
        <!-- ... other buttons ... -->
    </div>
`;
```

### Step 2: Thêm Modal HTML

```javascript
// Thêm ngay sau toolbar hoặc ở cuối APP_HTML
const APP_HTML = `
    <!-- ... existing code ... -->
    
    <!-- Audio Library Modal -->
    <div id="audio-library-modal" class="audio-library-modal" style="display: none;">
        <!-- ... copy full modal HTML from section 2.1 ... -->
    </div>
`;
```

### Step 3: Thêm CSS Styles

```javascript
// Trong SCRIPT_CSS
const SCRIPT_CSS = `
    /* ... existing styles ... */
    
    /* Audio Library Styles */
    /* ... copy full CSS from section 2.2 ... */
`;
```

### Step 4: Thêm JavaScript Logic

```javascript
// Trong MMX_APP_PAYLOAD() function
function MMX_APP_PAYLOAD() {
    // ... existing code ...
    
    // Audio Library Logic
    (function initAudioLibrary() {
        // ... copy full JS from section 2.3 ...
    })();
    
    // PostMessage Handler
    window.addEventListener('message', async function(event) {
        // ... copy full PostMessage handler from section 2.3 ...
    });
}
```

### Step 5: Update Configuration

```javascript
// Đổi URL trong initAudioLibrary():
const AUDIO_LIBRARY_URL = 'https://YOUR-USERNAME.github.io/audio-library-web/';

// Đổi allowed origins trong PostMessage handler:
const ALLOWED_ORIGINS = [
    'https://YOUR-USERNAME.github.io',
    'http://localhost:8000'  // For testing
];

// Đổi file input ID (nếu cần):
const fileInput = document.getElementById('YOUR-FILE-INPUT-ID');
```

---

## 4. TESTING

### 4.1. Test Local

**Bước 1: Start Audio Library Web App**

```bash
cd audio-library-web
python -m http.server 8000
# Audio Library running at: http://localhost:8000
```

**Bước 2: Start Main Tool**

```bash
# Mở Tool trong trình duyệt
# (Minimax website + inject script)
```

**Bước 3: Test Flow**

1. ✅ Click button "Kho Âm Thanh" → Modal mở
2. ✅ Iframe load Audio Library
3. ✅ Search, filter audio
4. ✅ Click "Nghe thử" → Preview modal mở
5. ✅ Click "Sử dụng" → PostMessage gửi
6. ✅ Check console logs
7. ✅ Check file input có file chưa
8. ✅ Check toast notification

### 4.2. Debug Checklist

```javascript
// [1] Check iframe loaded
console.log('Iframe src:', iframe.src);

// [2] Check PostMessage received
console.log('PostMessage received:', event.data);

// [3] Check Blob created
console.log('Blob size:', blob.size, 'type:', blob.type);

// [4] Check File created
console.log('File:', file.name, file.size, file.type);

// [5] Check file input
console.log('File input:', fileInput);
console.log('Files:', fileInput.files);
console.log('File count:', fileInput.files.length);
```

---

## 5. PRODUCTION CHECKLIST

### 5.1. Deploy Audio Library

```bash
# [1] Deploy to GitHub Pages
# (See README.md section 9)

# [2] Get URL
https://your-username.github.io/audio-library-web/
```

### 5.2. Update Tool

```javascript
// [1] Update AUDIO_LIBRARY_URL
const AUDIO_LIBRARY_URL = 'https://your-username.github.io/audio-library-web/';

// [2] Update ALLOWED_ORIGINS
const ALLOWED_ORIGINS = [
    'https://your-username.github.io'
];

// [3] Remove localhost origins (production only)
```

### 5.3. Security

```javascript
// ✅ LUÔN check origin
if (!ALLOWED_ORIGINS.includes(event.origin)) {
    return;
}

// ✅ KHÔNG dùng targetOrigin: '*' với sensitive data
window.parent.postMessage(message, 'https://specific-domain.com');

// ✅ Validate tất cả inputs
if (!fileName || !fileData) {
    return;
}
```

### 5.4. Error Handling

```javascript
// ✅ Try-catch cho tất cả async operations
try {
    const blob = await fetchBlob();
} catch (error) {
    console.error('Error:', error);
    showErrorToast(error.message);
}

// ✅ Fallback cho các features không support
if (!window.DataTransfer) {
    console.warn('DataTransfer not supported');
    // Fallback logic...
}
```

### 5.5. Performance

```javascript
// ✅ Lazy load iframe
if (!iframe.src || iframe.src === 'about:blank') {
    iframe.src = AUDIO_LIBRARY_URL;
}

// ✅ Clear iframe khi đóng
iframe.src = 'about:blank';

// ✅ Remove event listeners khi không dùng
window.removeEventListener('message', handler);
```

---

## 🎯 FINAL CHECKLIST

```
□ Step 1: Đã thêm HTML structure (button + modal)
□ Step 2: Đã thêm CSS styles
□ Step 3: Đã thêm JavaScript logic (modal + PostMessage)
□ Step 4: Đã update AUDIO_LIBRARY_URL
□ Step 5: Đã update ALLOWED_ORIGINS
□ Step 6: Đã update file input ID
□ Step 7: Đã test local (localhost)
□ Step 8: Đã deploy Audio Library (GitHub Pages)
□ Step 9: Đã test production
□ Step 10: Đã check security (origin, validation)
□ Step 11: Đã check error handling
□ Step 12: Đã check performance (lazy load, clear)
□ Step 13: Đã test trên mobile
□ Step 14: Đã update documentation
```

---

**🎉 Hoàn thành! Audio Library đã được tích hợp thành công vào Tool.**

Nếu gặp vấn đề, check lại:
1. Console logs (errors?)
2. Origin matching (PostMessage)
3. File input ID (đúng chưa?)
4. iframe src (load được chưa?)

---

**Happy Coding! 🚀**

