import puppeteer from 'puppeteer';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'BizTech 100', path: '/biztech100' },
  { name: 'News & Analysis', path: '/news' },
  { name: 'Resources - Directory', path: '/resources' },
  { name: 'About', path: '/about' },
  { name: 'Subscribe', path: '/subscribe' },
];

const BASE_URL = 'http://localhost:5000';
const SCREENSHOTS_DIR = './screenshots';
const OUTPUT_PDF = './Colorado_BizTech_Preview.pdf';

async function captureScreenshots() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/nix/store/zi4f80l169xlmivz8vja8wlphq74qqk0-chromium-125.0.6422.141/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const screenshotPaths: { name: string; path: string }[] = [];

  for (const pageInfo of PAGES) {
    console.log(`Capturing: ${pageInfo.name}...`);
    const url = `${BASE_URL}${pageInfo.path}`;
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const screenshotPath = path.join(SCREENSHOTS_DIR, `${pageInfo.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      screenshotPaths.push({ name: pageInfo.name, path: screenshotPath });
      console.log(`  Saved: ${screenshotPath}`);
    } catch (error) {
      console.error(`  Failed to capture ${pageInfo.name}:`, error);
    }
  }

  await browser.close();
  return screenshotPaths;
}

async function generatePDF(screenshots: { name: string; path: string }[]) {
  console.log('\nGenerating PDF...');
  
  const doc = new PDFDocument({ 
    size: 'A4',
    layout: 'landscape',
    margins: { top: 30, bottom: 30, left: 30, right: 30 }
  });
  
  const writeStream = fs.createWriteStream(OUTPUT_PDF);
  doc.pipe(writeStream);

  doc.fontSize(28).font('Helvetica-Bold').fillColor('#1e293b')
     .text('Colorado BizTech', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(16).font('Helvetica').fillColor('#64748b')
     .text('Site Preview - December 2024', { align: 'center' });
  doc.moveDown(0.3);
  doc.fontSize(12).fillColor('#94a3b8')
     .text('News and Analysis on The High Tech Ecosystem Transforming Our Economy', { align: 'center' });
  
  for (const screenshot of screenshots) {
    doc.addPage();
    
    doc.fontSize(18).font('Helvetica-Bold').fillColor('#1e293b')
       .text(screenshot.name, 30, 25);
    
    doc.moveTo(30, 50).lineTo(doc.page.width - 30, 50).stroke('#e2e8f0');
    
    if (fs.existsSync(screenshot.path)) {
      const imgWidth = doc.page.width - 60;
      const imgHeight = doc.page.height - 90;
      
      doc.image(screenshot.path, 30, 60, {
        fit: [imgWidth, imgHeight],
        align: 'center',
        valign: 'top'
      });
    }
  }

  doc.end();
  
  return new Promise<void>((resolve) => {
    writeStream.on('finish', () => {
      console.log(`\nPDF generated: ${OUTPUT_PDF}`);
      resolve();
    });
  });
}

async function main() {
  console.log('=== Colorado BizTech PDF Generator ===\n');
  
  try {
    const screenshots = await captureScreenshots();
    
    if (screenshots.length > 0) {
      await generatePDF(screenshots);
      console.log('\nDone! You can download the PDF from the file browser.');
    } else {
      console.log('\nNo screenshots captured.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
