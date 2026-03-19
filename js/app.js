// 1. GLOBAL VARIABLES & YOUTUBE API
let player;
let progressInterval;
let cart = []; 
let currentSelectedService = null; 

// Fungsi update badge angka di navigasi
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
    // Jika isWarning true, kita beri warna teks sedikit berbeda (misal: orange tua atau merah)
    toast.className = `toast-notification ${isWarning ? 'text-orange-600' : 'text-gray-800'}`;
    toast.innerText = message;
    document.body.appendChild(toast);

    // 1. Muncul di 1/4 atas
    setTimeout(() => {
        toast.classList.add('show');
    }, 50);

    // 2. Jika ini peringatan (sudah ada), tidak perlu terbang ke keranjang
    if (isWarning) {
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    } else {
        // Jika berhasil tambah, jalankan animasi terbang seperti biasa
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

        setTimeout(() => {
            toast.remove();
        }, 1800);
    }
}
// YouTube API Setup
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

// --- LOGIKA KERANJANG (STRUK) & WHATSAPP ---

window.openCart = () => {
    if (cart.length === 0) {
        showToast("Keranjang kosong.", true);
        return;
    }

    const cartModal = document.getElementById('cartModal');
    const listContainer = document.getElementById('cartItemsList');
    const totalPriceElement = document.getElementById('selectedServicePrice');
    
    // Bersihkan isi list
    listContainer.innerHTML = '';
    let totalHarga = 0;

    // Loop data keranjang untuk tampilan STRUK
    cart.forEach((item, index) => {
        // Konversi harga string "Rp 500.000" ke angka untuk perhitungan
        const hargaAngka = parseInt(item.price.replace(/[^0-9]/g, ''));
        totalHarga += hargaAngka;

        const itemRow = document.createElement('div');
        itemRow.className = "flex justify-between items-start border-b border-gray-50 pb-2";
        itemRow.innerHTML = `
            <div class="flex-1 pr-4">
                <p class="text-[11px] font-bold text-gray-800 uppercase leading-tight">${item.title}</p>
                <button onclick="removeFromCart(${index})" class="text-[9px] text-red-400 font-bold uppercase mt-1">Hapus</button>
            </div>
            <p class="text-[11px] font-black text-gray-800">${item.price}</p>
        `;
        listContainer.appendChild(itemRow);
    });

    totalPriceElement.innerText = `Rp ${totalHarga.toLocaleString('id-ID')}`;
    cartModal.classList.remove('hidden');
};

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartBadge();
    if (cart.length === 0) {
        closeCart();
    } else {
        openCart(); // Refresh tampilan struk
    }
};

window.closeCart = () => {
    document.getElementById('cartModal').classList.add('hidden');
};

window.sendToWhatsApp = () => {
    const name = document.getElementById('buyerName').value;
    const address = document.getElementById('buyerAddress').value;

    if (!name || !address) {
        alert("Mohon lengkapi Nama dan Alamat/Lokasi Acara!");
        return;
    }

    const opsiTanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const tanggalHariIni = new Date().toLocaleDateString('id-ID', opsiTanggal);

    let message = `*PESANAN TOTITU*\n`;
    message += `${tanggalHariIni}\n`;
    message += `----------------------------\n`;
    message += `*Data Pemesan:*\n`;
    message += `Nama: ${name}\n`;
    message += `Alamat: ${address}\n`;
    message += `----------------------------\n`;
    message += `*DAFTAR LAYANAN:*\n`;

    let total = 0;
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.title} (${item.price})\n`;
        const hargaAngka = parseInt(item.price.replace(/[^0-9]/g, ''));
        total += hargaAngka;
    });

    message += `----------------------------\n`;
    message += `*TOTAL: Rp ${total.toLocaleString('id-ID')}*\n`;
    message += `----------------------------`;

    // 1. Buka WhatsApp
    const phoneNumber = "6288216740444";
    const encodedMessage = encodeURIComponent(message); 
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // 2. KOSONGKAN KERANJANG SETELAH KLIK
    cart = []; 
    updateCartBadge(); 
    nameInput.value = '';
    addressInput.value = '';
    closeCart(); // Menutup layar keranjang/struk
    
    // Optional: Bersihkan input form agar siap untuk pesanan berikutnya
    document.getElementById('buyerName').value = '';
    document.getElementById('buyerAddress').value = '';
};
// --- MODAL CONTROLS ---

window.togglePlay = () => {
    if (!player) return;
    const state = player.getPlayerState();
    state === YT.PlayerState.PLAYING ? player.pauseVideo() : player.playVideo();
};

window.closeModal = function() {
    document.getElementById('detailModal').classList.add('hidden');
    if (player && player.stopVideo) player.stopVideo();
    clearInterval(progressInterval);
};

// --- MAIN LOGIC ---

document.addEventListener("DOMContentLoaded", () => {
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
            desc: `Film 3D menawarkan pengalaman menonton yang lebih imersif dan mendalam, sekaligus memberikan manfaat kesehatan otak seperti
meningkatkan kemampuan kognitif hingga 23% dan mempercepat waktu reaksi. Format ini juga merangsang imajinasi, memberikan hiburan visual yang lebih nyata, serta sering digunakan sebagai media pembelajaran yang interaktif dan menarik.`, 
            duration: '60 Menit', 
            price: 'Rp 300.000', 
            video: 'https://www.youtube.com/embed/J2Z5co3v3WA' 
        },
        { 
            title: 'PARENTING', 
            icon: 'fa-heart', 
            bg: 'bg_parenting.png', 
            desc: `Parenting adalah
proses pengasuhan, bimbingan, dan pendidikan anak secara fisik, emosional, dan sosial dari lahir hingga dewasa. Intinya bukan menjadi orang tua sempurna, melainkan mau terus belajar, beradaptasi dengan perkembangan anak, serta membangun ikatan emosional yang sehat agar anak mandiri, percaya diri, dan berkarakter.`, 
            duration: '90 Menit', 
            price: 'Rp 500.000', 
            video: 'https://www.youtube.com/embed/8eNYIQ68ucA' 
        },
        { 
            title: 'OUTBOUND', 
            icon: 'fa-tree', 
            bg: 'bg_outbound.png', 
            desc: `Outbound adalah serangkaian kegiatan pembelajaran di luar ruangan (outdoor) yang memanfaatkan permainan edukatif, simulasi fisik, dan mental untuk pengembangan diri, tim, dan kepemimpinan. Aktivitas ini bertujuan meningkatkan kerjasama, komunikasi, kepercayaan diri, dan pemecahan masalah melalui experiential learning di alam terbuka.
               <br><br>
               <b>Berikut adalah poin-poin penting mengenai outbound:</b>
               <ul class="text-left list-disc ml-5 mt-2 space-y-1">
                  <li><b>Tujuan utama:</b> Meningkatkan kekompakan tim (team building), penyegaran (refreshing), pengembangan karakter, dan kepemimpinan.</li>
                  <li><b>Contoh kegiatan:</b> Rafting (arung jeram), paintball, panjat tebing, fun games, offroad, dan team building games.</li>
                  <li><b>Lokasi populer:</b> Area terbuka seperti pegunungan, pantai, hutan, atau kawasan resort dan camping ground.</li>
                  <li><b>Manfaat:</b> Meningkatkan keterampilan sosial, membangun pola pikir kreatif, serta memperkuat kecerdasan emosional dan spiritual.</li>
               </ul>
               <br>Outbound sering digunakan oleh perusahaan untuk gathering atau pelatihan karyawan agar lebih adaptif dan kolaboratif.`, 
            duration: '60 Menit', 
            price: 'Rp 500.000', 
            video: 'https://www.youtube.com/embed/DGFoHV88z2I' 
        },
    ];

    const container = document.getElementById('menuContainer');
    if (!container) return;

    // Render Kartu Utama & Grid
    let gridCardsHtml = '';
    services.forEach((s, i) => {
        if (i === 0) {
            container.innerHTML = `
                <div class="card-image-base card-interactive h-32 flex flex-col justify-between p-3 mb-4 shadow-xl cursor-pointer" 
                     onclick="openModal(0, 'desc')" 
                     style="background-image: url('assets/images/${s.bg}');">
                    <div class="absolute inset-0 bg-black/20 z-0"></div>
                    <div class="relative z-10"><h3 class="text-white text-[12px] font-bold text-shadow-bold uppercase tracking-wide">${s.title}</h3></div>
                    <div class="relative z-10 w-full">
                        <button onclick="handleBtnVideo(event, 0)" class="w-full bg-white/20 text-white text-[10px] py-2 rounded-xl backdrop-blur-md border border-white/30 shadow-sm font-bold uppercase active:scale-90 transition-transform">LIHAT VIDEO</button>
                    </div>
                </div>
            `;
        } else {
            gridCardsHtml += `
                <div class="card-image-base card-interactive h-32 flex flex-col justify-between p-3 cursor-pointer" 
                     onclick="openModal(${i}, 'desc')" 
                     style="background-image: url('assets/images/${s.bg}');">
                    <div class="absolute inset-0 bg-black/20 z-0"></div>
                    <div class="relative z-10"><h3 class="text-white text-[12px] font-bold text-shadow-bold uppercase leading-tight">${s.title}</h3></div>
                    <div class="relative z-10 w-full">
                        <button onclick="handleBtnVideo(event, ${i})" class="w-full bg-white/20 text-white text-[10px] py-1.5 rounded-xl backdrop-blur-md border border-white/30 shadow-sm font-bold uppercase active:scale-90 transition-transform">LIHAT VIDEO</button>
                    </div>
                </div>`;
        }
    });
    container.innerHTML += `<div class="grid grid-cols-2 gap-4">${gridCardsHtml}</div>`;

    window.openModal = (index, mode) => {
        const s = services[index];
        currentSelectedService = s; 
        const modal = document.getElementById('detailModal');
        const descMode = document.getElementById('modalDescMode');
        const videoMode = document.getElementById('modalVideoMode');

        modal.classList.remove('hidden');

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
            // 1. Cek apakah layanan ini sudah ada di dalam array cart
            const isAlreadyInCart = cart.find(item => item.title === s.title);

            if (isAlreadyInCart) {
                // Jika sudah ada: Ubah teks tombol dan berikan pesan "Sudah Ada"
                btnCart.innerText = "SUDAH DI KERANJANG";
                btnCart.classList.remove('bg-green-500', 'bg-[#25D366]'); 
                btnCart.classList.add('bg-orange-500');
                btnCart.onclick = () => {
                    showToast(`${s.title} SUDAH ADA DI KERANJANG`, true); // true = mode peringatan
                    closeModal();
                };
            } else {
                // Jika belum ada: Tampilan normal untuk menambah ke keranjang
                btnCart.innerText = "TAMBAH KE KERANJANG";
                btnCart.classList.remove('bg-orange-500');
                btnCart.classList.add('bg-green-500');
                btnCart.onclick = () => {
                    cart.push(s);
                    updateCartBadge();
                    closeModal();
                    showToast(`${s.title} DITAMBAHKAN!`); // Tanpa 'true' agar bisa terbang
                };
            }
        }
    };

    window.handleBtnVideo = (e, index) => {
        e.stopPropagation();
        window.openModal(index, 'video');
    };
});
