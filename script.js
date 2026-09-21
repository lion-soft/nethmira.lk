document.addEventListener("DOMContentLoaded", () => {


    const menu = document.querySelector(".menu");
    const navigation = document.querySelector(".navigation");
    const header = document.querySelector(".header");

    menu?.addEventListener("click", () => {
        navigation.classList.toggle("open");
        header.classList.toggle("expand");

        // Change menu icon
        if (navigation.classList.contains("open")) {
            menu.textContent = "✕";
        } else {
            menu.textContent = "☰";
        }
    });


    

    document.querySelectorAll(".navigation a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            header.classList.remove("expand");

            if (menu) {
                menu.textContent = "☰";
            }
        });
    });




    const typing = document.querySelector(".typing");

    const words = [
        "Photographer",
        "Creator",
        "Designer"
    ];

    let wi = 0;
    let ci = 0;
    let deleting = false;

    function type() {

        if (!typing) return;

        const word = words[wi];

        if (!deleting) {

            typing.textContent = word.slice(0, ci);
            ci++;

            if (ci > word.length) {
                deleting = true;
                setTimeout(type, 1300);
            } else {
                setTimeout(type, 90);
            }

        } else {

            typing.textContent = word.slice(0, ci);
            ci--;

            if (ci < 0) {
                ci = 0;
                deleting = false;
                wi = (wi + 1) % words.length;

                setTimeout(type, 350);

            } else {
                setTimeout(type, 45);
            }
        }
    }

    type();



    const revealElements = document.querySelectorAll(`
        .section-header,
        .about-story,
        .stat-card,
        .skill-category,
        .tools-section,
        .experience-column,
        .education-column,
        .experience-item,
        .education-item,
        .contact-form-card,
        .contact-info-card,
        .social-card,
        .cta-card,
        .footer-brand,
        .footer-links,
        .footer-contact
    `);

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    revealElements.forEach(element => {
        observer.observe(element);
    });



    const progressBars = document.querySelectorAll(".progress-fill");

    progressBars.forEach(bar => {

        const originalWidth =
            bar.style.width || "0%";

        bar.style.setProperty(
            "--progress-width",
            originalWidth
        );

        bar.style.width = "0%";
    });


    const progressObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const bar = entry.target;

                    setTimeout(() => {
                        bar.classList.add("animate");
                    }, 150);

                    observer.unobserve(bar);
                }

            });

        },
        {
            threshold: 0.5
        }
    );


    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });


    

    const links = [
        ...document.querySelectorAll("nav ul li a")
    ];

    const sections = [
        ...document.querySelectorAll("section[id]")
    ];

    function updateActiveNavigation() {

        let current = "home";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                current = section.id;
            }

        });

        links.forEach(link => {

            const href = link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === "#" + current
            );

        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();




    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 30) {

                header.style.boxShadow =
                    "0 8px 30px rgba(0,0,0,.25)";

            } else {

                header.style.boxShadow = "none";

            }

        },
        { passive: true }
    );




    const groups = [
        ".skills-grid .skill-category",
        ".stats-grid .stat-card",
        ".experience-grid .experience-item",
        ".contact-info .contact-method"
    ];

    groups.forEach(selector => {

        document.querySelectorAll(selector)
            .forEach((element, index) => {

                element.style.transitionDelay =
                    `${index * 100}ms`;

            });

    });



    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

});