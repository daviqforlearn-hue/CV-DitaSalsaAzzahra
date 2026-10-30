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