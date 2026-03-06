// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // PARTICLE CANVAS BACKGROUND
    // ============================
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animFrameId;
        let w, h;

        function resizeCanvas() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        function createParticles() {
            particles = [];
            const count = Math.min(Math.floor((w * h) / 18000), 60);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    radius: Math.random() * 1.5 + 0.5,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.4 + 0.1
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, w, h);
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const color = isLight ? '100, 100, 120' : '167, 139, 250';

            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;
            });

            // Draw lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${color}, ${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animFrameId = requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        createParticles();
        drawParticles();

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                createParticles();
            }, 200);
        });
    }

    // ============================
    // THEME TOGGLE
    // ============================
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);

            themeToggle.style.animation = 'none';
            themeToggle.offsetHeight; // force reflow
            themeToggle.style.animation = 'bounceBtn 0.5s ease';
        });
    }

    // ============================
    // COUNTER ANIMATION (Stats)
    // ============================
    const counters = document.querySelectorAll('.stat-number[data-count]');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 1500;
            const step = Math.ceil(target / (duration / 16));
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = current;
            }, 16);
        });
    }

    // Trigger counter animation when stats bar is visible
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsBar);
    }

    // ============================
    // MODAL FUNCTIONALITY
    // ============================
    const modals = {
        contact: document.getElementById('contactModal'),
        resume: document.getElementById('resumeModal'),
        certificates: document.getElementById('certificatesModal'),
        rate: document.getElementById('rateModal'),
        comment: document.getElementById('commentModal')
    };

    // Helper functions
    function openModal(sectionName) {
        const modal = modals[sectionName];
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Re-trigger star animations for rate modal
            if (sectionName === 'rate') {
                const stars = modal.querySelectorAll('.rating-stars i');
                stars.forEach(star => {
                    star.style.animation = 'none';
                    star.offsetHeight;
                    star.style.animation = '';
                });
            }
        }
    }

    function closeAllModals() {
        Object.values(modals).forEach(modal => {
            if (modal) modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }

    // Attach click handlers to EACH card individually by ID
    const cardMapping = {
        'contactCard': 'contact',
        'resumeCard': 'resume',
        'certificatesCard': 'certificates',
        'rateCard': 'rate',
        'commentCard': 'comment'
    };

    Object.entries(cardMapping).forEach(([cardId, modalName]) => {
        const card = document.getElementById(cardId);
        if (card) {
            card.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                openModal(modalName);
            });
        }
    });

    // ALSO attach via data-section as a fallback
    document.querySelectorAll('.link-card[data-section]').forEach(card => {
        card.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const section = this.getAttribute('data-section');
            openModal(section);
        });
    });

    // Close buttons
    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeAllModals();
        });
    });

    // Close on backdrop click
    Object.values(modals).forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeAllModals();
                }
            });
        }
    });

    // Ensure action buttons inside modals work — force open in new tab
    document.querySelectorAll('.modal .action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const url = btn.getAttribute('href');
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });

    // Prevent resume-links container from blocking clicks
    document.querySelectorAll('.resume-links').forEach(container => {
        container.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Prevent exp-footer from blocking clicks
    document.querySelectorAll('.exp-footer').forEach(footer => {
        footer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // ============================
    // WORK EXPERIENCE CARDS
    // ============================
    const expCards = document.querySelectorAll('.exp-card');
    expCards.forEach(card => {
        const header = card.querySelector('.exp-card-header');
        if (header) {
            header.addEventListener('click', (e) => {
                e.stopPropagation();
                const wasActive = card.classList.contains('active');

                // Close all other cards (accordion behavior)
                expCards.forEach(c => c.classList.remove('active'));

                // Toggle this card
                if (!wasActive) {
                    card.classList.add('active');
                }
            });
        }
    });

    // Prevent clicks inside exp-card-body from closing modal
    document.querySelectorAll('.exp-card-body').forEach(body => {
        body.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // ============================
    // RATING STARS HOVER
    // ============================
    const ratingStars = document.querySelectorAll('.rating-stars i');
    ratingStars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            ratingStars.forEach((s, i) => {
                s.classList.toggle('active', i <= index);
            });
        });
    });

    const ratingContainer = document.querySelector('.rating-stars');
    if (ratingContainer) {
        ratingContainer.addEventListener('mouseleave', () => {
            ratingStars.forEach(s => s.classList.remove('active'));
        });
    }

    // ============================
    // SCROLL ANIMATIONS (Stagger)
    // ============================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.link-card').forEach((card, index) => {
        card.classList.add('animate-in');
        card.style.transitionDelay = `${0.3 + index * 0.08}s`;
        observer.observe(card);
    });

    // Animate social cards too
    document.querySelectorAll('.social-card').forEach((card, index) => {
        card.classList.add('animate-in');
        card.style.transitionDelay = `${0.6 + index * 0.1}s`;
        observer.observe(card);
    });

    // ============================
    // RIPPLE EFFECT
    // ============================
    document.querySelectorAll('.link-card').forEach(card => {
        card.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ============================
    // PROFILE IMAGE FALLBACK
    // ============================
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.addEventListener('error', function () {
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #7c3aed, #a78bfa);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 48px;
                font-weight: 800;
                color: white;
                font-family: 'Inter', sans-serif;
            `;
            placeholder.textContent = 'MR';
            this.parentElement.innerHTML = '';
            this.parentElement.appendChild(placeholder);
        });
    }

    // ============================
    // EXTERNAL LINK ICON SPIN
    // ============================
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function () {
            const icon = this.querySelector('.fa-external-link-alt');
            if (icon) {
                icon.style.animation = 'spin 0.5s ease';
                setTimeout(() => icon.style.animation = '', 500);
            }
        });
    });

    // Add dynamic keyframes
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        @keyframes bounceBtn {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.2) rotate(10deg); }
            50% { transform: scale(0.9) rotate(-10deg); }
            75% { transform: scale(1.1) rotate(5deg); }
        }

        .animate-in {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                        transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(dynamicStyles);
});
