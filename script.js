/* ========================================
   DEKOLONYO - Fixed JavaScript
   All features working, bulletproof
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    console.log('🎨 DEKOLONYO - Loading...');
    
    // ========================================
    // 1. SMOOTH SCROLLING FOR NAVIGATION
    // ========================================
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (navLinksContainer) {
                    navLinksContainer.classList.remove('active');
                }
                
                // Smooth scroll with offset for fixed navbar
                const navbarHeight = 70; // Approximate navbar height
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 2. MOBILE MENU TOGGLE
    // ========================================
    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navLinksContainer.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }

    // ========================================
    // 3. NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ========================================
    // 4. INTERACTIVE ACTION BUTTONS
    // ========================================
    const actionButtons = document.querySelectorAll('.btn-dark');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = e.target.innerText;
            
            if (buttonText === 'Sign up') {
                showNotification('Thank you for volunteering! 🙌', 'success');
            } else if (buttonText === 'Share page') {
                // Try to copy URL to clipboard
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href)
                        .then(() => {
                            showNotification('Link copied! Share with friends 🔗', 'success');
                        })
                        .catch(() => {
                            showNotification('URL: ' + window.location.href, 'info');
                        });
                } else {
                    showNotification('URL: ' + window.location.href, 'info');
                }
            }
        });
    });

    // ========================================
    // 5. DONATION WIDGET LOGIC
    // ========================================
    let currentRaised = 0;
    const donationGoal = 2500;
    const donationAmount = 50;
    
    const raisedTextElement = document.querySelector('.raised');
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const donateButtons = document.querySelectorAll('.btn-dark, .btn-purple');

    donateButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = e.target.innerText;
            
            if (buttonText === 'Donate') {
                // Increment donation amount
                currentRaised += donationAmount;
                
                // Cap at goal
                if (currentRaised > donationGoal) {
                    currentRaised = donationGoal;
                }
                
                // Update text
                if (raisedTextElement) {
                    raisedTextElement.innerText = `$${currentRaised} raised`;
                }
                
                // Update progress bar
                if (progressBarFill) {
                    const percentage = (currentRaised / donationGoal) * 100;
                    progressBarFill.style.width = `${percentage}%`;
                }
                
                // Show notification
                if (currentRaised >= donationGoal) {
                    showNotification(`🎉 Goal reached! Thank you for your $${donationAmount} donation!`, 'success');
                } else {
                    showNotification(`Thank you for your $${donationAmount} donation! 💙`, 'success');
                }
                
                // Add pulse animation
                button.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 200);
            }
        });
    });

    // ========================================
    // 6. BACK TO TOP BUTTON
    // ========================================
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // 7. COMIC PANEL HOVER EFFECTS
    // ========================================
    const comicPanels = document.querySelectorAll('.comic-panel');
    
    comicPanels.forEach(panel => {
        panel.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        panel.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ========================================
    // 8. VIDEO BACKGROUND HANDLING (OPTIONAL)
    // ========================================
    const heroVideo = document.querySelector('.hero .hero-video-bg');
    const sectionVideos = document.querySelectorAll('.section-video-bg');
    
    // Hero video - just log status, don't block anything
    if (heroVideo) {
        heroVideo.addEventListener('loadeddata', () => {
            console.log('✅ Hero video loaded');
        });
        
        heroVideo.addEventListener('error', () => {
            console.log('⚠️ Hero video not found (optional)');
            heroVideo.style.display = 'none';
        });
    }
    
    // Section videos - same approach
    sectionVideos.forEach((video, index) => {
        video.addEventListener('loadeddata', () => {
            console.log(`✅ Section video ${index + 1} loaded`);
        });
        
        video.addEventListener('error', () => {
            console.log(`⚠️ Section video ${index + 1} not found (optional)`);
            video.style.display = 'none';
        });
    });

    // ========================================
    // 9. LOGO CLICK TO SCROLL HOME
    // ========================================
    const logoContainer = document.querySelector('.logo-container');
    
    if (logoContainer) {
        logoContainer.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // 10. NOTIFICATION SYSTEM
    // ========================================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `custom-notification ${type}`;
        notification.textContent = message;
        
        // Styling
        const bgColor = type === 'success' ? '#4caf50' : '#2196F3';
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            backgroundColor: bgColor,
            color: 'white',
            padding: '15px 25px',
            borderRadius: '8px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
            zIndex: '10000',
            fontWeight: 'bold',
            maxWidth: '300px',
            fontSize: '0.95rem',
            animation: 'slideInRight 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add notification animations
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ========================================
    // 11. HERO BUTTON CLICK
    // ========================================
    const heroButton = document.querySelector('.hero .btn-white');
    
    if (heroButton) {
        heroButton.addEventListener('click', () => {
            const exploreSection = document.getElementById('explore');
            if (exploreSection) {
                const navbarHeight = 70;
                const targetPosition = exploreSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ========================================
    // INITIALIZATION COMPLETE
    // ========================================
    console.log('✅ DEKOLONYO loaded successfully!');
    console.log('📱 Mobile menu:', mobileMenuToggle ? 'Ready' : 'Not found');
    console.log('🔘 Action buttons:', actionButtons.length);
    console.log('💰 Donate widget:', raisedTextElement ? 'Ready' : 'Not found');
    console.log('⬆️ Back to top:', backToTopButton ? 'Ready' : 'Not found');
    
    // Test notification on load (optional - remove if you don't want this)
    setTimeout(() => {
        console.log('🎉 All systems ready!');
    }, 500);
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Console easter egg
console.log('%c🇵🇭 DEKOLONYO', 'color: #ff3b30; font-size: 24px; font-weight: bold;');
console.log('%cBreaking free from colonial mentality', 'color: #ffe159; font-size: 14px;');
console.log('%cWebsite ready! 💪', 'color: #93c47d; font-size: 12px;');