const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const srcPath = path.join(__dirname, '..', 'src', 'script.js');
const distPath = path.join(__dirname, '..', 'script.js');

if (!fs.existsSync(srcPath)) {
  console.error(`Source file not found at: ${srcPath}`);
  process.exit(1);
}

const sourceCode = fs.readFileSync(srcPath, 'utf8');

console.log('Obfuscating and minifying script.js...');

const obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: false,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,
  selfDefending: false,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 4,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayThreshold: 0.8,
  transformObjectKeys: true,
  unicodeEscapeSequence: false
});

const obfuscatedCode = obfuscationResult.getObfuscatedCode();
fs.writeFileSync(distPath, obfuscatedCode, 'utf8');

console.log(`Successfully generated obfuscated script at ${distPath} (${obfuscatedCode.length} bytes)`);
