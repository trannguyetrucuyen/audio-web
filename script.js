// ================================
// AUDIO DATA
// ================================

// Sample audio library data
// In production, this could be loaded from a JSON file or API
const AUDIO_LIBRARY = [
    {
        id: 1,
        title: "Nhạc nền vui tươi",
        fileName: "happy-background.mp3",
        category: "music",
        size: "2.5 MB",
        duration: "3:45",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        description: "Nhạc nền vui tươi, phù hợp cho video giới thiệu"
    },
    {
        id: 2,
        title: "Giọng nói chào mừng",
        fileName: "welcome-voice.mp3",
        category: "voice",
        size: "1.2 MB",
        duration: "1:30",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        description: "Giọng nói chào mừng khách hàng"
    },
    {
        id: 3,
        title: "Tiếng chuông thông báo",
        fileName: "notification-bell.mp3",
        category: "sound-effect",
        size: "0.5 MB",
        duration: "0:05",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        description: "Tiếng chuông cho thông báo"
    },
    {
        id: 4,
        title: "Âm thanh thiên nhiên",
        fileName: "nature-ambience.mp3",
        category: "ambience",
        size: "3.8 MB",
        duration: "5:20",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        description: "Âm thanh thiên nhiên thư giãn"
    },
    {
        id: 5,
        title: "Nhạc nền buồn",
        fileName: "sad-background.mp3",
        category: "music",
        size: "2.8 MB",
        duration: "4:10",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        description: "Nhạc nền buồn, cảm xúc"
    },
    {
        id: 6,
        title: "Giọng nói hướng dẫn",
        fileName: "tutorial-voice.mp3",
        category: "voice",
        size: "2.1 MB",
        duration: "2:45",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        description: "Giọng nói hướng dẫn sử dụng"
    },
    {
        id: 7,
        title: "Hiệu ứng thành công",
        fileName: "success-sound.mp3",
        category: "sound-effect",
        size: "0.3 MB",
        duration: "0:03",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        description: "Âm thanh khi hoàn thành nhiệm vụ"
    },
    {
        id: 8,
        title: "Âm thanh văn phòng",
        fileName: "office-ambience.mp3",
        category: "ambience",
        size: "4.2 MB",
        duration: "6:00",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        description: "Âm thanh môi trường văn phòng"
    },
    {
        id: 9,
        title: "Nhạc nền sôi động",
        fileName: "energetic-background.mp3",
        category: "music",
        size: "3.2 MB",
        duration: "4:30",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        description: "Nhạc nền sôi động, đầy năng lượng"
    },
    {
        id: 10,
        title: "Giọng nói thông báo",
        fileName: "announcement-voice.mp3",
        category: "voice",
        size: "1.5 MB",
        duration: "1:50",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        description: "Giọng nói thông báo"
    }
];

// ================================
// STATE MANAGEMENT
// ================================

let currentAudioList = [...AUDIO_LIBRARY];
let currentPage = 1;
const itemsPerPage = 6;
let currentPreviewAudio = null;

// ================================
// DOM ELEMENTS
// ================================

const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const refreshBtn = document.getElementById('refresh-btn');
const audioListContainer = document.getElementById('audio-list');
const paginationContainer = document.getElementById('pagination');

// Preview Modal
const previewModal = document.getElementById('preview-modal');
const closePreviewBtn = document.getElementById('close-preview-btn');
const cancelPreviewBtn = document.getElementById('cancel-preview-btn');
const useFromPreviewBtn = document.getElementById('use-from-preview-btn');
const previewTitle = document.getElementById('preview-title');
const previewAudio = document.getElementById('preview-audio');
const previewSource = document.getElementById('preview-source');
const previewFilename = document.getElementById('preview-filename');
const previewCategory = document.getElementById('preview-category');
const previewSize = document.getElementById('preview-size');

// Toast
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// ================================
// INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎵 Audio Library Web App initialized');
    renderAudioList();
    setupEventListeners();
});

// ================================
// EVENT LISTENERS
// ================================

function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Filter
    categoryFilter.addEventListener('change', handleFilter);
    
    // Refresh
    refreshBtn.addEventListener('click', handleRefresh);
    
    // Preview Modal
    closePreviewBtn.addEventListener('click', closePreview);
    cancelPreviewBtn.addEventListener('click', closePreview);
    useFromPreviewBtn.addEventListener('click', useAudioFromPreview);
    
    // Close modal on background click
    previewModal.addEventListener('click', function(e) {
        if (e.target === previewModal) {
            closePreview();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && previewModal.classList.contains('show')) {
            closePreview();
        }
    });
}

// ================================
// RENDER FUNCTIONS
// ================================

function renderAudioList() {
    audioListContainer.innerHTML = '';
    
    // Filter and paginate
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedList = currentAudioList.slice(startIndex, endIndex);
    
    if (paginatedList.length === 0) {
        renderEmptyState();
        return;
    }
    
    paginatedList.forEach(audio => {
        const audioItem = createAudioItem(audio);
        audioListContainer.appendChild(audioItem);
    });
    
    renderPagination();
}

function createAudioItem(audio) {
    const item = document.createElement('div');
    item.className = 'audio-item';
    item.setAttribute('data-id', audio.id);
    
    // Icon based on category
    const iconMap = {
        'music': 'fa-music',
        'voice': 'fa-microphone',
        'sound-effect': 'fa-volume-up',
        'ambience': 'fa-tree'
    };
    
    const categoryNameMap = {
        'music': 'Nhạc',
        'voice': 'Giọng nói',
        'sound-effect': 'Hiệu ứng',
        'ambience': 'Môi trường'
    };
    
    item.innerHTML = `
        <div class="audio-header">
            <div class="audio-icon">
                <i class="fas ${iconMap[audio.category]}"></i>
            </div>
            <div class="audio-info">
                <div class="audio-title" title="${audio.title}">${audio.title}</div>
                <div class="audio-meta">
                    <span><i class="fas fa-clock"></i> ${audio.duration}</span>
                    <span><i class="fas fa-hdd"></i> ${audio.size}</span>
                </div>
            </div>
        </div>
        <div class="audio-category">${categoryNameMap[audio.category]}</div>
        <div class="audio-actions">
            <button class="btn btn-secondary btn-small preview-btn" data-id="${audio.id}">
                <i class="fas fa-play"></i>
                Nghe thử
            </button>
            <button class="btn btn-primary btn-small use-btn" data-id="${audio.id}">
                <i class="fas fa-check"></i>
                Sử dụng
            </button>
        </div>
    `;
    
    // Add event listeners
    const previewBtn = item.querySelector('.preview-btn');
    const useBtn = item.querySelector('.use-btn');
    
    previewBtn.addEventListener('click', () => openPreview(audio));
    useBtn.addEventListener('click', () => useAudio(audio));
    
    return item;
}

function renderEmptyState() {
    audioListContainer.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-folder-open"></i>
            <p>Không tìm thấy âm thanh nào phù hợp</p>
        </div>
    `;
    paginationContainer.innerHTML = '';
}

function renderPagination() {
    const totalPages = Math.ceil(currentAudioList.length / itemsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let html = '';
    
    // Previous button
    html += `<button ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">
        <i class="fas fa-chevron-left"></i>
    </button>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || 
            i === totalPages || 
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            html += `<button class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += `<button disabled>...</button>`;
        }
    }
    
    // Next button
    html += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">
        <i class="fas fa-chevron-right"></i>
    </button>`;
    
    paginationContainer.innerHTML = html;
}

// ================================
// FILTER & SEARCH
// ================================

function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    currentAudioList = AUDIO_LIBRARY.filter(audio => {
        const matchesSearch = audio.title.toLowerCase().includes(query) ||
                             audio.description.toLowerCase().includes(query);
        const matchesCategory = categoryFilter.value === 'all' || audio.category === categoryFilter.value;
        return matchesSearch && matchesCategory;
    });
    
    currentPage = 1;
    renderAudioList();
}

function handleFilter(e) {
    const category = e.target.value;
    const query = searchInput.value.toLowerCase().trim();
    
    currentAudioList = AUDIO_LIBRARY.filter(audio => {
        const matchesSearch = audio.title.toLowerCase().includes(query) ||
                             audio.description.toLowerCase().includes(query);
        const matchesCategory = category === 'all' || audio.category === category;
        return matchesSearch && matchesCategory;
    });
    
    currentPage = 1;
    renderAudioList();
}

function handleRefresh() {
    // Reset filters
    searchInput.value = '';
    categoryFilter.value = 'all';
    currentAudioList = [...AUDIO_LIBRARY];
    currentPage = 1;
    
    // Animate refresh button
    refreshBtn.querySelector('i').style.animation = 'spin 1s ease';
    setTimeout(() => {
        refreshBtn.querySelector('i').style.animation = '';
    }, 1000);
    
    renderAudioList();
    showToast('Đã làm mới danh sách âm thanh');
}

// ================================
// PAGINATION
// ================================

function goToPage(page) {
    currentPage = page;
    renderAudioList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ================================
// PREVIEW MODAL
// ================================

function openPreview(audio) {
    currentPreviewAudio = audio;
    
    previewTitle.textContent = audio.title;
    previewFilename.textContent = audio.fileName;
    previewCategory.textContent = getCategoryName(audio.category);
    previewSize.textContent = audio.size;
    previewSource.src = audio.url;
    previewAudio.load();
    
    previewModal.classList.add('show');
    
    console.log('🎧 Preview opened:', audio.title);
}

function closePreview() {
    previewModal.classList.remove('show');
    previewAudio.pause();
    currentPreviewAudio = null;
    
    console.log('🎧 Preview closed');
}

function useAudioFromPreview() {
    if (currentPreviewAudio) {
        useAudio(currentPreviewAudio);
        closePreview();
    }
}

// ================================
// USE AUDIO (Send to Parent)
// ================================

async function useAudio(audio) {
    console.log('📤 Using audio:', audio.title);
    showToast('Đang tải file âm thanh...');
    
    try {
        // Fetch audio file as blob
        const response = await fetch(audio.url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        
        // Convert blob to base64
        const base64Data = await blobToBase64(blob);
        
        console.log('✅ Audio loaded, size:', blob.size, 'bytes');
        
        // Send PostMessage to parent window
        const message = {
            type: 'USE_AUDIO',
            fileName: audio.fileName,
            fileData: base64Data,  // Base64 string (không có prefix "data:audio/mpeg;base64,")
            url: audio.url,  // Backup URL (có thể bị CORS)
            metadata: {
                title: audio.title,
                category: audio.category,
                size: audio.size,
                duration: audio.duration
            }
        };
        
        // Check if we're in an iframe
        if (window.parent && window.parent !== window) {
            window.parent.postMessage(message, '*');
            console.log('✅ PostMessage sent to parent:', message);
            showToast(`✅ Đã gửi file "${audio.fileName}" tới công cụ!`, 'success');
        } else {
            // If not in iframe, show warning
            console.warn('⚠️ Not in iframe, PostMessage not sent');
            showToast('⚠️ Web app phải được mở trong iframe để sử dụng tính năng này', 'warning');
        }
        
    } catch (error) {
        console.error('❌ Error using audio:', error);
        showToast(`❌ Lỗi: ${error.message}`, 'error');
    }
}

// ================================
// HELPER FUNCTIONS
// ================================

// Convert Blob to Base64
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            // Remove the "data:audio/mpeg;base64," prefix
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Get category display name
function getCategoryName(category) {
    const map = {
        'music': 'Nhạc',
        'voice': 'Giọng nói',
        'sound-effect': 'Hiệu ứng âm thanh',
        'ambience': 'Âm thanh môi trường'
    };
    return map[category] || category;
}

// Show toast notification
function showToast(message, type = 'success') {
    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const colorMap = {
        success: '#50fa7b',
        error: '#ff5555',
        warning: '#ffb86c',
        info: '#8be9fd'
    };
    
    const icon = toast.querySelector('i');
    icon.className = `fas ${iconMap[type]}`;
    toastMessage.textContent = message;
    toast.style.background = colorMap[type];
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ================================
// SPIN ANIMATION
// ================================

const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ================================
// EXPORT (for debugging in console)
// ================================

window.AudioLibraryApp = {
    audioList: AUDIO_LIBRARY,
    currentAudioList,
    useAudio,
    openPreview,
    showToast
};

console.log('✅ Audio Library App loaded successfully!');
console.log('📚 Total audio files:', AUDIO_LIBRARY.length);
console.log('🔧 Debug: window.AudioLibraryApp');

