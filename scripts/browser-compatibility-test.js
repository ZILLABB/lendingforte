/**
 * Browser Compatibility Test Script
 * 
 * This script helps identify potential browser compatibility issues in the LendingForte application.
 * It checks for the usage of modern JavaScript features that might not be supported in all browsers.
 * 
 * Usage:
 * 1. Run the script with Node.js: node scripts/browser-compatibility-test.js
 * 2. Review the output for potential compatibility issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Modern JavaScript features that might cause compatibility issues
const modernFeatures = [
  { pattern: /(?<!\w)\.at\s*\(/g, description: 'Array.prototype.at() - Not supported in older browsers' },
  { pattern: /(?<!\w)\.replaceAll\s*\(/g, description: 'String.prototype.replaceAll() - Not supported in older browsers' },
  { pattern: /(?<!\w)\.flatMap\s*\(/g, description: 'Array.prototype.flatMap() - Limited browser support' },
  { pattern: /\?\./g, description: 'Optional chaining (?.) - Not supported in older browsers' },
  { pattern: /\?\?/g, description: 'Nullish coalescing operator (??) - Not supported in older browsers' },
  { pattern: /(?<!\w)Object\.fromEntries\s*\(/g, description: 'Object.fromEntries() - Limited browser support' },
  { pattern: /(?<!\w)globalThis(?!\w)/g, description: 'globalThis - Limited browser support' },
  { pattern: /(?<!\w)BigInt(?!\w)/g, description: 'BigInt - Limited browser support' },
  { pattern: /(?<!\w)structuredClone\s*\(/g, description: 'structuredClone() - Limited browser support' },
  { pattern: /(?<!\w)\.toReversed\s*\(/g, description: 'Array.prototype.toReversed() - Very limited browser support' },
  { pattern: /(?<!\w)\.toSorted\s*\(/g, description: 'Array.prototype.toSorted() - Very limited browser support' },
  { pattern: /(?<!\w)\.toSpliced\s*\(/g, description: 'Array.prototype.toSpliced() - Very limited browser support' },
  { pattern: /(?<!\w)\.with\s*\(/g, description: 'Array.prototype.with() - Very limited browser support' },
];

// CSS features that might cause compatibility issues
const cssFeatures = [
  { pattern: /backdrop-filter:/g, description: 'backdrop-filter - Not supported in all browsers' },
  { pattern: /aspect-ratio:/g, description: 'aspect-ratio - Limited browser support' },
  { pattern: /content-visibility:/g, description: 'content-visibility - Limited browser support' },
  { pattern: /text-underline-offset:/g, description: 'text-underline-offset - Limited browser support' },
  { pattern: /text-decoration-thickness:/g, description: 'text-decoration-thickness - Limited browser support' },
  { pattern: /scrollbar-gutter:/g, description: 'scrollbar-gutter - Very limited browser support' },
];

// File extensions to check
const fileExtensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'];

// Directories to exclude
const excludeDirs = ['node_modules', '.next', 'out', 'build', 'dist'];

// Find all relevant files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !excludeDirs.includes(file)) {
      findFiles(filePath, fileList);
    } else if (stat.isFile() && fileExtensions.includes(path.extname(file))) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Check file for modern features
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath);
  const issues = [];
  
  const featuresToCheck = ext === '.css' || ext === '.scss' ? cssFeatures : modernFeatures;
  
  featuresToCheck.forEach(feature => {
    if (feature.pattern.test(content)) {
      issues.push({
        file: filePath,
        description: feature.description
      });
    }
    
    // Reset regex lastIndex
    feature.pattern.lastIndex = 0;
  });
  
  return issues;
}

// Main function
function main() {
  console.log('🔍 Checking for browser compatibility issues...');
  
  try {
    // Get browserslist configuration
    const browserslist = execSync('npx browserslist').toString().trim();
    console.log('\n📊 Current browserslist configuration:');
    console.log(browserslist);
    
    // Find and check files
    const files = findFiles('.');
    console.log(`\n🔎 Checking ${files.length} files for compatibility issues...`);
    
    let allIssues = [];
    
    files.forEach(file => {
      const issues = checkFile(file);
      allIssues = [...allIssues, ...issues];
    });
    
    // Display results
    if (allIssues.length === 0) {
      console.log('\n✅ No potential compatibility issues found!');
    } else {
      console.log(`\n⚠️ Found ${allIssues.length} potential compatibility issues:`);
      
      const issuesByFile = {};
      
      allIssues.forEach(issue => {
        if (!issuesByFile[issue.file]) {
          issuesByFile[issue.file] = [];
        }
        
        issuesByFile[issue.file].push(issue.description);
      });
      
      Object.keys(issuesByFile).forEach(file => {
        console.log(`\n📁 ${file}:`);
        
        const uniqueIssues = [...new Set(issuesByFile[file])];
        uniqueIssues.forEach(issue => {
          console.log(`  - ${issue}`);
        });
      });
      
      console.log('\n💡 Recommendation: Consider using Babel or polyfills to ensure compatibility with your target browsers.');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();
