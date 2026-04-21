const fs = require('fs');

const file = 'ai-visibility-boost.html';
let code = fs.readFileSync(file, 'utf8');

// The Impact Section
code = code.replace(
  /<section class="page-section">\s*<span class="section-badge">The Impact<\/span>\s*<h2[^>]*>Strategic Outcomes<\/h2>\s*<div class="kpi-grid">[\s\S]*?<div class="glass-card">[\s\S]*?<div class="card-icon"[^>]*>([\s\S]*?)<\/div>\s*<strong>Cleaner Extraction<\/strong>\s*<p[^>]*>(.*?)<\/p>\s*<\/div>[\s\S]*?<div class="glass-card">[\s\S]*?<div class="card-icon"[^>]*>([\s\S]*?)<\/div>\s*<strong>Better Answers<\/strong>\s*<p[^>]*>(.*?)<\/p>\s*<\/div>[\s\S]*?<div class="glass-card">[\s\S]*?<div class="card-icon"[^>]*>([\s\S]*?)<\/div>\s*<strong>Crawler Directives<\/strong>\s*<p[^>]*>(.*?)<\/p>\s*<\/div>\s*<\/div>\s*<\/section>/,
  `    <section class="max-w-5xl mx-auto py-24">
      <span class="inline-block bg-teal-100 text-teal-700 font-bold px-3 py-1 text-xs uppercase tracking-widest rounded-full mb-4">The Impact</span>
      <h2 class="text-4xl font-extrabold text-slate-900 mb-12 tracking-tight">Strategic Outcomes</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition">
          <div class="text-teal-500 mb-6 flex items-center justify-center w-14 h-14 bg-teal-50 rounded-2xl">
            $1
          </div>
          <strong class="text-xl font-bold text-slate-900 block mb-3">Cleaner Extraction</strong>
          <p class="text-slate-600 leading-relaxed text-sm">$2</p>
        </div>
        <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition">
          <div class="text-teal-500 mb-6 flex items-center justify-center w-14 h-14 bg-teal-50 rounded-2xl">
            $3
          </div>
          <strong class="text-xl font-bold text-slate-900 block mb-3">Better Answers</strong>
          <p class="text-slate-600 leading-relaxed text-sm">$4</p>
        </div>
        <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition">
          <div class="text-teal-500 mb-6 flex items-center justify-center w-14 h-14 bg-teal-50 rounded-2xl">
            $5
          </div>
          <strong class="text-xl font-bold text-slate-900 block mb-3">Crawler Directives</strong>
          <p class="text-slate-600 leading-relaxed text-sm">$6</p>
        </div>
      </div>
    </section>`
);

// Table Section
code = code.replace(
  /<section class="page-section">\s*<span class="section-badge">The Evolution<\/span>\s*<h2[^>]*>SEO vs\. AEO: The Shift<\/h2>\s*<p[^>]*>In 2026, keywords aren't enough\. You need to be the definitive answer for AI models\.<\/p>\s*<div class="table-wrapper">\s*<table class="comp-table">[\s\S]*?<\/table>\s*<\/div>\s*<\/section>/,
  `    <section class="max-w-5xl mx-auto py-24 pb-32">
      <div class="mb-16 border-b border-slate-200 pb-8 text-center md:text-left">
        <span class="inline-block bg-indigo-100 text-indigo-700 font-bold px-3 py-1 text-xs uppercase tracking-widest rounded-full mb-4">The Evolution</span>
        <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">SEO vs. AEO: The Shift</h2>
        <p class="text-lg text-slate-600">In 2026, keywords aren't enough. You need to be the definitive answer for AI models.</p>
      </div>

      <div class="overflow-x-auto shadow-[0_0_40px_rgba(0,0,0,0.03)] rounded-2xl">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th class="py-6 px-6 font-bold text-slate-900 border-b border-slate-300 w-1/4">Feature</th>
              <th class="py-6 px-6 font-bold text-slate-900 border-b border-slate-300 bg-slate-50 w-3/8 text-center">Traditional SEO</th>
              <th class="py-6 px-6 font-bold text-slate-900 border-b border-slate-300 bg-indigo-50/50 w-3/8 text-center text-indigo-900">Answer Engine Optimization (AEO)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 border-b border-slate-100">
            <tr class="hover:bg-slate-50/50 transition">
              <td class="py-6 px-6 font-bold text-slate-900 border-r border-slate-100 text-sm md:text-base">Primary Target</td>
              <td class="py-6 px-6 text-slate-600 bg-slate-50/80 text-center text-sm md:text-base border-r border-white">Human Searchers (Google Search)</td>
              <td class="py-6 px-6 text-slate-800 font-medium bg-indigo-50/30 text-center text-sm md:text-base">AI Assistants & SGE (GPT, Claude, Perplexity)</td>
            </tr>
            <tr class="hover:bg-slate-50/50 transition">
              <td class="py-6 px-6 font-bold text-slate-900 border-r border-slate-100 text-sm md:text-base">Content Unit</td>
              <td class="py-6 px-6 text-slate-600 bg-slate-50/80 text-center text-sm md:text-base border-r border-white">Long-form blog posts</td>
              <td class="py-6 px-6 text-slate-800 font-medium bg-indigo-50/30 text-center text-sm md:text-base">Unambiguous FAQ snippets & Entity Maps</td>
            </tr>
            <tr class="hover:bg-slate-50/50 transition">
              <td class="py-6 px-6 font-bold text-slate-900 border-r border-slate-100 text-sm md:text-base">Technical Core</td>
              <td class="py-6 px-6 text-slate-600 bg-slate-50/80 text-center text-sm md:text-base border-r border-white">Backlinks & Keywords</td>
              <td class="py-6 px-6 text-slate-800 font-medium bg-indigo-50/30 text-center text-sm md:text-base">JSON-LD Schema & Crawler Directives</td>
            </tr>
            <tr class="hover:bg-slate-50/50 transition">
              <td class="py-6 px-6 font-bold text-slate-900 border-r border-slate-100 text-sm md:text-base">Winning Goal</td>
              <td class="py-6 px-6 text-slate-600 bg-slate-50/80 text-center text-sm md:text-base border-r border-white">Page 1 Blue Link</td>
              <td class="py-6 px-6 text-slate-800 font-medium bg-indigo-50/30 text-center text-sm md:text-base">The Single Featured Citation / Summary</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>`
);

// Bento Grid and CTA
code = code.replace(
  /<section class="page-section">\s*<span class="section-badge">Architecture<\/span>\s*<h2[^>]*>Technical Structure<\/h2>\s*<div class="bento-grid">[\s\S]*?<div class="glass-card">\s*<strong[^>]*>Schema Bundle \(JSON-LD\)<\/strong>\s*<p[^>]*>(.*?)<\/p>\s*<\/div>\s*<div class="glass-card">\s*<strong[^>]*>Direct-Answer FAQs<\/strong>\s*<p[^>]*>(.*?)<\/p>\s*<\/div>\s*<div class="glass-card">\s*<strong[^>]*>Local Consistency<\/strong>\s*<p[^>]*>(.*?)<\/p>\s*<\/div>\s*<div class="glass-card">\s*<strong[^>]*>Static Implementation<\/strong>\s*<p[^>]*>(.*?)<\/p>\s*<\/div>\s*<\/div>\s*<\/section>\s*<div class="cta-banner" [^>]*>\s*<h2[^>]*>.*?<\/h2>\s*<p[^>]*>.*?<\/p>\s*<a href="contact.html"[^>]*>.*?<\/a>\s*<\/div>/,
  `    <section class="max-w-5xl mx-auto py-24">
      <span class="inline-block bg-purple-100 text-purple-700 font-bold px-3 py-1 text-xs uppercase tracking-widest rounded-full mb-4">Architecture</span>
      <h2 class="text-4xl font-extrabold text-slate-900 mb-12 tracking-tight">Technical Structure</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <strong class="text-xl font-bold text-slate-900 block mb-3">Schema Bundle (JSON-LD)</strong>
          <p class="text-slate-600 leading-relaxed text-sm">$1</p>
        </div>
        <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <strong class="text-xl font-bold text-slate-900 block mb-3">Direct-Answer FAQs</strong>
          <p class="text-slate-600 leading-relaxed text-sm">$2</p>
        </div>
        <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <strong class="text-xl font-bold text-slate-900 block mb-3">Local Consistency</strong>
          <p class="text-slate-600 leading-relaxed text-sm">$3</p>
        </div>
        <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <strong class="text-xl font-bold text-slate-900 block mb-3">Static Implementation</strong>
          <p class="text-slate-600 leading-relaxed text-sm">$4</p>
        </div>
      </div>
    </section>

    <div class="max-w-4xl mx-auto my-24 p-12 bg-slate-900 text-white rounded-3xl text-center shadow-2xl relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-overlay"></div>
      <h2 class="text-3xl md:text-4xl font-extrabold mb-4 relative z-10">Ready to make your business easy to quote?</h2>
      <p class="text-slate-300 mb-8 relative z-10 text-lg">Start an AEO setup that reduces ambiguity and improves your AI search presence.</p>
      <a href="contact.html" class="inline-flex items-center justify-center px-8 py-4 font-bold bg-white text-slate-900 rounded-lg hover:bg-slate-50 transition shadow-sm text-lg relative z-10 w-max">Get Your AEO Plan</a>
    </div>`
);


fs.writeFileSync(file, code, 'utf8');
console.log('Transformed second phase!');
