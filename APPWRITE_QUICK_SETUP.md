# ⚡ APPWRITE SETUP NHANH - 5 PHÚT

## 1. TẠO PROJECT

1. Vào: https://cloud.appwrite.io/
2. Đăng ký/Đăng nhập
3. **Create Project** → Tên: `Audio Library`
4. Copy **Project ID**

## 2. TẠO DATABASE

1. Click **Databases** → **Create Database**
2. Tên: `audio-library-db`
3. Copy **Database ID**

## 3. TẠO COLLECTION

1. Click **Create Collection**
2. Tên: `audio-files`
3. Copy **Collection ID**
4. **Permissions**: 
   - Create: `Any`
   - Read: `Any`
   - Update: `Any`
   - Delete: `Any`

**Attributes** (Add Attribute):
- `title` - String - Size: 255 - Required ✅
- `fileName` - String - Size: 255 - Required ✅
- `category` - String - Size: 50 - Required ✅
- `size` - String - Size: 50
- `duration` - String - Size: 20
- `fileId` - String - Size: 255 - Required ✅
- `url` - String - Size: 1000 - Required ✅
- `description` - String - Size: 1000
- `uploadDate` - String - Size: 50

## 4. TẠO STORAGE

1. Click **Storage** → **Create Bucket**
2. Tên: `audio-storage`
3. Copy **Bucket ID**
4. **Permissions**: Same as Collection
5. **File Extensions**: `.mp3,.wav,.m4a,.ogg`
6. **Maximum File Size**: `50MB` (hoặc tùy chọn)

## 5. CẬP NHẬT CODE

Mở `appwrite-config.js`, thay:
```javascript
const APPWRITE_CONFIG = {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId: 'YOUR_PROJECT_ID', // ← Paste Project ID
    databaseId: 'YOUR_DATABASE_ID', // ← Paste Database ID
    collectionId: 'YOUR_COLLECTION_ID', // ← Paste Collection ID
    bucketId: 'YOUR_BUCKET_ID' // ← Paste Bucket ID
};
```

✅ XONG! Deploy lại: `git add . && git commit -m "Config Appwrite" && git push`

