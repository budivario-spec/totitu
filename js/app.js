document.addEventListener("DOMContentLoaded", () => {
    const services = [
        { title: 'FUN GAME', icon: 'fa-gamepad', bg: 'bg_game.png' },      // Index 0
        { title: 'STORY TELLING', icon: 'fa-book-open', bg: 'bg_story.png' }, // Index 1
        { title: 'BUAT KOMIK', icon: 'fa-pen-nib', bg: 'bg_komik.png' },     // Index 2
        { title: 'SULAP TEMATIK', icon: 'fa-magic', bg: 'bg_sulap.png' },     // Index 3
        { title: 'NOBAR KLIP 3D', icon: 'fa-vr-cardboard', bg: 'bg_nobar.png' }, // Index 4
        { title: 'PARENTING', icon: 'fa-heart', bg: 'bg_parenting.png' },    // Index 5
        { title: 'OUTBOUND', icon: 'fa-campground', bg: 'bg_outbound.png' }  // Index 6
    ];

    const container = document.getElementById('menuContainer');
    if (!container) return;

    // 1. Render Kartu Pertama (Fun Game) - Lebar Penuh
    const first = services[0];
    container.innerHTML = `
        <div class="card-image-base card-interactive h-32 flex flex-col justify-center p-5 mb-4" 
             style="background-image: url('assets/images/${first.bg}');">
            <div class="card-overlay"></div>
            <div class="card-content-wrapper z-10">
                <h3 class="text-white text-lg font-bold">${first.title}</h3>
                <i class="fas ${first.icon} text-white text-3xl mt-1"></i>
            </div>
        </div>
    `;

    // 2. Render sisanya dalam Grid 2 Kolom
    let gridHtml = '<div class="grid grid-cols-2 gap-4">';
    
    for (let i = 1; i < services.length; i++) {
        const s = services[i];
        gridHtml += `
            <div class="card-image-base card-interactive h-32 flex flex-col justify-end p-4" 
                 style="background-image: url('assets/images/${s.bg}');">
                <div class="card-overlay"></div>
                <div class="card-content-wrapper z-10">
                    <h3 class="text-white text-[10px] font-bold">${s.title}</h3>
                    <button class="mt-1 bg-white/20 text-white text-[9px] px-3 py-1 rounded-full btn-custom backdrop-blur-sm border border-white/20">LIHAT</button>
                </div>
            </div>
        `;
    }
    gridHtml += '</div>';
    
    if (container) {
    container.insertAdjacentHTML('beforeend', htmlOutput);
}
});
