document.addEventListener("DOMContentLoaded", () => {
    // Data menu aplikasi
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
        services.forEach(service => {
            container.innerHTML += `
                <div class="card-image-base card-interactive h-32 flex flex-col justify-end p-4" 
                     style="background-image: url('assets/images/${service.bg}');">
                    <div class="card-overlay"></div>
                    <div class="card-content-wrapper">
                        <h3 class="text-white text-xs">${service.title}</h3>
                        <button class="mt-1 bg-white/20 text-white text-[10px] px-3 py-1 rounded-full btn-custom backdrop-blur-sm">
                            <i class="fas ${service.icon} mr-1"></i> LIHAT
                        </button>
                    </div>
                </div>
            `;
        });
    }

    // Registrasi Service Worker di sini agar terpusat
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then((reg) => console.log('SW terdaftar, scope:', reg.scope))
            .catch((err) => console.log('SW gagal:', err));
    }
});
