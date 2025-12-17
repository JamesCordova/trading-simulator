#!/usr/bin/env node

/**
 * K6 HTML Report Generator
 * Generates HTML report from K6 JSON output using k6-html-reporter
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

// k6-html-reporter expects output to be a DIRECTORY, not a file path
// If user provided a file path, extract the directory
const outputDir = outputPath.endsWith('.html') ? path.dirname(outputPath) : outputPath;
const expectedFile = path.join(outputDir, 'index.html');

console.log('📊 K6 HTML Report Generator');
console.log(`📁 Input: ${jsonFile}`);
console.log(`� Output Directory: ${outputDir}`);
console.log(`📄 Expected File: ${expectedFile}`);

try {
  // Load k6-html-reporter according to documentation
  const reporter = require('k6-html-reporter');
  
  console.log('🔧 Generating report using k6-html-reporter...');
  
  // Configure options as per documentation
  // Important: output must be a directory path, not file path
  const options = {
    jsonFile: jsonFile,
    output: outputDir
  };
  
  console.log('Options:', JSON.stringify(options, null, 2));
  
  // Generate the report using the documented API (this is synchronous)
  reporter.generateSummaryReport(options);
  
  // Verify output was created immediately after generation
  // k6-html-reporter creates index.html in the output directory
  if (fs.existsSync(expectedFile)) {
    const stats = fs.statSync(expectedFile);
    console.log(`✅ Report generated successfully at: ${expectedFile}`);
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);
    process.exit(0);
  } else {
    console.error('❌ Output file was not created');
    console.error('Expected file:', expectedFile);
    console.error('Output directory:', outputDir);
    console.error('Current directory:', process.cwd());
    console.error('Files in output directory:');
    if (fs.existsSync(outputDir)) {
      const files = fs.readdirSync(outputDir);
      files.forEach(file => {
        const filePath = path.join(outputDir, file);
        const stat = fs.statSync(filePath);
        console.error(`  ${stat.isDirectory() ? '📂 DIR' : '📄 FILE'} ${file}`);
      });
    }
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Error generating report:');
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
  process.exit(1);
}
