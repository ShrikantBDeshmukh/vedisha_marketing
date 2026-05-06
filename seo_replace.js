const fs = require('fs');

const servicesFile = 'd:\\vedisha marketing projects\\vedisha_marketing\\services.html';
let lines = fs.readFileSync(servicesFile, 'utf8').split(/\r?\n/);

// Update Meta Title and Description
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<title>Digital Marketing Services in Chhatrapati Sambhajinagar | Vedisha</title>')) {
        lines[i] = '  <title>Best Digital Marketing Services in Chhatrapati Sambhajinagar | SEO & Ads</title>';
    }
    if (lines[i].includes('<meta name="description" content="Explore comprehensive digital marketing services')) {
        lines[i] = '  <meta name="description" content="Discover the best digital marketing services in Chhatrapati Sambhajinagar. Vedisha Marketing offers top-tier SEO, Google Ads, and Brand Strategy for the Marathwada region.">';
    }
    if (lines[i].includes('<h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">Direct Answers for')) {
        lines[i] = '    <h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">Best Digital Marketing Services in <span class="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">CSN.</span></h1>';
    }
    if (lines[i].includes('We provide diagnostic-led marketing services in Chhatrapati Sambhajinagar (formerly Aurangabad). No generic advice—only prescriptions that work.')) {
        lines[i] = '    <p class="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">We provide diagnostic-led marketing services across Chhatrapati Sambhajinagar and the entire Marathwada region. No generic advice—only proven local growth strategies.</p>';
    }
    if (lines[i].includes('<h2 class="text-3xl font-bold text-slate-900 mb-4">Driving Growth in Marathwada</h2>')) {
        lines[i] = '      <h2 class="text-3xl font-bold text-slate-900 mb-4">Driving Digital Growth in Marathwada</h2>';
    }
    if (lines[i].includes('From Waluj Industrial Hub to the residential centers of Garkheda and CIDCO, we help local brands dominate search results.')) {
        lines[i] = '      <p class="text-slate-600 max-w-2xl mx-auto font-medium">From the Waluj Industrial Hub to the residential centers of Garkheda and CIDCO, we are the best digital marketing agency helping local brands dominate Google search results.</p>';
    }
}

fs.writeFileSync(servicesFile, lines.join('\n'), 'utf8');
console.log('Update complete.');
