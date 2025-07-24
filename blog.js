/**
 * MarineStream Blog JavaScript - World-Class Edition
 * 
 * This file handles sophisticated blog functionality including:
 * - Advanced loading and animation systems
 * - Scroll-triggered animations using GSAP
 * - Premium micro-interactions
 * - Performance-optimized effects
 * 
 * @author MarineStream Development Team
 * @version 2.0.0 - World-Class Edition
 * @since 2024
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize world-class blog functionality
    initAdvancedBlog();
});

/**
 * Initialize advanced blog functionality with sophisticated features
 */
function initAdvancedBlog() {
    // Core functionality
    loadBlogPosts();
    
    // Advanced features
    initAdvancedAnimations();
    initScrollTriggers();
    initMicroInteractions();
    initPerformanceOptimizations();
    initAccessibilityEnhancements();
    
    console.log('🎨 World-class blog initialized with premium features');
}

/**
 * Enhanced blog post loading with sophisticated states
 */
async function loadBlogPosts() {
    const loadingEl = document.getElementById('blog-loading');
    const errorEl = document.getElementById('blog-error');
    const postsEl = document.getElementById('blog-posts');
    const emptyEl = document.getElementById('blog-empty');
    const countEl = document.getElementById('blog-count');
    
    // Show premium loading state
    showElement(loadingEl);
    hideElement(errorEl);
    hideElement(postsEl);
    hideElement(emptyEl);
    
    // Add loading animation to count
    if (countEl) {
        animateCounter(countEl, 0, 0, 1000);
    }
    
    try {
        // Fetch blog posts from API
        const response = await fetch('/api/blog');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.message || 'Failed to load blog posts');
        }
        
        const posts = data.posts || [];
        
        // Animate count update
        if (countEl) {
            animateCounter(countEl, 0, posts.length, 1500);
        }
        
        if (posts.length > 0) {
            // Display posts with staggered animation
            await displayBlogPostsAdvanced(posts);
            showElement(postsEl);
        } else {
            showElement(emptyEl);
        }
        
    } catch (error) {
        console.error('Error loading blog posts:', error);
        showElement(errorEl);
    } finally {
        // Hide loading with fade out
        setTimeout(() => hideElement(loadingEl), 300);
    }
}

/**
 * Display blog posts with advanced animations
 */
async function displayBlogPostsAdvanced(posts) {
    const postsContainer = document.getElementById('blog-posts');
    if (!postsContainer) return;
    
    // Clear existing content
    postsContainer.innerHTML = '';
    
    // Create and append post cards with staggered animation
    posts.forEach((post, index) => {
        const postCard = createAdvancedPostCard(post);
        postCard.style.opacity = '0';
        postCard.style.transform = 'translateY(40px) scale(0.95)';
        postsContainer.appendChild(postCard);
        
        // Staggered animation
        setTimeout(() => {
            animateElementIn(postCard, index * 150);
        }, 100 + (index * 100));
    });
    
    // Initialize card interactions after creation
    setTimeout(() => initCardInteractions(), 600);
}

/**
 * Create advanced blog post card with enhanced features
 */
function createAdvancedPostCard(post) {
    const card = document.createElement('article');
    card.className = 'blog-post-card';
    card.setAttribute('data-post-id', post.id);
    card.setAttribute('role', 'article');
    card.setAttribute('tabindex', '0');
    
    // Use excerpt from API if available, otherwise extract from content
    const excerpt = post.excerpt || extractAdvancedExcerpt(post.content, 150);
    
    // Use published date if available, otherwise fall back to created_at
    const dateToUse = post.published_date || post.created_at;
    const formattedDate = formatAdvancedDate(dateToUse);
    const readingTime = calculateReadingTime(post.content);
    
    card.innerHTML = `
        <div class="post-header">
            <div class="post-meta">
                <span class="post-date" role="text" aria-label="Published date">
                    <i class="fas fa-calendar-alt" aria-hidden="true"></i>
                    ${formattedDate}
                </span>
                <span class="post-reading-time" role="text" aria-label="Reading time">
                    <i class="fas fa-clock" aria-hidden="true"></i>
                    ${readingTime} min read
                </span>
                <span class="post-category" role="text" aria-label="Category">
                    <i class="fas fa-tag" aria-hidden="true"></i>
                    Maritime Insights
                </span>
            </div>
            <h2 class="post-title">${post.title}</h2>
        </div>
        
        <div class="post-content">
            <div class="post-excerpt">
                ${excerpt}
            </div>
        </div>
        
        <div class="post-footer">
            <button class="btn btn-outline read-more-btn" 
                    onclick="readFullPost('${post.id}')"
                    aria-label="Read full article: ${post.title}">
                <span>Read Full Article</span>
                <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </button>
        </div>
    `;
    
    return card;
}

/**
 * Enhanced excerpt extraction with intelligent truncation
 */
function extractAdvancedExcerpt(htmlContent, maxLength) {
    // Remove HTML tags and get plain text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    
    if (text.length <= maxLength) {
        return text;
    }
    
    // Find the last complete sentence within the limit
    const truncated = text.substr(0, maxLength);
    const lastSentence = truncated.lastIndexOf('.');
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSentence > maxLength * 0.7) {
        return text.substr(0, lastSentence + 1);
    } else if (lastSpace > 0) {
        return truncated.substr(0, lastSpace) + '...';
    }
    
    return truncated + '...';
}

/**
 * Advanced date formatting with relative dates
 */
function formatAdvancedDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }
}

/**
 * Calculate reading time based on content
 */
function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return Math.max(1, readingTime);
}

/**
 * Animate counter with easing
 */
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (ease-out cubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(start + (end - start) * easeProgress);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * Animate element entrance
 */
function animateElementIn(element, delay = 0) {
    setTimeout(() => {
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) scale(1)';
    }, delay);
}

/**
 * Initialize advanced animations using GSAP
 */
function initAdvancedAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.log('GSAP not loaded, using CSS fallbacks');
        return;
    }
    
    // Hero section animation
    gsap.from('.blog-hero-content', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
    });
    
    // Stats animation
    gsap.from('.stat-item', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 0.8
    });
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollTriggers() {
    if (typeof ScrollTrigger === 'undefined') {
        console.log('ScrollTrigger not loaded, using intersection observer fallback');
        initIntersectionObserver();
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Newsletter section animation
    gsap.from('.newsletter-content', {
        scrollTrigger: {
            trigger: '.newsletter-signup',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
}

/**
 * Fallback intersection observer for scroll animations
 */
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    document.querySelectorAll('.newsletter-content, .blog-post-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize sophisticated micro-interactions
 */
function initMicroInteractions() {
    // Enhanced card interactions
    initCardInteractions();
    
    // Button interactions
    initButtonInteractions();
    
    // Form interactions
    initFormInteractions();
}

/**
 * Advanced card interaction system
 */
function initCardInteractions() {
    const cards = document.querySelectorAll('.blog-post-card');
    
    cards.forEach(card => {
        // Simple pop-out effect on hover
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = 'var(--shadow-2xl)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });
        
        // Keyboard navigation
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const readMoreBtn = card.querySelector('.read-more-btn');
                if (readMoreBtn) {
                    readMoreBtn.click();
                }
            }
        });
    });
}

/**
 * Advanced button interactions
 */
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.read-more-btn, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
}

/**
 * Enhanced form interactions
 */
function initFormInteractions() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        control.addEventListener('focus', () => {
            const formGroup = control.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('focused');
            }
        });
        
        control.addEventListener('blur', () => {
            const formGroup = control.closest('.form-group');
            if (formGroup) {
                formGroup.classList.remove('focused');
            }
        });
    });
}

/**
 * Performance optimizations
 */
function initPerformanceOptimizations() {
    // Preload critical images
    preloadCriticalImages();
    
    // Optimize scroll listeners
    optimizeScrollListeners();
    
    // Lazy load non-critical elements
    initLazyLoading();
}

/**
 * Preload critical images for better performance
 */
function preloadCriticalImages() {
    const criticalImages = [
        '/assets/marinestream_logo_white.png',
        '/assets/marinestream_logo_blue.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

/**
 * Optimize scroll listeners with throttling
 */
function optimizeScrollListeners() {
    let ticking = false;
    
    function updateScrollEffects() {
        // Add scroll-based effects here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

/**
 * Initialize lazy loading for better performance
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Accessibility enhancements
 */
function initAccessibilityEnhancements() {
    // Keyboard navigation improvements
    initKeyboardNavigation();
    
    // Screen reader enhancements
    initScreenReaderSupport();
    
    // Focus management
    initFocusManagement();
}

/**
 * Enhanced keyboard navigation
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Escape key to close modals
        if (e.key === 'Escape') {
            hideSubscribeModal();
        }
        
        // Tab navigation improvements
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

/**
 * Screen reader support enhancements
 */
function initScreenReaderSupport() {
    // Announce dynamic content changes
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    window.announceToScreenReader = (message) => {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

/**
 * Focus management for modals and interactions
 */
function initFocusManagement() {
    const modals = document.querySelectorAll('.modal-overlay');
    
    modals.forEach(modal => {
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                trapFocus(modal, e);
            }
        });
    });
}

/**
 * Trap focus within modal
 */
function trapFocus(modal, event) {
    const focusableElements = modal.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            event.preventDefault();
        }
    } else {
        if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            event.preventDefault();
        }
    }
}

/**
 * Enhanced modal functionality
 */
function initModalHandlers() {
    // Close modal when clicking overlay
    const modalOverlay = document.getElementById('subscribe-modal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                hideSubscribeModal();
            }
        });
    }
    
    // Close modal when clicking close button
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideSubscribeModal);
    }
    
    // Close modal when clicking "Maybe Later" button
    const maybeLaterBtn = document.querySelector('.subscribe-close-btn');
    if (maybeLaterBtn) {
        maybeLaterBtn.addEventListener('click', hideSubscribeModal);
    }
    
    // Handle form submission
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', handleAdvancedSubscribeSubmit);
    }
}

/**
 * Enhanced subscription form handling
 */
async function handleAdvancedSubscribeSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Advanced loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    try {
        // Simulate API call (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const response = { success: true };
        
        if (response.success) {
            // Success animation
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            submitBtn.style.background = '#10b981';
            
            // Show success notification
            showAdvancedNotification('Successfully subscribed! Thank you for joining our newsletter.', 'success');
            
            setTimeout(() => {
                hideSubscribeModal();
                form.reset();
            }, 1500);
        } else {
            throw new Error('Subscription failed');
        }
        
    } catch (error) {
        console.error('Subscription error:', error);
        showAdvancedNotification(error.message || 'Failed to subscribe. Please try again.', 'error');
    } finally {
        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.background = '';
        }, 2000);
    }
}

/**
 * Advanced notification system
 */
function showAdvancedNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    const iconMap = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${iconMap[type]}" aria-hidden="true"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-remove with advanced timing
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 5000);
    
    // Announce to screen readers
    if (window.announceToScreenReader) {
        window.announceToScreenReader(message);
    }
}

/**
 * Enhanced modal show/hide with advanced animations
 */
function showSubscribeModal() {
    const subscribeModal = document.getElementById('subscribe-modal');
    if (subscribeModal) {
        subscribeModal.style.display = 'flex';
        document.body.classList.add('modal-open');
        
        setTimeout(() => {
            subscribeModal.classList.add('active');
        }, 10);
        
        // Focus management
        const firstInput = subscribeModal.querySelector('input[type="email"]');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 300);
        }
        
        // Announce to screen readers
        if (window.announceToScreenReader) {
            window.announceToScreenReader('Newsletter subscription modal opened');
        }
    }
}

function hideSubscribeModal() {
    const subscribeModal = document.getElementById('subscribe-modal');
    if (subscribeModal) {
        subscribeModal.classList.remove('active');
        
        setTimeout(() => {
            subscribeModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }, 300);
        
        // Announce to screen readers
        if (window.announceToScreenReader) {
            window.announceToScreenReader('Newsletter subscription modal closed');
        }
    }
}

/**
 * Enhanced utility functions
 */
function showElement(element) {
    if (element) {
        element.style.display = 'block';
        element.setAttribute('aria-hidden', 'false');
    }
}

function hideElement(element) {
    if (element) {
        element.style.display = 'none';
        element.setAttribute('aria-hidden', 'true');
    }
}

/**
 * Enhanced read full post functionality
 */
async function readFullPost(postId) {
    console.log('Reading full post:', postId);
    
    try {
        // Show loading state
        showAdvancedNotification('Loading article...', 'info');
        
        // Fetch the full blog post from API
        const response = await fetch(`/api/blog/${postId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.message || 'Failed to load blog post');
        }
        
        // Display the full article in a modal
        showFullArticleModal(data.post);
        
        // Analytics tracking (implement as needed)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'blog_post_click', {
                'post_id': postId,
                'event_category': 'engagement'
            });
        }
        
    } catch (error) {
        console.error('Error loading full post:', error);
        showAdvancedNotification('Failed to load article. Please try again.', 'error');
    }
}

/**
 * Show full article modal with enhanced features
 */
function showFullArticleModal(post) {
    // Create modal if it doesn't exist
    let articleModal = document.getElementById('article-modal');
    if (!articleModal) {
        articleModal = document.createElement('div');
        articleModal.id = 'article-modal';
        articleModal.className = 'modal-overlay article-modal';
        articleModal.innerHTML = `
            <div class="modal-content article-content">
                <div class="modal-header">
                    <h2 class="article-title"></h2>
                    <button class="modal-close" aria-label="Close article">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="article-meta">
                        <span class="article-date"></span>
                        <span class="article-reading-time"></span>
                    </div>
                    <div class="article-content-body"></div>
                </div>
            </div>
        `;
        document.body.appendChild(articleModal);
        
        // Add event listeners
        articleModal.addEventListener('click', (e) => {
            if (e.target === articleModal) {
                hideFullArticleModal();
            }
        });
        
        const closeBtn = articleModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', hideFullArticleModal);
    }
    
    // Populate modal content
    const titleEl = articleModal.querySelector('.article-title');
    const dateEl = articleModal.querySelector('.article-date');
    const readingTimeEl = articleModal.querySelector('.article-reading-time');
    const contentEl = articleModal.querySelector('.article-content-body');
    
    titleEl.textContent = post.title;
    
    const dateToUse = post.published_date || post.created_at;
    const formattedDate = formatAdvancedDate(dateToUse);
    dateEl.innerHTML = `<i class="fas fa-calendar-alt"></i> ${formattedDate}`;
    
    const readingTime = calculateReadingTime(post.content);
    readingTimeEl.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} min read`;
    
    contentEl.innerHTML = post.content;
    
    // Show modal with animation
    articleModal.style.display = 'flex';
    document.body.classList.add('modal-open');
    
    setTimeout(() => {
        articleModal.classList.add('active');
    }, 10);
    
    // Focus management
    setTimeout(() => {
        const firstFocusable = articleModal.querySelector('h1, h2, h3, p, a, button');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }, 300);
    
    // Announce to screen readers
    if (window.announceToScreenReader) {
        window.announceToScreenReader(`Article opened: ${post.title}`);
    }
}

/**
 * Hide full article modal
 */
function hideFullArticleModal() {
    const articleModal = document.getElementById('article-modal');
    if (articleModal) {
        articleModal.classList.remove('active');
        
        setTimeout(() => {
            articleModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }, 300);
        
        // Announce to screen readers
        if (window.announceToScreenReader) {
            window.announceToScreenReader('Article modal closed');
        }
    }
}

// Initialize all modal handlers when DOM is ready
document.addEventListener('DOMContentLoaded', initModalHandlers);
