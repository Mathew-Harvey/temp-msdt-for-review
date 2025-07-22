/**
 * MarineStream Privacy Policy JavaScript
 * 
 * This file handles the privacy policy functionality including:
 * - Loading privacy policy content from the API
 * - Error handling and loading states
 * - Content formatting and display
 * 
 * @author MarineStream Development Team
 * @version 1.0.0
 * @since 2024
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize privacy policy functionality
    initPrivacyPolicy();
});

/**
 * Initialize privacy policy functionality
 */
function initPrivacyPolicy() {
    // Load privacy policy when page loads
    loadPrivacyPolicy();
}

/**
 * Load privacy policy from the API
 */
async function loadPrivacyPolicy() {
    const loadingEl = document.getElementById('privacy-loading');
    const errorEl = document.getElementById('privacy-error');
    const policyEl = document.getElementById('privacy-policy');
    
    // Show loading state
    showElement(loadingEl);
    hideElement(errorEl);
    hideElement(policyEl);
    
    try {
        // Fetch privacy policy from API
        const response = await fetch('/api/privacy');
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Display privacy policy content
            displayPrivacyPolicy(result.content);
            showElement(policyEl);
        } else {
            throw new Error(result.message || 'Failed to load privacy policy');
        }
        
    } catch (error) {
        console.error('Error loading privacy policy:', error);
        showElement(errorEl);
    } finally {
        // Hide loading state
        hideElement(loadingEl);
    }
}

/**
 * Display privacy policy content
 */
function displayPrivacyPolicy(content) {
    const policyContainer = document.getElementById('privacy-policy');
    if (!policyContainer) return;
    
    // Set the HTML content
    policyContainer.innerHTML = content;
    
    // Add custom styling to the content
    stylePrivacyContent(policyContainer);
    
    // Add smooth scrolling to anchor links
    addSmoothScrolling();
}

/**
 * Apply custom styling to privacy policy content
 */
function stylePrivacyContent(container) {
    // Add custom classes to elements for better styling
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        heading.classList.add('privacy-heading');
    });
    
    const paragraphs = container.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.classList.add('privacy-paragraph');
    });
    
    const lists = container.querySelectorAll('ul, ol');
    lists.forEach(list => {
        list.classList.add('privacy-list');
    });
    
    const links = container.querySelectorAll('a');
    links.forEach(link => {
        link.classList.add('privacy-link');
        // Add target="_blank" for external links
        if (link.href && !link.href.startsWith(window.location.origin) && !link.href.startsWith('#')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    const tables = container.querySelectorAll('table');
    tables.forEach(table => {
        table.classList.add('privacy-table');
    });
}

/**
 * Add smooth scrolling to anchor links
 */
function addSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
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