// Footer Component - Single Source of Truth
// This file contains the footer HTML that will be used across all pages

function createFooter() {
    // Determine if we're on the home page (index.html)
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname.endsWith('/') || 
                      window.location.pathname === '';
    
    // Set the base path for links
    const homePath = isHomePage ? '' : './index.html';
    
    return `
    <footer class="main-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <a href="#" class="footer-logo">
                        <!-- Make sure logo.png exists -->
                        <img src="./assets/logo.png" alt="MarineStream Logo - Footer">
                    </a>
                    <p>Revolutionising Biofouling Management with blockchain technology and live underwater monitoring.
                    </p>
                </div>
                <div class="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="${homePath}#home">Home</a></li>
                        <li><a href="${homePath}#about">About</a></li>
                        <li><a href="${homePath}#dashboard-preview">Solutions</a></li>
                        <li><a href="./sales.html">Sales</a></li>
                        <li><a href="./blog.html">Blog</a></li>
                        <li><a href="${homePath}#tools">Tools</a></li>
                        <li><a href="${homePath}#contact">Contact</a></li>
                    </ul>
                </div>

                <div class="footer-links">
                    <!-- <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Cookies Policy</a></li>
                    </ul> -->
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2025 MarineStream. All rights reserved. | A division of <a href="https://franmarine.com.au"
                        target="_blank" rel="noopener noreferrer">franmarine.com.au</a> | <a
                        href="./privacy.html">Privacy Policy</a></p>
            </div>
        </div>
    </footer>
    `;
}

// Function to insert footer into the page
function insertFooter() {
    const footerContainer = document.getElementById('footer-placeholder');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
    }
}

// Auto-insert footer when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertFooter);
} else {
    insertFooter();
} 