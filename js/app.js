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

    // --- FITUR BARU: GLOBAL TOUCH FEEDBACK ---
    // Menggunakan Event Delegation agar kartu tetap membal meski setelah scroll
    container.addEventListener('touchstart', (e) => {
        const card = e.target.closest('.card-interactive');
        if (card) card.style.transform = 'scale(0.85)';
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        const card = e.target.closest('.card-interactive');
        if (card) card.style.transform = 'scale(1)';
    }, { passive: true });

    container.addEventListener('touchcancel', (e) => {
        const card = e.target.closest('.card-interactive');
        if (card) card.style.transform = 'scale(1)';
    }, { passive: true });

    window.showDetail = (index) => {
        const s = services[index];
        const modal = document.getElementById('detailModal');
        const iframe = document.getElementById('modalVideo');

        if (!modal || !iframe) return;

        document.getElementById('modalTitle').innerText = s.title;
        iframe.src = s.video; 
        document.getElementById('modalDesc').innerText = s.desc;
        document.getElementById('modalDuration').innerText = s.duration;
        document.getElementById('modalPrice').innerText = s.price;
        
        const waMsg = `Assalamualaikum, saya ingin memesan ${s.title}.%0ANama: %0Alamat: %0APesan: %0A`;
        document.getElementById('btnWA').href = `https://wa.me/6288216740444?text=${waMsg}`;
        
        modal.classList.remove('hidden');
    };

    // --- RENDER ---
    const firstCardHtml = `
        <div class="card-image-base card-interactive h-32 flex flex-col justify-center p-5 mb-4 shadow-lg cursor-pointer" 
             onclick="showDetail(0)" 
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
                 onclick="showDetail(${i})" 
                 style="background-image: url('assets/images/${s.bg}'); transition: transform 0.2s ease;">
                <div class="card-overlay"></div>
                <div class="relative z-10 pointer-events-none">
                    <h3 class="text-white text-[13px] font-bold text-shadow-bold">${s.title}</h3>
                    <button class="mt-1 bg-white/20 text-white text-[12px] px-5 py-2 rounded-full backdrop-blur-sm border border-white/20">LIHAT</button>
                </div>
            </div>
        `;
    }

    container.innerHTML = firstCardHtml + `<div class="grid grid-cols-2 gap-4">${gridCardsHtml}</div>`;
});
