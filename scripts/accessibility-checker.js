/**
 * Accessibility Checker Script
 * 
 * This script helps identify potential accessibility issues in the LendingForte application.
 * It checks for common accessibility patterns and issues in React components.
 * 
 * Usage:
 * 1. Run the script with Node.js: node scripts/accessibility-checker.js
 * 2. Review the output for potential accessibility issues
 */

const fs = require('fs');
const path = require('path');

// Directories to exclude
const excludeDirs = ['node_modules', '.next', 'out', 'build', 'dist'];

// File extensions to check
const fileExtensions = ['.jsx', '.tsx'];

// Accessibility patterns to check
const accessibilityPatterns = [
  { 
    pattern: /<img(?![^>]*alt=["'])/g, 
    description: 'Image without alt attribute',
    severity: 'high'
  },
  { 
    pattern: /<button(?![^>]*aria-label=["'])(?![^>]*>[^<]*<\/button>)/g, 
    description: 'Button without text or aria-label',
    severity: 'high'
  },
  { 
    pattern: /<a(?![^>]*aria-label=["'])(?![^>]*>[^<]*<\/a>)/g, 
    description: 'Link without text or aria-label',
    severity: 'high'
  },
  { 
    pattern: /tabIndex=["']-1["']/g, 
    description: 'Negative tabIndex (may cause keyboard navigation issues)',
    severity: 'medium'
  },
  { 
    pattern: /onClick(?![^>]*onKeyDown)/g, 
    description: 'onClick without onKeyDown/onKeyPress (keyboard accessibility)',
    severity: 'medium'
  },
  { 
    pattern: /<div(?![^>]*role=["'])(?=[^>]*onClick)/g, 
    description: 'Clickable div without role attribute',
    severity: 'medium'
  },
  { 
    pattern: /<svg(?![^>]*aria-hidden=["'])/g, 
    description: 'SVG without aria-hidden attribute',
    severity: 'low'
  },
  { 
    pattern: /<h1[^>]*>[^<]*<\/h1>.*<h1[^>]*>/gs, 
    description: 'Multiple h1 elements (should have only one per page)',
    severity: 'medium'
  },
  { 
    pattern: /<[^>]*style=["'][^"']*color:[^"']*["']/g, 
    description: 'Inline color styling (may cause contrast issues)',
    severity: 'low'
  },
  { 
    pattern: /<form(?![^>]*aria-label=["'])(?![^>]*aria-labelledby=["'])/g, 
    description: 'Form without aria-label or aria-labelledby',
    severity: 'medium'
  },
  { 
    pattern: /<input(?![^>]*id=["'])(?![^>]*aria-label=["'])/g, 
    description: 'Input without id or aria-label',
    severity: 'medium'
  },
  { 
    pattern: /<input(?![^>]*aria-describedby=["'])[^>]*required/g, 
    description: 'Required input without aria-describedby',
    severity: 'low'
  },
  { 
    pattern: /<table(?![^>]*role=["'])/g, 
    description: 'Table without role attribute',
    severity: 'low'
  },
  { 
    pattern: /<table[^>]*>(?![^]*<th[^>]*>)/g, 
    description: 'Table without header cells',
    severity: 'medium'
  }
];

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

// Check file for accessibility issues
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  accessibilityPatterns.forEach(pattern => {
    const matches = content.match(pattern.pattern);
    
    if (matches) {
      issues.push({
        file: filePath,
        description: pattern.description,
        severity: pattern.severity,
        count: matches.length
      });
    }
  });
  
  return issues;
}

// Main function
function main() {
  console.log('🔍 Checking for accessibility issues...');
  
  try {
    // Find and check files
    const files = findFiles('.');
    console.log(`\n🔎 Checking ${files.length} React component files...`);
    
    let allIssues = [];
    
    files.forEach(file => {
      const issues = checkFile(file);
      allIssues = [...allIssues, ...issues];
    });
    
    // Display results
    if (allIssues.length === 0) {
      console.log('\n✅ No potential accessibility issues found!');
    } else {
      console.log(`\n⚠️ Found ${allIssues.length} potential accessibility issues:`);
      
      // Group by severity
      const highSeverity = allIssues.filter(issue => issue.severity === 'high');
      const mediumSeverity = allIssues.filter(issue => issue.severity === 'medium');
      const lowSeverity = allIssues.filter(issue => issue.severity === 'low');
      
      if (highSeverity.length > 0) {
        console.log('\n🔴 High Severity Issues:');
        highSeverity.forEach(issue => {
          console.log(`  - ${issue.file}: ${issue.description} (${issue.count} occurrences)`);
        });
      }
      
      if (mediumSeverity.length > 0) {
        console.log('\n🟠 Medium Severity Issues:');
        mediumSeverity.forEach(issue => {
          console.log(`  - ${issue.file}: ${issue.description} (${issue.count} occurrences)`);
        });
      }
      
      if (lowSeverity.length > 0) {
        console.log('\n🟡 Low Severity Issues:');
        lowSeverity.forEach(issue => {
          console.log(`  - ${issue.file}: ${issue.description} (${issue.count} occurrences)`);
        });
      }
      
      console.log('\n💡 Recommendations:');
      console.log('  - Add alt text to all images');
      console.log('  - Ensure all interactive elements are keyboard accessible');
      console.log('  - Use appropriate ARIA attributes for complex components');
      console.log('  - Maintain proper heading hierarchy');
      console.log('  - Test with screen readers like NVDA or VoiceOver');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();
