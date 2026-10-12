document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Lenis Smooth Scrolling
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

    // Sync GSAP ScrollTrigger with Lenis
    gsap.registerPlugin(ScrollTrigger);
    
    // 2. Partner With Us Modal Logic
    const partnerModal = document.getElementById('partner-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalContent = document.getElementById('partner-modal-content');

    // Automatically show modal 20 seconds (20000ms) after page load
    setTimeout(() => {
        if(partnerModal) {
            partnerModal.classList.remove('hidden');
            void partnerModal.offsetWidth; 
            partnerModal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
            document.body.classList.add('menu-open');
            lenis.stop(); 
        }
    }, 20000);

    function closePartnerModal() {
        partnerModal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            partnerModal.classList.add('hidden');
            document.body.classList.remove('menu-open');
            lenis.start(); 
        }, 300);
    }

    if(closeModalBtn) closeModalBtn.addEventListener('click', closePartnerModal);
    if(modalBackdrop) modalBackdrop.addEventListener('click', closePartnerModal);

    // 3. Navbar Scroll Effect
    // The background stays Deep Blue so SURAKSHA is always visible. We just add a shadow on scroll.
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // 4. Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileMenuBackdrop = document.getElementById('mobile-backdrop');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const body = document.body;

    function openMenu() {
        mobileDrawer.classList.remove('translate-x-full');
        mobileMenuBackdrop.classList.remove('hidden');
        setTimeout(() => {
            mobileMenuBackdrop.classList.remove('opacity-0');
            mobileMenuBackdrop.classList.add('opacity-100');
        }, 10);
        body.classList.add('menu-open');
        lenis.stop(); 
    }

    function closeMenu() {
        mobileDrawer.classList.add('translate-x-full');
        mobileMenuBackdrop.classList.remove('opacity-100');
        mobileMenuBackdrop.classList.add('opacity-0');
        setTimeout(() => {
            mobileMenuBackdrop.classList.add('hidden');
        }, 300);
        
        if(partnerModal && partnerModal.classList.contains('hidden')) {
            body.classList.remove('menu-open');
            lenis.start();
        }
    }

    if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if(mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => { link.addEventListener('click', closeMenu); });

    // 5. GSAP 3D Scroll Animations
    
    // Simple Fade Ups (For regular text)
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

    // 3D Fade Up (Folds up like a hinge)
    gsap.utils.toArray('.gsap-fade-3d-up').forEach(element => {
        gsap.fromTo(element, 
            { y: 80, autoAlpha: 0, rotationX: -30, transformPerspective: 1000 },
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

    // 3D Fade Right
    gsap.utils.toArray('.gsap-fade-3d-right').forEach(element => {
        gsap.fromTo(element, 
            { x: -80, autoAlpha: 0, rotationY: 30, transformPerspective: 1000 },
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

    // 3D Staggered Container Groups (Cards flip into place sequentially)
    gsap.utils.toArray('.gsap-stagger-container').forEach(container => {
        const items = container.querySelectorAll('.gsap-stagger-item');
        gsap.fromTo(items,
            { y: 80, autoAlpha: 0, rotationX: -20, transformPerspective: 1200 },
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

    // Image Parallax Effect
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

    // Number Counter Animation
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

    // 6. Interactive 3D Mouse Tilt Effect for Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            // Get cursor position relative to the card
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            // Calculate percentage from center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Generate rotation degrees (max 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset to flat when mouse leaves
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

});