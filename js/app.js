// 1. PINDAHKAN KE LUAR agar bisa diakses oleh onclick di HTML
window.closeModal = function() {
    const modal = document.getElementById('detailModal');
    const iframe = document.getElementById('modalVideo');
    
    if (modal) {
        modal.classList.add('hidden');
    }
    if (iframe) {
        iframe.src = ''; 
    }
};

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

    // --- LOGIKA TOUCH FEEDBACK YANG SUDAH DITUKAR ---
    container.addEventListener('touchstart', (e) => {
        // 1. Jika yang ditekan adalah area tombol, JANGAN gerakkan kartu
        if (e.target.closest('button')) return;

        // 2. Jika yang ditekan area kartu, buat kartu membal mantap (0.92)
        const card = e.target.closest('.card-interactive');
        if (card) {
            card.style.transform = 'scale(0.92)';
            card.style.filter = 'brightness(0.9)'; // Memberi efek visual ditekan
        }
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        const card = e.target.closest('.card-interactive');
        if (card) {
            card.style.transform = 'scale(1)';
            card.style.filter = 'brightness(1)';
        }
    }, { passive: true });

    container.addEventListener('touchcancel', (e) => {
        const card = e.target.closest('.card-interactive');
        if (card) {
            card.style.transform = 'scale(1)';
            card.style.filter = 'brightness(1)';
        }
    }, { passive: true });

    // Fungsi khusus tombol (Hanya tombol yang mengecil sedikit, kartu diam)
    window.handleBtnVideo = (e, index) => {
        e.stopPropagation();
        
        // Memberikan feedback visual instan pada tombol saja
        const btn = e.target;
        btn.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            window.openModal(index, 'video');
        }, 100);
    };

    // Fungsi modal utama
    window.openModal = (index, mode) => {
        const s = services[index];
        const modal = document.getElementById('detailModal');
        const iframe = document.getElementById('modalVideo');
        const contentOverlay = document.getElementById('modalContentOverlay');

        if (!modal || !iframe || !contentOverlay) return;

        document.getElementById('modalTitle').innerText = s.title;
        document.getElementById('modalDesc').innerText = s.desc;
        document.getElementById('modalDuration').innerText = s.duration;
        document.getElementById('modalPrice').innerText = s.price;
        
        const waMsg = `Assalamualaikum, saya ingin memesan ${s.title}.%0ANama: %0Alamat: %0APesan: %0A`;
        document.getElementById('btnWA').href = `https://wa.me/6288216740444?text=${waMsg}`;

        if (mode === 'video') {
            const videoId = s.video.split('/').pop();
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${videoId}`;
            iframe.classList.remove('hidden');
            // Warna Overlay untuk Video (Gelap)
            contentOverlay.className = "absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end min-h-[40%] bg-gradient-to-t from-black via-black/60 to-transparent text-white";
        } else {
            iframe.src = '';
            iframe.classList.add('hidden');
            // Warna Overlay untuk Deskripsi (Putih Bersih)
            contentOverlay.className = "absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end min-h-[40%] bg-white text-gray-800";
        }
        
        modal.classList.remove('hidden');
    };

    window.handleBtnVideo = (e, index) => {
        e.stopPropagation(); 
        window.openModal(index, 'video');
    };

    // --- RENDER ---
    
    // 1. Kartu Pertama (Disesuaikan agar panggil openModal)
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

    // 2. Kartu Grid (Sudah Benar)
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
                        class="mt-2 bg-white/20 text-white text-[12px] px-5 py-2 rounded-full backdrop-blur-sm border border-white/20 shadow-sm font-bold"
                        style="transition: transform 0.1s ease;"> LIHAT VIDEO
                    </button>
                </div>
            </div>
        `;
    }

    container.innerHTML = firstCardHtml + `<div class="grid grid-cols-2 gap-4">${gridCardsHtml}</div>`;
});
