// Journey State Management
let journeyState = {
    currentStep: 1,
    selections: [],
    totalSteps: 1,
    priceRange: { min: 0, max: 0 }
};

// Product/Service Templates
const productTemplates = {
    rov: {
        title: "ROV Systems",
        models: [
            {
                id: 'revolution',
                name: 'Revolution ROV',
                tagline: 'The Ultimate Inspection Platform',
                features: ['6 Thrusters', '305m Depth Rating', '260° Rotating Camera'],
                price: '$85,000 - $120,000',
                packages: [
                    { name: 'Smart Package', desc: '4K camera, modular tooling', price: '$95,000' },
                    { name: 'Expert Package', desc: 'Tilting tool platform, grabber', price: '$110,000' },
                    { name: 'Recon Package', desc: 'Positioning system, advanced sonar', price: '$120,000' }
                ]
            },
            {
                id: 'pivot',
                name: 'Pivot ROV',
                tagline: 'Versatile Mid-Range Solution',
                features: ['6 Thrusters', '305m Depth Rating', '270° Camera Rotation'],
                price: '$65,000 - $85,000',
                packages: [
                    { name: 'Smart Package', desc: '4K camera, stability control', price: '$65,000' },
                    { name: 'Expert Package', desc: 'Tilting platform, spare batteries', price: '$75,000' },
                    { name: 'NAV Package', desc: 'USBL integration, mapping', price: '$85,000' }
                ]
            },
            {
                id: 'photon',
                name: 'Photon ROV',
                tagline: 'Compact Inspection Unit',
                features: ['6 Thrusters', '120m Depth Rating', 'Ultra-Portable'],
                price: '$45,000 - $65,000',
                packages: [
                    { name: 'Base Package', desc: '4K camera, basic tooling', price: '$45,000' },
                    { name: 'Pro Package', desc: 'Extended tether, accessories', price: '$55,000' },
                    { name: 'Complete Package', desc: 'All accessories included', price: '$65,000' }
                ]
            }
        ]
    },

};

// Show Details Modal
// Remove modal functions
// Handled by script.js

// Missing function: showComparison
function showComparison() {
    showROVComparison();
}

// Missing function: showProductDetails
function showProductDetails(productId) {
    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('modalTitle');
    
    let content = '';
    
    if (productId === 'rov') {
        modalTitle.textContent = 'ROV Systems';
        content = `
            <div class="content-section">
                <h3>Professional ROV Systems</h3>
                <p>Advanced remotely operated vehicles for underwater inspection and maintenance operations.</p>
                
                <div class="media-gallery">
                    <div class="gallery-main">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="gallery-thumbs">
                        <div class="gallery-thumb" style="background: #FFE5CC;"></div>
                        <div class="gallery-thumb" style="background: #D1E7FF;"></div>
                        <div class="gallery-thumb" style="background: #E8F5E8;"></div>
                    </div>
                </div>
                
                <h3>Available Models</h3>
                <ul>
                    <li><strong>Revolution ROV:</strong> Ultimate inspection platform with 6 thrusters and 305m depth rating</li>
                    <li><strong>Pivot ROV:</strong> Versatile mid-range solution with 270° camera rotation</li>
                    <li><strong>Photon ROV:</strong> Compact inspection unit with ultra-portable design</li>
                </ul>
                
                <button class="comparison-btn" onclick="showROVComparison()">
                    <i class="fas fa-chart-bar"></i> Compare All Models
                </button>
            </div>
        `;
    } else if (productId === 'crawler') {
        modalTitle.textContent = 'Crawler Systems';
        content = `
            <div class="content-section">
                <h3>Hull Cleaning Robots</h3>
                <p>Advanced crawler systems for automated hull cleaning and maintenance.</p>
                
                <div class="media-gallery">
                    <div class="gallery-main">
                        <i class="fas fa-spider"></i>
                    </div>
                </div>
                
                <h3>Available Systems</h3>
                <ul>
                    <li><strong>ClinCrawler:</strong> Magnetic-based hull cleaning robot</li>
                    <li><strong>VacMax Crawler:</strong> Vacuum-based cleaning system</li>
                    <li><strong>Magnetic Systems:</strong> Advanced magnetic propulsion technology</li>
                </ul>
            </div>
        `;
    } else if (productId === 'filters') {
        modalTitle.textContent = 'Filtration Systems';
        content = `
            <div class="content-section">
                <h3>Water Treatment Solutions</h3>
                <p>Environmental compliance filtration systems for marine operations.</p>
                
                <div class="media-gallery">
                    <div class="gallery-main">
                        <i class="fas fa-filter"></i>
                    </div>
                </div>
                
                <h3>Available Systems</h3>
                <ul>
                    <li><strong>10μ Filtration:</strong> Fine particle capture system</li>
                    <li><strong>UV Treatment:</strong> Ultraviolet water purification</li>
                    <li><strong>Waste Processing:</strong> Complete waste management solutions</li>
                </ul>
            </div>
        `;
    } else if (productId === 'software') {
        modalTitle.textContent = 'Software Platform';
        content = `
            <div class="content-section">
                <h3>Digital Management System</h3>
                <p>Comprehensive software platform for biofouling management and compliance tracking.</p>
                
                <div class="media-gallery">
                    <div class="gallery-main">
                        <i class="fas fa-laptop"></i>
                    </div>
                </div>
                
                <h3>Platform Features</h3>
                <ul>
                    <li><strong>Compliance Tracking:</strong> Automated regulatory compliance monitoring</li>
                    <li><strong>Digital Records:</strong> Complete digital documentation system</li>
                    <li><strong>Real-time Monitoring:</strong> Live operational data and analytics</li>
                </ul>
            </div>
        `;
    } else if (productId === 'helmets') {
        modalTitle.textContent = 'Diving Equipment';
        content = `
            <div class="content-section">
                <h3>Professional Diving Gear</h3>
                <p>Commercial diving equipment and safety systems for underwater operations.</p>
                
                <div class="media-gallery">
                    <div class="gallery-main">
                        <i class="fas fa-hard-hat"></i>
                    </div>
                </div>
                
                <h3>Available Equipment</h3>
                <ul>
                    <li><strong>Commercial Helmets:</strong> Professional diving helmets</li>
                    <li><strong>Safety Equipment:</strong> Complete safety gear packages</li>
                    <li><strong>Communication Systems:</strong> Underwater communication technology</li>
                </ul>
            </div>
        `;
    }
    
    modalBody.innerHTML = content;
    modal.style.display = 'flex';
}





// Missing function: selectROV
function selectROV(rovId, rovName, rovPrice) {
    // Add ROV selection to journey
    selectChoice(rovId, rovName, rovPrice);
}

// Missing function: selectPackage
function selectPackage(rovId, packageName, packagePrice) {
    // Add package selection to journey
    selectChoice(`${rovId}-${packageName.toLowerCase().replace(/\s+/g, '-')}`, `${rovId} - ${packageName}`, packagePrice);
    closeModal();
}

function closeModal() {
    document.getElementById('detailModal').style.display = 'none';
}

// Selection Handler
function selectChoice(id, title, price) {
    // Show loading
    document.getElementById('loading').style.display = 'flex';
    
    // Add to selections
    journeyState.selections.push({ id, title, price, step: journeyState.currentStep });
    
    // Update summary
    updateSummary();
    
    // Load next step
    setTimeout(() => {
        loadNextStep(id);
        document.getElementById('loading').style.display = 'none';
    }, 600);
}

function loadNextStep(selection) {
    const stepsContainer = document.getElementById('journeySteps');
    journeyState.currentStep++;
    
    let nextStepHtml = '';
    
    // Determine next step based on selection
    if (journeyState.currentStep === 2) {
        if (selection === 'product') {
            nextStepHtml = `
                <div class="step" id="step2" style="animation-delay: 0.1s">
                    <div class="step-header">
                        <div class="step-number">2</div>
                        <div class="step-title">
                            <h2>Select your equipment category</h2>
                            <p>Choose from our range of marine technology</p>
                        </div>
                    </div>
                    <div class="choices-grid">
                        ${createProductCards()}
                    </div>
                </div>
            `;
        } else if (selection === 'maintenance') {
            nextStepHtml = `
                <div class="step" id="step2" style="animation-delay: 0.1s">
                    <div class="step-header">
                        <div class="step-number">2</div>
                        <div class="step-title">
                            <h2>Select your maintenance service</h2>
                            <p>Choose the type of maintenance you need</p>
                        </div>
                    </div>
                    <div class="choices-grid">
                        <div class="choice-card">
                            <div class="choice-card-body">
                                <div class="choice-media media-service">
                                    <i class="fas fa-calendar-check"></i>
                                </div>
                                <div class="choice-icon">
                                    <i class="fas fa-calendar-check"></i>
                                </div>
                                <h3 class="choice-title">Scheduled Maintenance</h3>
                                <p class="choice-description">Regular preventive maintenance programs</p>
                                <ul class="choice-features">
                                    <li>Preventive maintenance schedules</li>
                                    <li>Equipment health monitoring</li>
                                    <li>Performance optimization</li>
                                </ul>
                                <p class="choice-price">$2,000 - $8,000</p>
                                <div class="choice-actions">
                                    <button class="btn-select" onclick="selectChoice('scheduled-maintenance', 'Scheduled Maintenance', '$2,000 - $8,000')">
                                        Select <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="choice-card">
                            <div class="choice-card-body">
                                <div class="choice-media media-service">
                                    <i class="fas fa-tools"></i>
                                </div>
                                <div class="choice-icon">
                                    <i class="fas fa-tools"></i>
                                </div>
                                <h3 class="choice-title">Emergency Repairs</h3>
                                <p class="choice-description">24/7 emergency repair services</p>
                                <ul class="choice-features">
                                    <li>24/7 emergency response</li>
                                    <li>Rapid repair services</li>
                                    <li>Minimal downtime solutions</li>
                                </ul>
                                <p class="choice-price">$5,000 - $20,000</p>
                                <div class="choice-actions">
                                    <button class="btn-select" onclick="selectChoice('emergency-repairs', 'Emergency Repairs', '$5,000 - $20,000')">
                                        Select <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="choice-card">
                            <div class="choice-card-body">
                                <div class="choice-media media-service">
                                    <i class="fas fa-certificate"></i>
                                </div>
                                <div class="choice-icon">
                                    <i class="fas fa-certificate"></i>
                                </div>
                                <h3 class="choice-title">Certification Renewals</h3>
                                <p class="choice-description">Equipment certification and compliance</p>
                                <ul class="choice-features">
                                    <li>Equipment certification</li>
                                    <li>Regulatory compliance</li>
                                    <li>Documentation support</li>
                                </ul>
                                <p class="choice-price">$1,000 - $5,000</p>
                                <div class="choice-actions">
                                    <button class="btn-select" onclick="selectChoice('certification-renewals', 'Certification Renewals', '$1,000 - $5,000')">
                                        Select <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (selection === 'other') {
            nextStepHtml = `
                <div class="step" id="step2" style="animation-delay: 0.1s">
                    <div class="step-header">
                        <div class="step-number">2</div>
                        <div class="step-title">
                            <h2>Select your consultation service</h2>
                            <p>Choose the type of consultation you need</p>
                        </div>
                    </div>
                    <div class="choices-grid">
                        <div class="choice-card">
                            <div class="choice-card-body">
                                <div class="choice-media media-service">
                                    <i class="fas fa-gavel"></i>
                                </div>
                                <div class="choice-icon">
                                    <i class="fas fa-gavel"></i>
                                </div>
                                <h3 class="choice-title">Regulatory Compliance</h3>
                                <p class="choice-description">Expert guidance on maritime regulations</p>
                                <ul class="choice-features">
                                    <li>IMO guidelines compliance</li>
                                    <li>Biosecurity requirements</li>
                                    <li>Regulatory documentation</li>
                                </ul>
                                <p class="choice-price">Custom Quote</p>
                                <div class="choice-actions">
                                    <button class="btn-select" onclick="selectChoice('regulatory-compliance', 'Regulatory Compliance', 'Custom Quote')">
                                        Select <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="choice-card">
                            <div class="choice-card-body">
                                <div class="choice-media media-service">
                                    <i class="fas fa-cogs"></i>
                                </div>
                                <div class="choice-icon">
                                    <i class="fas fa-cogs"></i>
                                </div>
                                <h3 class="choice-title">Custom Engineering</h3>
                                <p class="choice-description">Bespoke engineering solutions</p>
                                <ul class="choice-features">
                                    <li>Custom design solutions</li>
                                    <li>Specialized equipment</li>
                                    <li>Unique operational needs</li>
                                </ul>
                                <p class="choice-price">Custom Quote</p>
                                <div class="choice-actions">
                                    <button class="btn-select" onclick="selectChoice('custom-engineering', 'Custom Engineering', 'Custom Quote')">
                                        Select <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="choice-card">
                            <div class="choice-card-body">
                                <div class="choice-media media-service">
                                    <i class="fas fa-graduation-cap"></i>
                                </div>
                                <div class="choice-icon">
                                    <i class="fas fa-graduation-cap"></i>
                                </div>
                                <h3 class="choice-title">Training Programs</h3>
                                <p class="choice-description">Comprehensive training solutions</p>
                                <ul class="choice-features">
                                    <li>Crew training programs</li>
                                    <li>Technical skill development</li>
                                    <li>Safety certification</li>
                                </ul>
                                <p class="choice-price">Custom Quote</p>
                                <div class="choice-actions">
                                    <button class="btn-select" onclick="selectChoice('training-programs', 'Training Programs', 'Custom Quote')">
                                        Select <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    } else if (journeyState.currentStep === 3) {
        // Show specific products or services
        if (selection === 'rov') {
            nextStepHtml = createROVSelection();
        }
    }
    
    if (nextStepHtml) {
        stepsContainer.insertAdjacentHTML('beforeend', nextStepHtml);
        
        // Add navigation dot
        addNavDot();
        
        // Scroll to new step
        setTimeout(() => {
            document.getElementById(`step${journeyState.currentStep}`).scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        // Final step reached
        showFinalStep();
    }
}

function createProductCards() {
    const products = [
        { id: 'rov', icon: 'fa-robot', title: 'ROV Systems', desc: 'Professional inspection ROVs', features: ['Revolution ROV', 'Pivot ROV', 'Photon ROV'], price: '$45,000 - $130,000', media: 'media-rov' },
        { id: 'crawler', icon: 'fa-spider', title: 'Crawler Systems', desc: 'Hull cleaning robots', features: ['ClinCrawler', 'VacMax Crawler', 'Magnetic systems'], price: '$120,000 - $180,000', media: 'media-crawler' },
        { id: 'helmets', icon: 'fa-hard-hat', title: 'Diving Equipment', desc: 'Professional diving gear', features: ['Commercial helmets', 'Safety equipment', 'Communication systems'], price: '$15,000 - $25,000', media: 'media-helmet' },
        { id: 'filters', icon: 'fa-filter', title: 'Filtration Systems', desc: 'Water treatment solutions', features: ['10μ filtration', 'UV treatment', 'Waste processing'], price: '$30,000 - $60,000', media: 'media-filter' },
        { id: 'software', icon: 'fa-laptop', title: 'Software Platform', desc: 'Digital management system', features: ['Compliance tracking', 'Digital records', 'Real-time monitoring'], price: '$10,000 - $40,000/year', media: 'media-software' }
    ];
    
    return products.map(product => `
        <div class="choice-card">
            <div class="choice-card-body">
                <div class="choice-media ${product.media}">
                    <i class="fas ${product.icon}"></i>
                </div>
                <div class="choice-icon">
                    <i class="fas ${product.icon}"></i>
                </div>
                <h3 class="choice-title">${product.title}</h3>
                <p class="choice-description">${product.desc}</p>
                <ul class="choice-features">
                    ${product.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <p class="choice-price">${product.price}</p>
                <div class="choice-actions">
                    <button class="btn-learn-more" onclick="showProductDetails('${product.id}')">
                        <i class="fas fa-info-circle"></i> Learn More
                    </button>
                    <button class="btn-select" onclick="selectChoice('${product.id}', '${product.title}', '${product.price}')">
                        Select <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function createROVSelection() {
    return `
        <div class="step" id="step3" style="animation-delay: 0.1s">
            <div class="step-header">
                <div class="step-number">3</div>
                <div class="step-title">
                    <h2>Select Your ROV Model</h2>
                    <p>Choose the perfect ROV for your operations</p>
                </div>
            </div>
            <button class="comparison-btn" onclick="showROVComparison()">
                <i class="fas fa-chart-bar"></i> Compare All Models
            </button>
            <div class="choices-grid">
                ${productTemplates.rov.models.map(model => `
                    <div class="choice-card">
                        <div class="choice-card-body">
                            <div class="choice-media media-rov">
                                <i class="fas fa-robot"></i>
                            </div>
                            <h3 class="choice-title">${model.name}</h3>
                            <p class="choice-description">${model.tagline}</p>
                            <ul class="choice-features">
                                ${model.features.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                            <p class="choice-price">${model.price}</p>
                            <div class="choice-actions">
                                <button class="btn-learn-more" onclick="showROVPackages('${model.id}')">
                                    <i class="fas fa-box"></i> Packages
                                </button>
                                <button class="btn-select" onclick="selectROV('${model.id}', '${model.name}', '${model.price}')">
                                    Configure <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function showROVPackages(rovId) {
    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('modalTitle');
    
    const rov = productTemplates.rov.models.find(m => m.id === rovId);
    modalTitle.textContent = `${rov.name} Packages`;
    
    modalBody.innerHTML = `
        <div class="content-section">
            <h3>Pre-Configured ${rov.name} Packages</h3>
            <p>Select a package that matches your operational needs</p>
            
            <div class="packages-grid">
                ${rov.packages.map(pkg => `
                    <div class="package-card">
                        <div class="package-icon"></div>
                        <h4 class="package-name">${pkg.name}</h4>
                        <p class="package-description">${pkg.desc}</p>
                        <p class="choice-price">${pkg.price}</p>
                        <button class="package-select-btn" onclick="selectPackage('${rovId}', '${pkg.name}', '${pkg.price}')">
                            Select Package
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function showROVComparison() {
    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('modalTitle');
    
    modalTitle.textContent = 'ROV Comparison';
    
    modalBody.innerHTML = `
        <div class="content-section">
            <h3>Compare ROV Models</h3>
            <div class="comparison-table">
                <table>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Revolution</th>
                            <th>Pivot</th>
                            <th>Photon</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Depth Rating</td>
                            <td>305m (1000ft)</td>
                            <td>305m (1000ft)</td>
                            <td>120m (400ft)</td>
                        </tr>
                        <tr>
                            <td>Number of Thrusters</td>
                            <td>6</td>
                            <td>6</td>
                            <td>6</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>55 lbs</td>
                            <td>35 lbs</td>
                            <td>25.4 lbs</td>
                        </tr>
                        <tr>
                            <td>Battery Life</td>
                            <td>Up to 6 Hrs</td>
                            <td>2 to 3 Hrs</td>
                            <td>2 to 3 Hrs</td>
                        </tr>
                        <tr>
                            <td>Camera Rotation</td>
                            <td>260°</td>
                            <td>220°</td>
                            <td>220°</td>
                        </tr>
                        <tr>
                            <td>Sonar Rotation</td>
                            <td>260°</td>
                            <td>97°</td>
                            <td>0°</td>
                        </tr>
                        <tr>
                            <td>NAV Package Available</td>
                            <td>✓</td>
                            <td>✓</td>
                            <td>✓</td>
                        </tr>
                        <tr>
                            <td>Price Range</td>
                            <td>$85k - $120k</td>
                            <td>$65k - $85k</td>
                            <td>$45k - $65k</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}



function showFinalStep() {
    const stepsContainer = document.getElementById('journeySteps');
    journeyState.currentStep++;
    
    const finalHtml = `
        <div class="step" id="step${journeyState.currentStep}" style="animation-delay: 0.1s">
            <div class="step-header">
                <div class="step-number">✓</div>
                <div class="step-title">
                    <h2>Your MarineStream Journey is Complete!</h2>
                    <p>Review your selections and request a detailed quote</p>
                </div>
            </div>
            <div style="text-align: center; padding: 2rem;">
                <div class="ship-icon" style="font-size: 4rem; color: var(--accent-color); margin-bottom: 1rem;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <p style="font-size: 1.2rem; color: var(--text-medium); margin-bottom: 2rem;">
                    Perfect! We've charted your course. Your custom solution is ready.
                </p>
                <div class="case-studies">
                    <div class="case-study-card">
                        <div class="case-study-image">
                            <i class="fas fa-phone"></i>
                        </div>
                        <div class="case-study-content">
                            <h4 class="case-study-title">Next Steps</h4>
                            <p class="case-study-description">Our marine experts will review your requirements and provide a detailed proposal within 24 hours.</p>
                        </div>
                    </div>
                    <div class="case-study-card">
                        <div class="case-study-image">
                            <i class="fas fa-calendar"></i>
                        </div>
                        <div class="case-study-content">
                            <h4 class="case-study-title">Schedule a Demo</h4>
                            <p class="case-study-description">We can arrange an on-site demonstration or virtual walkthrough of your selected solutions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    stepsContainer.insertAdjacentHTML('beforeend', finalHtml);
    document.getElementById(`step${journeyState.currentStep}`).scrollIntoView({ behavior: 'smooth' });
    
    // Pre-fill the message with journey details
    updateContactMessage();
}

function updateSummary() {
    const summaryItems = document.getElementById('summaryItems');
    summaryItems.innerHTML = '';
    
    let minTotal = 0;
    let maxTotal = 0;
    
    journeyState.selections.forEach(item => {
        const itemHtml = `
            <div class="summary-item">
                <span class="summary-item-name">${item.title}</span>
                <span class="summary-item-price">${item.price}</span>
            </div>
        `;
        summaryItems.insertAdjacentHTML('beforeend', itemHtml);
        
        // Parse price range
        if (item.price !== 'Custom Quote') {
            const matches = item.price.match(/\$?([\d,]+)/g);
            if (matches && matches.length >= 1) {
                const min = parseInt(matches[0].replace(/[$,]/g, ''));
                minTotal += min;
                if (matches.length >= 2) {
                    const max = parseInt(matches[1].replace(/[$,]/g, ''));
                    maxTotal += max;
                } else {
                    maxTotal += min;
                }
            }
        }
    });
    
    // Update total range
    const totalRange = document.getElementById('totalRange');
    if (minTotal > 0) {
        totalRange.textContent = `$${minTotal.toLocaleString()} - $${maxTotal.toLocaleString()}`;
    } else {
        totalRange.textContent = 'Custom Quote';
    }
}



function addNavDot() {
    const navDots = document.getElementById('navDots');
    const newDot = document.createElement('div');
    newDot.className = 'nav-dot';
    newDot.dataset.step = `Step ${journeyState.currentStep}`;
    navDots.appendChild(newDot);
    
    // Update active states
    navDots.querySelectorAll('.nav-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === journeyState.currentStep - 1);
    });
}

function updateContactMessage() {
    const message = document.getElementById('message');
    const journey = journeyState.selections.map(s => s.title).join(' → ');
    message.value = `My MarineStream Journey: ${journey}\n\nI'm interested in learning more about these solutions for my maritime operations.`;
}

// Form Handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Add journey data
    data.journey = journeyState.selections;
    data.estimatedRange = document.getElementById('totalRange').textContent;
    
    // Show success message
    alert('Thank you for your inquiry! Our maritime experts will contact you within 24 hours with a detailed quote and consultation.');
    
    // In production, this would send to your backend
    console.log('Form submission:', data);
});

// Close modal when clicking outside
document.getElementById('detailModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// --- Newsletter Subscribe Modal Logic (copied/adapted from blog.js) ---
// --- Unified Modal System Integration ---
// All auto-popup and cookie logic removed - modal only shows on user request

// Initialize subscribe modal functionality
document.addEventListener('DOMContentLoaded', function() {
    initSubscribeModal();
});

/**
 * Initialize subscribe modal functionality
 */
function initSubscribeModal() {
    const subscribeModal = document.getElementById('subscribe-modal');
    const subscribeForm = document.getElementById('subscribe-form');
    const subscribeCloseBtn = document.querySelector('.subscribe-close-btn');
    const subscribeCancelBtn = document.querySelector('.subscribe-cancel-btn');
    
    if (!subscribeModal || !subscribeForm) return;
    
    // Handle form submission
    subscribeForm.addEventListener('submit', handleSubscribeSubmit);
    
    // Handle close button
    if (subscribeCloseBtn) {
        subscribeCloseBtn.addEventListener('click', () => {
            hideSubscribeModal();
        });
    }
    
    // Handle cancel button
    if (subscribeCancelBtn) {
        subscribeCancelBtn.addEventListener('click', () => {
            hideSubscribeModal();
        });
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

/**
 * Show the subscription modal
 */
function showSubscribeModal() {
    const subscribeModal = document.getElementById('subscribe-modal');
    if (subscribeModal) {
        subscribeModal.style.display = 'flex';
        subscribeModal.classList.add('active');
        document.body.classList.add('modal-open');
        document.documentElement.classList.add('modal-open');
        
        // Focus on first input
        const firstInput = subscribeModal.querySelector('input[type="email"]');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

/**
 * Hide the subscription modal
 */
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

/**
 * Handle subscription form submission
 */
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
        
        // Validate consent
        const consent = formData.get('subscribe-consent');
        if (!consent) {
            throw new Error('Please agree to receive email updates');
        }
        
        // Prepare data
        const data = {
            email: email,
            name: formData.get('name') || null,
            company: formData.get('company') || null,
            role: formData.get('role') || null
        };
        
        // Send to backend
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Show success message
            showSubscribeSuccess();
            form.reset();
            
            // Hide modal after 3 seconds
            setTimeout(() => {
                hideSubscribeModal();
            }, 3000);
        } else {
            throw new Error(result.message || 'Subscription failed. Please try again.');
        }
        
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

/**
 * Show subscription success message
 */
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

/**
 * Show subscription error message
 */
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
        
        // Insert error message at the top of the form
        const form = modalBody.querySelector('.subscribe-form');
        if (form) {
            form.insertBefore(errorDiv, form.firstChild);
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.remove();
                }
            }, 5000);
        }
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Make functions globally available
window.showSubscribeModal = showSubscribeModal;
window.hideSubscribeModal = hideSubscribeModal;


