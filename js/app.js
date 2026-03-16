document.addEventListener("DOMContentLoaded", () => {
    const services = [
        { title: 'FUN GAME', icon: 'fa-gamepad', bg: 'bg_game.png' }, // Index 0
        { title: 'STORY TELLING', icon: 'fa-book-open', bg: 'bg_story.png' }, // Index 1
        { title: 'BUAT KOMIK', icon: 'fa-pen-nib', bg: 'bg_komik.png' }, // Index 2
        { title: 'SULAP TEMATIK', icon: 'fa-magic', bg: 'bg_sulap.png' }, // Index 3
        { title: 'NOBAR KLIP 3D', icon: 'fa-vr-cardboard', bg: 'bg_nobar.png' }, // Index 4
        { title: 'PARENTING', icon: 'fa-heart', bg: 'bg_parenting.png' }, // Index 5
        { title: 'OUTBOUND', icon: 'fa-campground', bg: 'bg_outbound.png' } // Index 6
    ];

    const container = document.getElementById('menuContainer');
    if (container) {
        container.innerHTML = ''; // Bersihkan kontainer

        // 1. Render Kartu Pertama (Fun Game) secara terpisah
        const first = services[0];
        container.innerHTML += `
            <div class="card-image-base card-interactive h-32 flex flex-col justify-center p-5 mb-4" 
                 style="background-image: url('assets/images/${first.bg}'); background-size: cover; background-position: center;">
                <div class="card-overlay"></div>
                <div class="card-content-wrapper">
                    <h3 class="text-white text-md font-bold">${first.title}</h3>
                    <i class="fas ${first.icon} text-white text-4xl mt-1"></i>
                </div>
            </div>
        `;

        // 2. Kelompokkan sisa kartu (index 1 sampai 6) menjadi pasangan
        const remaining = services.slice(1);
        
        for (let i = 0; i < remaining.length; i += 2) {
            // Mulai baris baru
            container.innerHTML += `<div class="grid grid-cols-2 gap-4 mb-4">`;
            
            // Kartu Kiri (i)
            container.innerHTML += renderSmallCard(remaining[i]);
            
            // Kartu Kanan (i+1), cek jika ada
            if (remaining[i + 1]) {
                container.innerHTML += renderSmallCard(remaining[i + 1]);
            }
            
            // Tutup baris
            container.innerHTML += `</div>`;
        }
    }

    // Fungsi pembantu untuk membuat HTML kartu kecil
    function renderSmallCard(s) {
        return `
            <div class="card-image-base card-interactive h-32 flex flex-col justify-end p-4" 
                 style="background-image: url('assets/images/${s.bg}'); background-size: cover; background-position: center;">
                <div class="card-overlay"></div>
                <div class="card-content-wrapper">
                    <h3 class="text-white text-xs font-bold">${s.title}</h3>
                    <button class="mt-1 bg-white/20 text-white text-[10px] px-3 py-1 rounded-full btn-custom backdrop-blur-sm">LIHAT</button>
                </div>
            </div>
        `;
    }
});
