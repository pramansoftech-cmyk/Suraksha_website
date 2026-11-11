// 1. GLOBAL BULLETPROOF MUTE TOGGLE (Instagram Reel Style)
window.toggleHeroMute = function(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    const video = document.getElementById('hero-video');
    const btn = document.getElementById('mute-toggle-btn');
    const iconMuted = document.getElementById('icon-muted');
    const iconUnmuted = document.getElementById('icon-unmuted');
    
    if (!video) return;

    if (video.muted) {
        video.muted = false;
        video.volume = 1.0;
        
        if (iconMuted) iconMuted.classList.add('hidden');
        if (iconUnmuted) iconUnmuted.classList.remove('hidden');
        if (btn) btn.classList.remove('animate-pulse');
        
        video.play().catch(err => console.log("Playback interrupted"));
    } else {
        video.muted = true;
        
        if (iconUnmuted) iconUnmuted.classList.add('hidden');
        if (iconMuted) iconMuted.classList.remove('hidden');
        if (btn) btn.classList.add('animate-pulse');
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // 2. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);
    
    // 3. Partner Modal Logic
    const partnerModal = document.getElementById('partner-modal');
    const closePartnerModalBtn = document.getElementById('close-modal-btn');
    const partnerModalBackdrop = document.querySelector('.modal-backdrop');
    const partnerModalContent = document.getElementById('partner-modal-content');

    setTimeout(() => {
        if(partnerModal) {
            partnerModal.classList.remove('hidden');
            void partnerModal.offsetWidth; 
            partnerModal.classList.remove('opacity-0');
            partnerModalContent.classList.remove('scale-95');
            partnerModalContent.classList.add('scale-100');
            document.body.classList.add('menu-open');
            lenis.stop(); 
        }
    }, 20000);

    function closePartnerModal() {
        if(partnerModal) {
            partnerModal.classList.add('opacity-0');
            partnerModalContent.classList.remove('scale-100');
            partnerModalContent.classList.add('scale-95');
            setTimeout(() => {
                partnerModal.classList.add('hidden');
                document.body.classList.remove('menu-open');
                lenis.start(); 
            }, 300);
        }
    }

    if(closePartnerModalBtn) closePartnerModalBtn.addEventListener('click', closePartnerModal);
    if(partnerModalBackdrop) partnerModalBackdrop.addEventListener('click', closePartnerModal);


    // 4. Logo Pop-Up Modal Logic
    const logoModal = document.getElementById('logo-modal');
    const closeLogoModalBtn = document.getElementById('close-logo-modal-btn');
    const logoModalBackdrop = document.querySelector('.logo-modal-backdrop');
    const logoModalContent = document.getElementById('logo-modal-content');
    const logoBtns = document.querySelectorAll('.logo-popup-trigger');

    function openLogoModal(e) {
        e.preventDefault(); 
        if(logoModal) {
            logoModal.classList.remove('hidden');
            void logoModal.offsetWidth; 
            logoModal.classList.remove('opacity-0');
            logoModalContent.classList.remove('scale-95');
            logoModalContent.classList.add('scale-100');
            document.body.classList.add('menu-open');
            lenis.stop(); 
        }
    }

    function closeLogoModal() {
        if(logoModal) {
            logoModal.classList.add('opacity-0');
            logoModalContent.classList.remove('scale-100');
            logoModalContent.classList.add('scale-95');
            setTimeout(() => {
                logoModal.classList.add('hidden');
                if(!partnerModal || partnerModal.classList.contains('hidden')) {
                    document.body.classList.remove('menu-open');
                    lenis.start(); 
                }
            }, 300);
        }
    }

    if(logoBtns) logoBtns.forEach(btn => btn.addEventListener('click', openLogoModal));
    if(closeLogoModalBtn) closeLogoModalBtn.addEventListener('click', closeLogoModal);
    if(logoModalBackdrop) logoModalBackdrop.addEventListener('click', closeLogoModal);


    // 5. Gallery Media Pop-Up Modal Logic
    const galleryModal = document.getElementById('gallery-modal');
    const closeGalleryModalBtn = document.getElementById('close-gallery-modal-btn');
    const galleryModalBackdrop = document.querySelector('.gallery-modal-backdrop');
    const galleryModalContent = document.getElementById('gallery-modal-content');
    const galleryMediaContainer = document.getElementById('gallery-modal-media-container');
    const galleryTriggers = document.querySelectorAll('.gallery-popup-trigger');

    function openGalleryModal(e) {
        const card = e.currentTarget;
        const mediaType = card.getAttribute('data-type');
        const mediaSrc = card.getAttribute('data-src');

        if(galleryMediaContainer) {
            galleryMediaContainer.innerHTML = ''; 

            if (mediaType === 'video') {
                galleryMediaContainer.innerHTML = `<video src="${mediaSrc}" controls autoplay playsinline class="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl bg-black"></video>`;
            } else if (mediaType === 'image') {
                galleryMediaContainer.innerHTML = `<img src="${mediaSrc}" class="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl bg-transparent">`;
            }
        }

        if(galleryModal) {
            galleryModal.classList.remove('hidden');
            void galleryModal.offsetWidth;
            galleryModal.classList.remove('opacity-0');
            galleryModalContent.classList.remove('scale-95');
            galleryModalContent.classList.add('scale-100');
            document.body.classList.add('menu-open');
            lenis.stop();
        }
    }

    function closeGalleryModal() {
        if(galleryModal) {
            galleryModal.classList.add('opacity-0');
            galleryModalContent.classList.remove('scale-100');
            galleryModalContent.classList.add('scale-95');
            setTimeout(() => {
                galleryModal.classList.add('hidden');
                if(galleryMediaContainer) galleryMediaContainer.innerHTML = ''; 
                
                if ((!partnerModal || partnerModal.classList.contains('hidden')) && 
                    (!logoModal || logoModal.classList.contains('hidden'))) {
                    document.body.classList.remove('menu-open');
                    lenis.start();
                }
            }, 300);
        }
    }

    if(galleryTriggers) galleryTriggers.forEach(trigger => trigger.addEventListener('click', openGalleryModal));
    if(closeGalleryModalBtn) closeGalleryModalBtn.addEventListener('click', closeGalleryModal);
    if(galleryModalBackdrop) galleryModalBackdrop.addEventListener('click', closeGalleryModal);


    // 6. Navbar Scroll Effect
    const header = document.querySelector('header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';
                header.classList.add('bg-corporate-950/95');
                header.classList.remove('bg-corporate-950/80');
            } else {
                header.style.boxShadow = 'none';
                header.classList.add('bg-corporate-950/80');
                header.classList.remove('bg-corporate-950/95');
            }
        });
    }

    // 7. Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileMenuBackdrop = document.getElementById('mobile-backdrop');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const body = document.body;

    function openMenu() {
        if(mobileDrawer && mobileMenuBackdrop) {
            mobileDrawer.classList.remove('translate-x-full');
            mobileMenuBackdrop.classList.remove('hidden');
            setTimeout(() => {
                mobileMenuBackdrop.classList.remove('opacity-0');
                mobileMenuBackdrop.classList.add('opacity-100');
            }, 10);
            body.classList.add('menu-open');
            lenis.stop(); 
        }
    }

    function closeMenu() {
        if(mobileDrawer && mobileMenuBackdrop) {
            mobileDrawer.classList.add('translate-x-full');
            mobileMenuBackdrop.classList.remove('opacity-100');
            mobileMenuBackdrop.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenuBackdrop.classList.add('hidden');
            }, 300);
            
            if((!partnerModal || partnerModal.classList.contains('hidden')) && 
               (!logoModal || logoModal.classList.contains('hidden')) &&
               (!galleryModal || galleryModal.classList.contains('hidden'))) {
                body.classList.remove('menu-open');
                lenis.start();
            }
        }
    }

    if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if(mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMenu);
    if(mobileLinks) mobileLinks.forEach(link => { link.addEventListener('click', closeMenu); });


    // 8. GSAP Animations Initialization Function
    function initAnimations() {
        gsap.utils.toArray('.gsap-fade-up').forEach(element => {
            gsap.fromTo(element, 
                { y: 50, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                    }
                }
            );
        });

        gsap.utils.toArray('.gsap-fade-3d-up').forEach(element => {
            gsap.fromTo(element, 
                { y: 60, autoAlpha: 0, rotationX: -15, transformPerspective: 1000 },
                {
                    y: 0,
                    autoAlpha: 1,
                    rotationX: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                    }
                }
            );
        });

        gsap.utils.toArray('.gsap-fade-3d-right').forEach(element => {
            gsap.fromTo(element, 
                { x: -50, autoAlpha: 0, rotationY: 15, transformPerspective: 1000 },
                {
                    x: 0,
                    autoAlpha: 1,
                    rotationY: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                    }
                }
            );
        });

        // NEW: Animation for items sliding in from the right (moving left)
        gsap.utils.toArray('.gsap-fade-3d-left').forEach(element => {
            gsap.fromTo(element, 
                { x: 50, autoAlpha: 0, rotationY: -15, transformPerspective: 1000 },
                {
                    x: 0,
                    autoAlpha: 1,
                    rotationY: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                    }
                }
            );
        });

        gsap.utils.toArray('.gsap-stagger-container').forEach(container => {
            const items = container.querySelectorAll('.gsap-stagger-item');
            gsap.fromTo(items,
                { y: 50, autoAlpha: 0, rotationX: -15, transformPerspective: 1200 },
                {
                    y: 0,
                    autoAlpha: 1,
                    rotationX: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                    }
                }
            );
        });

        gsap.utils.toArray('.img-parallax-container').forEach(container => {
            const img = container.querySelector('.parallax-img');
            gsap.to(img, {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            ScrollTrigger.create({
                trigger: counter,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    let current = { val: 0 };
                    gsap.to(current, {
                        val: target,
                        duration: 2.5,
                        ease: "power3.out",
                        onUpdate: () => {
                            counter.innerHTML = Math.floor(current.val).toLocaleString() + (target > 100 ? '+' : '');
                        }
                    });
                }
            });
        });
    }

    // 9. Attach click to the invisible video overlay
    const videoClickLayer = document.getElementById('video-click-layer');
    if (videoClickLayer) {
        videoClickLayer.addEventListener('click', window.toggleHeroMute);
    }

    // 10. 3-Second Cinematic Looping Carousel (Image -> Video)
    const heroMediaContainer = document.getElementById('hero-media-container');
    const heroLaunchImg = document.getElementById('hero-launch-img');
    const heroVideo = document.getElementById('hero-video');
    const heroTextBlock = document.getElementById('hero-text-block');
    const muteToggleBtn = document.getElementById('mute-toggle-btn');

    if (heroMediaContainer && heroLaunchImg) {
        
        document.body.classList.add('overflow-hidden');
        lenis.stop();
        
        gsap.set(heroTextBlock, { opacity: 0, y: 100 });
        if(heroVideo) gsap.set(heroVideo, { xPercent: 100 }); 

        setTimeout(() => {
            const targetHeight = window.innerWidth >= 1024 ? '65vh' : (window.innerWidth >= 640 ? '55vh' : '45vh');
            
            // Un-hide the click layers now that the cinematic view is starting
            if(muteToggleBtn) muteToggleBtn.classList.remove('hidden');
            if(videoClickLayer) videoClickLayer.classList.remove('hidden');
            
            // Intro Animations
            gsap.to(heroMediaContainer, { height: targetHeight, duration: 1.2, ease: "power3.inOut" });
            gsap.to(heroTextBlock, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2, onComplete: () => {
                document.body.classList.remove('overflow-hidden');
                lenis.start();
                initAnimations(); 
                ScrollTrigger.refresh();
            }});

            // Infinite Looping Animation for Media
            const carouselTl = gsap.timeline({ repeat: -1 });

            // Slide Image out to left and Video in from right
            carouselTl.to(heroLaunchImg, { xPercent: -100, duration: 1.2, ease: "power3.inOut" }, 0);
            if(heroVideo) carouselTl.to(heroVideo, { xPercent: 0, duration: 1.2, ease: "power3.inOut" }, 0);
                      
            // Video plays for 15 seconds
            carouselTl.to({}, { duration: 15 });

            // Move Image silently to the right behind the scenes
            carouselTl.set(heroLaunchImg, { xPercent: 100 });

            // Slide Video out to left and Image in from right
            if(heroVideo) carouselTl.to(heroVideo, { xPercent: -100, duration: 1.2, ease: "power3.inOut" });
            carouselTl.to(heroLaunchImg, { xPercent: 0, duration: 1.2, ease: "power3.inOut" }, "<");

            // Image is displayed for 4 seconds
            carouselTl.to({}, { duration: 4 });

            // Move Video silently to the right behind the scenes to repeat loop
            if(heroVideo) carouselTl.set(heroVideo, { xPercent: 100 });

        }, 3000); 

    } else {
        if(heroTextBlock) gsap.set(heroTextBlock, { opacity: 1, y: 0 });
        initAnimations();
    }

    // 11. Interactive 3D Mouse Tilt Effect for Cards (Desktop Only)
    if(window.innerWidth > 768) {
        const tiltCards = document.querySelectorAll('.tilt-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }
});