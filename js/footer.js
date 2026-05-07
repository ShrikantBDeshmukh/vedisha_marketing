(() => {
    'use strict';
    if (document.querySelector('.site-footer')) return;

    const currentYear = new Date().getFullYear();
    const newFooter = document.createElement('footer');
    newFooter.className = 'site-footer bg-slate-900 pt-20 pb-10 mt-20';
    newFooter.setAttribute('itemscope', '');
    newFooter.setAttribute('itemtype', 'https://schema.org/Organization');

    newFooter.innerHTML = `
    <meta itemprop="name" content="Vedisha Marketing">
    <meta itemprop="url" content="https://vedishamarketing.in">
    <meta itemprop="logo" content="https://vedishamarketing.in/images/logo.png">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <!-- Row 1: Brand (2 cols), Company (1 col), Services (1 col) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <!-- Brand -->
            <div class="lg:col-span-2">
                <a class="flex items-center gap-3 text-white font-extrabold text-2xl tracking-tight mb-6" href="index.html" aria-label="Vedisha Marketing Home">
                    <span class="bg-gradient-to-br from-teal-400 to-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-xl">V</span>
                    <span>Vedisha</span>
                </a>
                <p class="text-slate-400 mb-6 max-w-sm leading-relaxed text-sm">The leading digital growth engine in Chhatrapati Sambhajinagar. Driving measurable revenue through SEO, AEO, and performance marketing.</p>
                <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress" class="text-slate-400 text-sm mb-4">
                    <p itemprop="streetAddress">1st Floor, Malkhare Classic, Shop No. 6, Garkheda Area</p>
                    <p><span itemprop="addressLocality">Chhatrapati Sambhajinagar</span>, <span itemprop="addressRegion">Maharashtra</span> <span itemprop="postalCode">431009</span></p>
                </div>
                <a href="tel:+919049317078" itemprop="telephone" class="text-teal-400 font-bold text-lg hover:text-teal-300 transition">+91-9049317078</a>
                <div class="flex gap-4 mt-8">
                    <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white transition" aria-label="LinkedIn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white transition" aria-label="Instagram">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                </div>
            </div>
            <!-- Company -->
            <div>
                <h4 class="text-white font-bold mb-4 uppercase tracking-wider text-sm border-b border-slate-700 pb-2 inline-block">Company</h4>
                <ul class="space-y-2">
                    <li><a href="index.html" class="text-slate-400 hover:text-teal-400 transition text-sm">Home</a></li>
                    <li><a href="work.html" class="text-slate-400 hover:text-teal-400 transition text-sm">Our Work</a></li>
                    <li><a href="contact.html" class="text-slate-400 hover:text-teal-400 transition text-sm">Contact</a></li>
                    <li><a href="brand-identity-kit.html" class="text-slate-400 hover:text-teal-400 transition text-sm">Brand Kit</a></li>
                    <li><a href="privacy-policy.html" class="text-slate-400 hover:text-teal-400 transition text-sm">Privacy Policy</a></li>
                    <li><a href="terms-of-service.html" class="text-slate-400 hover:text-teal-400 transition text-sm">Terms of Service</a></li>
                </ul>
            </div>
            <!-- Services -->
            <div>
                <h4 class="text-white font-bold mb-4 uppercase tracking-wider text-sm border-b border-slate-700 pb-2 inline-block">Services</h4>
                <ul class="space-y-2">
                    <li><a href="services.html" class="text-slate-400 hover:text-teal-400 transition text-sm font-medium">All Services</a></li>
                    <li><a href="meta-google-ads-management.html" class="text-slate-400 hover:text-teal-400 transition text-sm">Meta & Google Ads</a></li>
                    <li><a href="static-website-seo-launch.html" class="text-slate-400 hover:text-teal-400 transition text-sm">Static Website SEO Launch</a></li>
                    <li><a href="ai-visibility-boost.html" class="text-slate-400 hover:text-teal-400 transition text-sm">AI Visibility Boost</a></li>
                    <li><a href="ai-content-structuring.html" class="text-slate-400 hover:text-teal-400 transition text-sm">AI Content Structuring</a></li>
                    <li><a href="marketing-strategy-roadmap.html" class="text-slate-400 hover:text-teal-400 transition text-sm">Marketing Strategy Roadmap</a></li>
                </ul>
            </div>
        </div>

        <!-- Row 2: Four Location Columns in One Row -->
        <div class="mb-12">
            <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm border-b border-slate-700 pb-2 inline-block">Locations</h4>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <!-- Waluj MIDC -->
                <div>
                    <h5 class="text-teal-300 font-semibold text-xs mb-2 uppercase tracking-wide">Waluj MIDC</h5>
                    <ul class="space-y-1">
                        <li><a href="industrial-seo-waluj-midc.html" class="text-slate-400 hover:text-teal-400 transition text-xs">Industrial SEO</a></li>
                        <li><a href="digital-marketing-in-waluj-midc.html" class="text-slate-400 hover:text-teal-400 transition text-xs">Digital Marketing</a></li>
                        <li><a href="web-development-in-waluj-midc.html" class="text-slate-400 hover:text-teal-400 transition text-xs">Web Development</a></li>
                        <li><a href="seo-services-in-waluj-midc.html" class="text-slate-400 hover:text-teal-400 transition text-xs">SEO Services</a></li>
                    </ul>
                </div>
                <!-- Shendra MIDC -->
                <div>
                    <h5 class="text-teal-300 font-semibold text-xs mb-2 uppercase tracking-wide">Shendra MIDC</h5>
                    <ul class="space-y-1">
                        <li><a href="b2b-lead-gen-shendra-midc.html" class="text-slate-400 hover:text-teal-400 transition text-xs">B2B Lead Gen</a></li>
                        <li><a href="digital-marketing-in-shendra-midc.html" class="text-slate-400 hover:text-teal-400 transition text-xs">Digital Marketing</a></li>
                        <li><a href="web-development-in-shendra-midc.html" class="text-slate-400 hover:text-teal-400 transition text-xs">Web Development</a></li>
                        <li><a href="seo-services-in-shendra-midc.html" class="text-slate-400 hover:text-teal-400 transition text-xs">SEO Services</a></li>
                    </ul>
                </div>
                <!-- CIDCO -->
                <div>
                    <h5 class="text-teal-300 font-semibold text-xs mb-2 uppercase tracking-wide">CIDCO</h5>
                    <ul class="space-y-1">
                        <li><a href="digital-marketing-in-cidco.html" class="text-slate-400 hover:text-teal-400 transition text-xs">Digital Marketing</a></li>
                        <li><a href="web-development-in-cidco.html" class="text-slate-400 hover:text-teal-400 transition text-xs">Web Development</a></li>
                        <li><a href="seo-services-in-cidco.html" class="text-slate-400 hover:text-teal-400 transition text-xs">SEO Services</a></li>
                    </ul>
                </div>
                <!-- Chikalthana -->
                <div>
                    <h5 class="text-teal-300 font-semibold text-xs mb-2 uppercase tracking-wide">Chikalthana</h5>
                    <ul class="space-y-1">
                        <li><a href="digital-marketing-in-chikalthana.html" class="text-slate-400 hover:text-teal-400 transition text-xs">Digital Marketing</a></li>
                        <li><a href="web-development-in-chikalthana.html" class="text-slate-400 hover:text-teal-400 transition text-xs">Web Development</a></li>
                        <li><a href="seo-services-in-chikalthana.html" class="text-slate-400 hover:text-teal-400 transition text-xs">SEO Services</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <label for="newsletter-email" class="sr-only">Email address</label>
                <input type="email" id="newsletter-email" placeholder="Get growth tips via email" class="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 w-64">
                <button class="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-2 rounded-lg text-sm transition">Subscribe</button>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 text-sm text-slate-500 items-start sm:items-center">
                <p>&copy; ${currentYear} Vedisha Marketing. All rights reserved.</p>
                <div class="flex gap-6">
                    <a href="privacy-policy.html" class="hover:text-teal-400 transition">Privacy Policy</a>
                    <a href="terms-of-service.html" class="hover:text-teal-400 transition">Terms of Service</a>
                </div>
            </div>
        </div>
    </div>
  `;
    document.body.insertAdjacentElement('beforeend', newFooter);
})();