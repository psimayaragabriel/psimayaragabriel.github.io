const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

async function build() {
  const srcPath = path.join(__dirname, '..', 'src', 'script.js');
  const distPath = path.join(__dirname, '..', 'script.js');

  if (!fs.existsSync(srcPath)) {
    console.error(`Source file not found at: ${srcPath}`);
    process.exit(1);
  }

  const sourceCode = fs.readFileSync(srcPath, 'utf8');

  console.log('Minifying script.js with clean production minification (Terser)...');

  const minified = await minify(sourceCode, {
    compress: {
      drop_console: false,
      passes: 2
    },
    mangle: {
      toplevel: true
    },
    format: {
      comments: false
    }
  });

  if (minified.error) {
    console.error('Minification error:', minified.error);
    process.exit(1);
  }

  fs.writeFileSync(distPath, minified.code, 'utf8');
  console.log(`Successfully generated production script at ${distPath} (${minified.code.length} bytes)`);
}

build();
