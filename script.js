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
        });
    }

    // ============================
    // ZOOM CONTROLS
    // ============================
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const zoomLevel = document.getElementById('zoomLevel');
    let currentZoom = parseInt(localStorage.getItem('zoomLevel')) || 100;

    function applyZoom() {
        document.body.style.zoom = currentZoom + '%';
        if (zoomLevel) zoomLevel.textContent = currentZoom + '%';
        localStorage.setItem('zoomLevel', currentZoom);
    }

    applyZoom();

    if (zoomIn) {
        zoomIn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentZoom < 150) {
                currentZoom += 10;
                applyZoom();
            }
        });
    }

    if (zoomOut) {
        zoomOut.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentZoom > 60) {
                currentZoom -= 10;
                applyZoom();
            }
        });
    }

    // ============================
    // SHARE BUTTON
    // ============================
    const shareBtn = document.getElementById('shareBtn');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            
            const shareData = {
                title: 'Dr. Mohamed Rabie Shehata',
                text: 'Check out the professional portfolio of Dr. Mohamed Rabie Shehata, Insurance Operations Specialist.',
                url: window.location.href
            };
            
            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    // User cancelled or share failed
                    console.log('Share error:', err);
                }
            } else {
                // Fallback: Copy to clipboard for desktop browsers
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    
                    // Show a quick visual feedback using the icon
                    const icon = shareBtn.querySelector('i');
                    if (icon) {
                        const originalClass = icon.className;
                        icon.className = 'fas fa-check';
                        shareBtn.style.color = '#10b981'; // Success green
                        
                        setTimeout(() => {
                            icon.className = originalClass;
                            shareBtn.style.color = '';
                        }, 2000);
                    }
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            }
        });
    }

    // ============================
    // BACKGROUND MUSIC TOGGLE
    // ============================
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const headerControls = document.querySelector('.header-controls');

    if (musicToggle && bgMusic) {
        bgMusic.volume = 0.3;

        function playMusic() {
            bgMusic.play().then(() => {
                musicToggle.classList.add('playing');
                if (headerControls) headerControls.classList.add('music-active');
                localStorage.setItem('musicPlaying', 'true');
            }).catch(() => {
                musicToggle.classList.remove('playing');
                if (headerControls) headerControls.classList.remove('music-active');
            });
        }

        function pauseMusic() {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            if (headerControls) headerControls.classList.remove('music-active');
            localStorage.setItem('musicPlaying', 'false');
        }

        // Always try to autoplay immediately
        playMusic();

        // If autoplay was blocked, start on first user interaction
        const startOnInteraction = () => {
            if (bgMusic.paused && localStorage.getItem('musicPlaying') !== 'false') {
                playMusic();
            }
            document.removeEventListener('click', startOnInteraction);
            document.removeEventListener('keydown', startOnInteraction);
            document.removeEventListener('scroll', startOnInteraction);
            document.removeEventListener('touchstart', startOnInteraction);
        };
        document.addEventListener('click', startOnInteraction);
        document.addEventListener('keydown', startOnInteraction);
        document.addEventListener('scroll', startOnInteraction);
        document.addEventListener('touchstart', startOnInteraction);

        // Toggle button — manual play/pause
        musicToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bgMusic.paused) {
                playMusic();
            } else {
                pauseMusic();
            }
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
        education: document.getElementById('educationModal'),
        skills: document.getElementById('skillsModal'),
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
        'educationCard': 'education',
        'skillsCard': 'skills',
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

    // ============================
    // SUPABASE TESTIMONIALS LOGIC
    // ============================
    // Initialize Supabase Client
    const supabaseUrl = 'https://wpatabjyvfusqpbwfoje.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwYXRhYmp5dmZ1c3FwYndmb2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3ODEzNTIsImV4cCI6MjA4NjM1NzM1Mn0.-sUHdaPUwN-6PxiDSzfAoiz4O1B3mtYg7H8L0sDoaT0';
    
    // Only init if supabase is loaded from CDN
    if (window.supabase) {
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
        
        const testimonialsList = document.getElementById('testimonialsList');
        const testimonialForm = document.getElementById('testimonialForm');
        
        // Fetch existing testimonials
        async function fetchTestimonials() {
            if (!testimonialsList) return;
            
            try {
                // If key is missing, show placeholder/demo data
                if (supabaseKey === 'YOUR_SUPABASE_ANON_KEY') {
                    testimonialsList.innerHTML = `
                        <div class="testimonial-item">
                            <div class="testimonial-header">
                                <div>
                                    <div class="testimonial-author">John Doe</div>
                                    <div class="testimonial-position">CEO, Tech Innovations</div>
                                </div>
                                <div class="testimonial-date">May 2026</div>
                            </div>
                            <div class="testimonial-comment">"Dr. Mohamed is an absolute professional. His expertise in policy administration and medical underwriting significantly improved our workflow."</div>
                        </div>
                    `;
                    return;
                }

                const { data, error } = await supabase
                    .from('testimonials')
                    .select('*')
                    .order('created_at', { ascending: false });
                    
                if (error) throw error;
                
                if (data && data.length > 0) {
                    testimonialsList.innerHTML = ''; // clear loading
                    data.forEach(item => {
                        const date = new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                        testimonialsList.innerHTML += `
                            <div class="testimonial-item">
                                <div class="testimonial-header">
                                    <div>
                                        <div class="testimonial-author">${escapeHTML(item.name)}</div>
                                        <div class="testimonial-position">${escapeHTML(item.position)}</div>
                                    </div>
                                    <div class="testimonial-date">${date}</div>
                                </div>
                                <div class="testimonial-comment">"${escapeHTML(item.comment)}"</div>
                            </div>
                        `;
                    });
                } else {
                    testimonialsList.innerHTML = '<p style="text-align:center; color:var(--text-muted);">No comments yet. Be the first!</p>';
                }
            } catch (err) {
                console.error("Error fetching testimonials:", err);
                testimonialsList.innerHTML = '<p style="text-align:center; color:var(--accent-secondary);">Could not load comments right now.</p>';
            }
        }
        
        // Submit new testimonial
        if (testimonialForm) {
            testimonialForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitBtn = document.getElementById('submitTestimonial');
                const btnText = submitBtn.querySelector('span');
                
                const name = document.getElementById('testName').value;
                const position = document.getElementById('testPosition').value;
                const comment = document.getElementById('testComment').value;
                
                if (supabaseKey === 'YOUR_SUPABASE_ANON_KEY') {
                    alert('Please configure your Supabase Anon Key in script.js to submit comments!');
                    return;
                }

                // Loading state
                btnText.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                try {
                    const { error } = await supabase
                        .from('testimonials')
                        .insert([
                            { name, position, comment }
                        ]);
                        
                    if (error) throw error;
                    
                    // Success
                    testimonialForm.reset();
                    btnText.textContent = 'Sent! Thank you';
                    submitBtn.style.background = '#10b981';
                    
                    // Refresh list
                    fetchTestimonials();
                    
                    setTimeout(() => {
                        btnText.textContent = 'Send Comment';
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                    
                } catch (err) {
                    console.error("Error submitting testimonial:", err);
                    btnText.textContent = 'Error! Try Again';
                    submitBtn.style.background = '#ef4444';
                    setTimeout(() => {
                        btnText.textContent = 'Send Comment';
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }
            });
        }
        
        // Helper to prevent XSS
        function escapeHTML(str) {
            return str.replace(/[&<>'"]/g, 
                tag => ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    "'": '&#39;',
                    '"': '&quot;'
                }[tag] || tag)
            );
        }
        
        // Initial fetch
        fetchTestimonials();

        // ============================
        // RATE ME LOGIC
        // ============================
        const ratingForm = document.getElementById('ratingForm');
        
        // Update slider values dynamically
        const sliders = ['Quality', 'Knowledge', 'Communication', 'Productivity', 'Management', 'Overall'];
        sliders.forEach(category => {
            const slider = document.getElementById(`rate${category}`);
            const valSpan = document.getElementById(`val${category}`);
            if (slider && valSpan) {
                slider.addEventListener('input', (e) => {
                    valSpan.textContent = e.target.value;
                });
            }
        });

        if (ratingForm) {
            ratingForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitBtn = document.getElementById('submitRatingBtn');
                const btnText = submitBtn.querySelector('span');
                
                if (supabaseKey === 'YOUR_SUPABASE_ANON_KEY') {
                    alert('Please configure your Supabase Anon Key!');
                    return;
                }

                btnText.textContent = 'Submitting...';
                submitBtn.disabled = true;

                const ratingData = {
                    name: document.getElementById('rateName').value || 'Anonymous',
                    position: document.getElementById('ratePosition').value || 'Unknown',
                    quality_of_work: parseInt(document.getElementById('rateQuality').value),
                    job_knowledge: parseInt(document.getElementById('rateKnowledge').value),
                    communication_skills: parseInt(document.getElementById('rateCommunication').value),
                    productivity: parseInt(document.getElementById('rateProductivity').value),
                    management_ability: parseInt(document.getElementById('rateManagement').value),
                    overall_performance: parseInt(document.getElementById('rateOverall').value)
                };

                try {
                    const { error } = await supabase
                        .from('ratings')
                        .insert([ratingData]);
                        
                    if (error) throw error;
                    
                    btnText.textContent = 'Thank You!';
                    submitBtn.style.background = '#10b981';
                    
                    fetchRatings(); // Refresh ratings list
                    
                    setTimeout(() => {
                        // Reset form
                        ratingForm.reset();
                        sliders.forEach(c => {
                            const valSpan = document.getElementById(`val${c}`);
                            if(valSpan) valSpan.textContent = '6';
                        });
                        btnText.textContent = 'Submit Rating';
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 1500);

                } catch (err) {
                    console.error("Error submitting rating:", err);
                    btnText.textContent = 'Error! Try Again';
                    submitBtn.style.background = '#ef4444';
                    setTimeout(() => {
                        btnText.textContent = 'Submit Rating';
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }
            });
        }
        
        // Fetch existing ratings
        const ratingsList = document.getElementById('ratingsList');
        async function fetchRatings() {
            if (!ratingsList) return;
            
            try {
                if (supabaseKey === 'YOUR_SUPABASE_ANON_KEY') {
                    ratingsList.innerHTML = '<p style="text-align:center; color:var(--text-muted);">Please configure Supabase key to view ratings.</p>';
                    return;
                }

                const { data, error } = await supabase
                    .from('ratings')
                    .select('*')
                    .order('created_at', { ascending: false });
                    
                if (error) throw error;
                
                if (data && data.length > 0) {
                    ratingsList.innerHTML = ''; // clear loading
                    data.forEach(item => {
                        const date = new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                        // Calculate average score
                        const avg = Math.round(((item.quality_of_work + item.job_knowledge + item.communication_skills + item.productivity + item.management_ability + item.overall_performance) / 6) * 10) / 10;
                        
                        ratingsList.innerHTML += `
                            <div class="testimonial-item">
                                <div class="testimonial-header">
                                    <div>
                                        <div class="testimonial-author">${escapeHTML(item.name || 'Anonymous')}</div>
                                        <div class="testimonial-position">${escapeHTML(item.position || 'Unknown')}</div>
                                    </div>
                                    <div class="testimonial-date">${date}</div>
                                </div>
                                <div class="testimonial-comment" style="font-style: normal; margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 13px; color: var(--text-secondary);">Quality of Work</span>
                                        <span style="font-size: 13px; font-weight: 600; color: var(--accent-secondary);"><i class="fas fa-star" style="font-size:10px;"></i> ${item.quality_of_work} / 6</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 13px; color: var(--text-secondary);">Job Knowledge</span>
                                        <span style="font-size: 13px; font-weight: 600; color: var(--accent-secondary);"><i class="fas fa-star" style="font-size:10px;"></i> ${item.job_knowledge} / 6</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 13px; color: var(--text-secondary);">Communication Skills</span>
                                        <span style="font-size: 13px; font-weight: 600; color: var(--accent-secondary);"><i class="fas fa-star" style="font-size:10px;"></i> ${item.communication_skills} / 6</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 13px; color: var(--text-secondary);">Productivity</span>
                                        <span style="font-size: 13px; font-weight: 600; color: var(--accent-secondary);"><i class="fas fa-star" style="font-size:10px;"></i> ${item.productivity} / 6</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 13px; color: var(--text-secondary);">Management Ability</span>
                                        <span style="font-size: 13px; font-weight: 600; color: var(--accent-secondary);"><i class="fas fa-star" style="font-size:10px;"></i> ${item.management_ability} / 6</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 13px; color: var(--text-secondary);">Overall Performance</span>
                                        <span style="font-size: 13px; font-weight: 600; color: var(--accent-secondary);"><i class="fas fa-star" style="font-size:10px;"></i> ${item.overall_performance} / 6</span>
                                    </div>
                                    
                                    <div style="height: 1px; background: var(--border-color); margin: 4px 0;"></div>
                                    
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 13px; font-weight: 700; color: var(--text-primary);">Average Score</span>
                                        <span style="font-size: 15px; font-weight: 800; color: #10b981;"><i class="fas fa-star" style="font-size:12px;"></i> ${avg} / 6</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                } else {
                    ratingsList.innerHTML = '<p style="text-align:center; color:var(--text-muted);">No ratings yet. Be the first!</p>';
                }
            } catch (err) {
                console.error("Error fetching ratings:", err);
                ratingsList.innerHTML = '<p style="text-align:center; color:var(--accent-secondary);">Could not load ratings right now.</p>';
            }
        }
        
        fetchRatings();
    }
});
