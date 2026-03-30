// script.js
document.addEventListener("DOMContentLoaded", () => {
    
    // FIX FOR DELAYED LCP ON MOBILE: 
    // We strictly wait until ALL critical page rendering is complete (window.onload) 
    // before we throw heavy JavaScript at the browser. This ensures the main thread 
    // focuses entirely on printing the text and hero image first.
    const initializePerformanceEngine = () => {

        // --- Lazy Load High-Bandwidth Videos ---
        // Dynamically adjust root margin. Mobile downloads slower, so we want it to 
        // start fetching slightly closer to view, but large enough not to stutter.
        const videoRootMargin = window.innerWidth < 768 ? "600px 0px" : "1500px 0px";
        
        const lazyVideos = document.querySelectorAll('video.lazy-video');
        if ('IntersectionObserver' in window) {
            const videoObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        video.src = video.getAttribute('data-src');
                        video.load();
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(error => { console.log("Video autoplay prevented:", error); });
                        }
                        video.classList.remove('lazy-video');
                        observer.unobserve(video);
                    }
                });
            }, { rootMargin: videoRootMargin });
            lazyVideos.forEach(v => videoObserver.observe(v));
        } else {
            lazyVideos.forEach(v => {
                v.src = v.getAttribute('data-src');
            });
        }

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
            }, { rootMargin: "800px 0px" });
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

        // --- INTERACTIVE PREVIEW IMAGE LOGIC ---
        const previewContainer = document.getElementById('preview-container');
        const previewImage = document.getElementById('preview-image');
        
        const zoomInBtn = document.getElementById('zoom-in');
        const zoomOutBtn = document.getElementById('zoom-out');
        const zoomResetBtn = document.getElementById('zoom-reset');
        const zoomLevelText = document.getElementById('zoom-level');

        if (previewContainer && previewImage) {
            let scale = 0.5;
            let isDragging = false;
            let startX, startY;
            let translateX = 0, translateY = 0;

            const updateTransform = () => {
                if (!previewContainer || !previewImage) return;
                if (previewImage.clientWidth === 0) return; 
                
                const contW = previewContainer.clientWidth;
                const contH = previewContainer.clientHeight;
                const imgW = previewImage.clientWidth * scale;
                const imgH = previewImage.clientHeight * scale;

                let minX, maxX, minY, maxY;
                const overscrollX = contW * 0.85; 
                const overscrollY = contH * 0.85; 

                if (imgW <= contW) {
                    minX = ((contW - imgW) / 2) - overscrollX;
                    maxX = ((contW - imgW) / 2) + overscrollX;
                } else {
                    minX = (contW - imgW) - overscrollX;
                    maxX = overscrollX;
                }

                if (imgH <= contH) {
                    minY = ((contH - imgH) / 2) - overscrollY;
                    maxY = ((contH - imgH) / 2) + overscrollY;
                } else {
                    minY = (contH - imgH) - overscrollY;
                    maxY = overscrollY;
                }

                translateX = Math.max(minX, Math.min(maxX, translateX));
                translateY = Math.max(minY, Math.min(maxY, translateY));

                previewImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
                if(zoomLevelText) zoomLevelText.textContent = `${Math.round(scale * 100)}%`;
            };

            const initPreview = () => {
                if (previewImage.clientWidth > 0) {
                    translateX = (previewContainer.clientWidth - (previewImage.clientWidth * scale)) / 2;
                    translateY = 60; 
                    updateTransform();
                    
                    // GLITCH FIX: Now that the precise math is applied, we add the class
                    // that triggers the CSS fade-in. This makes the snap completely invisible.
                    previewImage.classList.add('initialized');
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
                scale = 0.5; 
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
            
            pricingCardsContainer.classList.add('seq-init');
            
            const setStage = (stage) => {
                pricingCardsContainer.classList.remove('seq-init', 'seq-step-1', 'seq-step-2', 'seq-step-3', 'seq-step-4', 'seq-step-5');
                pricingCardsContainer.classList.add(stage);
            };

            const pricingSequenceObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        observer.unobserve(entry.target);
                        setTimeout(() => setStage('seq-step-1'), 200);   
                        setTimeout(() => setStage('seq-step-2'), 1000);  
                        setTimeout(() => setStage('seq-step-3'), 2000);  
                        setTimeout(() => setStage('seq-step-4'), 2600);  
                        setTimeout(() => setStage('seq-step-5'), 4000);  
                    }
                });
            }, { rootMargin: '0px 0px -50px 0px' });
            
            pricingSequenceObserver.observe(pricingCardsContainer);
        }
    };

    // EXECUTE PERFORMANCE ENGINE ONLY AFTER THE ENTIRE PAGE IS MATHEMATICALLY LOADED
    window.addEventListener('load', () => {
        // We wait an extra 150ms just to let the browser breathe before setting up the observers.
        setTimeout(initializePerformanceEngine, 150);
    });

});