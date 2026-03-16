document.addEventListener("DOMContentLoaded", () => {
    const services = [
        { title: 'FUN GAME', icon: 'fa-gamepad', bg: 'bg_game.png' },
        { title: 'STORY TELLING', icon: 'fa-book-open', bg: 'bg_story.png' },
        { title: 'BUAT KOMIK', icon: 'fa-pen-nib', bg: 'bg_komik.png' },
        { title: 'SULAP TEMATIK', icon: 'fa-magic', bg: 'bg_sulap.png' },
        { title: 'NOBAR KLIP 3D', icon: 'fa-vr-cardboard', bg: 'bg_nobar.png' },
        { title: 'PARENTING', icon: 'fa-heart', bg: 'bg_parenting.png' },
        { title: 'OUTBOUND', icon: 'fa-campground', bg: 'bg_outbound.png' }
    ];

    const container = document.getElementById('menuContainer');
    if (container) {
        container.innerHTML = ''; // Bersihkan kontainer

        services.forEach((s, index) => {
            if (index === 0) {
                // Kartu Pertama: Lebar Penuh (1 Kolom)
                container.innerHTML += `
                    <div class="card-image-base card-interactive h-32 flex flex-col justify-center p-5 mb-4" 
                         style="background-image: url('assets/images/${s.bg}'); background-size: cover; background-position: center;">
                        <div class="card-overlay"></div>
                        <div class="card-content-wrapper">
                            <h3 class="text-white text-md font-bold">${s.title}</h3>
                            <i class="fas ${s.icon} text-white text-4xl mt-1"></i>
                        </div>
                    </div>
                `;
            } else {
                // Untuk kartu sisanya (index 1 ke atas)
                // Jika ini adalah kartu ganjil (1, 3, 5), buka row baru
                if (index === 1 || (index - 1) % 2 === 0) {
                    container.innerHTML += `<div class="grid grid-cols-2 gap-4 mb-4">`;
                }

                container.innerHTML += `
                    <div class="card-image-base card-interactive h-32 flex flex-col justify-end p-4" 
                         style="background-image: url('assets/images/${s.bg}'); background-size: cover; background-position: center;">
                        <div class="card-overlay"></div>
                        <div class="card-content-wrapper">
                            <h3 class="text-white text-xs font-bold">${s.title}</h3>
                            <button class="mt-1 bg-white/20 text-white text-[10px] px-3 py-1 rounded-full btn-custom backdrop-blur-sm">LIHAT</button>
                        </div>
                    </div>
                `;

                // Tutup row jika kartu genap (2, 4, 6) atau item terakhir
                if (index % 2 === 0 || index === services.length - 1) {
                    container.innerHTML += `</div>`;
                }
            }
        });
    }
});
