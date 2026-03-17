// 1. GLOBAL VARIABLES & YOUTUBE API
let player;
let progressInterval;

// Fungsi ini HARUS di luar DOMContentLoaded agar dipanggil oleh YouTube SDK
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'iv_load_policy': 3,
            'fs': 0
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
};

function onPlayerStateChange(event) {
    const playIcon = document.getElementById('playIcon');
    if (event.data == YT.PlayerState.PLAYING) {
        if (playIcon) playIcon.className = "fas fa-pause";
        startTracking();
    } else {
        if (playIcon) playIcon.className = "fas fa-play";
        clearInterval(progressInterval);
    }
}

function startTracking() {
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        if (player && player.getDuration) {
            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();
            if (duration > 0) {
                const percent = (currentTime / duration) * 100;
                document.getElementById('progressBar').style.width = percent + '%';
                
                const mins = Math.floor(currentTime / 60);
                const secs = Math.floor(currentTime % 60);
                document.getElementById('videoTime').innerText = 
                    `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }
        }
    }, 500);
}

// Global Controls
window.togglePlay = () => {
    if (!player) return;
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
};

window.closeModal = function() {
    document.getElementById('detailModal').classList.add('hidden');
    if (player && player.stopVideo) player.stopVideo();
    clearInterval(progressInterval);
};

// 2. MAIN LOGIC
document.addEventListener("DOMContentLoaded", () => {
    const services = [
        { title: 'FUN GAME', icon: 'fa-gamepad', bg: 'bg_game.png', desc: 'Bermain game edukatif seru untuk melatih motorik.', duration: '60 Menit', price: 'Rp 50.000', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'STORY TELLING', icon: 'fa-book-open', bg: 'bg_story.png', desc: 'Mendengar dongeng imajinatif yang penuh pesan moral.', duration: '90 Menit', price: 'Rp 300.000', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'BUAT KOMIK', icon: 'fa-pen-nib', bg: 'bg_komik.png', desc: 'Belajar menggambar dan membuat alur cerita komik.', duration: '90 Menit', price: 'Rp 400.000', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'SULAP TEMATIK', icon: 'fa-magic', bg: 'bg_sulap.png', desc: 'Pertunjukan sulap interaktif yang memukau anak-anak.', duration: '30 Menit', price: 'Rp 200.000', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'NOBAR KLIP 3D', icon: 'fa-vr-cardboard', bg: 'bg_nobar.png', desc: 'Menonton klip edukasi 3D dengan pengalaman visual unik.', duration: '60 Menit', price: 'Rp 40.000', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'PARENTING', icon: 'fa-heart', bg: 'bg_parenting.png', desc: 'Sesi konsultasi untuk gaya pengasuhan yang positif.', duration: '90 Menit', price: 'Rp 150.000', video: 'https://www.youtube.com/embed/iOSSCqybm3U' },
        { title: 'OUTBOUND', icon: 'fa-campground', bg: 'bg_outbound.png', desc: 'Petualangan seru di luar ruangan untuk kerjasama tim.', duration: '180 Menit', price: 'Rp 500.000', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ];

    const container = document.getElementById('menuContainer');
    if (!container) return;

    // Feedback Touch
    container.addEventListener('touchstart', (e) => {
        if (e.target.closest('button')) return;
        const card = e.target.closest('.card-interactive');
        if (card) {
            card.style.transform = 'scale(0.92)';
            card.style.filter = 'brightness(0.9)';
        }
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        const card = e.target.closest('.card-interactive');
        if (card) {
            card.style.transform = 'scale(1)';
            card.style.filter = 'brightness(1)';
        }
    }, { passive: true });

    // Fungsi Buka Modal
    window.openModal = (index, mode) => {
        const s = services[index];
        const modal = document.getElementById('detailModal');
        const descMode = document.getElementById('modalDescMode');
        const videoMode = document.getElementById('modalVideoMode');

        modal.classList.remove('hidden');

        if (mode === 'video') {
            descMode.classList.add('hidden');
            videoMode.classList.remove('hidden');
            const videoId = s.video.split('/').pop();
            if (player && player.loadVideoById) {
                player.loadVideoById(videoId);
            }
        } else {
            videoMode.classList.add('hidden');
            descMode.classList.remove('hidden');
            if (player && player.stopVideo) player.stopVideo();
            
            document.getElementById('modalTitle').innerText = s.title;
            document.getElementById('modalDesc').innerText = s.desc;
            document.getElementById('modalDuration').innerText = s.duration;
            document.getElementById('modalPrice').innerText = s.price;
            document.getElementById('btnWA').href = `https://wa.me/6288216740444?text=Halo Totitu, saya mau pesan ${s.title}`;
        }
    };

    window.handleBtnVideo = (e, index) => {
        e.stopPropagation();
        const btn = e.currentTarget;
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            window.openModal(index, 'video');
        }, 100);
    };

    // Rendering
    const firstCardHtml = `
        <div class="card-image-base card-interactive h-32 flex flex-col justify-center p-5 mb-4 shadow-lg cursor-pointer" 
             onclick="openModal(0, 'desc')" 
             style="background-image: url('assets/images/${services[0].bg}'); transition: transform 0.1s ease;">
            <div class="card-overlay"></div>
            <div class="relative z-10 pointer-events-none"> 
                <h3 class="text-white text-lg font-bold text-shadow-bold">${services[0].title}</h3>
                <i class="fas ${services[0].icon} text-white text-3xl mt-1"></i>
            </div>
        </div>
    `;

    let gridCardsHtml = '';
    for (let i = 1; i < services.length; i++) {
        const s = services[i];
        gridCardsHtml += `
            <div class="card-image-base card-interactive h-32 flex flex-col justify-end p-4 cursor-pointer" 
                 onclick="openModal(${i}, 'desc')" 
                 style="background-image: url('assets/images/${s.bg}'); transition: transform 0.2s ease;">
                <div class="card-overlay"></div>
                <div class="relative z-10">
                    <h3 class="text-white text-[13px] font-bold text-shadow-bold pointer-events-none uppercase">${s.title}</h3>
                    <button 
                        onclick="handleBtnVideo(event, ${i})"
                        class="mt-2 bg-white/20 text-white text-[11px] px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 shadow-sm font-bold uppercase transition-transform duration-100 ease-out active:scale-90">
                        LIHAT VIDEO
                    </button>
                </div>
            </div>
        `;
    }
    container.innerHTML = firstCardHtml + `<div class="grid grid-cols-2 gap-4">${gridCardsHtml}</div>`;
});
