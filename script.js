document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".cv-container");

    /* =====================================
       SKALA CV OTOMATIS DI HP
       ===================================== */

    function sesuaikanSkalaHP() {
        if (!container) return;

        if (window.innerWidth <= 768) {
            const lebarLayar = document.documentElement.clientWidth;
            const lebarCV = 900;

            const skala = lebarLayar / lebarCV;

            container.style.transform = `scale(${skala})`;

            const tinggiCV = container.offsetHeight;

            document.body.style.height =
                `${tinggiCV * skala}px`;

        } else {
            container.style.transform = "none";
            document.body.style.height = "auto";
        }
    }

    sesuaikanSkalaHP();

    window.addEventListener("resize", sesuaikanSkalaHP);
    window.addEventListener("orientationchange", sesuaikanSkalaHP);

    /* =====================================
       ANIMASI SECTION
       ===================================== */

    const animatedElements =
        document.querySelectorAll(".animated-element");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add("reveal");
                        }, index * 150);

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        animatedElements.forEach(element => {
            element.classList.add("reveal");
        });
    }
});
