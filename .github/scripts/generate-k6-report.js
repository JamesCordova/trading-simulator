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
  const k6HtmlReporter = require('k6-html-reporter');
  
  console.log('🔧 Exploring module exports...');
  console.log('Module type:', typeof k6HtmlReporter);
  console.log('Module keys:', Object.keys(k6HtmlReporter));
  
  console.log('🔧 Generating report...');
  
  // Try different methods to call the reporter
  let reportGenerated = false;
  
  // Method 1: Direct function call
  if (typeof k6HtmlReporter === 'function') {
    console.log('Trying: k6HtmlReporter(options)');
    k6HtmlReporter({
      jsonFile: jsonFile,
      output: outputFile
    });
    reportGenerated = true;
  }
  // Method 2: generateSummaryReport function
  else if (k6HtmlReporter.generateSummaryReport) {
    console.log('Trying: generateSummaryReport(options)');
    k6HtmlReporter.generateSummaryReport({
      jsonFile: jsonFile,
      output: outputFile
    });
    reportGenerated = true;
  }
  // Method 3: Default export
  else if (k6HtmlReporter.default) {
    console.log('Trying: default export');
    k6HtmlReporter.default({
      jsonFile: jsonFile,
      output: outputFile
    });
    reportGenerated = true;
  }
  // Method 4: generate function
  else if (k6HtmlReporter.generate) {
    console.log('Trying: generate(jsonFile, outputFile)');
    k6HtmlReporter.generate(jsonFile, outputFile);
    reportGenerated = true;
  }
  
  if (!reportGenerated) {
    console.error('❌ Could not find a valid method to generate report');
    console.error('Available methods:', Object.keys(k6HtmlReporter));
    process.exit(1);
  }
  
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
