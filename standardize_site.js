const fs = require('fs');
const path = require('path');

const NEW_ADDRESS_SCHEMA = "1st Floor, Malkhare Classic, Shop No. 6, Near Jawahar Nagar Road, Garkheda Area";
const NEW_LOCALITY = "Chhatrapati Sambhajinagar";
const NEW_LAT = "19.865421";
const NEW_LON = "75.337324";
const NEW_IFRAME_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.41708892419!2d75.34430867522502!3d19.865354181507727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba37afb1b7c5b%3A0x4fc6c967c53e8117!2sVedisha%20Marketing!5e0!3m2!1sen!2sin!4v1714845598686!5m2!1sen!2sin";

const GROWTH_NARRATIVE = `
  <!-- The Marathwada Growth Narrative -->
  <section class="max-w-5xl mx-auto px-4 py-16 border-t border-slate-100 text-center">
    <div class="mb-12">
      <h2 class="text-3xl font-bold text-slate-900 mb-4">Driving Growth in Marathwada</h2>
      <p class="text-slate-600 max-w-2xl mx-auto font-medium">From Waluj Industrial Hub to the residential centers of Garkheda and CIDCO, we help local brands dominate search results.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      <div class="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <h4 class="font-bold text-slate-900 mb-3 text-lg">Local Trust</h4>
        <p class="text-sm text-slate-500 leading-relaxed">Deep understanding of Chhatrapati Sambhajinagar's consumer behavior and regional search intent.</p>
      </div>
      <div class="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <h4 class="font-bold text-slate-900 mb-3 text-lg">Verified Presence</h4>
        <p class="text-sm text-slate-500 leading-relaxed">Verified GMB Profile with a direct review loop for maximum local authority and trust.</p>
      </div>
      <div class="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <h4 class="font-bold text-slate-900 mb-3 text-lg">MIDC Expertise</h4>
        <p class="text-sm text-slate-500 leading-relaxed">Specialized industrial lead generation systems for units in Waluj and Shendra MIDC.</p>
      </div>
    </div>
  </section>
`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Update Schema
    content = content.replace(/"streetAddress":\s*"[^"]*"/g, `"streetAddress": "${NEW_ADDRESS_SCHEMA}"`);
    content = content.replace(/"addressLocality":\s*"[^"]*"/g, `"addressLocality": "${NEW_LOCALITY}"`);
    content = content.replace(/"latitude":\s*"[^"]*"/g, `"latitude": "${NEW_LAT}"`);
    content = content.replace(/"longitude":\s*"[^"]*"/g, `"longitude": "${NEW_LON}"`);

    // 2. Update Iframes
    content = content.replace(/src="https:\/\/maps\.google\.com\/maps\?q=[^"]+"/g, `src="${NEW_IFRAME_SRC}"`);
    content = content.replace(/src="https:\/\/www\.google\.com\/maps\/embed\?pb=[^"]+"/g, `src="${NEW_IFRAME_SRC}"`);

    // 3. Update hardcoded address strings (common in sub-pages)
    content = content.replace(/Shop No\. 6, Malkhare Classic, 1st Floor, Near Jawahar Nagar Police Station, Garkheda Area, Chhatrapati Sambhaji Nagar, MH 431009/g, "1st Floor, Malkhare Classic, Shop No. 6, Near Jawahar Nagar Road, Garkheda Area, Chhatrapati Sambhajinagar, Maharashtra 431009");
    content = content.replace(/Chhatrapati Sambhaji Nagar/g, "Chhatrapati Sambhajinagar");

    // 4. Inject Growth Narrative
    if (!content.includes("The Marathwada Growth Narrative") && !file.includes("index.html") && !file.includes("privacy") && !file.includes("terms") && !file.includes("404")) {
        if (content.includes("</main>")) {
            content = content.replace("</main>", GROWTH_NARRATIVE + "\n</main>");
        } else if (content.includes("<!-- Global Footer -->")) {
            content = content.replace("<!-- Global Footer -->", GROWTH_NARRATIVE + "\n<!-- Global Footer -->");
        }
    }

    fs.writeFileSync(file, content);
    console.log(`Updated: ${file}`);
});

console.log("All files updated successfully.");
