const fs = require('fs');

const sitemapPath = "sitemap.xml";
let sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
const urls = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

const filesToProcess = [];
for (const url of urls) {
    let filename = url.split("/").pop();
    if (!filename) filename = "index.html";
    if (fs.existsSync(filename)) {
        filesToProcess.push(filename);
    }
}

function getCategory(filename) {
    if (["index.html", "work.html", "contact.html", "about.html", "careers.html", "faq.html", "clients.html", "portfolio.html", "case-studies.html"].includes(filename)) return "Company";
    if (filename.includes("waluj")) return "Waluj MIDC";
    if (filename.includes("shendra")) return "Shendra MIDC";
    if (filename.includes("cidco")) return "CIDCO";
    if (filename.includes("chikalthana")) return "Chikalthana";
    return "Services";
}

const categories = {};
for (const f of filesToProcess) {
    const cat = getCategory(f);
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(f);
}

function makeTitle(filename) {
    if (filename === "index.html") return "Home";
    return filename.replace(".html", "").replace(/-/g, " ").replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

// Write the new global.css for our custom AEO snippets and Header mega-menu
const globalCss = `
/* Custom AEO & Header Styles */
.aeo-snippet {
    background: linear-gradient(to right, #f0fdfa, #eff6ff);
    border-left: 4px solid #0d9488;
    padding: 1.5rem;
    border-radius: 0 12px 12px 0;
    margin: 2rem auto;
    max-width: 800px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.aeo-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #0d9488;
    font-weight: 800;
    margin-bottom: 0.5rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    letter-spacing: 0.05em;
    background: white;
    padding: 0.25rem 0.75rem;
    border-radius: 99px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
.aeo-text {
    font-size: 1.1rem;
    color: #1e293b;
    font-weight: 500;
    line-height: 1.6;
    margin-top: 0.5rem;
}
/* Mega Menu overrides */
.group:hover .mega-menu {
    display: flex !important;
}
`;
fs.writeFileSync('css/global.css', globalCss);
fs.writeFileSync('css/global.min.css', globalCss);

// Mega Menu HTML for header
const cats = Object.keys(categories);
let desktopNavLinks = `
<a href="index.html" class="text-slate-600 font-semibold hover:text-blue-600 transition">Home</a>
<div class="relative group">
    <button class="text-slate-600 font-semibold hover:text-blue-600 transition inline-flex items-center gap-1">Expertise <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
    <div class="mega-menu hidden absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white shadow-2xl border border-slate-100 rounded-2xl p-6 w-[800px] grid-cols-3 gap-6">
`;
for (const cat of cats) {
    if (cat === "Company") continue;
    desktopNavLinks += `<div><h4 class="text-xs font-bold uppercase tracking-wider text-teal-600 mb-3 border-b border-slate-100 pb-2">${cat}</h4><ul class="space-y-2">`;
    for (const file of categories[cat]) {
        desktopNavLinks += `<li><a href="${file}" class="text-sm text-slate-600 hover:text-blue-600 transition block py-1">${makeTitle(file)}</a></li>`;
    }
    desktopNavLinks += `</ul></div>`;
}
desktopNavLinks += `</div></div>`;
desktopNavLinks += `<a href="contact.html" class="text-slate-600 font-semibold hover:text-blue-600 transition">Contact</a>`;

let mobileNavLinks = `<a href="index.html" class="block py-3 px-4 font-semibold text-slate-600">Home</a>`;
for (const [cat, files] of Object.entries(categories)) {
    if (cat === "Company") continue;
    mobileNavLinks += `<div class="py-2 px-4 text-xs font-bold uppercase text-teal-600 bg-slate-50">${cat}</div>`;
    for (const file of files) {
        mobileNavLinks += `<a href="${file}" class="block py-2 px-6 text-sm text-slate-600">${makeTitle(file)}</a>`;
    }
}

const headerJs = `
(() => {
  'use strict';
  let existingHeader = document.querySelector('.site-header');
  if (existingHeader) return;

  const newHeader = document.createElement('header');
  newHeader.className = 'site-header fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200 transition-all';
  newHeader.innerHTML = \`
    <a class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 z-[100]" href="#main-content">Skip to content</a>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
      <a class="flex items-center gap-3 text-slate-900 font-extrabold text-2xl tracking-tight" href="index.html" aria-label="Vedisha Marketing Home">
        <span class="bg-gradient-to-br from-teal-400 to-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-md" aria-hidden="true">V</span>
        <span>Vedisha</span>
      </a>
      <button class="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none" type="button" aria-expanded="false" aria-controls="mobile-nav" id="nav-toggle">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <nav class="hidden md:flex items-center gap-8" aria-label="Primary navigation">
        ${desktopNavLinks}
        <a class="ml-4 inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-teal-500 rounded-full hover:from-blue-700 hover:to-teal-600 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5" href="contact.html">Get Free Audit</a>
      </nav>
    </div>
    <!-- Mobile Menu Overlay -->
    <div id="mobile-nav" class="hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-2xl flex-col max-h-[80vh] overflow-y-auto">
        ${mobileNavLinks}
        <div class="p-4 bg-slate-50 border-t border-slate-100">
            <a class="block w-full text-center px-6 py-3 font-bold text-white bg-blue-600 rounded-xl shadow-sm" href="contact.html">Get Free Audit</a>
        </div>
    </div>
  \`;

  document.body.insertAdjacentElement('afterbegin', newHeader);
  
  const toggle = newHeader.querySelector('#nav-toggle');
  const nav = newHeader.querySelector('#mobile-nav');
  if (toggle && nav) {
      toggle.addEventListener('click', () => {
          nav.classList.toggle('hidden');
          nav.classList.toggle('flex');
          toggle.setAttribute('aria-expanded', nav.classList.contains('flex'));
      });
  }
})();
`;
fs.writeFileSync('js/header.js', headerJs);
fs.writeFileSync('js/header.min.js', headerJs);

let footerLinksHtml = "";
for (const [cat, files] of Object.entries(categories)) {
    footerLinksHtml += `<div><h4 class="text-white font-bold mb-4 uppercase tracking-wider text-sm border-b border-slate-700 pb-2 inline-block">${cat}</h4><ul class="space-y-2">`;
    for (let i = 0; i < Math.min(files.length, 6); i++) {
        footerLinksHtml += `<li><a href="${files[i]}" class="text-slate-400 hover:text-teal-400 transition text-sm">${makeTitle(files[i])}</a></li>`;
    }
    if (files.length > 6) footerLinksHtml += `<li><a href="${files[6]}" class="text-slate-400 hover:text-teal-400 transition text-sm italic">...View more</a></li>`;
    footerLinksHtml += `</ul></div>`;
}

const footerJs = `
(() => {
  'use strict';
  if (document.querySelector('.site-footer')) return;

  const currentYear = new Date().getFullYear();
  const newFooter = document.createElement('footer');
  newFooter.className = 'site-footer bg-slate-900 pt-20 pb-10 mt-20';
  newFooter.innerHTML = \`
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div class="lg:col-span-2" itemscope itemtype="https://schema.org/Organization">
                <meta itemprop="name" content="Vedisha Marketing">
                <meta itemprop="url" content="https://vedishamarketing.in">
                <a class="flex items-center gap-3 text-white font-extrabold text-2xl tracking-tight mb-6" href="index.html">
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
                    <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white transition"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                    <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white transition"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                </div>
            </div>
            ${footerLinksHtml}
        </div>
        <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>&copy; \${currentYear} Vedisha Marketing. All rights reserved.</p>
            <div class="flex gap-6">
                <a href="privacy-policy.html" class="hover:text-teal-400 transition">Privacy Policy</a>
                <a href="terms-of-service.html" class="hover:text-teal-400 transition">Terms of Service</a>
            </div>
        </div>
    </div>
  \`;
  document.body.insertAdjacentElement('beforeend', newFooter);
})();
`;
fs.writeFileSync('js/footer.js', footerJs);
fs.writeFileSync('js/footer.min.js', footerJs);


for (const filename of filesToProcess) {
    try {
        let html = fs.readFileSync(filename, "utf-8");
        
        let titleText = makeTitle(filename);
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        if (titleMatch) titleText = titleMatch[1].split("|")[0].trim();

        // Find the first paragraph content for AEO snippet and Meta Description
        let firstP = titleText + " services by Vedisha Marketing in Chhatrapati Sambhajinagar. Contact us for ROI-driven strategies tailored for your business.";
        const pRegex = new RegExp("<p[^>]*>([\\\\s\\\\S]*?)<\\\\/p>", "ig");
        const pMatches = [...html.matchAll(pRegex)];
        for (const m of pMatches) {
            let cleanP = m[1].replace(/<[^>]+>/g, '').trim();
            if (cleanP.length > 60) {
                firstP = cleanP;
                break;
            }
        }

        const metaDesc = firstP.substring(0, 155).replace(/"/g, '&quot;').replace(/\\n/g, ' ').trim() + "...";

        // Inject Schema JSON-LD before </head> if not exists
        if (!html.includes('application/ld+json')) {
            const schema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": "https://vedishamarketing.in/#organization",
          "name": "Vedisha Marketing",
          "url": "https://vedishamarketing.in",
          "logo": "https://vedishamarketing.in/images/office-studio.webp",
          "description": "${metaDesc}",
          "telephone": "+91-9049317078",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1st Floor, Malkhare Classic, Shop No. 6, Near Jawahar Nagar Road, Garkheda Area",
            "addressLocality": "Chhatrapati Sambhajinagar",
            "addressRegion": "Maharashtra",
            "postalCode": "431009",
            "addressCountry": "IN"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vedishamarketing.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "${titleText.replace(/"/g, '&quot;')}",
              "item": "https://vedishamarketing.in/${filename}"
            }
          ]
        }
      ]
    }
    </script>
</head>`;
            html = html.replace(/<\/head>/i, schema);
        }

        // Add AEO Snippet after the first H1
        const aeoHtml = `
    <div class="aeo-snippet">
        <span class="aeo-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Quick Answer
        </span>
        <p class="aeo-text">${firstP.substring(0, 300)}${firstP.length > 300 ? '...' : ''}</p>
    </div>`;
        
        if (!html.includes('aeo-snippet')) {
            html = html.replace(/(<h1[^>]*>[\s\S]*?<\/h1>)/i, `$1\n${aeoHtml}`);
        }

        // Ensure main wrap exists (for skip-to-content logic)
        if (!html.includes('<main') && html.includes('<body')) {
            html = html.replace(/<body([^>]*)>/i, '<body$1>\n<main id="main-content">');
            html = html.replace(/<\/body>/i, '</main>\n</body>');
        } else if (html.includes('<main')) {
            html = html.replace(/<main([^>]*)>/i, '<main id="main-content" $1>');
        }

        // Fix images lazy loading
        html = html.replace(/<img(.*?)(?:loading="[^"]*")?(.*?)>/gi, '<img$1 loading="lazy"$2>');

        fs.writeFileSync(filename, html, "utf-8");
        console.log("Processed " + filename);
    } catch (e) {
        console.error("Failed " + filename + ": " + e);
    }
}

const today = new Date().toISOString().split('T')[0];
const sitemapContentUpdated = sitemapContent.replace(/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
fs.writeFileSync("sitemap.xml", sitemapContentUpdated, "utf-8");

console.log("Site update complete.");
