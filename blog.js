/**
 * MarineStream Blog JavaScript
 * 
 * This file handles the blog functionality including:
 * - Loading blog posts from the API
 * - Displaying posts in a responsive grid
 * - Error handling and loading states
 * - Search and filtering (future enhancement)
 * 
 * @author MarineStream Development Team
 * @version 1.0.0
 * @since 2024
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog functionality
    initBlog();
});

/**
 * Initialize blog functionality
 */
function initBlog() {
    // Load blog posts when page loads
    loadBlogPosts();
    
    // Initialize any additional blog features
    initBlogFeatures();
}

/**
 * Load blog posts from the API
 */
async function loadBlogPosts() {
    const loadingEl = document.getElementById('blog-loading');
    const errorEl = document.getElementById('blog-error');
    const postsEl = document.getElementById('blog-posts');
    const emptyEl = document.getElementById('blog-empty');
    const countEl = document.getElementById('blog-count');
    
    // Show loading state
    showElement(loadingEl);
    hideElement(errorEl);
    hideElement(postsEl);
    hideElement(emptyEl);
    
    try {
        // Fetch blog posts from API
        const response = await fetch('/api/blog');
        const result = await response.json();
        
        if (response.ok && result.success) {
            const posts = result.posts || [];
            
            // Update count
            if (countEl) {
                countEl.textContent = posts.length;
            }
            
            if (posts.length > 0) {
                // Display posts
                displayBlogPosts(posts);
                showElement(postsEl);
            } else {
                // Show empty state
                showElement(emptyEl);
            }
        } else {
            throw new Error(result.message || 'Failed to load blog posts');
        }
        
    } catch (error) {
        console.error('Error loading blog posts:', error);
        showElement(errorEl);
    } finally {
        // Hide loading state
        hideElement(loadingEl);
    }
}

/**
 * Display blog posts in the grid
 */
function displayBlogPosts(posts) {
    const postsContainer = document.getElementById('blog-posts');
    if (!postsContainer) return;
    
    // Clear existing content
    postsContainer.innerHTML = '';
    
    // Create and append post cards
    posts.forEach(post => {
        const postCard = createPostCard(post);
        postsContainer.appendChild(postCard);
    });
    
    // Add animation to cards
    animatePostCards();
}

/**
 * Create a blog post card element
 */
function createPostCard(post) {
    const card = document.createElement('article');
    card.className = 'blog-post-card';
    card.setAttribute('data-post-id', post.id);
    
    // Extract excerpt from content (first 150 characters)
    const excerpt = extractExcerpt(post.content, 150);
    
    // Format date
    const formattedDate = formatDate(post.created_at);
    
    card.innerHTML = `
        <div class="post-header">
            <div class="post-meta">
                <span class="post-date">
                    <i class="fas fa-calendar-alt"></i>
                    ${formattedDate}
                </span>
                <span class="post-category">
                    <i class="fas fa-tag"></i>
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
            <button class="btn btn-outline read-more-btn" onclick="readFullPost('${post.id}')">
                <i class="fas fa-arrow-right"></i>
                Read Full Article
            </button>
        </div>
    `;
    
    return card;
}

/**
 * Extract excerpt from HTML content
 */
function extractExcerpt(htmlContent, maxLength) {
    // Remove HTML tags and get plain text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    
    // Truncate to max length
    if (text.length <= maxLength) {
        return text;
    }
    
    // Find the last complete word within the limit
    const truncated = text.substr(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > 0) {
        return truncated.substr(0, lastSpace) + '...';
    }
    
    return truncated + '...';
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Read full blog post (future enhancement)
 */
function readFullPost(postId) {
    // This could open a modal or navigate to a full post page
    console.log('Reading full post:', postId);
    
    // For now, show a message
    alert('Full post reading feature coming soon! This would display the complete article in a modal or dedicated page.');
}

/**
 * Animate post cards on load
 */
function animatePostCards() {
    const cards = document.querySelectorAll('.blog-post-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Initialize additional blog features
 */
function initBlogFeatures() {
    // Initialize modal functionality
    initModalHandlers();
    
    // Future enhancements:
    // - Search functionality
    // - Category filtering
    // - Pagination
    // - Social sharing
    // - Related posts
    
    console.log('Blog features initialized');
}

/**
 * Initialize modal event handlers
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
        subscribeForm.addEventListener('submit', handleSubscribeSubmit);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideSubscribeModal();
        }
    });
}

/**
 * Hide subscription modal
 */
function hideSubscribeModal() {
    const subscribeModal = document.getElementById('subscribe-modal');
    if (subscribeModal) {
        subscribeModal.classList.remove('active');
        setTimeout(() => {
            subscribeModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }, 300);
    }
}

/**
 * Handle subscription form submission
 */
async function handleSubscribeSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.get('email'),
                name: formData.get('name'),
                company: formData.get('company'),
                role: formData.get('role')
            })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Show success message
            showNotification('Successfully subscribed! Thank you for joining our newsletter.', 'success');
            hideSubscribeModal();
            form.reset();
        } else {
            throw new Error(result.message || 'Subscription failed');
        }
        
    } catch (error) {
        console.error('Subscription error:', error);
        showNotification(error.message || 'Failed to subscribe. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

/**
 * Show element
 */
function showElement(element) {
    if (element) {
        element.style.display = 'block';
    }
}

/**
 * Hide element
 */
function hideElement(element) {
    if (element) {
        element.style.display = 'none';
    }
}

/**
 * Show subscription modal (called from HTML)
 */
function showSubscribeModal() {
    const subscribeModal = document.getElementById('subscribe-modal');
    if (subscribeModal) {
        subscribeModal.style.display = 'flex';
        subscribeModal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Focus on first input
        const firstInput = subscribeModal.querySelector('input[type="email"]');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}
