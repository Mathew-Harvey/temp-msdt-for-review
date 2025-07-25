/**
 * Unified Navigation Component for MarineStream
 * This script generates a consistent navigation bar across all pages
 */

class MarineStreamNavigation {
    constructor() {
        this.currentPage = this.detectCurrentPage();
        this.navData = {
            logo: {
                src: this.getAssetPath('marinestream_logo_white.png'),
                alt: 'MarineStream Logo - White'
            },
            links: [
                { href: this.getHomeLink(), text: 'Home', id: 'home' },
                { href: this.getSectionLink('about'), text: 'About', id: 'about' },
                { href: this.getSectionLink('dashboard-preview'), text: 'Solutions', id: 'solutions' },
                { href: './sales.html', text: 'Sales', id: 'sales' },
                { href: this.getSectionLink('tools'), text: 'Tools', id: 'tools' },
                { href: './blog.html', text: 'Blog', id: 'blog' },
                { href: '#', text: 'Subscribe', id: 'subscribe', className: 'btn btn-outline', onclick: 'showSubscribeModal()' },
                { href: 'https://app.marinestream.io/marinestream', text: 'Get Started', id: 'get-started', className: 'btn btn-primary', target: '_blank', rel: 'noopener noreferrer' }
            ]
        };
    }

    /**
     * Detect the current page based on the URL
     */
    detectCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('index.html') || path === '/' || path === '') return 'home';
        if (path.includes('blog.html')) return 'blog';
        if (path.includes('sales.html')) return 'sales';
        if (path.includes('privacy.html')) return 'privacy';
        if (path.includes('hullCalc.html')) return 'hullCalc';
        if (path.includes('bfmpGen.html')) return 'bfmpGen';
        return 'home';
    }

    /**
     * Get the appropriate asset path based on current page
     */
    getAssetPath(asset) {
        // Use relative paths for all pages
        return `./assets/${asset}`;
    }

    /**
     * Get the home link based on current page
     */
    getHomeLink() {
        if (this.currentPage === 'home') {
            return '#home';
        }
        return './index.html#home';
    }

    /**
     * Get the section link based on current page
     */
    getSectionLink(section) {
        if (this.currentPage === 'home') {
            return `#${section}`;
        }
        return `./index.html#${section}`;
    }

    /**
     * Generate the navigation HTML
     */
    generateNavigation() {
        return `
            <header class="main-header" role="banner">
                <div class="container">
                    <nav class="main-nav" role="navigation" aria-label="Main navigation">
                        <a href="${this.getHomeLink()}" class="logo" aria-label="MarineStream Home">
                            <img src="${this.navData.logo.src}" alt="${this.navData.logo.alt}" class="logo-img">
                        </a>
                        <div class="nav-links-container">
                            <ul class="nav-links" role="menubar">
                                ${this.navData.links.map(link => this.generateNavLink(link)).join('')}
                            </ul>
                        </div>
                        <button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links-container">
                            <i class="fas fa-bars" aria-hidden="true"></i>
                        </button>
                    </nav>
                </div>
            </header>
        `;
    }

    /**
     * Generate individual navigation link HTML
     */
    generateNavLink(link) {
        const isActive = this.currentPage === link.id;
        const activeClass = isActive ? 'active' : '';
        const currentAttr = isActive ? 'aria-current="page"' : '';
        
        let className = `nav-link ${activeClass}`;
        if (link.className) {
            className += ` ${link.className}`;
        }

        let attributes = `href="${link.href}" class="${className}" role="menuitem"`;
        if (currentAttr) attributes += ` ${currentAttr}`;
        if (link.target) attributes += ` target="${link.target}"`;
        if (link.rel) attributes += ` rel="${link.rel}"`;
        if (link.onclick) attributes += ` onclick="${link.onclick}"`;

        return `<li role="none"><a ${attributes}>${link.text}</a></li>`;
    }

    /**
     * Initialize the navigation
     */
    init() {
        // Find the navigation placeholder or existing header
        const existingHeader = document.querySelector('.main-header');
        const navPlaceholder = document.getElementById('nav-placeholder');
        
        if (existingHeader) {
            // Replace existing header
            existingHeader.outerHTML = this.generateNavigation();
        } else if (navPlaceholder) {
            // Insert into placeholder
            navPlaceholder.innerHTML = this.generateNavigation();
        } else {
            // Insert at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', this.generateNavigation());
        }

        // Initialize mobile menu functionality
        this.initMobileMenu();
    }

    /**
     * Initialize mobile menu functionality
     */
    initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navContainer = document.querySelector('.nav-links-container');

        if (mobileToggle && navContainer) {
            mobileToggle.addEventListener('click', () => {
                const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
                mobileToggle.setAttribute('aria-expanded', !isExpanded);
                navContainer.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    navContainer.classList.remove('active');
                });
            });
        }
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const nav = new MarineStreamNavigation();
    nav.init();
});

// Export for manual initialization if needed
window.MarineStreamNavigation = MarineStreamNavigation; 