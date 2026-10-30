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
// Fungsi utama untuk mengatur skala kontainer agar pas selayar penuh di HP tanpa sisa ruang samping
function sesuaikanSkalaHP() {
    if (window.innerWidth <= 768) {
        const container = document.querySelector('.cv-container');
        if (container) {
            // Menggunakan pembagi 905 agar pas dengan lebar kontainer tanpa membuat celah samping
            const rasioSkala = window.innerWidth / 905; 
            container.style.transform = `scale(${rasioSkala})`;
            
            // Menghitung ulang tinggi halaman secara dinamis setelah diperkecil
            const tinggiAsli = container.offsetHeight;
            document.body.style.height = `${tinggiAsli * rasioSkala + 10}px`;
        }
    } else {
        const container = document.querySelector('.cv-container');
        if (container) {
            container.style.transform = 'none';
            document.body.style.height = 'auto';
        }
    }
}

// Menjalankan fungsi skala secepat mungkin begitu elemen siap
window.addEventListener('load', sesuaikanSkalaHP);
window.addEventListener('resize', sesuaikanSkalaHP);

// Logika animasi masuk (Reveal Animation) saat halaman web dimuat
document.addEventListener("DOMContentLoaded", () => {
    // Pastikan fungsi skala dipicu kembali untuk keamanan
    sesuaikanSkalaHP();

    const animatedElements = document.querySelectorAll(".animated-element");
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("reveal");
                }, index * 150); 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
});
