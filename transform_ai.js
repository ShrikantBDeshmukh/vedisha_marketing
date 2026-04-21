const fs = require('fs');

const file = 'ai-visibility-boost.html';
let code = fs.readFileSync(file, 'utf8');

// Chunk 1
code = code.replace(
  /<body class="page-aeo">[\s\S]*?<main class="page-wrap" id="main">[\s\S]*?<header class="page-hero">[\s\S]*?<div class="status-badge"[^>]*>AI Visibility Boost<\/div>[\s\S]*?<h1>How to Rank in <span class="gradient-text">AI Search<\/span> Results\?<\/h1>[\s\S]*?<p class="sub">([^<]+)<\/p>[\s\S]*?<div style="display:flex; gap:16px; flex-wrap:wrap;">[\s\S]*?<a href="contact.html" class="site-nav__cta" style="padding: 16px 40px;">Request AEO Strategy<\/a>/,
  '<body class="bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden pt-20">\n\n  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24" id="main">\n\n    <header class="max-w-4xl mx-auto pt-24 pb-16 text-center">\n      <span class="inline-block bg-blue-100 text-blue-700 font-bold px-3 py-1 text-xs uppercase tracking-widest rounded-full mb-6">AI Visibility Boost</span>\n      <h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">How to Rank in <span class="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">AI Search</span> Results?</h1>\n      <p class="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">$1</p>\n\n      <div class="flex justify-center gap-4 flex-wrap">\n        <a href="contact.html" class="inline-flex items-center justify-center px-8 py-4 font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm text-lg">Request AEO Strategy</a>'
);

// Chunk 2 (Direct Answer)
code = code.replace(
  /<\/div>\s*<\/header>\s*<section class="hero-direct-answer"[^>]*>[\s\S]*?<span class="status-badge"[^>]*>Direct Answer Narrative<\/span>[\s\S]*?<h1[^>]*>Why is your business <span class="gradient-text">invisible<\/span> to AI\?<\/h1>[\s\S]*?<div class="diagnostic-intro"[^>]*>[\s\S]*?<div class="glass-card"[^>]*>[\s\S]*?<strong[^>]*>The Problem<\/strong>[\s\S]*?<p>(.*?)<\/p>[\s\S]*?<\/div>[\s\S]*?<div class="glass-card"[^>]*>[\s\S]*?<strong[^>]*>The Prescription<\/strong>[\s\S]*?<p>(.*?)<\/p>[\s\S]*?<\/div>[\s\S]*?<\/div>\s*<\/section>\s*<div class="hero-media">\s*<img src="images\/professional-collaboration-pr.webp" alt="AI and Human Collaboration Strategy" [^>]*>\s*<\/div>/,
  `      </div>
    </header>

    <section class="py-24 text-center max-w-4xl mx-auto">
      <span class="inline-block bg-slate-200 text-slate-700 font-bold px-3 py-1 text-xs uppercase tracking-widest rounded-full mb-6">Direct Answer Narrative</span>
      <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-12 tracking-tight">Why is your business <span class="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">invisible</span> to AI?</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-16">
        <div class="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm border-l-4 border-l-red-500 hover:-translate-y-1 transition duration-300">
          <strong class="text-red-500 block mb-2 font-bold uppercase tracking-wide text-sm">The Problem</strong>
          <p class="text-slate-600 leading-relaxed text-sm">$1</p>
        </div>
        <div class="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm border-l-4 border-l-emerald-400 hover:-translate-y-1 transition duration-300">
          <strong class="text-emerald-500 block mb-2 font-bold uppercase tracking-wide text-sm">The Prescription</strong>
          <p class="text-slate-600 leading-relaxed text-sm">$2</p>
        </div>
      </div>
    </section>

    <div class="w-full max-w-5xl mx-auto my-12 rounded-3xl overflow-hidden shadow-xl">
      <img src="images/professional-collaboration-pr.webp" alt="AI and Human Collaboration Strategy" class="w-full object-cover">
    </div>`
);


fs.writeFileSync(file, code, 'utf8');
console.log('Transformed sections!');
