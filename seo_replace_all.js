const fs = require('fs');
const path = require('path');

const dirPath = 'd:\\vedisha marketing projects\\vedisha_marketing';

const oldHeader = '<h2 class="text-3xl font-bold text-slate-900 mb-4">Driving Growth in Marathwada</h2>';
const newHeader = '<h2 class="text-3xl font-bold text-slate-900 mb-4">Driving Digital Growth in Marathwada</h2>';

const oldP = 'From Waluj Industrial Hub to the residential centers of Garkheda and CIDCO, we help local brands dominate search results.';
const newP = 'From the Waluj Industrial Hub to the residential centers of Garkheda and CIDCO, we are the best digital marketing agency helping local brands dominate Google search results.';

const files = fs.readdirSync(dirPath);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        if (content.includes(oldHeader)) {
            content = content.replace(oldHeader, newHeader);
            modified = true;
        }

        if (content.includes(oldP)) {
            content = content.replace(oldP, newP);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
});
console.log("All HTML files processed.");
