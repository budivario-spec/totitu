document.addEventListener("DOMContentLoaded", () => {
    const services = [
        { id: 'fun-game', title: 'Fun Game', color: 'bg-teal-500', icon: 'fa-gamepad', desc: 'Permainan ceria untuk motorik & kognitif.' },
        { id: 'story-telling', title: 'Story Telling', color: 'bg-green-500', icon: 'fa-book-open', desc: 'Cerita ajaib yang menginspirasi imajinasi.' },
        { id: 'membuat-komik', title: 'Membuat Komik', color: 'bg-yellow-400', icon: 'fa-pen-nib', desc: 'Bikin cerita gambar jadi lebih seru.' },
        { id: 'sulap-tematik', title: 'Sulap Tematik', color: 'bg-purple-600', icon: 'fa-magic', desc: 'Belajar sulap hebat dan memukau.' },
        { id: 'parenting', title: 'Parenting', color: 'bg-orange-500', icon: 'fa-heart', desc: 'Tips seru untuk Ayah Bunda.' },
        { id: 'nobar-klip-3d', title: 'Nobar Klip 3D', color: 'bg-cyan-500', icon: 'fa-vr-cardboard', desc: 'Nonton film 3D yang seru banget.' },
        { id: 'outbound', title: 'Outbound', color: 'bg-red-500', icon: 'fa-campground', desc: 'Petualangan seru di luar ruangan.' }
    ];

    const container = document.getElementById('menuContainer');

    // Tambahkan pengecekan agar tidak error jika elemen tidak ada
    if (container) {
        services.forEach(service => {
            container.innerHTML += `
                <div class="${service.color} rounded-3xl p-5 text-white flex justify-between items-center shadow-lg">
                    <div>
                        <h3 class="font-bold text-lg">${service.title}</h3>
                        <p class="text-xs opacity-80">${service.desc}</p>
                    </div>
                    <i class="fas ${service.icon} text-3xl opacity-50"></i>
                </div>
            `;
        });
    } else {
        console.error("Elemen 'menuContainer' tidak ditemukan!");
    }
});
