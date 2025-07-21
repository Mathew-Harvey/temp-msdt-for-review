# MarineStream™ Website

A comprehensive website for MarineStream's integrated biofouling and underwater asset management platform.

## 🚀 Features

### Core Functionality
- **Interactive Biofouling Calculator** - University of Melbourne research-based hull fouling cost calculator
- **BFMP Generator** - Comprehensive biofouling management plan generator compliant with IMO guidelines
- **PDF Capability Statement** - Dynamic PDF generation with company information
- **Video Showcase** - ROV inspection and cleaning demonstration videos
- **Contact Form** - Integrated contact form with email fallback

### Technical Features
- **Responsive Design** - Mobile-first approach with touch-optimized interfaces
- **Accessibility** - WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Performance Optimized** - Lazy loading, preloading, and efficient resource management
- **Modal System** - Complex modal interactions with proper focus management
- **Iframe Integration** - Seamless calculator integration via iframe communication

## 📁 Project Structure

```
temp-msdt-for-review/
├── index.html              # Main website page
├── style.css              # Main stylesheet with responsive design
├── script.js              # Core JavaScript functionality
├── loading-screen.css     # Loading screen styles
├── loading-screen.js      # Loading screen functionality
├── hullCalc.html          # Hull calculator iframe page
├── hullCalc.js            # Calculator logic and charts
├── bfmpGen.html           # BFMP generator modal
├── bfmpGen.js             # BFMP generation logic
├── bfmpGen.css            # BFMP generator styles
├── capStat.js             # Capability statement PDF generator
├── thanks.html            # Thank you page
├── assets/                # Images, videos, and media files
├── results/               # Generated reports and documents
└── README.md              # This documentation
```

## 🛠️ Development Guidelines

### Code Organization
- **Modular Structure** - Each feature has its own files (HTML, CSS, JS)
- **Event-Driven Architecture** - Clean separation of concerns
- **Defensive Programming** - Multiple fallbacks ensure reliability
- **Debug Logging** - Comprehensive console logging for troubleshooting

### Performance Considerations
- **Lazy Loading** - Images load only when needed
- **Preloading** - Critical resources preloaded for better UX
- **Async Script Loading** - Non-critical scripts loaded asynchronously
- **Efficient DOM Queries** - Cached selectors and event delegation

### Accessibility Features
- **ARIA Labels** - Comprehensive screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Proper focus trapping in modals
- **Skip Links** - Quick navigation for assistive technology
- **Color Contrast** - WCAG compliant color schemes

## 🔧 Key Components

### Modal System
The website uses a sophisticated modal system with:
- **State Management** - Proper show/hide states
- **Focus Trapping** - Keyboard navigation within modals
- **Escape Key Support** - Close modals with Escape key
- **Click Outside** - Close modals by clicking outside content

### Form Handling
- **Validation** - Client-side and server-side validation
- **Error Handling** - Graceful error handling with user feedback
- **File Upload** - Image upload with preview functionality
- **Email Integration** - FormSubmit.co integration with fallback

### PDF Generation
- **Dynamic Content** - Handlebars templating for dynamic PDFs
- **Multiple Formats** - HTML, PDF, and print-friendly versions
- **Error Handling** - Fallback options if PDF generation fails
- **Responsive Design** - Print-optimized layouts

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd temp-msdt-for-review
   ```

2. **Serve the website**
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile browsers** - iOS Safari, Chrome Mobile

## 🔍 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🛡️ Security

- **Content Security Policy** - Restricts resource loading
- **XSS Protection** - Input sanitization and validation
- **CSRF Protection** - Form submission security
- **HTTPS Only** - Secure connections required

## 📈 Analytics & Monitoring

- **Error Tracking** - Console error logging
- **Performance Monitoring** - Resource loading metrics
- **User Interaction** - Form submission tracking
- **Accessibility Testing** - Automated a11y checks

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

## 📄 License

© 2025 MarineStream. All rights reserved. | A division of [franmarine.com.au](https://franmarine.com.au)

## 📞 Support

For technical support or questions about the website:
- **Email**: mharvey@marinestream.com.au
- **Phone**: +61 8 9437 3900
- **Address**: 13 Possner Way, Henderson, WA 6166, Australia

---

*This documentation is maintained by the MarineStream Development Team.*