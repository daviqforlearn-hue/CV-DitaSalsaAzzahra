document.addEventListener("DOMContentLoaded", () => {
    // 1. Ambil semua elemen bagian kanan yang memiliki class 'animated-element'
    const animatedElements = document.querySelectorAll(".animated-element");

    // 2. Konfigurasi threshold: Elemen mulai memicu animasi saat 10% bagiannya terlihat di layar
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    // 3. Logika untuk menambahkan class 'reveal' saat elemen masuk ke dalam pandangan viewport
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Memberikan sedikit jeda waktu (delay) berurutan antar section agar transisi terlihat elegan
                setTimeout(() => {
                    entry.target.classList.add("reveal");
                }, index * 150); // Jeda 150 milidetik untuk setiap elemen berikutnya
                
                // Hentikan pemantauan pada elemen tersebut setelah animasi berhasil dipicu
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 4. Daftarkan dan jalankan pemantauan pada setiap elemen section
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
});
// Mengatur skala kontainer secara dinamis tepat saat halaman HP dibuka
function sesuaikanSkalaHP() {
    if (window.innerWidth <= 768) {
        const container = document.querySelector('.cv-container');
        if (container) {
            // Hitung rasio kecocokan layar HP dibanding lebar asli kontainer (900px + padding)
            const rasioSkala = window.innerWidth / 930; 
            container.style.transform = `scale(${rasioSkala})`;
            
            // Mengatur space kosong di bawah kontainer akibat efek transform scale
            const tinggiAsli = container.offsetHeight;
            document.body.style.height = `${tinggiAsli * rasioSkala + 40}px`;
        }
    } else {
        const container = document.querySelector('.cv-container');
        if (container) {
            container.style.transform = 'none';
            document.body.style.height = 'auto';
        }
    }
}

// Jalankan saat pertama kali halaman terbuka dan saat layar dirotasi
window.addEventListener('load', sesuaikanSkalaHP);
window.addEventListener('resize', sesuaikanSkalaHP);
