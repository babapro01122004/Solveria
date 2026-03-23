/**
 * Main Scripts
 */

document.addEventListener("DOMContentLoaded", () => {
    
    /* ==============================================================
       LAZY LOAD BACKGROUND IMAGES (Massive Lighthouse Score Boost)
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
        }, { rootMargin: "200px 0px" }); // Start downloading 200px before reaching the viewport

        lazyBackgrounds.forEach((bg) => {
            bgObserver.observe(bg);
        });
    } else {
        // Fallback execution for non-supported browsers
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
        // Toggle menu on click
        dropdownTrigger.addEventListener('click', (e) => {
            dropdownMenu.classList.toggle('active');
            e.stopPropagation();
        });

        // Close menu if clicked outside
        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('active');
        });

        // Update value on selection
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
       GALLERY HORIZONTAL SCROLL BUTTONS
       ============================================================== */
    const gallery = document.querySelector('.installation-gallery');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if(gallery && prevBtn && nextBtn) {
        const updateButtons = () => {
            // Disable Previous if at the start
            prevBtn.disabled = gallery.scrollLeft <= 5;
            
            // Disable Next if at the end (with small threshold for rounding edge-cases)
            const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
            nextBtn.disabled = gallery.scrollLeft >= maxScrollLeft - 5;
        };

        // Scroll Left (Approx width of one card + gap = 350px)
        prevBtn.addEventListener('click', () => {
            gallery.scrollBy({ left: -350, behavior: 'smooth' });
        });

        // Scroll Right
        nextBtn.addEventListener('click', () => {
            gallery.scrollBy({ left: 350, behavior: 'smooth' });
        });

        // Listen for user manual scroll or button scroll
        gallery.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);

        // Initial check on load
        updateButtons();
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
                
                // Collapse all other items before opening the clicked one
                faqItems.forEach(i => i.classList.remove('active'));
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    /* ==============================================================
       FORMSPREE AJAX SUBMISSION (NO REDIRECT)
       ============================================================== */
    const form = document.getElementById('solveria-contact-form');
    const successMsg = document.getElementById('form-success-message');

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop standard form submission completely

            const formData = new FormData(form);
            const actionUrl = form.getAttribute('action');
            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            
            // Visual feedback
            submitBtn.textContent = 'Initializing...';
            submitBtn.disabled = true;

            // Fetch request configuration
            fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Success Scenario
                    form.style.display = 'none';
                    successMsg.classList.add('active');
                } else {
                    // Server returned an error code
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert("Oops! There was a problem initializing your quote request.");
                        }
                    });
                }
            }).catch(error => {
                // Network level error
                alert("Oops! There was a network issue submitting your form.");
            }).finally(() => {
                // Re-enable button in case form needs resubmission on error
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

});