const fs = require('fs');
const path = require('path');

const dirPath = 'd:\\vedisha marketing projects\\vedisha_marketing';

// 1. Fix footer.js
const footerFile = path.join(dirPath, 'js', 'footer.js');
let footerJs = fs.readFileSync(footerFile, 'utf8');
if (!footerJs.includes('<h2 class="sr-only">Footer Navigation</h2>')) {
    footerJs = footerJs.replace(/<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16 pb-12 border-b border-slate-100">/, '<h2 class="sr-only">Footer Navigation</h2>\n      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16 pb-12 border-b border-slate-100">');
}
footerJs = footerJs.replace(/<h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-\[10px\]">/g, '<h3 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-[10px]">');
footerJs = footerJs.replace(/<h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">/g, '<h3 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">');
footerJs = footerJs.replace(/<\/h4>/g, '</h3>');
fs.writeFileSync(footerFile, footerJs, 'utf8');

// 2. Fix components.js
const componentsFile = path.join(dirPath, 'assets', 'js', 'components.js');
let componentsJs = fs.readFileSync(componentsFile, 'utf8');
if (!componentsJs.includes('<h2 class="sr-only">Footer Navigation</h2>')) {
    componentsJs = componentsJs.replace(/<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">/, '<h2 class="sr-only">Footer Navigation</h2>\n        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">');
}
componentsJs = componentsJs.replace(/<h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-\[10px\]">/g, '<h3 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-[10px]">');
componentsJs = componentsJs.replace(/<h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">/g, '<h3 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">');
componentsJs = componentsJs.replace(/<\/h4>/g, '</h3>');
fs.writeFileSync(componentsFile, componentsJs, 'utf8');

// 3. Fix index.html specific issues
const indexFile = path.join(dirPath, 'index.html');
let indexHtml = fs.readFileSync(indexFile, 'utf8');
indexHtml = indexHtml.replace(/<h4 class="font-bold text-slate-900">Our HQ Address<\/h4>/g, '<h3 class="font-bold text-slate-900">Our HQ Address</h3>');
indexHtml = indexHtml.replace(/<h4 class="font-bold text-slate-900">Verified GMB Presence<\/h4>/g, '<h3 class="font-bold text-slate-900">Verified GMB Presence</h3>');
fs.writeFileSync(indexFile, indexHtml, 'utf8');

console.log("Heading hierarchies fixed successfully.");
