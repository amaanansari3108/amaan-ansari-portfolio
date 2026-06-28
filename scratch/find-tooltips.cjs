const fs = require('fs');
const path = require('path');

const searchDirectory = (dir, query) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        searchDirectory(filePath, query);
      }
    } else {
      if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes(query)) {
          console.log(`Found "${query}" in: ${filePath}`);
        }
      }
    }
  });
};

searchDirectory(path.join(__dirname, '..'), 'LinkPreviewTooltip');
