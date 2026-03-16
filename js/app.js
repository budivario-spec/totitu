document.addEventListener("DOMContentLoaded", () => {
    // Data layanan dengan detail tambahan
    const services = [
        { title: 'FUN GAME', icon: 'fa-gamepad', bg: 'bg_game.png', desc: 'Bermain game edukatif seru untuk melatih motorik.', duration: '60 Menit', price: 'Rp 50.000', video: 'https://youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'STORY TELLING', icon: 'fa-book-open', bg: 'bg_story.png', desc: 'Mendengar dongeng imajinatif yang penuh pesan moral.', duration: '45 Menit', price: 'Rp 30.000', video: 'https://youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'BUAT KOMIK', icon: 'fa-pen-nib', bg: 'bg_komik.png', desc: 'Belajar menggambar dan membuat alur cerita komik.', duration: '90 Menit', price: 'Rp 75.000', video: 'https://youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'SULAP TEMATIK', icon: 'fa-magic', bg: 'bg_sulap.png', desc: 'Pertunjukan sulap interaktif yang memukau anak-anak.', duration: '30 Menit', price: 'Rp 100.000', video: 'https://youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'NOBAR KLIP 3D', icon: 'fa-vr-cardboard', bg: 'bg_nobar.png', desc: 'Menonton klip edukasi 3D dengan pengalaman visual unik.', duration: '60 Menit', price: 'Rp 40.000', video: 'https://youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'PARENTING', icon: 'fa-heart', bg: 'bg_parenting.png', desc: 'Sesi konsultasi untuk gaya pengasuhan yang positif.', duration: '120 Menit', price: 'Rp 150.000', video: 'https://www.youtube.com/embed/iOSSCqybm3U' },
        { title: 'OUTBOUND', icon: 'fa-campground', bg: 'bg_outbound.png', desc: 'Petualangan seru di luar ruangan untuk kerjasama tim.', duration: '180 Menit', price: 'Rp 200.000', video: 'https://youtube.com/embed/dQw4w9WgXcQ' }
    ];

    const container = document.getElementById('menuContainer');
    if (!container) return;

    // Fungsi untuk membuka modal dan mengisi datanya
    window.showDetail = (index) => {
        const s = services[index];
        document.getElementById('modalTitle').innerText = s.title;
        document.getElementById('modalVideo').src = s.video;
        document.getElementById('modalDesc').innerText = s.desc;
        document.getElementById('modalDuration').innerText = s.duration;
        document.getElementById('modalPrice').innerText = s.price;
        
        // Format link WhatsApp
        const waMsg = `Halo Admin, saya ingin memesan ${s.title}.%0ANama:%0AAlamat:%0APesan:%0A`;
        document.getElementById('btnWA').href = `https://wa.me/628123456789?text=${waMsg}`;
        
        document.getElementById('detailModal').classList.remove('hidden');
    };

    function closeModal() {
    const modal = document.getElementById('detailModal');
    const videoIframe = document.getElementById('modalVideo');
    
    // 1. Sembunyikan modal
    modal.classList.add('hidden');
    
    // 2. Hentikan suara video dengan mengosongkan src
    videoIframe.src = "";
}

    // Render Kartu Pertama
    container.innerHTML = `
        <div class="card-image-base card-interactive h-32 flex flex-col justify-center p-5 mb-4 cursor-pointer" 
             onclick="showDetail(0)" style="background-image: url('assets/images/${services[0].bg}');">
            <div class="card-overlay"></div>
            <div class="card-content-wrapper z-10 pointer-events-none">
                <h3 class="text-white text-lg font-bold">${services[0].title}</h3>
                <i class="fas ${services[0].icon} text-white text-3xl mt-1"></i>
            </div>
        </div>
    `;

    // Render sisanya dalam Grid
    let gridHtml = '<div class="grid grid-cols-2 gap-4">';
    for (let i = 1; i < services.length; i++) {
        gridHtml += `
            <div class="card-image-base card-interactive h-32 flex flex-col justify-end p-4 cursor-pointer" 
                 onclick="showDetail(${i})" style="background-image: url('assets/images/${services[i].bg}');">
                <div class="card-overlay"></div>
                <div class="card-content-wrapper z-10 pointer-events-none">
                    <h3 class="text-white text-[10px] font-bold">${services[i].title}</h3>
                    <button class="mt-1 bg-white/20 text-white text-[9px] px-3 py-1 rounded-full btn-custom backdrop-blur-sm border border-white/20">LIHAT</button>
                </div>
            </div>
        `;
    }
    gridHtml += '</div>';
    container.insertAdjacentHTML('beforeend', gridHtml);
});
