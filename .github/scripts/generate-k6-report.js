#!/usr/bin/env node

/**
 * K6 HTML Report Generator
 * Generates HTML report from K6 JSON output using k6-reporter
 */

const fs = require('fs');
const path = require('path');

// Get command line arguments
const jsonFile = process.argv[2];
const outputPath = process.argv[3]; // Can be directory or file path

if (!jsonFile || !outputPath) {
  console.error('❌ Usage: node generate-k6-report.js <input.json> <output-dir-or-file>');
  process.exit(1);
}

// Verify input file exists
if (!fs.existsSync(jsonFile)) {
  console.error(`❌ Input file not found: ${jsonFile}`);
  process.exit(1);
}

// Determine output file path
const outputFile = outputPath.endsWith('.html') ? outputPath : path.join(outputPath, 'index.html');
const outputDir = path.dirname(outputFile);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('📊 K6 HTML Report Generator');
console.log(`📁 Input: ${jsonFile}`);
console.log(`� Output: ${outputFile}`);

try {
  // Load k6-reporter - more modern and maintained than k6-html-reporter
  const reporter = require('k6-reporter');
  
  console.log('🔧 Generating report using k6-reporter...');
  
  // Read the JSON summary file
  const summaryData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  
  // Generate HTML report using k6-reporter
  const htmlReport = reporter.generateHtmlReport(summaryData);
  
  // Write the HTML report to file
  fs.writeFileSync(outputFile, htmlReport);
  
  // Verify output was created
  if (fs.existsSync(outputFile)) {
    const stats = fs.statSync(outputFile);
    console.log(`✅ Report generated successfully at: ${outputFile}`);
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);
    process.exit(0);
  } else {
    console.error('❌ Failed to create report file');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Error generating report:');
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
  process.exit(1);
}
