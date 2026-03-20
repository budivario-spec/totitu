// 1. GLOBAL VARIABLES & YOUTUBE API
let player;
let progressInterval;
let cart = []; 
let currentSelectedService = null; 

// --- PINDAHKAN SERVICES KE GLOBAL SCOPE AGAR BISA DIAKSES SEMUA FUNGSI ---
const services = [
    { 
        title: 'FUN GAME', 
        icon: 'fa-gamepad', 
        bg: 'bg_game.png', 
        desc: `Permainan yang dirancang khusus untuk menciptakan suasana santai, lucu, dan menyenangkan. Fokus utamanya adalah rekreasi dan hiburan, bukan kompetisi berat.
               <br><br>
               <b>Poin Penting:</b>
               <ul class="text-left list-disc ml-5 mt-2 space-y-1">
                 <li><b>Tujuan:</b> Menghibur, melepas stres, dan membangun kebersamaan.</li>
                 <li><b>Karakteristik:</b> Ringan, mudah dipahami, dan penuh humor.</li>
                 <li><b>Contoh:</b> Ice breaking, lomba estafet, dan aktivitas outdoor.</li>
               </ul>
               <br>Cocok untuk gathering, outbound, atau ulang tahun agar suasana semakin akrab!`,  
        duration: '60 Menit', 
        price: 'Rp 500.000', 
        video: 'https://www.youtube.com/embed/PDOvrLyxYu4' 
    },
    { 
        title: 'STORY TELLING', 
        icon: 'fa-book-open', 
        bg: 'bg_story.png', 
        desc: `Menghidupkan imajinasi anak melalui dongeng interaktif yang kaya akan pesan moral dan nilai-nilai kebaikan.
               <br><br>
               <b>Kenapa Story Telling?</b>
               <ul class="text-left list-disc ml-5 mt-2 space-y-1">
                 <li><b>Interaktif:</b> Anak-anak terlibat langsung dalam alur cerita.</li>
                 <li><b>Media:</b> Menggunakan boneka tangan atau buku cerita menarik.</li>
                 <li><b>Manfaat:</b> Melatih fokus, empati, dan kemampuan berbahasa.</li>
               </ul>
               <br>Cara terbaik menanamkan karakter positif melalui kisah yang tak terlupakan.`, 
        duration: '90 Menit', 
        price: 'Rp 500.000', 
        video: 'https://www.youtube.com/embed/Li3ikGkjvvI' 
    },
    { 
        title: 'BUAT KOMIK', 
        icon: 'fa-pen-nib', 
        bg: 'bg_komik.png', 
        desc: `Istilah "komik" sebenarnya berasal dari Bahasa Yunani, yaitu "komikos" yang dapat diartikan sebagai hiburan atau kesenangan. Meskipun ada hubungan dengan komedi, komik tidak hanya membahas hal-hal lucu saja.
               <br><br>
               Komik adalah seni yang menggabungkan gambar dan teks dalam urutan tertentu. Fungsi komik yaitu sebagai medium informasi dan menciptakan pengalaman estetis bagi pembacanya.`, 
        duration: '60 Menit', 
        price: 'Rp 400.000', 
        video: 'https://www.youtube.com/embed/0-SFMGhHhwc' 
    },
    { 
        title: 'SULAP TEMATIK', 
        icon: 'fa-magic', 
        bg: 'bg_sulap.png', 
        desc: `Pertunjukan sulap yang dibungkus dengan tema tertentu (misal: edukasi, kebersihan, atau kejujuran) sehingga tidak hanya memukau tapi juga memberi pelajaran.
               <br><br>
               <b>Keunggulan:</b>
               <ul class="text-left list-disc ml-5 mt-2 space-y-1">
                 <li><b>Visual:</b> Trik-trik warna-warni yang disukai anak.</li>
                 <li><b>Keterlibatan:</b> Penonton diajak naik ke panggung menjadi asisten pesulap.</li>
                 <li><b>Edukasi:</b> Di balik setiap trik, ada pesan moral yang disampaikan.</li>
               </ul>
               <br>Momen ajaib yang akan selalu diingat oleh si kecil!`, 
        duration: '60 Menit', 
        price: 'Rp 400.000', 
        video: 'https://www.youtube.com/embed/L4csWRh28No' 
    },
    { 
        title: 'NOBAR KLIP 3D', 
        icon: 'fa-video', 
        bg: 'bg_nobar.png', 
        desc: `Film 3D menawarkan pengalaman menonton yang lebih imersif dan mendalam, sekaligus memberikan manfaat kesehatan otak seperti meningkatkan kemampuan kognitif hingga 23% dan mempercepat waktu reaksi.`, 
        duration: '60 Menit', 
        price: 'Rp 300.000', 
        video: 'https://www.youtube.com/embed/J2Z5co3v3WA' 
    },
    { 
        title: 'PARENTING', 
        icon: 'fa-heart', 
        bg: 'bg_parenting.png', 
        desc: `Parenting adalah proses pengasuhan, bimbingan, dan pendidikan anak secara fisik, emosional, dan sosial dari lahir hingga dewasa. Intinya membangun ikatan emosional yang sehat agar anak mandiri dan berkarakter.`, 
        duration: '90 Menit', 
        price: 'Rp 500.000', 
        video: 'https://www.youtube.com/embed/8eNYIQ68ucA' 
    },
    { 
        title: 'OUTBOUND', 
        icon: 'fa-tree', 
        bg: 'bg_outbound.png', 
        desc: `Outbound adalah serangkaian kegiatan pembelajaran di luar ruangan (outdoor) yang memanfaatkan permainan edukatif untuk pengembangan diri, tim, dan kepemimpinan.`, 
        duration: '60 Menit', 
        price: 'Rp 500.000', 
        video: 'https://www.youtube.com/embed/DGFoHV88z2I' 
    },
];

// --- FUNGSI UTILITY ---
function updateCartBadge() {
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.innerText = cart.length;
        cart.length > 0 ? badge.classList.remove('hidden') : badge.classList.add('hidden');
    }
}

function showToast(message, isWarning = false) {
    const oldToast = document.querySelector('.toast-notification');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notification ${isWarning ? 'text-orange-600' : 'text-gray-800'}`;
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 50);

    if (isWarning) {
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    } else {
        setTimeout(() => {
            toast.classList.add('fly');
            const cartIcon = document.querySelector('.fa-shopping-cart') || document.getElementById('cartIcon');
            if (cartIcon) {
                setTimeout(() => {
                    cartIcon.style.transform = "scale(1.5)";
                    setTimeout(() => cartIcon.style.transform = "scale(1)", 200);
                }, 600);
            }
        }, 1000);
        setTimeout(() => toast.remove(), 1800);
    }
}

// --- YOUTUBE API ---
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('player', {
        height: '100%', width: '100%',
        playerVars: { 'autoplay': 1, 'playsinline': 1, 'controls': 0, 'rel': 0, 'modestbranding': 1 },
        events: { 'onStateChange': onPlayerStateChange }
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
                document.getElementById('videoTime').innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }
        }
    }, 500);
}

// --- LOGIKA KERANJANG & WA ---
window.openCart = () => {
    if (cart.length === 0) { showToast("Keranjang kosong.", true); return; }
    const cartModal = document.getElementById('cartModal');
    const listContainer = document.getElementById('cartItemsList');
    const totalPriceElement = document.getElementById('selectedServicePrice');
    
    listContainer.innerHTML = '';
    let totalHarga = 0;

    cart.forEach((item, index) => {
        const hargaAngka = parseInt(item.price.replace(/[^0-9]/g, ''));
        totalHarga += hargaAngka;
        const itemRow = document.createElement('div');
        itemRow.className = "flex justify-between items-start border-b border-gray-50 pb-2";
        itemRow.innerHTML = `
            <div class="flex-1 pr-4">
                <p class="text-[11px] font-bold text-gray-800 uppercase leading-tight">${item.title}</p>
                <button onclick="removeFromCart(${index})" class="text-[9px] text-red-400 font-bold uppercase mt-1">Hapus</button>
            </div>
            <p class="text-[11px] font-black text-gray-800">${item.price}</p>`;
        listContainer.appendChild(itemRow);
    });
    totalPriceElement.innerText = `Rp ${totalHarga.toLocaleString('id-ID')}`;
    cartModal.classList.remove('hidden');
};

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartBadge();
    cart.length === 0 ? closeCart() : openCart();
};

window.closeCart = () => document.getElementById('cartModal').classList.add('hidden');

window.sendToWhatsApp = () => {
    const nameInput = document.getElementById('buyerName');
    const addressInput = document.getElementById('buyerAddress');
    const name = nameInput.value;
    const address = addressInput.value;

    if (!name || !address) { alert("Mohon lengkapi Nama dan Alamat!"); return; }

    let totalHargaAnalytics = 0;
    let listLayanan = "";
    cart.forEach((item, index) => {
        totalHargaAnalytics += parseInt(item.price.replace(/[^0-9]/g, ''));
        listLayanan += `${index + 1}. ${item.title} (${item.price})\n`;
    });

    if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', { 'currency': 'IDR', 'value': totalHargaAnalytics, 'items': cart.map(i => ({ 'item_name': i.title })) });
    }

    const tanggal = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    let message = `*PESANAN TOTITU*\n${tanggal}\n----------------------------\n*Data Pemesan:*\nNama: ${name}\nAlamat: ${address}\n----------------------------\n*DAFTAR LAYANAN:*\n${listLayanan}----------------------------\n*TOTAL: Rp ${totalHargaAnalytics.toLocaleString('id-ID')}*\n----------------------------`;

    window.location.href = `https://wa.me/6288216740444?text=${encodeURIComponent(message)}`;
    cart = []; updateCartBadge(); nameInput.value = ''; addressInput.value = ''; closeCart();
};

// --- MODAL CONTROLS ---
window.togglePlay = () => {
    if (!player) return;
    player.getPlayerState() === YT.PlayerState.PLAYING ? player.pauseVideo() : player.playVideo();
};

window.closeModal = function() {
    document.getElementById('detailModal').classList.add('hidden');
    if (player && player.stopVideo) player.stopVideo();
    clearInterval(progressInterval);
};

window.openModal = (index, mode) => {
    const s = services[index];
    currentSelectedService = s; 

    if (typeof gtag === 'function' && mode === 'desc') {
        gtag('event', 'view_service_detail', { 'service_name': s.title });
    }

    const modal = document.getElementById('detailModal');
    const descMode = document.getElementById('modalDescMode');
    const videoMode = document.getElementById('modalVideoMode');

    modal.classList.remove('hidden');
    modal.style.zIndex = "9999"; 

    if (mode === 'video') {
        descMode.classList.add('hidden');
        videoMode.classList.remove('hidden');
        const videoId = s.video.split('/').pop();
        if (player && player.loadVideoById) player.loadVideoById(videoId);
    } else {
        videoMode.classList.add('hidden');
        descMode.classList.remove('hidden');
        if (player && player.stopVideo) player.stopVideo();
        
        document.getElementById('modalTitle').innerText = s.title;
        document.getElementById('modalDesc').innerHTML = s.desc;
        document.getElementById('modalDuration').innerText = s.duration;
        document.getElementById('modalPrice').innerText = s.price;
        
        const btnCart = document.getElementById('btnWA');
        const isAlreadyInCart = cart.find(item => item.title === s.title);

        if (isAlreadyInCart) {
            btnCart.innerText = "SUDAH DI KERANJANG";
            btnCart.className = "w-full bg-orange-500 text-white py-4 rounded-2xl font-bold shadow-lg";
            btnCart.onclick = () => { showToast(`${s.title} SUDAH ADA`, true); closeModal(); };
        } else {
            btnCart.innerText = "TAMBAH KE KERANJANG";
            btnCart.className = "w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold shadow-lg";
            btnCart.onclick = () => { cart.push(s); updateCartBadge(); closeModal(); showToast(`${s.title} DITAMBAHKAN!`); };
        }
    }
};

// --- FUNGSI VIDEO (DI LUAR DOM agar terbaca atribut onclick) ---
window.handleBtnVideo = (e, index) => {
    if (e) e.stopPropagation();
    const s = services[index];

    if (typeof gtag === 'function') {
        gtag('event', 'watch_video_click', { 'service_name': s.title });
    }
    window.openModal(index, 'video');
};

// --- MAIN LOGIC (RENDER) ---
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('menuContainer');
    if (!container) return;

    let gridCardsHtml = '';
    services.forEach((s, i) => {
        if (i === 0) {
            container.innerHTML = `
                <div class="card-image-base card-interactive h-32 flex flex-col justify-between p-3 mb-4 shadow-xl cursor-pointer" onclick="openModal(0, 'desc')" style="background-image: url('assets/images/${s.bg}');">
                    <div class="absolute inset-0 bg-black/20 z-0"></div>
                    <div class="relative z-10"><h3 class="text-white text-[12px] font-bold text-shadow-bold uppercase tracking-wide">${s.title}</h3></div>
                    <div class="relative z-10 w-full">
                        <button onclick="handleBtnVideo(event, 0)" class="w-full bg-white/20 text-white text-[10px] py-2 rounded-xl backdrop-blur-md border border-white/30 shadow-sm font-bold uppercase active:scale-90 transition-transform">LIHAT VIDEO</button>
                    </div>
                </div>`;
        } else {
            gridCardsHtml += `
                <div class="card-image-base card-interactive h-32 flex flex-col justify-between p-3 cursor-pointer" onclick="openModal(${i}, 'desc')" style="background-image: url('assets/images/${s.bg}');">
                    <div class="absolute inset-0 bg-black/20 z-0"></div>
                    <div class="relative z-10"><h3 class="text-white text-[12px] font-bold text-shadow-bold uppercase leading-tight">${s.title}</h3></div>
                    <div class="relative z-10 w-full">
                        <button onclick="handleBtnVideo(event, ${i})" class="w-full bg-white/20 text-white text-[10px] py-1.5 rounded-xl backdrop-blur-md border border-white/30 shadow-sm font-bold uppercase active:scale-90 transition-transform">LIHAT VIDEO</button>
                    </div>
                </div>`;
        }
    });
    container.innerHTML += `<div class="grid grid-cols-2 gap-4">${gridCardsHtml}</div>`;
});
