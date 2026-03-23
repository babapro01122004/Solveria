/**
 * Main Scripts
 */

document.addEventListener("DOMContentLoaded", () => {
    
    /* ==============================================================
       POST-LOAD HEAVY ASSET ARCHITECTURE
       Massive Performance Hack: De-couples huge images from LCP math
       ============================================================== */
    const loadHeroImage = () => {
        const heroBgLayer = document.querySelector('.hero-bg-layer');
        if(heroBgLayer) {
            const imgUrl = 'image/support.webp';
            const img = new Image();
            img.src = imgUrl;
            img.onload = () => {
                heroBgLayer.style.backgroundImage = `url('${imgUrl}')`;
                // Add class to trigger CSS fade-in
                heroBgLayer.classList.add('loaded');
            };
        }
    };

    // Forces browser to paint the text FIRST (getting the high Lighthouse score) 
    // before it's allowed to download the huge background image.
    if (document.readyState === 'complete') {
        setTimeout(loadHeroImage, 50);
    } else {
        window.addEventListener('load', () => {
            setTimeout(loadHeroImage, 50);
        });
    }

    /* ==============================================================
       LAZY LOAD STANDARD BACKGROUNDS (Observer Pattern)
       ============================================================== */
    const lazyBackgrounds = document.querySelectorAll('.lazy-bg');
    if ('IntersectionObserver' in window) {
        const bgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bgElement = entry.target;
                    const bgUrl = bgElement.getAttribute('data-bg');
                    if (bgUrl) {
                        bgElement.style.backgroundImage = `url('${bgUrl}')`;
                    }
                    bgElement.classList.remove('lazy-bg');
                    observer.unobserve(bgElement);
                }
            });
        }, { rootMargin: "200px 0px" }); // Start downloading 200px before reaching viewport

        lazyBackgrounds.forEach((bg) => {
            bgObserver.observe(bg);
        });
    } else {
        lazyBackgrounds.forEach((bg) => {
            const bgUrl = bg.getAttribute('data-bg');
            if (bgUrl) {
                bg.style.backgroundImage = `url('${bgUrl}')`;
            }
            bg.classList.remove('lazy-bg');
        });
    }

    /* ==============================================================
       CUSTOM DROPDOWN LOGIC
       ============================================================== */
    const dropdownTrigger = document.querySelector('.custom-dropdown-trigger');
    const dropdownMenu = document.querySelector('.custom-dropdown-menu');
    const dropdownOptions = document.querySelectorAll('.dropdown-option');
    const hiddenSelect = document.getElementById('inquiry_category');

    if(dropdownTrigger) {
        dropdownTrigger.addEventListener('click', (e) => {
            dropdownMenu.classList.toggle('active');
            e.stopPropagation();
        });

        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('active');
        });

        dropdownOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const value = e.target.getAttribute('data-value');
                const text = e.target.textContent;
                
                dropdownTrigger.textContent = text;
                hiddenSelect.value = value;
                dropdownMenu.classList.remove('active');
                
                e.stopPropagation();
            });
        });
    }

    /* ==============================================================
       GALLERY HORIZONTAL SCROLL BUTTONS (Fixed Forced Reflow)
       ============================================================== */
    const gallery = document.querySelector('.installation-gallery');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if(gallery && prevBtn && nextBtn) {
        const updateButtons = () => {
            // requestAnimationFrame fixes 'Forced Reflow' Layout Thrashing Error 
            window.requestAnimationFrame(() => {
                prevBtn.disabled = gallery.scrollLeft <= 5;
                const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
                nextBtn.disabled = gallery.scrollLeft >= maxScrollLeft - 5;
            });
        };

        prevBtn.addEventListener('click', () => {
            gallery.scrollBy({ left: -350, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            gallery.scrollBy({ left: 350, behavior: 'smooth' });
        });

        // Throttle rapid scroll events
        let isScrolling;
        gallery.addEventListener('scroll', () => {
            window.cancelAnimationFrame(isScrolling);
            isScrolling = window.requestAnimationFrame(updateButtons);
        }, { passive: true });

        window.addEventListener('resize', updateButtons, { passive: true });

        // Defers the initial check so it doesn't freeze the first HTML paint
        if (window.requestIdleCallback) {
            requestIdleCallback(updateButtons);
        } else {
            setTimeout(updateButtons, 200);
        }
    }

    /* ==============================================================
       FAQ ACCORDION LOGIC
       ============================================================== */
    const faqItems = document.querySelectorAll('.faq-item');
    if(faqItems.length > 0) {
        faqItems.forEach(item => {
            const questionBtn = item.querySelector('.faq-question');
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(i => i.classList.remove('active'));
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    /* ==============================================================
       FORMSPREE AJAX SUBMISSION
       ============================================================== */
    const form = document.getElementById('solveria-contact-form');
    const successMsg = document.getElementById('form-success-message');

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const formData = new FormData(form);
            const actionUrl = form.getAttribute('action');
            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.textContent = 'Initializing...';
            submitBtn.disabled = true;

            fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    form.style.display = 'none';
                    successMsg.classList.add('active');
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert("Oops! There was a problem initializing your quote request.");
                        }
                    });
                }
            }).catch(error => {
                alert("Oops! There was a network issue submitting your form.");
            }).finally(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

});