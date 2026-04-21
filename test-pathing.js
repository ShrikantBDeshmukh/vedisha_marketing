const path = require('path');

const dir = 'D:\\vedisha marketing projects\\vedisha_marketing';
const files = [
    'D:\\vedisha marketing projects\\vedisha_marketing\\index.html',
    'D:\\vedisha marketing projects\\vedisha_marketing\\mr\\index.html',
    'D:\\vedisha marketing projects\\vedisha_marketing\\mr\\about.html'
];

files.forEach(file => {
    const relToRoot = path.relative(path.dirname(file), dir);
    const basePath = relToRoot ? relToRoot.replace(/\\/g, '/') + '/' : '';
    console.log(`File: ${file}`);
    console.log(`  Dirname: ${path.dirname(file)}`);
    console.log(`  RelToRoot: ${relToRoot}`);
    console.log(`  BasePath: "${basePath}"`);
});
