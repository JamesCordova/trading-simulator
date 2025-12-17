#!/usr/bin/env node

/**
 * K6 HTML Report Generator
 * Generates HTML report from K6 JSON output using k6-html-reporter
 */

const fs = require('fs');
const path = require('path');

// Get command line arguments
const jsonFile = process.argv[2];
const outputFile = process.argv[3];

if (!jsonFile || !outputFile) {
  console.error('❌ Usage: node generate-k6-report.js <input.json> <output.html>');
  process.exit(1);
}

// Verify input file exists
if (!fs.existsSync(jsonFile)) {
  console.error(`❌ Input file not found: ${jsonFile}`);
  process.exit(1);
}

console.log('📊 K6 HTML Report Generator');
console.log(`📁 Input: ${jsonFile}`);
console.log(`📄 Output: ${outputFile}`);

try {
  // Load k6-html-reporter according to documentation
  const reporter = require('k6-html-reporter');
  
  console.log('🔧 Generating report using k6-html-reporter...');
  
  // Configure options as per documentation
  const options = {
    jsonFile: jsonFile,
    output: outputFile
  };
  
  console.log('Options:', JSON.stringify(options, null, 2));
  
  // Generate the report using the documented API
  reporter.generateSummaryReport(options);
  
  // Wait a bit for file to be written (reporter is synchronous but just to be safe)
  setTimeout(() => {
    // Verify output was created
    if (fs.existsSync(outputFile)) {
      const stats = fs.statSync(outputFile);
      console.log(`✅ Report generated successfully (${(stats.size / 1024).toFixed(2)} KB)`);
      process.exit(0);
    } else {
      console.error('❌ Output file was not created');
      console.error('Expected file:', outputFile);
      console.error('Current directory:', process.cwd());
      console.error('Files in reports/k6/:');
      const k6Dir = path.join(process.cwd(), 'reports', 'k6');
      if (fs.existsSync(k6Dir)) {
        const files = fs.readdirSync(k6Dir);
        files.forEach(file => console.error(`  - ${file}`));
      }
      process.exit(1);
    }
  }, 2000);
  
} catch (error) {
  console.error('❌ Error generating report:');
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
  process.exit(1);
}
