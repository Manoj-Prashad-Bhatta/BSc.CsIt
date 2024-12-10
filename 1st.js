document.addEventListener("DOMContentLoaded", () => {
    const pdfLinks = document.querySelectorAll(".view-pdf");
    const pdfContainers = document.querySelectorAll(".pdf-container");
    const fullscreenButtons = document.querySelectorAll(".fullscreen-btn");

    // Function to make PDFs undownloadable
    const makeUndownloadable = (iframe) => {
        iframe.src += "#toolbar=0&navpanes=0&scrollbar=1";
    };

    // Show loading spinner while waiting
    const showLoading = (container) => {
        const loader = document.createElement("div");
        loader.classList.add("loader");
        loader.innerHTML = `
            <div class="spinner">
                <div></div><div></div><div></div><div></div>
            </div>`;
        container.appendChild(loader);
    };

    // Remove loading spinner
    const removeLoading = (container) => {
        const loader = container.querySelector(".loader");
        if (loader) loader.remove();
    };

    // PDF View Handling
    pdfLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const pdfUrl = event.target.dataset.pdf;
            const containerId = event.target.nextElementSibling.id;
            const pdfContainer = document.getElementById(containerId);

            if (!pdfContainer || !pdfUrl) return;

            const iframe = pdfContainer.querySelector("iframe");

            if (iframe.src) {
                pdfContainer.style.display = pdfContainer.style.display === "none" ? "block" : "none";
                return;
            }

            showLoading(pdfContainer);

            // Delay to mimic "loading time"
            setTimeout(() => {
                iframe.src = pdfUrl;
                makeUndownloadable(iframe);
                removeLoading(pdfContainer);
                pdfContainer.style.display = "block";
            }, 5000); // 5 seconds delay
        });
    });

    // Fullscreen PDF Viewing
    fullscreenButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const container = event.target.closest(".pdf-container");
            const iframe = container.querySelector("iframe");
            if (iframe) {
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.webkitRequestFullscreen) {
                    iframe.webkitRequestFullscreen();
                } else if (iframe.msRequestFullscreen) {
                    iframe.msRequestFullscreen();
                }
            }
        });
    });

    // Smooth Scroll
    const scrollLinks = document.querySelectorAll("a[href^='#']");
    scrollLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth",
                });
            }
        });
    });

    // Lazy Loading for PDFs
    const lazyLoadObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const iframe = entry.target.querySelector("iframe");
                    if (iframe && !iframe.src) {
                        iframe.src = iframe.dataset.src;
                        makeUndownloadable(iframe);
                    }
                }
            });
        },
        {
            root: null,
            threshold: 0.1,
        }
    );

    pdfContainers.forEach((container) => {
        lazyLoadObserver.observe(container);
    });

    // Responsive Menu (if needed)
    const menuButton = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (menuButton && navMenu) {
        menuButton.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Performance Optimizations
    const debounce = (func, delay) => {
        let timeout;
        return function (...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const resizeHandler = debounce(() => {
        console.log("Window resized: Adjusting layout for optimal performance.");
    }, 300);

    window.addEventListener("resize", resizeHandler);

    // Add Animation on Scroll
    const animatedElements = document.querySelectorAll(".subject, .resource");

    const animateOnScroll = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animated");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    animatedElements.forEach((el) => animateOnScroll.observe(el));

    // Console log a message for fun
    console.log("%cWelcome to Your Rolls-Royce Website!", "color: gold; font-size: 20px; font-weight: bold;");
    console.log("%cRunning with a Ferrari Engine!", "color: red; font-size: 18px;");
});
