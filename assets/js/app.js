/**
 * ====================================================================
 * iLikaris Web Platform — Core Client Application
 * Modular Object-Oriented Architecture (ES6 Classes)
 * ====================================================================
 */

/**
 * Class 1: NavigationManager
 * Handles sticky header transition, mobile drawer toggling, outside overlay click,
 * and smooth navigation scrolling with header offset compensation.
 */
class NavigationManager {
    constructor() {
        this.header = document.getElementById('mainHeader');
        this.navLinks = document.getElementById('navLinks');
        this.navOverlay = document.getElementById('navOverlay');
        this.headerOffset = 80;

        this.init();
    }

    init() {
        this.bindScroll();
        this.bindSmoothScroll();
    }

    bindScroll() {
        if (!this.header) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    bindSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId && targetId.length > 1) {
                    const targetElem = document.querySelector(targetId);
                    if (targetElem) {
                        e.preventDefault();
                        this.closeMobileMenu();
                        const currentHeaderOffset = (this.header ? this.header.offsetHeight : 70) + 12;
                        const elementPosition = targetElem.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - currentHeaderOffset;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    toggleMobileMenu() {
        if (this.navLinks) this.navLinks.classList.toggle('active');
        if (this.navOverlay) this.navOverlay.classList.toggle('active');
        const isActive = this.navLinks && this.navLinks.classList.contains('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
        const toggleBtn = document.getElementById('menuToggle') || document.querySelector('.mobile-menu-toggle');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            if (icon) icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
        }
    }

    closeMobileMenu() {
        if (this.navLinks) this.navLinks.classList.remove('active');
        if (this.navOverlay) this.navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        const toggleBtn = document.getElementById('menuToggle') || document.querySelector('.mobile-menu-toggle');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    }
}

/**
 * Class 2: ParticlesManager
 * Dynamically instantiates and animates ambient glowing background particles.
 */
class ParticlesManager {
    constructor(containerId = 'particles', count = 18) {
        this.container = document.getElementById(containerId);
        this.count = count;

        this.init();
    }

    init() {
        if (!this.container) return;
        for (let i = 0; i < this.count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 80 + 30;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${Math.random() * 15 + 15}s`;
            particle.style.opacity = (Math.random() * 0.4 + 0.15).toString();
            this.container.appendChild(particle);
        }
    }
}

/**
 * Class 3: CounterAnimator
 * Uses IntersectionObserver to trigger smooth statistical counters when visible.
 */
class CounterAnimator {
    constructor(selector = '.stat-number[data-target]') {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        if (!this.elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.getAttribute('data-target')) {
                    this.animate(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        this.elements.forEach(el => observer.observe(el));
    }

    animate(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        const duration = 1800;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }
}

/**
 * Class 4: TechStackFilter
 * Handles category filtering for tech stack cards.
 */
class TechStackFilter {
    constructor() {
        this.buttons = document.querySelectorAll('.tech-filter-btn');
        this.items = document.querySelectorAll('.tech-item');

        this.init();
    }

    init() {
        if (!this.buttons.length || !this.items.length) return;

        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.items.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Class 5: FaqAccordion
 * Manages FAQ question expand/collapse accordion behavior.
 */
class FaqAccordion {
    constructor() {
        this.questions = document.querySelectorAll('.faq-question');
        this.init();
    }

    init() {
        if (!this.questions.length) return;

        this.questions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');

                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });

                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }
}

/**
 * Class 6: ToastNotifier
 * Controls floating feedback toast popups.
 */
class ToastNotifier {
    constructor() {
        this.toast = document.getElementById('toast');
        this.toastMsg = document.getElementById('toastMessage');
        this.timeoutId = null;
    }

    show(message, type = 'success', duration = 5000) {
        if (!this.toast) return;
        if (message && this.toastMsg) {
            this.toastMsg.textContent = message;
        }

        const icon = this.toast.querySelector('i');
        if (icon) {
            if (type === 'error') {
                icon.className = 'fas fa-exclamation-circle';
                icon.style.color = '#ef4444';
                this.toast.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            } else if (type === 'warning') {
                icon.className = 'fas fa-exclamation-triangle';
                icon.style.color = '#f59e0b';
                this.toast.style.borderColor = 'rgba(245, 158, 11, 0.4)';
            } else {
                icon.className = 'fas fa-check-circle';
                icon.style.color = '#10b981';
                this.toast.style.borderColor = 'var(--accent-cyan)';
            }
        }

        this.toast.classList.add('show');

        if (this.timeoutId) clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.toast.classList.remove('show');
        }, duration);
    }
}

/**
 * Class 7: ChatbotWidget
 * Controls the floating AI assistant window, message dispatch, auto-scroll,
 * and contextual mock responses.
 */
class ChatbotWidget {
    constructor() {
        this.chatWindow = document.getElementById('chatWindow');
        this.chatInput = document.getElementById('chatInput');
        this.chatMessages = document.getElementById('chatMessages');

        this.knowledgeBase = [
            {
                keywords: ['service', 'what do you do', 'build'],
                reply: "iLikaris specializes in: 1) Modern Full-Stack Web & SaaS apps (Next.js/React/Node), 2) Private Data AI & Custom RAG pipelines, 3) Autonomous AI Chatbots, and 4) Fractional Tech Advisory."
            },
            {
                keywords: ['cost', 'price', 'pricing', 'rate'],
                reply: "Engagements are tailored by project scope or monthly retainer. Check out our 'Client Engagement Models' section above or book a quick strategy call for a customized quote!"
            },
            {
                keywords: ['private', 'ai', 'data', 'security'],
                reply: "Our AI systems can be deployed self-hosted or inside private cloud VPCs. Your proprietary documents and customer data are never stored or used to train third-party public models."
            },
            {
                keywords: ['start', 'contact', 'hire', 'call'],
                reply: "You can schedule a discovery session or fill out the Project Inquiry form at the bottom of this page. We usually respond within 24 hours!"
            }
        ];
    }

    toggle() {
        if (!this.chatWindow) return;
        this.chatWindow.classList.toggle('active');
        if (this.chatWindow.classList.contains('active') && this.chatInput) {
            this.chatInput.focus();
        }
    }

    quickAsk(questionText) {
        if (!this.chatInput) return;
        this.chatInput.value = questionText;
        this.sendMessage();
    }

    sendMessage() {
        if (!this.chatInput || !this.chatMessages) return;
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Render user message
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = message;
        this.chatMessages.appendChild(userMsg);
        this.chatInput.value = '';
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;

        // Contextual AI response simulation
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot';

            const lower = message.toLowerCase();
            let reply = "Thanks for asking! We specialize in production-grade web & SaaS platforms, enterprise private AI/RAG systems, autonomous agent workflows, and proprietary software products. Feel free to use the contact form below or reach out directly at ilikaris.tech@gmail.com.";

            for (const item of this.knowledgeBase) {
                if (item.keywords.some(k => lower.includes(k))) {
                    reply = item.reply;
                    break;
                }
            }

            botMsg.textContent = reply;
            this.chatMessages.appendChild(botMsg);
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 600);
    }
}

/**
 * Class 8: ScrollRevealManager
 * Staggers element reveals using IntersectionObserver.
 */
class ScrollRevealManager {
    constructor() {
        this.selector = '.service-card, .portfolio-card, .pricing-card, .stat-card, .value-card, .testimonial-card, .comparison-card, .country-flag-item';
        this.init();
    }

    init() {
        const elements = document.querySelectorAll(this.selector);
        if (!elements.length) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(25px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            revealObserver.observe(el);
        });
    }
}

/**
 * Class 9: GdprConsentManager
 * Controls GDPR cookie consent banner display and choices.
 */
class GdprConsentManager {
    constructor() {
        this.banner = document.getElementById('gdprBanner');
        this.storageKey = 'gdpr_consent';
        this.init();
    }

    init() {
        if (!this.banner) return;
        try {
            const consent = localStorage.getItem(this.storageKey);
            if (!consent) {
                setTimeout(() => {
                    if (this.banner) this.banner.style.display = 'flex';
                }, 1500);
            } else {
                this.banner.classList.add('hidden');
                this.banner.style.display = 'flex';
            }
        } catch (e) {
            // LocalStorage not accessible
        }
    }

    dismiss(choice) {
        if (!this.banner) return;
        this.banner.classList.add('hidden');
        try {
            localStorage.setItem(this.storageKey, choice);
        } catch (e) { }
    }
}


/**
 * Class 11: ContactFormManager
 * Manages form submission, spam filtering, data validation, reliable multi-channel dispatch,
 * offline/fallback local storage, and real-time client feedback.
 */
class ContactFormManager {
    constructor(toastNotifier) {
        this.form = document.getElementById('contactForm');
        this.toast = toastNotifier;

        // Supported Endpoints:
        // 1. Web3Forms: Free tier sends leads directly to ilikaris.tech@gmail.com without backend server.
        //    (Paste your access key below if you have one, or get one at https://web3forms.com)
        this.web3formsAccessKey = '';

        // 2. Direct Recipient & Fallback Email
        this.recipientEmail = 'ilikaris.tech@gmail.com';

        // 3. Supabase REST API (if self-hosted or using Supabase table 'inquiries')
        this.supabaseUrl = 'YOUR_SUPABASE_URL';
        this.supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Anti-Spam Honeypot check: If bots fill this invisible field, silently trap and discard
            const honeypot = document.getElementById('contactSecurityCheck');
            if (honeypot && honeypot.value.trim() !== '') {
                this.toast.show('Inquiry submitted successfully! Our team will reach out within 24 hours.', 'success');
                this.form.reset();
                return;
            }

            // Input fields & sanitation
            const name = document.getElementById('name')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const country = document.getElementById('country')?.value || '';
            const budget = document.getElementById('budget')?.value || '';
            const service = document.getElementById('service')?.value || '';
            const timeline = document.getElementById('timeline')?.value || '';
            const message = document.getElementById('message')?.value.trim() || '';

            // Robust client-side validation
            if (name.length < 2) {
                this.toast.show('Please provide your name (minimum 2 characters).', 'warning');
                document.getElementById('name')?.focus();
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!emailRegex.test(email)) {
                this.toast.show('Please provide a valid work email address.', 'warning');
                document.getElementById('email')?.focus();
                return;
            }

            if (!country) {
                this.toast.show('Please select your country or region.', 'warning');
                document.getElementById('country')?.focus();
                return;
            }

            if (!service) {
                this.toast.show('Please select the service category needed.', 'warning');
                document.getElementById('service')?.focus();
                return;
            }

            if (message.length < 10) {
                this.toast.show('Please provide a brief overview of your project requirements (at least 10 characters).', 'warning');
                document.getElementById('message')?.focus();
                return;
            }

            const submitBtn = this.form.querySelector('.submit-btn');
            const originalBtnHtml = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting Inquiry...';
            submitBtn.disabled = true;

            const formData = {
                name,
                email,
                country,
                budget,
                service,
                timeline,
                message,
                submitted_at: new Date().toISOString(),
                source: window.location.href
            };

            // Safety net: Save lead to browser localStorage so it is NEVER lost
            this.backupInquiryLocally(formData);

            const result = await this.dispatchInquiry(formData);

            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.disabled = false;

            if (result.success) {
                this.toast.show(`Thank you ${name}! Your inquiry has been transmitted to ${this.recipientEmail}. Our team will reply within 24 hours.`, 'success', 6000);
                this.form.reset();
            } else if (result.fallbackMailto) {
                this.toast.show(`Drafting direct email to ${this.recipientEmail}... Please click Send in your email client.`, 'success', 6500);
                window.location.href = result.fallbackMailto;
                this.form.reset();
            } else {
                const mailtoUrl = this.generateMailtoUrl(formData);
                this.toast.show(`Connecting directly to ${this.recipientEmail}...`, 'warning', 6000);
                window.location.href = mailtoUrl;
            }
        });
    }

    backupInquiryLocally(formData) {
        try {
            const existing = JSON.parse(localStorage.getItem('ilikaris_inquiries_backup') || '[]');
            existing.push(formData);
            localStorage.setItem('ilikaris_inquiries_backup', JSON.stringify(existing));
        } catch (e) { }
    }

    generateMailtoUrl(formData) {
        const subject = encodeURIComponent(`Project Inquiry: ${formData.name} [${formData.service}]`);
        const body = encodeURIComponent(
            `Hi Sourabh,\n\nI would like to discuss a project with iLikaris.\n\n` +
            `• Client Name: ${formData.name}\n` +
            `• Work Email: ${formData.email}\n` +
            `• Country/Region: ${formData.country}\n` +
            `• Budget: ${formData.budget || 'Not specified'}\n` +
            `• Service Needed: ${formData.service}\n` +
            `• Target Timeline: ${formData.timeline || 'Flexible'}\n\n` +
            `Project Overview & Requirements:\n${formData.message}\n\n` +
            `---\nTransmitted from iLikaris Website`
        );
        return `mailto:${this.recipientEmail}?subject=${subject}&body=${body}`;
    }

    async dispatchInquiry(formData) {
        // Priority 1: Web3Forms (if key provided)
        if (this.web3formsAccessKey && this.web3formsAccessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
            try {
                const res = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        access_key: this.web3formsAccessKey,
                        subject: `New Project Inquiry from ${formData.name}`,
                        from_name: 'iLikaris Website',
                        to_email: this.recipientEmail,
                        ...formData
                    })
                });
                const data = await res.json();
                if (data.success) {
                    return { success: true };
                }
            } catch (e) { }
        }

        // Priority 2: Supabase (if configured)
        if (this.supabaseUrl && this.supabaseUrl !== 'YOUR_SUPABASE_URL') {
            try {
                const res = await fetch(`${this.supabaseUrl}/rest/v1/inquiries`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': this.supabaseAnonKey,
                        'Authorization': `Bearer ${this.supabaseAnonKey}`,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify(formData)
                });
                if (res.ok) {
                    return { success: true };
                }
            } catch (e) { }
        }

        // Priority 3: Fallback direct mailto dispatch (guarantees zero message loss)
        const mailto = this.generateMailtoUrl(formData);
        return { success: false, fallbackMailto: mailto };
    }
}

/**
 * Class 12: HeroDemoSwitcher
 * Manages the live interactive demo switcher tabs in the Hero section.
 */
class HeroDemoSwitcher {
    constructor() {
        this.demoData = {
            analytics: {
                img: "assets/saas-analytics-platform.webp",
                url: "https://app.ilikaris.tech/saas-analytics-dashboard"
            },
            rag: {
                img: "assets/private-rag-ai-assistant.webp",
                url: "https://app.ilikaris.tech/private-rag-vector-search"
            },
            sales: {
                img: "assets/ecommerce-ai-sales-agent.webp",
                url: "https://app.ilikaris.tech/ecommerce-ai-sales-agent"
            }
        };

        this.imgEl = document.getElementById('heroDemoImage');
        this.urlEl = document.getElementById('heroDemoUrl');
    }

    switchDemo(type, btn) {
        const data = this.demoData[type];
        if (!data) return;

        document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
        if (btn) btn.classList.add('active');

        if (this.imgEl) {
            this.imgEl.style.opacity = '0';
            setTimeout(() => {
                this.imgEl.src = data.img;
                this.imgEl.style.opacity = '1';
            }, 200);
        }
        if (this.urlEl) {
            this.urlEl.textContent = data.url;
        }
    }
}

/**
 * Class 13: PortfolioLightbox
 * Manages high-res image modal preview and metadata inspection.
 */
class PortfolioLightbox {
    constructor() {
        this.modal = document.getElementById('lightboxModal');
        this.img = document.getElementById('lightboxImg');
        this.titleEl = document.getElementById('lightboxTitle');
        this.descEl = document.getElementById('lightboxDesc');
        this.tagsEl = document.getElementById('lightboxTags');

        this.init();
    }

    init() {
        // Support Escape key to close modal
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    open(imgSrc, title, desc, tags) {
        if (this.img) this.img.src = imgSrc;
        if (this.titleEl) this.titleEl.textContent = title;
        if (this.descEl) this.descEl.textContent = desc;
        if (this.tagsEl && tags) {
            this.tagsEl.innerHTML = tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('');
        }
        if (this.modal) this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (this.modal) this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Class 14: WorldMapFilter
 * Filters map location pins and network flight trajectory arcs by region.
 */
class WorldMapFilter {
    filter(region, btn) {
        document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');

        const pins = document.querySelectorAll('.location-pin');
        const arcs = document.querySelectorAll('.network-arc');

        pins.forEach(pin => {
            const pinRegion = pin.getAttribute('data-region') || '';
            if (region === 'all' || pinRegion.includes(region) || pinRegion === 'all') {
                pin.style.opacity = '1';
                pin.style.pointerEvents = 'auto';
                pin.style.transform = 'translate(-50%, -50%) scale(1)';
            } else {
                pin.style.opacity = '0.2';
                pin.style.pointerEvents = 'none';
                pin.style.transform = 'translate(-50%, -50%) scale(0.85)';
            }
        });

        arcs.forEach(arc => {
            const arcRegion = arc.getAttribute('data-region') || '';
            if (region === 'all' || arcRegion.includes(region)) {
                arc.style.opacity = arc.classList.contains('primary') ? '0.85' : '0.65';
            } else {
                arc.style.opacity = '0.1';
            }
        });
    }
}

/**
 * ====================================================================
 * Master Application Controller & Global Public API
 * ====================================================================
 */
class Application {
    constructor() {
        this.navigation = new NavigationManager();
        this.particles = new ParticlesManager();
        this.counterAnimator = new CounterAnimator();
        this.techStackFilter = new TechStackFilter();
        this.faqAccordion = new FaqAccordion();
        this.toast = new ToastNotifier();
        this.chatbot = new ChatbotWidget();
        this.scrollReveal = new ScrollRevealManager();
        this.gdpr = new GdprConsentManager();
        this.contactForm = new ContactFormManager(this.toast);
        this.heroDemo = new HeroDemoSwitcher();
        this.lightbox = new PortfolioLightbox();
        this.worldMap = new WorldMapFilter();
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.App = new Application();
});

// Backward-compatible global helper bridges for existing inline onclick handlers
window.toggleMobileMenu = () => window.App?.navigation.toggleMobileMenu();
window.closeMobileMenu = () => window.App?.navigation.closeMobileMenu();
window.toggleChat = () => window.App?.chatbot.toggle();
window.quickAsk = (q) => window.App?.chatbot.quickAsk(q);
window.sendMessage = () => window.App?.chatbot.sendMessage();
window.showToast = (msg) => window.App?.toast.show(msg);
window.dismissGdpr = (c) => window.App?.gdpr.dismiss(c);
window.switchHeroDemo = (type, btn) => window.App?.heroDemo.switchDemo(type, btn);
window.openLightbox = (src, title, desc, tags) => window.App?.lightbox.open(src, title, desc, tags);
window.closeLightbox = () => window.App?.lightbox.close();
window.filterMapRegion = (reg, btn) => window.App?.worldMap.filter(reg, btn);
window.closeGeoBar = () => {};
window.prefillContactProduct = (productName) => {
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
            if (serviceSelect.options[i].value.includes('ai') || serviceSelect.options[i].value.includes('saas') || serviceSelect.options[i].value.includes('web')) {
                serviceSelect.selectedIndex = i;
                break;
            }
        }
    }
    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.value = `Hi iLikaris team,\n\nI am interested in early access / beta details regarding ${productName}.\n\nOur company context and use case: `;
        messageField.focus();
    }
};
