# ⚡ DEPLOY NHANH - GITHUB PAGES

## 🎯 3 LỆNH DUY NHẤT

### 1️⃣ Lần đầu tiên (Setup)

```bash
cd audio-library-web
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/audio-library.git
git branch -M main
git push -u origin main
```

**SAU ĐÓ:**
- Vào GitHub repo → Settings → Pages
- Source: `main` branch, `/ (root)` folder
- Save → Đợi 2 phút

✅ **Live tại**: `https://YOUR-USERNAME.github.io/audio-library/`

---

### 2️⃣ Cập nhật sau này (Mỗi lần sửa code)

```bash
git add .
git commit -m "Update something"
git push
```

---

## 🪟 WINDOWS - Double-click để deploy

Chạy file `deploy.bat` → Nhập commit message → Enter

---

## 🍎 MAC/LINUX - Chạy script

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🔥 THAY YOUR-USERNAME

Trong tất cả lệnh trên, thay `YOUR-USERNAME` bằng username GitHub của bạn!

VD: Nếu username là `john123`, thì:
```
https://github.com/john123/audio-library.git
https://john123.github.io/audio-library/
```

---

## 📞 CẦN TRỢ GIÚP?

Xem file `DEPLOY_GITHUB_PAGES.md` để được hướng dẫn chi tiết!

