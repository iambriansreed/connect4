const fs = require('fs');

const vendorFiles = [
];

vendorFiles.forEach(sourceFile => {
    const fileName = sourceFile.replace(/^.*[\\\/]/, '');
    fs.writeFileSync('js/vendor/' + fileName, fs.readFileSync('node_modules/' + sourceFile));
});

console.log('Copied ' + vendorFiles.length + ' vendor files.');

