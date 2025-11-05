// ================================
// APPWRITE CONFIGURATION
// ================================

// Appwrite SDK
const APPWRITE_CONFIG = {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId: '6905b32c00025b5baa97',
    databaseId: '690ad1160008e97db4f5',
    collectionId: 'audio-files',
    bucketId: '690ad36b0012a8035cfd'
};

// Admin password hash (SHA-256)
// Mật khẩu mặc định: "admin123" 
// Để đổi: dùng tool SHA-256 hash generator online
const ADMIN_PASSWORD_HASH = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';

// Initialize Appwrite
const { Client, Databases, Storage, ID, Query } = Appwrite;

const client = new Client();
client
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.projectId);

const databases = new Databases(client);
const storage = new Storage(client);

// ================================
// AUTHENTICATION
// ================================

async function hashPassword(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function verifyAdminPassword(password) {
    const hash = await hashPassword(password);
    return hash === ADMIN_PASSWORD_HASH;
}

// ================================
// UPLOAD FUNCTIONS
// ================================

async function uploadAudioFile(file, metadata) {
    try {
        // 1. Upload file to Storage
        console.log('📤 Uploading file to storage...');
        const fileUpload = await storage.createFile(
            APPWRITE_CONFIG.bucketId,
            ID.unique(),
            file
        );
        
        // 2. Get file URL
        const fileUrl = storage.getFileView(
            APPWRITE_CONFIG.bucketId,
            fileUpload.$id
        );
        
        // 3. Save metadata to Database
        console.log('💾 Saving metadata to database...');
        const document = await databases.createDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.collectionId,
            ID.unique(),
            {
                title: metadata.title,
                fileName: file.name,
                category: metadata.category,
                size: formatFileSize(file.size),
                duration: metadata.duration || '0:00',
                fileId: fileUpload.$id,
                url: fileUrl.href,
                description: metadata.description || '',
                uploadDate: new Date().toISOString()
            }
        );
        
        console.log('✅ Upload successful!', document);
        return {
            success: true,
            document,
            fileUrl: fileUrl.href
        };
        
    } catch (error) {
        console.error('❌ Upload failed:', error);
        throw error;
    }
}

// ================================
// FETCH FUNCTIONS
// ================================

async function fetchAudioLibrary() {
    try {
        console.log('📚 Fetching audio library from Appwrite...');
        const response = await databases.listDocuments(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.collectionId,
            [
                Query.orderDesc('uploadDate'),
                Query.limit(100)
            ]
        );
        
        console.log(`✅ Loaded ${response.documents.length} audio files`);
        return response.documents;
        
    } catch (error) {
        console.error('❌ Failed to fetch audio library:', error);
        return [];
    }
}

async function deleteAudioFile(documentId, fileId) {
    try {
        // 1. Delete from storage
        await storage.deleteFile(
            APPWRITE_CONFIG.bucketId,
            fileId
        );
        
        // 2. Delete from database
        await databases.deleteDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.collectionId,
            documentId
        );
        
        console.log('✅ File deleted successfully');
        return { success: true };
        
    } catch (error) {
        console.error('❌ Delete failed:', error);
        throw error;
    }
}

// ================================
// UTILITY FUNCTIONS
// ================================

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

async function getAudioDuration(file) {
    return new Promise((resolve) => {
        const audio = document.createElement('audio');
        audio.preload = 'metadata';
        
        audio.onloadedmetadata = function() {
            window.URL.revokeObjectURL(audio.src);
            const duration = audio.duration;
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);
            resolve(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        };
        
        audio.onerror = function() {
            resolve('0:00');
        };
        
        audio.src = URL.createObjectURL(file);
    });
}

// ================================
// EXPORT
// ================================

window.AppwriteService = {
    uploadAudioFile,
    fetchAudioLibrary,
    deleteAudioFile,
    verifyAdminPassword,
    getAudioDuration,
    config: APPWRITE_CONFIG
};

console.log('✅ Appwrite Service initialized');

