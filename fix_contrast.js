const fs = require('fs');
const path = require('path');

const dirPath = 'd:\\vedisha marketing projects\\vedisha_marketing';

const files = fs.readdirSync(dirPath);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // text-teal-600 -> text-teal-700
        if (content.includes('text-teal-600')) {
            content = content.replace(/text-teal-600/g, 'text-teal-700');
            modified = true;
        }

        // text-teal-500 -> text-teal-700
        if (content.includes('text-teal-500')) {
            content = content.replace(/text-teal-500/g, 'text-teal-700');
            modified = true;
        }

        // Fix opacity-80 in the specific div
        const oldOpacityClass = 'class="text-sm font-semibold opacity-80';
        const newOpacityClass = 'class="text-sm font-semibold text-slate-700';
        if (content.includes(oldOpacityClass)) {
            content = content.replace(new RegExp(oldOpacityClass, 'g'), newOpacityClass);
            modified = true;
        }

        // Fix text-slate-400 for the Garkheda location tags which are on white background
        const oldLocationClass = 'class="mt-2 text-[10px] uppercase tracking-wider font-bold text-slate-400 flex flex-wrap gap-2"';
        const newLocationClass = 'class="mt-2 text-[10px] uppercase tracking-wider font-bold text-slate-600 flex flex-wrap gap-2"';
        if (content.includes(oldLocationClass)) {
            content = content.replace(new RegExp(oldLocationClass.replace(/\[/g, '\\[').replace(/\]/g, '\\]'), 'g'), newLocationClass);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated contrast in ${file}`);
        }
    }
});

console.log("Contrast fixes applied successfully.");
