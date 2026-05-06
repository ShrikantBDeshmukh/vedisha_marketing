const fs = require('fs');

function updateFile(filePath, titleMatch, titleReplace, descMatch, descReplace) {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }
    let lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    
    for (let i = 0; i < lines.length; i++) {
        // Meta tags
        if (lines[i].includes(titleMatch)) {
            lines[i] = titleReplace;
        }
        if (lines[i].includes(descMatch)) {
            lines[i] = descReplace;
        }
        
        // Narrative
        if (lines[i].includes('<h2 class="text-3xl font-bold text-slate-900 mb-4">Driving Growth in Marathwada</h2>')) {
            lines[i] = '      <h2 class="text-3xl font-bold text-slate-900 mb-4">Driving Digital Growth in Marathwada</h2>';
        }
        if (lines[i].includes('From Waluj Industrial Hub to the residential centers of Garkheda and CIDCO, we help local brands dominate search results.')) {
            lines[i] = '      <p class="text-slate-600 max-w-2xl mx-auto font-medium">From the Waluj Industrial Hub to the residential centers of Garkheda and CIDCO, we are the best digital marketing agency helping local brands dominate Google search results.</p>';
        }
    }
    
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`Updated ${filePath}`);
}

const basePath = 'd:\\vedisha marketing projects\\vedisha_marketing\\';

// Update About
updateFile(
    basePath + 'about.html',
    '<title>About Us | Digital Marketing Experts in Chhatrapati Sambhajinagar</title>',
    '  <title>About Us | Best Digital Marketing Agency in Chhatrapati Sambhajinagar</title>',
    '<meta name="description" content="Meet Vedisha Marketing, your outsourced growth engine in Chhatrapati Sambhajinagar. We provide transparent, ROI-focused digital marketing in Marathwada.">',
    '  <meta name="description" content="Meet Vedisha Marketing, the best digital marketing agency in Chhatrapati Sambhajinagar. We provide ROI-focused local SEO and digital marketing in Marathwada.">'
);

// Update Contact
updateFile(
    basePath + 'contact.html',
    '<title>Contact Us | Digital Marketing Agency in Chhatrapati Sambhajinagar</title>',
    '  <title>Contact Us | Top Digital Marketing Agency in Chhatrapati Sambhajinagar</title>',
    '<meta name="description" content="Ready to scale? Contact Vedisha Marketing, a senior-led digital marketing agency in Chhatrapati Sambhajinagar specializing in SEO, Ads, and ROI-driven growth.">',
    '  <meta name="description" content="Ready to scale? Contact Vedisha Marketing, the top-rated digital marketing agency in Chhatrapati Sambhajinagar specializing in local SEO, Ads, and ROI-driven growth.">'
);
