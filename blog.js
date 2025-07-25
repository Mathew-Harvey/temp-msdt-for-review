/**
 * MarineStream Modern Blog System
 * 
 * A comprehensive blog system with markdown parsing, modern UI/UX,
 * and features inspired by award-winning blog sites like Medium,
 * The Verge, and modern technical blogs.
 * 
 * Features:
 * - Markdown parsing with image integration
 * - Reading progress indicator
 * - Table of contents generation
 * - Social sharing
 * - Responsive design
 * - SEO optimization
 * - Accessibility features
 * 
 * @author MarineStream Development Team
 * @version 3.0.0 - Modern Blog Edition
 * @since 2024
 */

// Blog configuration
const BLOG_CONFIG = {
    basePath: './blog/',
    articles: [
        {
            id: 'revolutionizing-underwater-inspections',
            title: 'Revolutionizing Underwater Inspections and Biofouling Management',
            slug: 'revolutionizing-underwater-inspections',
            excerpt: 'How MarineStream enables efficient, safe, and compliant fleet operations through cutting-edge hull-cleaning technology and ROV integration.',
            category: 'Technology',
            featured: true,
            publishedDate: '2024-12-20',
            readingTime: 15,
            tags: ['ROV', 'Biofouling', 'Maritime Technology', 'UWILD', 'Fleet Management'],
            featuredImage: './blog/revolutionizing-underwater-inspections/msTeam.png',
            author: {
                name: 'MarineStream Team',
                title: 'Maritime Technology Experts',
                avatar: './assets/marinestream_logo_blue.png'
            }
        }
        // Additional articles can be added here
    ]
};

// Global state
let currentArticle = null;
let readingProgress = 0;
let tocElements = [];

/**
 * Initialize the blog system
 */
document.addEventListener('DOMContentLoaded', function() {
    initModernBlog();
    setupReadingProgress();
    setupScrollAnimations();
    initializeSubscribeModal();
});

/**
 * Initialize the modern blog system
 */
function initModernBlog() {
    loadBlogPosts();
    setupEventListeners();
    console.log('🎨 Modern blog system initialized');
}

/**
 * Load and display blog posts
 */
function loadBlogPosts() {
    const loadingEl = document.getElementById('blog-loading');
    const errorEl = document.getElementById('blog-error');
    const postsEl = document.getElementById('blog-posts');
    const emptyEl = document.getElementById('blog-empty');
    const countEl = document.getElementById('blog-count');
    const featuredEl = document.getElementById('featured-article');

    try {
        // Show loading state
        showElement(loadingEl);
        hideElement(errorEl);
        hideElement(postsEl);
        hideElement(emptyEl);
        hideElement(featuredEl);

        // Simulate loading delay for smooth UX
        setTimeout(() => {
            const articles = BLOG_CONFIG.articles;
            console.log('Loading blog posts:', articles.length, 'articles found');
            
            if (articles.length > 0) {
                // Update counter with animation
                animateCounter(countEl, 0, articles.length, 1000);
                
                // Setup featured article
                const featuredArticle = articles.find(article => article.featured);
                if (featuredArticle) {
                    console.log('Setting up featured article:', featuredArticle.title);
                    try {
                        setupFeaturedArticle(featuredArticle);
                        showElement(featuredEl);
                    } catch (featuredError) {
                        console.error('Error setting up featured article:', featuredError);
                    }
                }
                
                // Display regular articles
                displayBlogPosts(articles.filter(article => !article.featured));
                showElement(postsEl);
            } else {
                showElement(emptyEl);
            }
            
            hideElement(loadingEl);
        }, 800);
        
    } catch (error) {
        console.error('Error loading blog posts:', error);
        showElement(errorEl);
        hideElement(loadingEl);
    }
}

/**
 * Setup featured article
 */
function setupFeaturedArticle(article) {
    const featuredEl = document.getElementById('featured-article');
    
    // Update featured article content
    featuredEl.querySelector('.article-category').textContent = article.category;
    featuredEl.querySelector('.article-reading-time').innerHTML = `<i class="fas fa-clock"></i> ${article.readingTime} min read`;
    featuredEl.querySelector('.article-date').innerHTML = `<i class="fas fa-calendar"></i> ${formatDate(article.publishedDate)}`;
    featuredEl.querySelector('.featured-article-title').textContent = article.title;
    featuredEl.querySelector('.featured-article-excerpt').textContent = article.excerpt;
    featuredEl.querySelector('.featured-article-image img').src = article.featuredImage;
    featuredEl.querySelector('.featured-article-image img').alt = article.title;
    
    // Store article ID for later use
    featuredEl.setAttribute('data-article-id', article.id);
}

/**
 * Display blog posts in grid
 */
function displayBlogPosts(articles) {
    const postsContainer = document.getElementById('blog-posts');
    postsContainer.innerHTML = '';
    
    articles.forEach((article, index) => {
        const postCard = createModernPostCard(article);
        postCard.style.opacity = '0';
        postCard.style.transform = 'translateY(40px)';
        postsContainer.appendChild(postCard);
        
        // Staggered animation
        setTimeout(() => {
            postCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            postCard.style.opacity = '1';
            postCard.style.transform = 'translateY(0)';
        }, 100 + (index * 150));
    });
    
    // Initialize card interactions
    setTimeout(() => initCardInteractions(), 600);
}

/**
 * Create modern blog post card
 */
function createModernPostCard(article) {
    const card = document.createElement('article');
    card.className = 'blog-post-card modern-card';
    card.setAttribute('data-article-id', article.id);
    card.setAttribute('role', 'article');
    card.setAttribute('tabindex', '0');
    
    card.innerHTML = `
        <div class="card-image">
            <img src="${article.featuredImage}" alt="${article.title}" loading="lazy">
            <div class="card-overlay">
                <span class="category-badge">${article.category}</span>
            </div>
        </div>
        <div class="card-content">
            <div class="card-meta">
                <span class="reading-time">
                    <i class="fas fa-clock"></i>
                    ${article.readingTime} min
                </span>
                <span class="publish-date">
                    <i class="fas fa-calendar"></i>
                    ${formatDate(article.publishedDate)}
                </span>
            </div>
            <h2 class="card-title">${article.title}</h2>
            <p class="card-excerpt">${article.excerpt}</p>
            <div class="card-tags">
                ${article.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="card-footer">
                <div class="author-info">
                    <img src="${article.author.avatar}" alt="${article.author.name}" class="author-avatar">
                    <div class="author-details">
                        <span class="author-name">${article.author.name}</span>
                        <span class="author-title">${article.author.title}</span>
                    </div>
                </div>
                <button class="read-more-btn" onclick="openArticle('${article.id}')" aria-label="Read article: ${article.title}">
                    <span>Read More</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Open featured article
 */
function openFeaturedArticle() {
    const featuredEl = document.getElementById('featured-article');
    const articleId = featuredEl.getAttribute('data-article-id');
    if (articleId) {
        openArticle(articleId);
    }
}

/**
 * Open article in new page
 */
async function openArticle(articleId) {
    try {
        const article = BLOG_CONFIG.articles.find(a => a.id === articleId);
        if (!article) {
            throw new Error('Article not found');
        }
        
        // Navigate to article page instead of opening modal
        const articleUrl = `./blog/${article.slug}/${article.slug}.html`;
        window.location.href = articleUrl;
        
    } catch (error) {
        console.error('Error opening article:', error);
        showNotification('Failed to load article. Please try again.', 'error');
    }
}

/**
 * Load markdown content from file
 */
async function loadMarkdownContent(slug) {
    try {
        const markdownUrl = `${BLOG_CONFIG.basePath}${slug}/${slug}.md`;
        console.log('Loading markdown from:', markdownUrl);
        
        const response = await fetch(markdownUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} for URL: ${markdownUrl}`);
        }
        
        const content = await response.text();
        console.log('Markdown loaded successfully, length:', content.length);
        return content;
    } catch (error) {
        console.error('Error loading markdown:', error);
        throw error;
    }
}

/**
 * Display article content with enhanced markdown parsing
 */
async function displayArticleContent(article, markdownContent) {
    const modal = document.getElementById('article-modal');
    
    // Update article header
    modal.querySelector('.article-category').textContent = article.category;
    modal.querySelector('.article-reading-time').innerHTML = `<i class="fas fa-clock"></i> ${article.readingTime} min read`;
    modal.querySelector('.article-date').innerHTML = `<i class="fas fa-calendar"></i> ${formatDate(article.publishedDate)}`;
    modal.querySelector('.article-title').textContent = article.title;
    
    // Parse markdown with enhanced features
    const htmlContent = await parseMarkdownWithImages(markdownContent, article.id);
    
    // Display content
    const contentEl = modal.querySelector('#article-content-body');
    contentEl.innerHTML = htmlContent;
    
    // Update tags
    updateArticleTags(article.tags);
    
    // Highlight code blocks
    if (typeof Prism !== 'undefined') {
        Prism.highlightAllUnder(contentEl);
    }
}

/**
 * Parse markdown with basic image support
 */
async function parseMarkdownWithImages(markdown, articleId) {
    // Debug: Check what marked looks like
    console.log('marked type:', typeof marked);
    console.log('marked object:', marked);
    console.log('window.marked type:', typeof window.marked);
    
    // Check if marked is available
    if (typeof marked === 'undefined' && typeof window.marked === 'undefined') {
        console.error('Marked library not loaded, using basic HTML conversion');
        return markdown.replace(/\n/g, '<br>').replace(/^# (.*$)/gm, '<h1>$1</h1>').replace(/^## (.*$)/gm, '<h2>$1</h2>');
    }
    
    // Get the marked function with various fallbacks
    let markedParser, RendererClass;
    
    if (typeof marked !== 'undefined') {
        if (typeof marked === 'function') {
            markedParser = marked;
            RendererClass = marked.Renderer;
        } else if (marked.parse && typeof marked.parse === 'function') {
            markedParser = marked.parse;
            RendererClass = marked.Renderer;
        } else if (marked.marked && typeof marked.marked === 'function') {
            markedParser = marked.marked;
            RendererClass = marked.Renderer || marked.marked.Renderer;
        }
    } else if (window.marked) {
        if (typeof window.marked === 'function') {
            markedParser = window.marked;
            RendererClass = window.marked.Renderer;
        } else if (window.marked.parse) {
            markedParser = window.marked.parse;
            RendererClass = window.marked.Renderer;
        }
    }
    
    if (!markedParser) {
        console.error('Could not find marked parser function');
        return markdown.replace(/\n/g, '<br>').replace(/^# (.*$)/gm, '<h1>$1</h1>').replace(/^## (.*$)/gm, '<h2>$1</h2>');
    }
    
    console.log('Selected parser type:', typeof markedParser);
    console.log('Selected renderer class:', RendererClass);
    
    // Configure marked for better parsing
    if (marked && marked.setOptions) {
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            headerPrefix: 'heading-'
        });
    }
    
    // Custom renderer for images
    let renderer;
    if (RendererClass) {
        renderer = new RendererClass();
    } else {
        // Fallback renderer object
        renderer = {
            image: function(href, title, text) {
                const imageHref = typeof href === 'string' ? href : (href.href || href.src || '');
                const imageTitle = typeof title === 'string' ? title : (title.title || '');
                const imageText = typeof text === 'string' ? text : (text.text || text.alt || '');
                return `<img src="${imageHref}" alt="${imageText}" title="${imageTitle || ''}" />`;
            },
            heading: function(text, level) {
                const headingText = typeof text === 'string' ? text : (text.text || text.raw || String(text));
                const headingLevel = typeof level === 'number' ? level : (level.depth || 1);
                const id = `heading-${headingText.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')}`;
                return `<h${headingLevel} id="${id}" class="article-heading">${headingText}</h${headingLevel}>`;
            },
            table: function(header, body) {
                const tableHeader = typeof header === 'string' ? header : (header.header || header.text || '');
                const tableBody = typeof body === 'string' ? body : (body.body || body.text || '');
                return `<table class="article-table"><thead>${tableHeader}</thead><tbody>${tableBody}</tbody></table>`;
            }
        };
    }
    
    // Set up custom renderer methods
    renderer.image = function(href, title, text) {
        // Handle different marked.js versions - parameters might be objects
        const imageHref = typeof href === 'string' ? href : (href && (href.href || href.src || '')) || '';
        const imageTitle = title ? (typeof title === 'string' ? title : (title.title || '')) : '';
        const imageText = typeof text === 'string' ? text : (text && (text.text || text.alt || '')) || '';
        
        const caption = imageTitle || imageText || '';
        
        return `
            <figure class="article-image">
                <img src="${imageHref}" alt="${imageText}" title="${imageTitle || ''}" loading="lazy">
                ${caption ? `<figcaption>${caption}</figcaption>` : ''}
            </figure>
        `;
    };
    
    renderer.heading = function(text, level, raw, slugger) {
        // Debug: Log the actual parameters received
        console.log('Heading renderer called with:', { text, level, raw, slugger });
        console.log('text type:', typeof text, 'text value:', text);
        console.log('level type:', typeof level, 'level value:', level);
        
        let headingText = text;
        let headingLevel = level;
        
        // Handle if first param is object (tokens in some versions)
        if (typeof text === 'object' && text !== null) {
            headingText = text.text || text.raw || String(text);
            headingLevel = text.depth || text.level || 1;
        } else if (typeof level !== 'number' && level != null) {
            // If level is object, adjust
            headingLevel = level.depth || level.level || 1;
        } else {
            headingLevel = headingLevel || 1;
        }
        
        // Fallback if text is not string
        if (typeof headingText !== 'string') {
            headingText = String(headingText);
        }
        
        console.log('Processed heading text:', headingText, 'level:', headingLevel);
        
        const id = `heading-${headingText.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')}`;
        return `<h${headingLevel} id="${id}" class="article-heading">${headingText}</h${headingLevel}>`;
    };
    
    renderer.table = function(header, body) {
        // Debug logging to understand what we're receiving
        console.log('Table renderer called with:', { header, body });
        console.log('header type:', typeof header, 'body type:', typeof body);
        
        // Convert parameters to strings safely
        const tableHeader = String(header || '');
        const tableBody = String(body || '');
        
        console.log('Processed table header:', tableHeader);
        console.log('Processed table body:', tableBody);
        
        return `
            <div class="table-wrapper">
                <table class="article-table">
                    <thead>${tableHeader}</thead>
                    <tbody>${tableBody}</tbody>
                </table>
            </div>
        `;
    };
    
    // Parse with custom renderer
    console.log('About to parse with:', typeof markedParser, 'renderer:', typeof renderer);
    let html = markedParser(markdown, { renderer });
    
    // Post-process HTML for additional enhancements
    html = enhanceArticleHTML(html);
    
    return html;
}



/**
 * Enhance article HTML with additional features
 */
function enhanceArticleHTML(html) {
    // Add reading anchors for sections
    html = html.replace(/<h([2-6])/g, '<h$1 class="section-heading"');
    
    // Enhance tables
    html = html.replace(/<table>/g, '<div class="table-container"><table class="enhanced-table">');
    html = html.replace(/<\/table>/g, '</table></div>');
    
    // Add copy buttons to code blocks
    html = html.replace(/<pre><code/g, '<div class="code-container"><button class="copy-code-btn" onclick="copyCode(this)"><i class="fas fa-copy"></i></button><pre><code');
    html = html.replace(/<\/code><\/pre>/g, '</code></pre></div>');
    
    // Enhance lists with icons
    html = html.replace(/<ul>/g, '<ul class="enhanced-list">');
    
    return html;
}

/**
 * Setup table of contents
 */
function setupTableOfContents() {
    const headings = document.querySelectorAll('#article-content-body h2, #article-content-body h3, #article-content-body h4');
    const tocContainer = document.getElementById('table-of-contents');
    const tocContent = tocContainer.querySelector('.toc-content');
    
    if (headings.length > 2) {
        tocElements = Array.from(headings);
        
        const tocHTML = tocElements.map(heading => {
            const level = parseInt(heading.tagName.charAt(1));
            const text = heading.textContent;
            const id = heading.id || `toc-${text.toLowerCase().replace(/\s+/g, '-')}`;
            heading.id = id;
            
            return `
                <div class="toc-item toc-level-${level}">
                    <a href="#${id}" onclick="scrollToHeading('${id}')">${text}</a>
                </div>
            `;
        }).join('');
        
        tocContent.innerHTML = tocHTML;
        tocContainer.style.display = 'block';
    } else {
        tocContainer.style.display = 'none';
    }
}

/**
 * Setup reading progress indicator
 */
function setupReadingProgress() {
    const progressBar = document.getElementById('reading-progress');
    const articleContent = document.getElementById('article-content-body');
    
    if (!progressBar || !articleContent) return;
    
    const updateProgress = () => {
        const modal = document.getElementById('article-modal');
        if (modal.style.display === 'none') return;
        
        const scrollTop = modal.scrollTop;
        const scrollHeight = modal.scrollHeight - modal.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        readingProgress = progress;
        
        // Update TOC active state
        updateTOCActiveState();
    };
    
    const modal = document.getElementById('article-modal');
    modal.addEventListener('scroll', updateProgress);
    
    // Initial update
    updateProgress();
}

/**
 * Update table of contents active state
 */
function updateTOCActiveState() {
    if (tocElements.length === 0) return;
    
    const scrollPosition = document.getElementById('article-modal').scrollTop + 100;
    
    let activeIndex = 0;
    for (let i = 0; i < tocElements.length; i++) {
        if (tocElements[i].offsetTop <= scrollPosition) {
            activeIndex = i;
        }
    }
    
    // Update active states
    document.querySelectorAll('.toc-item').forEach((item, index) => {
        item.classList.toggle('active', index === activeIndex);
    });
}

/**
 * Scroll to heading
 */
function scrollToHeading(id) {
    const element = document.getElementById(id);
    const modal = document.getElementById('article-modal');
    
    if (element && modal) {
        const offsetTop = element.offsetTop - 100;
        modal.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

/**
 * Show article modal
 */
function showArticleModal() {
    const modal = document.getElementById('article-modal');
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Focus management
    setTimeout(() => {
        const firstHeading = modal.querySelector('h1, h2');
        if (firstHeading) {
            firstHeading.focus();
        }
    }, 300);
    
    // Announce to screen readers
    if (currentArticle) {
        announceToScreenReader(`Article opened: ${currentArticle.title}`);
    }
}

/**
 * Hide article modal
 */
function hideArticleModal() {
    const modal = document.getElementById('article-modal');
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
    }, 300);
    
    // Reset progress
    document.getElementById('reading-progress').style.width = '0%';
    
    // Clear current article
    currentArticle = null;
    tocElements = [];
    
    // Announce to screen readers
    announceToScreenReader('Article modal closed');
}

/**
 * Article sharing functionality
 */
function shareArticle(platform) {
    if (!currentArticle) return;
    
    const url = window.location.href;
    const title = currentArticle.title;
    const text = currentArticle.excerpt;
    
    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=550,height=400');
        trackSocialShare(platform, currentArticle.id);
    }
}

/**
 * Copy article link
 */
function copyArticleLink() {
    const url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(url);
        });
    } else {
        fallbackCopyToClipboard(url);
    }
}

/**
 * Fallback copy to clipboard
 */
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Link copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy link', 'error');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Update article tags
 */
function updateArticleTags(tags) {
    const tagsContainer = document.getElementById('article-tags');
    tagsContainer.innerHTML = tags.map(tag => 
        `<span class="article-tag">${tag}</span>`
    ).join('');
}

/**
 * Initialize card interactions
 */
function initCardInteractions() {
    const cards = document.querySelectorAll('.blog-post-card');
    
    cards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        // Keyboard navigation
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const articleId = card.getAttribute('data-article-id');
                if (articleId) {
                    openArticle(articleId);
                }
            }
        });
        
        // Click handling
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.read-more-btn')) {
                const articleId = card.getAttribute('data-article-id');
                if (articleId) {
                    openArticle(articleId);
                }
            }
        });
    });
}

/**
 * Setup scroll animations
 */
function setupScrollAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero animation
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
        
        // Featured article animation
        gsap.from('.featured-article-content', {
            scrollTrigger: {
                trigger: '.featured-article',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
        
        // Newsletter animation
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
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Modal close handlers
    const modal = document.getElementById('article-modal');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', hideArticleModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideArticleModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            hideArticleModal();
        }
    });
}

/**
 * Initialize image lazy loading
 */
function initializeImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Show article loading state
 */
function showArticleLoadingState() {
    const modal = document.getElementById('article-modal');
    modal.querySelector('#article-content-body').innerHTML = `
        <div class="article-loading">
            <div class="loading-spinner"></div>
            <p>Loading article...</p>
        </div>
    `;
    showArticleModal();
}

/**
 * Utility functions
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(start + (end - start) * easeProgress);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

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

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} show`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function announceToScreenReader(message) {
    const announcer = document.querySelector('[aria-live="polite"]');
    if (announcer) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    }
}

// Analytics functions (placeholder)
function trackArticleView(articleId) {
    console.log(`Article viewed: ${articleId}`);
    // Implement analytics tracking here
}

function trackSocialShare(platform, articleId) {
    console.log(`Article shared on ${platform}: ${articleId}`);
    // Implement analytics tracking here
}

/**
 * Copy code functionality
 */
function copyCode(button) {
    const codeBlock = button.nextElementSibling.querySelector('code');
    const text = codeBlock.textContent;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
    }
}

/**
 * Subscribe modal functionality
 */
function initializeSubscribeModal() {
    const subscribeModal = document.getElementById('subscribe-modal');
    const subscribeForm = document.getElementById('subscribe-form');
    const subscribeCloseBtn = document.querySelector('.subscribe-close-btn');
    
    if (!subscribeModal || !subscribeForm) return;
    
    // Handle form submission
    subscribeForm.addEventListener('submit', handleSubscribeSubmit);
    
    // Handle close button
    if (subscribeCloseBtn) {
        subscribeCloseBtn.addEventListener('click', hideSubscribeModal);
    }
    
    // Close modal when clicking outside
    subscribeModal.addEventListener('click', (e) => {
        if (e.target === subscribeModal) {
            hideSubscribeModal();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && subscribeModal.style.display === 'flex') {
            hideSubscribeModal();
        }
    });
}

function showSubscribeModal() {
    const subscribeModal = document.getElementById('subscribe-modal');
    if (subscribeModal) {
        subscribeModal.style.display = 'flex';
        subscribeModal.classList.add('active');
        document.body.classList.add('modal-open');
        document.documentElement.classList.add('modal-open');
        
        const firstInput = subscribeModal.querySelector('input[type="email"]');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function hideSubscribeModal() {
    const subscribeModal = document.getElementById('subscribe-modal');
    if (subscribeModal) {
        subscribeModal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
        setTimeout(() => {
            subscribeModal.style.display = 'none';
        }, 300);
    }
}

async function handleSubscribeSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.subscribe-submit-btn');
    const formData = new FormData(form);
    
    // Show loading state
    form.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    try {
        // Validate email
        const email = formData.get('email');
        if (!email || !isValidEmail(email)) {
            throw new Error('Please enter a valid email address');
        }
        
        // Show success message
        showSubscribeSuccess();
        form.reset();
        
        // Hide modal after 3 seconds
        setTimeout(() => {
            hideSubscribeModal();
        }, 3000);
        
    } catch (error) {
        console.error('Subscription error:', error);
        showSubscribeError(error.message || 'An error occurred. Please try again.');
    } finally {
        // Remove loading state
        form.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
}

function showSubscribeSuccess() {
    const modalBody = document.querySelector('.subscribe-modal-body');
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="subscribe-success">
                <div class="subscribe-success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Successfully Subscribed!</h3>
                <p>Thank you for subscribing to MarineStream updates. You'll receive our latest maritime insights and industry updates soon.</p>
            </div>
        `;
    }
}

function showSubscribeError(message) {
    const modalBody = document.querySelector('.subscribe-modal-body');
    if (modalBody) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'subscribe-error';
        errorDiv.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
            </div>
        `;
        
        const form = modalBody.querySelector('.subscribe-form');
        if (form) {
            form.insertBefore(errorDiv, form.firstChild);
            
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.remove();
                }
            }, 5000);
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Make functions globally available
window.openArticle = openArticle;
window.openFeaturedArticle = openFeaturedArticle;
window.hideArticleModal = hideArticleModal;
window.shareArticle = shareArticle;
window.copyArticleLink = copyArticleLink;
window.scrollToHeading = scrollToHeading;
window.copyCode = copyCode;
window.showSubscribeModal = showSubscribeModal;
window.hideSubscribeModal = hideSubscribeModal;
window.loadBlogPosts = loadBlogPosts;
