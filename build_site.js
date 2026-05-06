const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const archiver = require('archiver');

const OUT_DIR = path.join(__dirname, 'dist');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}
if (!fs.existsSync(path.join(OUT_DIR, 'css'))) {
  fs.mkdirSync(path.join(OUT_DIR, 'css'), { recursive: true });
}
if (!fs.existsSync(path.join(OUT_DIR, 'js'))) {
  fs.mkdirSync(path.join(OUT_DIR, 'js'), { recursive: true });
}

// Read Sitemap
const sitemapContent = fs.readFileSync('sitemap.xml', 'utf8');
const locRegex = /<loc>(.*?)<\/loc>/g;
let match;
const urls = [];
while ((match = locRegex.exec(sitemapContent)) !== null) {
  urls.push(match[1]);
}

console.log(`Found ${urls.length} URLs in sitemap.`);

const pagesData = [];
for (const url of urls) {
  const parsedUrl = new URL(url);
  let localFile = parsedUrl.pathname.substring(1); // remove leading slash
  if (localFile === '') localFile = 'index.html';
  
  if (!fs.existsSync(localFile)) {
    console.warn(`File not found: ${localFile}`);
    continue;
  }
  
  const content = fs.readFileSync(localFile, 'utf8');
  const $ = cheerio.load(content);
  let title = $('title').text().trim();
  if (!title) title = $('h1').first().text().trim() || localFile;
  const desc = $('meta[name="description"]').attr('content') || '';
  
  // Extract main content
  let mainContent = '';
  if ($('main').length) {
    mainContent = $('main').html();
  } else {
    // Fallback: strip header, footer, nav, script
    const bodyObj = $('body').clone();
    bodyObj.find('header, footer, nav, script, style, link').remove();
    mainContent = bodyObj.html();
  }
  
  // Get H1
  const h1Text = $('h1').first().text().trim() || 'Welcome to Vedisha Marketing';

  pagesData.push({
    url: url,
    localFile: localFile,
    title: title,
    desc: desc,
    h1Text: h1Text,
    mainContent: mainContent,
    $: $
  });
}

const navItems = pagesData.map(p => {
    let t = p.title.split('|')[0].trim();
    if (t.includes('Best Digital Marketing Agency in')) t = 'Home';
    return { name: t, link: '/' + p.localFile, raw: p.localFile };
});

const corePages = navItems.filter(i => ['index.html', 'about.html', 'services.html', 'work.html', 'contact.html', 'blog.html', 'faq.html'].includes(i.raw));
const localPages = navItems.filter(i => i.raw.includes('-in-') || i.raw.includes('-midc'));
const servicePages = navItems.filter(i => !corePages.includes(i) && !localPages.includes(i));

const headerHtml = `
<header class="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-slate-200">
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md">Skip to content</a>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-20">
      <div class="flex-shrink-0 flex items-center">
        <a href="index.html" class="flex items-center gap-2">
          <svg class="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
          <span class="font-black text-2xl tracking-tighter text-slate-900">Vedisha<span class="text-indigo-600">Marketing</span></span>
        </a>
      </div>
      
      <nav class="hidden md:flex space-x-1 lg:space-x-4 items-center">
        ${corePages.map(p => `<a href="${p.link}" class="text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium text-sm transition-colors">${p.name}</a>`).join('')}
        
        <div class="relative group">
          <button class="flex items-center text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium text-sm transition-colors">
            Services
            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <div class="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
            <div class="max-h-[60vh] overflow-y-auto py-2">
              ${servicePages.map(p => `<a href="${p.link}" class="block px-4 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-700">${p.name}</a>`).join('')}
            </div>
          </div>
        </div>

        <div class="relative group">
          <button class="flex items-center text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium text-sm transition-colors">
            Locations
            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <div class="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
            <div class="max-h-[60vh] overflow-y-auto py-2">
              ${localPages.map(p => `<a href="${p.link}" class="block px-4 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-700">${p.name}</a>`).join('')}
            </div>
          </div>
        </div>

        <a href="contact.html" class="ml-4 inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">Get in Touch</a>
      </nav>

      <div class="flex items-center md:hidden">
        <button id="mobile-menu-btn" aria-label="Toggle menu" class="text-slate-500 hover:text-indigo-600 focus:outline-none p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path id="menu-icon-bars" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            <path id="menu-icon-close" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <div id="mobile-menu" class="md:hidden hidden bg-white border-t border-slate-100 max-h-[80vh] overflow-y-auto shadow-lg absolute w-full">
    <div class="px-4 pt-2 pb-6 space-y-1">
      ${corePages.map(p => `<a href="${p.link}" class="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50">${p.name}</a>`).join('')}
      <div class="mt-4 pt-4 border-t border-slate-100">
        <p class="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Services</p>
        ${servicePages.map(p => `<a href="${p.link}" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">${p.name}</a>`).join('')}
      </div>
      <div class="mt-4 pt-4 border-t border-slate-100">
        <p class="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Locations</p>
        ${localPages.map(p => `<a href="${p.link}" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">${p.name}</a>`).join('')}
      </div>
      <div class="mt-6">
        <a href="contact.html" class="block w-full text-center px-4 py-3 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700">Get in Touch</a>
      </div>
    </div>
  </div>
</header>
`;

const footerHtml = `
<footer class="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
      <div>
        <a href="index.html" class="flex items-center gap-2 mb-6">
          <svg class="w-8 h-8 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
          <span class="font-black text-2xl tracking-tighter text-white">Vedisha<span class="text-indigo-500">Marketing</span></span>
        </a>
        <p class="text-slate-400 text-sm leading-relaxed mb-6">The premier digital marketing agency in Chhatrapati Sambhajinagar, empowering local businesses in Marathwada to achieve predictable digital growth.</p>
        <div class="flex space-x-4">
          <a href="#" aria-label="LinkedIn" rel="noopener" class="text-slate-400 hover:text-white transition-colors"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          <a href="#" aria-label="Facebook" rel="noopener" class="text-slate-400 hover:text-white transition-colors"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg></a>
        </div>
      </div>
      <div>
        <h3 class="text-white font-bold text-lg mb-4">Quick Links</h3>
        <ul class="space-y-2 text-sm">
          ${corePages.map(p => `<li><a href="${p.link}" class="hover:text-indigo-400 transition-colors">${p.name}</a></li>`).join('')}
          <li><a href="/privacy-policy.html" class="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
          <li><a href="/terms-of-service.html" class="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-white font-bold text-lg mb-4">Core Services</h3>
        <ul class="space-y-2 text-sm">
          ${servicePages.slice(0, 7).map(p => `<li><a href="${p.link}" class="hover:text-indigo-400 transition-colors">${p.name}</a></li>`).join('')}
        </ul>
      </div>
      <div>
        <h3 class="text-white font-bold text-lg mb-4">Newsletter</h3>
        <p class="text-sm text-slate-400 mb-4">Get the latest insights on digital growth in Marathwada.</p>
        <form action="#" class="flex flex-col gap-2" onsubmit="event.preventDefault();">
          <input type="email" placeholder="Email address" required class="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 text-sm">
          <button type="submit" class="w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-indigo-900/50">Subscribe</button>
        </form>
        <div itemscope itemtype="https://schema.org/LocalBusiness" class="mt-6 text-sm text-slate-400">
          <p itemprop="name" class="font-bold text-white mb-1">Vedisha Marketing</p>
          <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
             <p itemprop="streetAddress">N2 CIDCO</p>
             <p><span itemprop="addressLocality">Chhatrapati Sambhajinagar</span>, <span itemprop="addressRegion">MH</span></p>
          </div>
          <p class="mt-2"><a href="tel:+918010898517" itemprop="telephone" class="hover:text-white transition-colors">+91 80108 98517</a></p>
          <p><a href="mailto:hello@vedishamarketing.in" itemprop="email" class="hover:text-white transition-colors">hello@vedishamarketing.in</a></p>
        </div>
      </div>
    </div>
    <div class="pt-8 border-t border-slate-800 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
      <p>&copy; <span id="current-year"></span> Vedisha Marketing. All rights reserved.</p>
      <p class="mt-2 md:mt-0">Designed for Marathwada.</p>
    </div>
  </div>
</footer>
`;

pagesData.forEach(page => {
  console.log(`Processing: ${page.localFile}`);
  
  const isLocalPage = page.localFile.includes('-in-') || page.localFile.includes('-midc');
  const schemaType = isLocalPage ? 'LocalBusiness' : 'Organization';
  const schema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": "Vedisha Marketing",
    "url": page.url,
    "logo": "https://vedishamarketing.in/images/office-studio.webp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "N2 CIDCO",
      "addressLocality": "Chhatrapati Sambhajinagar",
      "addressRegion": "MH",
      "addressCountry": "IN"
    },
    "telephone": "+918010898517",
    "sameAs": [
      "https://linkedin.com/company/vedishamarketing",
      "https://facebook.com/vedishamarketing"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://vedishamarketing.in/index.html"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": page.title.split('|')[0].trim(),
        "item": page.url
      }
    ]
  };

  const aeoText = `Vedisha Marketing provides expert services in ${page.h1Text}, specializing in helping local businesses in Chhatrapati Sambhajinagar and the Marathwada region grow their digital presence effectively and predictably.`;
  const aeoHtml = `<div id="answer-snippet" class="my-8 max-w-4xl mx-auto p-6 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
    <p class="text-indigo-900 font-medium text-lg leading-relaxed"><strong class="font-bold text-indigo-700">Quick Answer:</strong> ${aeoText}</p>
  </div>`;
  
  let $content = cheerio.load(`<div>${page.mainContent}</div>`);
  
  if ($content('h1').length > 0) {
    $content('h1').first().after(aeoHtml);
  } else {
    $content('div').first().prepend(aeoHtml);
  }

  $content('img').each((i, el) => {
    $content(el).attr('loading', 'lazy');
  });

  const processedContent = $content('div').first().html();

  const finalHtml = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.desc}">
  <link rel="canonical" href="${page.url}">
  <meta name="robots" content="index, follow">
  
  <!-- Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          }
        }
      }
    }
  </script>
  
  <!-- Custom Styles -->
  <link rel="stylesheet" href="css/custom.css">
  
  <!-- JSON-LD Schemas -->
  <script type="application/ld+json">
    ${JSON.stringify(schema, null, 2)}
  </script>
  <script type="application/ld+json">
    ${JSON.stringify(breadcrumbSchema, null, 2)}
  </script>
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["#answer-snippet"]
      }
    }
  </script>
</head>
<body class="bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden pt-20">
  
  ${headerHtml}

  <main id="main-content" class="min-h-screen">
    ${processedContent}
  </main>

  ${footerHtml}

  <!-- Scripts -->
  <script src="js/script.js"></script>
</body>
</html>`;

  const outPath = path.join(OUT_DIR, page.localFile);
  const dirPath = path.dirname(outPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(outPath, finalHtml, 'utf8');
});

fs.writeFileSync(path.join(OUT_DIR, 'css', 'custom.css'), `
/* Custom subtle branded touches */
.bg-clip-text {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
::selection {
  background-color: #818cf8;
  color: #ffffff;
}
`);

fs.writeFileSync(path.join(OUT_DIR, 'js', 'script.js'), `
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const iconBars = document.getElementById('menu-icon-bars');
  const iconClose = document.getElementById('menu-icon-close');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      iconBars.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
        if (menu && !menu.classList.contains('hidden')) {
          menu.classList.add('hidden');
          iconBars.classList.remove('hidden');
          iconClose.classList.add('hidden');
        }
      }
    });
  });
});
`);

let updatedSitemap = sitemapContent.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`);
fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), updatedSitemap);

const robotsContent = `User-agent: *
Allow: /

Sitemap: https://vedishamarketing.in/sitemap.xml
`;
fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), robotsContent);

console.log("Creating ZIP archive...");

const output = fs.createWriteStream('vedisha_marketing_export.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('Archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

archive.directory(OUT_DIR, false);

if (fs.existsSync('images')) {
    archive.directory('images', 'images');
}
if (fs.existsSync('assets')) {
    archive.directory('assets', 'assets');
}

archive.finalize();
