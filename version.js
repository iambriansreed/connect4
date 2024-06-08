// typescript
import fs from 'node:fs';
import path from 'node:path';

const packageJson = fs.readFileSync('package.json', 'utf8');
const { version } = JSON.parse(packageJson);

const dir = path.resolve('dist');

fs.readdirSync(dir, { recursive: true, withFileTypes: true }).forEach((file) => {
    if (!file.isFile()) return;
    const filePath = path.resolve(file.parentPath, file.name);
    fs.writeFileSync(filePath, fs.readFileSync(filePath, 'utf8').replace(/%version%/g, version));
});
