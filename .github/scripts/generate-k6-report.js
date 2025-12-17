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
  // Load k6-html-reporter
  const htmlReporter = require('k6-html-reporter');
  
  console.log('🔧 Generating report...');
  
  // The module expects options object with jsonFile and output properties
  const options = {
    jsonFile: jsonFile,
    output: outputFile
  };
  
  // Generate the report using the correct API
  htmlReporter(options);
  
  // Wait a bit for file to be written
  setTimeout(() => {
    // Verify output was created
    if (fs.existsSync(outputFile)) {
      const stats = fs.statSync(outputFile);
      console.log(`✅ Report generated successfully (${(stats.size / 1024).toFixed(2)} KB)`);
      process.exit(0);
    } else {
      console.error('❌ Output file was not created');
      process.exit(1);
    }
  }, 1000);
  
} catch (error) {
  console.error('❌ Error generating report:');
  console.error(error.message);
  console.error(error.stack);
  process.exit(1);
}
