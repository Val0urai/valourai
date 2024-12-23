// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Get the target element
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate offset (adjust for header height)
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = window.pageYOffset + elementPosition - headerOffset;

            // Smooth scroll to target
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update URL without jumping
            history.pushState(null, null, targetId);
        }
    });
});

// Remove or comment out the navbar scroll effect
/* window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.webkitBackdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.webkitBackdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    }
}); */

// Animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .stat-card').forEach((element) => {
    observer.observe(element);
});

// Add smooth reveal animations
const revealElements = document.querySelectorAll('.feature-card, .stat-card');

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealOnScroll.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px"
});

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    revealOnScroll.observe(element);
});

// Enhanced copy address functionality
function copyAddress() {
    const addressText = document.querySelector('.address-container code').textContent;
    navigator.clipboard.writeText(addressText).then(() => {
        const button = document.querySelector('.copy-button');
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = 'rgba(47, 208, 88, 0.1)';
        button.style.color = '#2FD058';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i>';
            button.style.background = 'rgba(255, 255, 255, 0.05)';
            button.style.color = 'var(--primary-color)';
        }, 2000);
    });
}

// Add click animation to copy button
document.querySelector('.copy-button').addEventListener('click', function(e) {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 100);
});

// Update modal functionality
function showBuyModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('buyModal');
    document.body.style.overflow = 'hidden';
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function hideBuyModal() {
    const modal = document.getElementById('buyModal');
    document.body.style.overflow = '';
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Update event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add ambient light effect
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        document.documentElement.style.setProperty('--mouse-x', `${x}%`);
        document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    });

    // Smooth reveal animations
    const revealElements = document.querySelectorAll('.feature-card, .stat-card');
    revealElements.forEach((element, index) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        element.style.transitionDelay = `${index * 0.1}s`;
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px"
        });
        
        observer.observe(element);
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && 
                !menuToggle.contains(e.target) && 
                navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Copy address functionality
    const copyButton = document.querySelector('.copy-button');
    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            const address = document.querySelector('.address-container code').textContent;
            try {
                await navigator.clipboard.writeText(address);
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    }

    // Parallax effect for feature cards
    const cards = document.querySelectorAll('[data-parallax]');
    window.addEventListener('mousemove', (e) => {
        cards.forEach(card => {
            const speed = card.getAttribute('data-parallax');
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            card.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });

    // Enhanced parallax effects
    const parallaxElements = document.querySelectorAll('.parallax-text, .section-title, .why-header h2, .buy-content h2');
    
    window.addEventListener('mousemove', (e) => {
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) * 0.01;
            const deltaY = (e.clientY - centerY) * 0.01;
            
            element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
        });
    });

    // Glow effect following cursor
    const glowElements = document.querySelectorAll('.glow-on-hover');
    
    glowElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            element.style.setProperty('--mouse-x', `${x}%`);
            element.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // Smooth reveal for feature cards
    const fadeInElements = document.querySelectorAll('.feature-card');
    fadeInElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        observer.observe(element);
    });

    // Add loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);

    // Remove loading overlay when page is loaded
    window.addEventListener('load', () => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    });
});

// Remove the parallax scroll effect
document.removeEventListener('scroll', () => {});

// Add parallax effect
function parallax() {
    const elements = document.querySelectorAll('[data-parallax]');
    
    elements.forEach(element => {
        const speed = element.dataset.parallax || 0.2;
        const rect = element.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        
        const parallaxY = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        element.style.setProperty('--parallax-y', `${parallaxY}px`);
    });
}

window.addEventListener('scroll', parallax);

// Enhanced FAQ functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            otherAnswer.style.maxHeight = '0';
            otherAnswer.style.padding = '0 1.5rem';
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.padding = '1.5rem';
        }
    });
});
