// 1. GLOBAL VARIABLES & YOUTUBE API
let player;
let progressInterval;

// Fungsi ini HARUS di luar DOMContentLoaded agar dipanggil oleh YouTube SDK
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

// Global Controls
window.togglePlay = () => {
    if (!player) return;
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
};

window.closeModal = function() {
    document.getElementById('detailModal').classList.add('hidden');
    if (player && player.stopVideo) player.stopVideo();
    clearInterval(progressInterval);
};

// 2. MAIN LOGIC
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
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' 
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
        icon: 'fa-book-open', 
        bg: 'bg_nobar.png', 
        desc: `Film 3D menawarkan pengalaman menonton yang lebih imersif dan mendalam, sekaligus memberikan manfaat kesehatan otak seperti
meningkatkan kemampuan kognitif hingga 23% dan mempercepat waktu reaksi. Format ini juga merangsang imajinasi, memberikan hiburan visual yang lebih nyata, serta sering digunakan sebagai media pembelajaran yang interaktif dan menarik.`, 
        duration: '60 Menit', 
        price: 'Rp 300.000', 
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' 
    },
    { 
        title: 'PARENTING', 
        icon: 'fa-magic', 
        bg: 'bg_parenting.png', 
        desc: `Parenting adalah
proses pengasuhan, bimbingan, dan pendidikan anak secara fisik, emosional, dan sosial dari lahir hingga dewasa. Intinya bukan menjadi orang tua sempurna, melainkan mau terus belajar, beradaptasi dengan perkembangan anak, serta membangun ikatan emosional yang sehat agar anak mandiri, percaya diri, dan berkarakter.`, 
        duration: '90 Menit', 
        price: 'Rp 500.000', 
        video: 'https://www.youtube.com/embed/8eNYIQ68ucA' 
    },
    { 
        title: 'OUTBOUND', 
        icon: 'fa-gamepad', 
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

    // Feedback Touch
    container.addEventListener('touchstart', (e) => {
        if (e.target.closest('button')) return;
        const card = e.target.closest('.card-interactive');
        if (card) {
            card.style.transform = 'scale(0.92)';
            card.style.filter = 'brightness(0.9)';
        }
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        const card = e.target.closest('.card-interactive');
        if (card) {
            card.style.transform = 'scale(1)';
            card.style.filter = 'brightness(1)';
        }
    }, { passive: true });

    // Fungsi Buka Modal
    window.openModal = (index, mode) => {
        const s = services[index];
        const modal = document.getElementById('detailModal');
        const descMode = document.getElementById('modalDescMode');
        const videoMode = document.getElementById('modalVideoMode');

        modal.classList.remove('hidden');

        if (mode === 'video') {
            descMode.classList.add('hidden');
            videoMode.classList.remove('hidden');
            const videoId = s.video.split('/').pop();
            if (player && player.loadVideoById) {
                player.loadVideoById(videoId);
            }
        } else {
            videoMode.classList.add('hidden');
            descMode.classList.remove('hidden');
            if (player && player.stopVideo) player.stopVideo();
            
            document.getElementById('modalTitle').innerText = s.title;
            document.getElementById('modalDesc').innerHTML = s.desc;
            document.getElementById('modalDuration').innerText = s.duration;
            document.getElementById('modalPrice').innerText = s.price;
            document.getElementById('btnWA').href = `https://wa.me/6288216740444?text=Halo Totitu, saya mau pesan ${s.title}`;
        }
    };

    window.handleBtnVideo = (e, index) => {
        e.stopPropagation();
        const btn = e.currentTarget;
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            window.openModal(index, 'video');
        }, 100);
    };

    // Rendering Kartu Utama (Besar) - Kembali ke Ukuran Semula, Teks Unggulan Dihapus
    const firstCardHtml = `
        <div class="card-image-base card-interactive h-32 flex flex-col justify-between p-3 mb-4 shadow-xl cursor-pointer" 
             onclick="openModal(0, 'desc')" 
             style="background-image: url('assets/images/${services[0].bg}');">
            
            <div class="absolute inset-0 bg-black/20 z-0"></div>

            <div class="relative z-10">
                <h3 class="text-white text-[12px] font-bold text-shadow-bold uppercase tracking-wide">
                    ${services[0].title}
                </h3>
            </div>

            <div class="relative z-10 w-full">
                <button 
                    onclick="handleBtnVideo(event, 0)"
                    class="w-full bg-white/20 text-white text-[10px] py-2 rounded-xl backdrop-blur-md border border-white/30 shadow-sm font-bold uppercase active:scale-90 transition-transform">
                    LIHAT VIDEO
                </button>
            </div>
        </div>
    `;

    // Rendering Kartu Grid (Kecil)
    let gridCardsHtml = '';
    for (let i = 1; i < services.length; i++) {
        const s = services[i];
    gridCardsHtml += `
        <div class="card-image-base card-interactive h-32 flex flex-col justify-between p-3 cursor-pointer" 
             onclick="openModal(${i}, 'desc')" 
             style="background-image: url('assets/images/${s.bg}');">
            
            <div class="absolute inset-0 bg-black/20 z-0"></div>

            <div class="relative z-10">
                <h3 class="text-white text-[12px] font-bold text-shadow-bold uppercase leading-tight">
                    ${s.title}
                </h3>
            </div>

            <div class="relative z-10 w-full">
                <button 
                    onclick="handleBtnVideo(event, ${i})"
                    class="w-full bg-white/20 text-white text-[10px] py-1.5 rounded-xl backdrop-blur-md border border-white/30 shadow-sm font-bold uppercase active:scale-90 transition-transform">
                    LIHAT VIDEO
                </button>
            </div>
        </div>
    `;    }

container.innerHTML = firstCardHtml + `<div class="grid grid-cols-2 gap-4">${gridCardsHtml}</div>`;
});
