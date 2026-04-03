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
const OUTPUT_PDF = './public/downloads/biztech100-executive-summary.pdf';

async function generateExecutiveSummary() {
  if (!fs.existsSync('./public/downloads')) {
    fs.mkdirSync('./public/downloads', { recursive: true });
  }

  console.log('Generating Executive Summary PDF...');
  
  const doc = new PDFDocument({ 
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 }
  });
  
  const writeStream = fs.createWriteStream(OUTPUT_PDF);
  doc.pipe(writeStream);

  // Title
  doc.fontSize(24).font('Helvetica-Bold').fillColor('#0f172a')
     .text('Colorado BizTech 100 - 2026 Inaugural Edition', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(18).font('Helvetica-Bold').fillColor('#334155')
     .text('Executive Summary', { align: 'center' });
  
  doc.moveDown(1.5);

  // Intro
  doc.fontSize(12).font('Helvetica').fillColor('#475569').lineGap(4)
     .text('The BizTech 100 ranks Colorado’s top technology companies based on high-tech employment, capital strength, growth trajectory, and financial stability. These 100 companies employ an estimated 34,215 technical professionals across Colorado, representing the core of Colorado’s innovation economy.');
  
  doc.moveDown(1);

  // Key Statistics
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#0f172a').text('Key Statistics:');
  doc.moveDown(0.5);
  doc.fontSize(12).font('Helvetica').fillColor('#475569');
  const stats = [
    '• 100 Companies Ranked',
    '• 34,215 High-Tech Employees',
    '• $500–700B Attributable Value',
    '• 62% Colorado Headquartered',
    '• 20.2% Average Growth Rate (CAGR)'
  ];
  stats.forEach(stat => doc.text(stat));

  doc.moveDown(1);

  // Key Findings
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#0f172a').text('Key Findings:');
  doc.moveDown(0.5);
  
  doc.fontSize(12).font('Helvetica-Bold').text('Scale:');
  doc.font('Helvetica').text('The top 100 companies employ 34,215 high-tech workers. The Top 10 account for ~16,300 employees (about 48% of the total). Lockheed Martin leads with 3,500 high-tech employees.');
  
  doc.moveDown(0.5);
  doc.font('Helvetica-Bold').text('Growth:');
  doc.font('Helvetica').text('The cohort’s average growth is 20.2% CAGR, significantly exceeding national tech growth. Seven companies exhibit hypergrowth (≥40% CAGR), including Boom Supersonic (85%) and Palantir (45%).');

  doc.moveDown(0.5);
  doc.font('Helvetica-Bold').text('Headquarters:');
  doc.font('Helvetica').text('62% of the Top 100 are Colorado-headquartered, showcasing genuine ecosystem depth beyond branch offices.');

  doc.moveDown(1.5);

  // Top 10 Table Header
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#0f172a').text('Top 10 Companies (January 2026)');
  doc.moveDown(0.5);

  const tableTop = doc.y;
  const col1 = 50;
  const col2 = 250;
  const col3 = 400;

  doc.fontSize(10).font('Helvetica-Bold');
  doc.text('Rank & Company', col1, tableTop);
  doc.text('High-Tech Employees', col2, tableTop);
  doc.text('Sector', col3, tableTop);

  doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke('#cbd5e1');

  const top10 = [
    ['1. Lockheed Martin', '3,500', 'Aerospace & Defense'],
    ['2. Amazon (AWS)', '2,500', 'Cloud Infrastructure'],
    ['3. Google/Alphabet', '2,000', 'Cloud & Software'],
    ['4. Raytheon Technologies', '1,800', 'Aerospace & Defense'],
    ['5. Oracle', '1,500', 'Enterprise Software'],
    ['6. BAE Space & Mission Systems ★', '1,200', 'Space Systems'],
    ['7. Microsoft', '1,000', 'Cloud Infrastructure'],
    ['8. Workday', '1,000', 'Enterprise SaaS'],
    ['9. Dish Wireless ★', '1,000', 'Telecommunications / 5G'],
    ['10. Palantir Technologies ★', '800', 'Data Analytics / AI']
  ];

  let currentY = tableTop + 25;
  doc.font('Helvetica').fontSize(10);
  top10.forEach(row => {
    doc.text(row[0], col1, currentY);
    doc.text(row[1], col2, currentY);
    doc.text(row[2], col3, currentY);
    currentY += 20;
  });

  doc.moveDown(2);
  doc.fontSize(10).font('Helvetica-Oblique').fillColor('#64748b')
     .text('Dan Frey - Founder, Colorado BizTech', { align: 'right' });
  doc.text('www.ColoradoBizTech.com', { align: 'right' });

  doc.end();
  
  return new Promise<void>((resolve) => {
    writeStream.on('finish', () => {
      console.log(`\nExecutive Summary PDF generated: ${OUTPUT_PDF}`);
      resolve();
    });
  });
}

generateExecutiveSummary();
