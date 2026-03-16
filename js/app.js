document.addEventListener("DOMContentLoaded", () => {
    const services = [
        { id: 'fun-game', title: 'FUN GAME', icon: 'fa-gamepad', bg: 'bg_game.png' },
        { id: 'story-telling', title: 'STORY TELLING', icon: 'fa-book-open', bg: 'bg_story.png' },
        { id: 'membuat-komik', title: 'BUAT KOMIK', icon: 'fa-pen-nib', bg: 'bg_komik.png' },
        { id: 'sulap-tematik', title: 'SULAP TEMATIK', icon: 'fa-magic', bg: 'bg_sulap.png' },
        { id: 'nobar-klip-3d', title: 'NOBAR KLIP 3D', icon: 'fa-vr-cardboard', bg: 'bg_nobar.png' },
        { id: 'parenting', title: 'PARENTING', icon: 'fa-heart', bg: 'bg_parenting.png' },
        { id: 'outbound', title: 'OUTBOUND', icon: 'fa-campground', bg: 'bg_outbound.png' }
    ];

    const container = document.getElementById('menuContainer');
    if (container) {
        // Kartu Pertama (Fun Game) tampil lebar penuh
        const first = services[0];
        container.innerHTML += `
            <div class="card-image-base card-interactive h-32 flex flex-col justify-center p-5" 
                 style="background-image: url('assets/images/${first.bg}');">
                <div class="card-overlay"></div>
                <div class="card-content-wrapper">
                    <h3 class="text-white text-md font-bold">${first.title}</h3>
                    <i class="fas ${first.icon} text-white text-3xl mt-1"></i>
                </div>
            </div>
        `;

        // Sisa kartu tampil dalam grid 2 kolom
        let gridHtml = '<div class="grid grid-cols-2 gap-4">';
        
        for (let i = 1; i < services.length; i++) {
            const s = services[i];
            gridHtml += `
                <div class="card-image-base card-interactive h-32 flex flex-col justify-end p-4" 
                     style="background-image: url('assets/images/${s.bg}');">
                    <div class="card-overlay"></div>
                    <div class="card-content-wrapper">
                        <h3 class="text-white text-xs font-bold">${s.title}</h3>
                        <button class="mt-1 bg-white/20 text-white text-[10px] px-3 py-1 rounded-full btn-custom backdrop-blur-sm border border-white/30">
                            LIHAT
                        </button>
                    </div>
                </div>
            `;
            
            // Tutup dan buka grid baru setiap 2 item untuk menjaga struktur
            if (i % 2 === 0 && i !== services.length - 1) {
                gridHtml += '</div><div class="grid grid-cols-2 gap-4">';
            }
        }
        gridHtml += '</div>';
        container.innerHTML += gridHtml;
    }

    // Registrasi Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then((reg) => console.log('SW terdaftar!'))
            .catch((err) => console.log('SW gagal:', err));
    }
});
