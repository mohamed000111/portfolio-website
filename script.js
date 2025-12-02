// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);

            // Add a bounce animation
            themeToggle.style.animation = 'none';
            setTimeout(() => {
                themeToggle.style.animation = 'bounce 0.5s ease';
            }, 10);
        });
    }

    // Modal functionality
    const modals = {
        contact: document.getElementById('contactModal'),
        resume: document.getElementById('resumeModal'),
        certificates: document.getElementById('certificatesModal'),
        rate: document.getElementById('rateModal'),
        comment: document.getElementById('commentModal')
    };

    // Get all link cards with data-section attribute
    const linkCards = document.querySelectorAll('.link-card[data-section]');

    // Add click event listeners to link cards
    linkCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const section = card.getAttribute('data-section');
            if (modals[section]) {
                modals[section].style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close');

    // Add click event to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            Object.values(modals).forEach(modal => {
                if (modal) {
                    modal.style.display = 'none';
                }
            });
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    });

    // Close modal when clicking outside
    Object.values(modals).forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            Object.values(modals).forEach(modal => {
                if (modal) {
                    modal.style.display = 'none';
                }
            });
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && !this.hasAttribute('data-section')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Enhanced animation on scroll with stagger effect
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, observerOptions);

    // Observe all link cards with stagger animation
    document.querySelectorAll('.link-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s,
                                  transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });

    // Parallax effect on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const profileSection = document.querySelector('.profile-section');
                if (profileSection) {
                    profileSection.style.transform = `translateY(${scrolled * 0.3}px)`;
                    profileSection.style.opacity = Math.max(1 - scrolled / 500, 0.3);
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add ripple effect to link cards
    linkCards.forEach(card => {
        card.addEventListener('click', function(e) {
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

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect dynamically
    const style = document.createElement('style');
    style.textContent = `
        .link-card {
            position: relative;
            overflow: hidden;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(74, 158, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Profile image fallback
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // Create a placeholder with initials
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #4a9eff, #357abd);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 48px;
                font-weight: bold;
                color: white;
            `;
            placeholder.textContent = 'MRS';
            this.parentElement.innerHTML = '';
            this.parentElement.appendChild(placeholder);
        });
    }

    // Add loading animation for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            const icon = this.querySelector('.fa-external-link-alt');
            if (icon) {
                icon.style.animation = 'spin 0.5s ease';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 500);
            }
        });
    });

    // Add spin animation for external links
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
});
