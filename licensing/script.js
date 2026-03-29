// script.js
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Existing Hero Image Lazy Loader ---
    const loadHeroImage = () => {
        const heroBgLayer = document.querySelector('.hero-bg-layer');
        if(heroBgLayer && !heroBgLayer.classList.contains('loaded')) {
            const imgUrl = 'image/Hero.png';
            const img = new Image();
            img.decoding = 'async';
            img.fetchPriority = 'low';
            img.src = imgUrl;
            img.onload = () => {
                heroBgLayer.style.backgroundImage = `url('${imgUrl}')`;
                heroBgLayer.classList.add('loaded');
            };
        }
    };

    const triggerHeroLoad = () => {
        loadHeroImage();['scroll', 'mousemove', 'touchstart'].forEach(evt => window.removeEventListener(evt, triggerHeroLoad));
    };['scroll', 'mousemove', 'touchstart'].forEach(evt => window.addEventListener(evt, triggerHeroLoad, {once: true, passive: true}));
    setTimeout(triggerHeroLoad, 8500);

    // --- Background & Stagger Intersection Observers ---
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
        }, { rootMargin: "250px 0px" });
        lazyBackgrounds.forEach((bg) => bgObserver.observe(bg));

        const staggerObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const parent = entry.target.parentElement;
                    const siblings = Array.from(parent.querySelectorAll('.stagger-item'));
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.15}s`;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -50px 0px' }); 
        document.querySelectorAll('.stagger-item').forEach(el => staggerObserver.observe(el));
    } else {
        lazyBackgrounds.forEach((bg) => {
            const bgUrl = bg.getAttribute('data-bg');
            if (bgUrl) bg.style.backgroundImage = `url('${bgUrl}')`;
            bg.classList.remove('lazy-bg');
        });
        document.querySelectorAll('.stagger-item').forEach(el => el.classList.add('is-visible'));
    }

    // --- INTERACTIVE PREVIEW IMAGE LOGIC (DRAG, PAN, & ZOOM WITH CLAMPING) ---
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');
    
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');
    const zoomLevelText = document.getElementById('zoom-level');

    if (previewContainer && previewImage) {
        let scale = 0.5; // Starts directly at 50%
        let isDragging = false;
        let startX, startY;
        let translateX = 0, translateY = 0;

        const updateTransform = () => {
            if (!previewContainer || !previewImage) return;
            if (previewImage.clientWidth === 0) return; // Prevent calculations if not rendered
            
            const contW = previewContainer.clientWidth;
            const contH = previewContainer.clientHeight;
            const imgW = previewImage.clientWidth * scale;
            const imgH = previewImage.clientHeight * scale;

            let minX, maxX, minY, maxY;

            // MASSIVELY increased overscroll so the image can be dragged anywhere in the massive section
            const overscrollX = contW * 0.85; 
            const overscrollY = contH * 0.85; 

            // Restrict Pan horizontally
            if (imgW <= contW) {
                minX = ((contW - imgW) / 2) - overscrollX;
                maxX = ((contW - imgW) / 2) + overscrollX;
            } else {
                minX = (contW - imgW) - overscrollX;
                maxX = overscrollX;
            }

            // Restrict Pan vertically
            if (imgH <= contH) {
                minY = ((contH - imgH) / 2) - overscrollY;
                maxY = ((contH - imgH) / 2) + overscrollY;
            } else {
                minY = (contH - imgH) - overscrollY;
                maxY = overscrollY;
            }

            // Mathematically enforce the limits
            translateX = Math.max(minX, Math.min(maxX, translateX));
            translateY = Math.max(minY, Math.min(maxY, translateY));

            previewImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            if(zoomLevelText) {
                zoomLevelText.textContent = `${Math.round(scale * 100)}%`;
            }
        };

        const initPreview = () => {
            if (previewImage.clientWidth > 0) {
                // Initialize mathematically horizontally centered with a gap above exactly like your screenshot
                translateX = (previewContainer.clientWidth - (previewImage.clientWidth * scale)) / 2;
                translateY = 60; 
                updateTransform();
            }
        };

        if (previewImage.complete) {
            initPreview();
        } else {
            previewImage.addEventListener('load', initPreview);
        }

        window.addEventListener('resize', updateTransform);

        const adjustZoom = (delta) => {
            let newScale = Math.max(0.25, Math.min(scale + delta, 4)); 
            
            const rect = previewContainer.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            translateX = centerX - (centerX - translateX) * (newScale / scale);
            translateY = centerY - (centerY - translateY) * (newScale / scale);
            
            scale = newScale;
            updateTransform();
        };

        if(zoomInBtn) zoomInBtn.addEventListener('click', () => adjustZoom(0.25));
        if(zoomOutBtn) zoomOutBtn.addEventListener('click', () => adjustZoom(-0.25));
        
        if(zoomResetBtn) zoomResetBtn.addEventListener('click', () => {
            scale = 0.5; // Resets cleanly back to 50% 
            translateX = (previewContainer.clientWidth - previewImage.clientWidth * scale) / 2; 
            translateY = 60; 
            updateTransform();
        });

        previewImage.addEventListener('dragstart', (e) => e.preventDefault());

        previewImage.addEventListener('wheel', (e) => {
            e.preventDefault(); 
            
            if (e.ctrlKey || e.metaKey) {
                const zoomSensitivity = 0.005;
                const delta = -e.deltaY * zoomSensitivity;
                let newScale = Math.max(0.25, Math.min(scale + delta, 4));

                const rect = previewContainer.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                translateX = mouseX - (mouseX - translateX) * (newScale / scale);
                translateY = mouseY - (mouseY - translateY) * (newScale / scale);
                
                scale = newScale;
            } else {
                translateX -= e.deltaX;
                translateY -= e.deltaY;
            }
            updateTransform();
        }, { passive: false });

        previewImage.addEventListener('mousedown', (e) => {
            e.preventDefault(); 
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
        });

        window.addEventListener('mouseup', () => { isDragging = false; });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateTransform();

            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
        });

        let initialPinchDistance = null;
        let initialScale = 1;

        previewImage.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                startX = e.touches[0].clientX - translateX;
                startY = e.touches[0].clientY - translateY;
            } else if (e.touches.length === 2) {
                isDragging = false;
                initialPinchDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                initialScale = scale;
            }
        }, { passive: false });

        window.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches.length === 1) {
                e.preventDefault(); 
                translateX = e.touches[0].clientX - startX;
                translateY = e.touches[0].clientY - startY;
                updateTransform();
                
                startX = e.touches[0].clientX - translateX;
                startY = e.touches[0].clientY - translateY;
            } else if (e.touches.length === 2 && initialPinchDistance) {
                e.preventDefault();
                const currentDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                const zoomFactor = currentDistance / initialPinchDistance;
                let newScale = Math.max(0.25, Math.min(initialScale * zoomFactor, 4));

                const rect = previewContainer.getBoundingClientRect();
                const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
                const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;

                translateX = centerX - (centerX - translateX) * (newScale / scale);
                translateY = centerY - (centerY - translateY) * (newScale / scale);

                scale = newScale;
                updateTransform();
            }
        }, { passive: false });

        window.addEventListener('touchend', (e) => {
            if (e.touches.length < 2) initialPinchDistance = null;
            if (e.touches.length === 0) isDragging = false;
        });
    }

    // --- PRICING CARDS ANIMATION SEQUENCE ---
    const pricingCardsContainer = document.getElementById('pricing-cards-container');
    if (pricingCardsContainer && 'IntersectionObserver' in window) {
        
        // Ensure it starts hidden but layout is reserved
        pricingCardsContainer.classList.add('seq-init');
        
        const setStage = (stage) => {
            pricingCardsContainer.classList.remove('seq-init', 'seq-step-1', 'seq-step-2', 'seq-step-3', 'seq-step-4', 'seq-step-5');
            pricingCardsContainer.classList.add(stage);
        };

        const pricingSequenceObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    // Master Orchestration Timeline
                    setTimeout(() => setStage('seq-step-1'), 200);   // Standard fades in at center
                    setTimeout(() => setStage('seq-step-2'), 1000);  // Red diagonal line violently crosses it out
                    setTimeout(() => setStage('seq-step-3'), 2000);  // Standard fades entirely out
                    setTimeout(() => setStage('seq-step-4'), 2600);  // Premium majestically fades in at center
                    setTimeout(() => setStage('seq-step-5'), 4000);  // The Split: Both glide to their separate sides
                }
            });
        }, { rootMargin: '0px 0px -50px 0px' });
        
        pricingSequenceObserver.observe(pricingCardsContainer);
    }
});