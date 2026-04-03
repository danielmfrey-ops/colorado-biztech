import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const outputDir = path.join(process.cwd(), 'public', 'downloads');

const top10Companies = [
  { rank: 1, name: "Lockheed Martin Space", employees: 3500, growth: "18%", sector: "Space & Aerospace", city: "Littleton" },
  { rank: 2, name: "Amazon AWS", employees: 2500, growth: "25%", sector: "Cloud Computing", city: "Denver" },
  { rank: 3, name: "Google", employees: 2000, growth: "22%", sector: "AI & Technology", city: "Boulder" },
  { rank: 4, name: "Raytheon", employees: 1800, growth: "15%", sector: "Defense Tech", city: "Aurora" },
  { rank: 5, name: "Oracle", employees: 1500, growth: "12%", sector: "Enterprise Software", city: "Broomfield" },
  { rank: 6, name: "BAE Space & Mission Systems", employees: 1200, growth: "20%", sector: "Space & Aerospace", city: "Westminster" },
  { rank: 7, name: "Microsoft", employees: 1000, growth: "18%", sector: "Cloud & AI", city: "Denver" },
  { rank: 8, name: "Workday", employees: 1000, growth: "15%", sector: "Enterprise Software", city: "Boulder" },
  { rank: 9, name: "Dish Wireless", employees: 1000, growth: "30%", sector: "5G & Telecom", city: "Englewood" },
  { rank: 10, name: "Palantir", employees: 800, growth: "35%", sector: "AI & Data Analytics", city: "Denver" },
];

function generateExecutiveSummary() {
  const doc = new PDFDocument({ margin: 50 });
  const filePath = path.join(outputDir, 'biztech100-executive-summary.pdf');
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(28).font('Helvetica-Bold').text('THE BIZTECH 100', { align: 'center' });
  doc.fontSize(18).text('COLORADO RANKINGS', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).font('Helvetica').text('Executive Summary | January 2026', { align: 'center' });
  doc.moveDown(2);

  doc.moveTo(50, doc.y).lineTo(560, doc.y).stroke();
  doc.moveDown();

  doc.fontSize(16).font('Helvetica-Bold').text('Overview');
  doc.fontSize(11).font('Helvetica')
    .text('The BizTech 100 Colorado Rankings represents the definitive annual assessment of Colorado\'s top 100 technology companies. Our methodology evaluates companies across four key criteria: employment base, capital formation, growth trajectory, and financial strength.', { align: 'justify' });
  doc.moveDown();

  doc.fontSize(16).font('Helvetica-Bold').text('Key Statistics');
  doc.fontSize(11).font('Helvetica');
  const stats = [
    ['Total Employment:', '34,215 jobs across 100 companies'],
    ['Capital Formation:', '$500-700 billion in total capital'],
    ['Colorado HQ Rate:', '62% of ranked companies'],
    ['Average Growth:', '20.2% year-over-year'],
    ['Sectors Covered:', '13 technology sectors'],
  ];
  stats.forEach(([label, value]) => {
    doc.font('Helvetica-Bold').text(label, { continued: true });
    doc.font('Helvetica').text(` ${value}`);
  });
  doc.moveDown();

  doc.fontSize(16).font('Helvetica-Bold').text('Top 10 Companies Preview');
  doc.moveDown(0.5);
  
  top10Companies.forEach((company) => {
    doc.fontSize(10).font('Helvetica-Bold').text(`${company.rank}. ${company.name}`, { continued: true });
    doc.font('Helvetica').text(` - ${company.employees.toLocaleString()} employees, ${company.growth} growth`);
    doc.fontSize(9).fillColor('gray').text(`${company.sector} | ${company.city}`, { indent: 20 });
    doc.fillColor('black');
  });
  doc.moveDown();

  doc.fontSize(16).font('Helvetica-Bold').text('2026 Outlook');
  doc.fontSize(11).font('Helvetica')
    .text('Colorado\'s technology ecosystem continues to demonstrate remarkable resilience and growth potential. Key trends driving the 2026 outlook include:', { align: 'justify' });
  doc.moveDown(0.5);
  const trends = [
    'AI and machine learning adoption accelerating across all sectors',
    'Space and aerospace sector experiencing unprecedented growth with Sierra Space expansion',
    'Clean energy and grid modernization investments reaching $15B+',
    'Talent pipeline strengthening through university partnerships',
    'Venture capital deployment in Colorado reaching new highs',
  ];
  trends.forEach((trend) => {
    doc.text(`• ${trend}`, { indent: 20 });
  });
  doc.moveDown(2);

  doc.fontSize(9).fillColor('gray').text('© 2026 Colorado BizTech. All rights reserved.', { align: 'center' });
  doc.text('www.coloradobiztech.com | Dan@ColoradoBizTech.com', { align: 'center' });

  doc.end();
  console.log(`Executive Summary generated: ${filePath}`);
}

function generateFullReport() {
  const doc = new PDFDocument({ margin: 50 });
  const filePath = path.join(outputDir, 'biztech100-full-report.pdf');
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(32).font('Helvetica-Bold').text('THE BIZTECH 100', { align: 'center' });
  doc.fontSize(22).text('COLORADO RANKINGS', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).font('Helvetica').text('January 2026 Full Report', { align: 'center' });
  doc.moveDown(3);

  doc.fontSize(12).text('Prepared by Colorado BizTech', { align: 'center' });
  doc.text('Founded by Daniel Frey', { align: 'center' });
  doc.moveDown(4);

  doc.moveTo(150, doc.y).lineTo(450, doc.y).stroke();
  doc.moveDown();
  doc.fontSize(10).fillColor('gray').text('"Let\'s Make Colorado a Top 5 State for High-Quality Technology Companies"', { align: 'center', oblique: true });
  doc.fillColor('black');

  doc.addPage();

  doc.fontSize(20).font('Helvetica-Bold').text('Table of Contents');
  doc.moveDown();
  doc.fontSize(12).font('Helvetica');
  const toc = [
    ['1. Executive Summary', '3'],
    ['2. Methodology', '4'],
    ['3. Key Findings', '5'],
    ['4. Top 10 Company Profiles', '6'],
    ['5. Sector Analysis', '10'],
    ['6. Employment Trends', '15'],
    ['7. Capital Formation', '18'],
    ['8. Growth Metrics', '21'],
    ['9. Regional Distribution', '24'],
    ['10. 2026 Outlook', '27'],
    ['11. About Colorado BizTech', '30'],
  ];
  toc.forEach(([title, page]) => {
    doc.text(`${title}`, { continued: true });
    doc.text(`.`.repeat(60 - title.length), { continued: true });
    doc.text(page);
  });

  doc.addPage();

  doc.fontSize(20).font('Helvetica-Bold').text('1. Executive Summary');
  doc.moveDown();
  doc.fontSize(11).font('Helvetica')
    .text('The BizTech 100 Colorado Rankings represents the definitive annual assessment of Colorado\'s top 100 technology companies. This inaugural January 2026 edition establishes the baseline for tracking Colorado\'s progress toward becoming a Top 5 state for high-quality technology companies.', { align: 'justify' });
  doc.moveDown();
  doc.text('Our comprehensive analysis reveals a technology ecosystem with significant strengths and clear opportunities for growth. Colorado\'s technology sector employs over 34,000 professionals across the BizTech 100, with total capital formation estimated at $500-700 billion.', { align: 'justify' });
  doc.moveDown(2);

  doc.fontSize(14).font('Helvetica-Bold').text('Key Statistics at a Glance');
  doc.moveDown(0.5);
  doc.fontSize(11).font('Helvetica');
  
  const keyStats = [
    { metric: 'Total BizTech 100 Employment', value: '34,215 jobs' },
    { metric: 'Estimated Capital Formation', value: '$500-700 billion' },
    { metric: 'Colorado-Headquartered Companies', value: '62%' },
    { metric: 'Average Year-over-Year Growth', value: '20.2%' },
    { metric: 'Technology Sectors Represented', value: '13' },
    { metric: 'Cities with Ranked Companies', value: '25+' },
  ];

  keyStats.forEach((stat) => {
    doc.font('Helvetica-Bold').text(stat.metric + ':', { continued: true });
    doc.font('Helvetica').text(` ${stat.value}`);
  });

  doc.addPage();

  doc.fontSize(20).font('Helvetica-Bold').text('2. Methodology');
  doc.moveDown();
  doc.fontSize(11).font('Helvetica')
    .text('The BizTech 100 Colorado Rankings evaluates companies across four equally-weighted criteria:', { align: 'justify' });
  doc.moveDown();

  const criteria = [
    { name: 'Employment Base (25%)', desc: 'Total Colorado-based employees and job creation trends' },
    { name: 'Capital Formation (25%)', desc: 'Funding raised, market capitalization, and financial resources' },
    { name: 'Growth Trajectory (25%)', desc: 'Revenue growth, employee growth, and market expansion' },
    { name: 'Financial Strength (25%)', desc: 'Profitability metrics, cash position, and sustainability indicators' },
  ];

  criteria.forEach((c) => {
    doc.font('Helvetica-Bold').text(c.name);
    doc.font('Helvetica').text(c.desc, { indent: 20 });
    doc.moveDown(0.5);
  });

  doc.moveDown();
  doc.fontSize(14).font('Helvetica-Bold').text('Data Sources');
  doc.fontSize(11).font('Helvetica');
  const sources = [
    'Public SEC filings and financial disclosures',
    'Colorado Department of Labor employment statistics',
    'Pitchbook, Crunchbase, and venture capital databases',
    'Company press releases and annual reports',
    'LinkedIn employment data and trends',
    'Colorado OEDIT economic development reports',
  ];
  sources.forEach((s) => doc.text(`• ${s}`, { indent: 20 }));

  doc.addPage();

  doc.fontSize(20).font('Helvetica-Bold').text('3. Key Findings');
  doc.moveDown();

  const findings = [
    { title: 'Space & Aerospace Dominance', content: 'Colorado\'s space and aerospace sector leads the BizTech 100, with companies like Lockheed Martin Space, BAE Space & Mission Systems, and Sierra Space driving significant employment and innovation.' },
    { title: 'AI/ML Growth Acceleration', content: 'Artificial intelligence and machine learning companies show the highest growth rates, averaging 35% year-over-year expansion in employment.' },
    { title: 'Boulder-Denver Tech Corridor', content: 'The Boulder-Denver corridor accounts for 68% of all BizTech 100 company headquarters, creating a dense innovation ecosystem.' },
    { title: 'Enterprise Software Strength', content: 'Colorado hosts major enterprise software operations from Oracle, Workday, and emerging SaaS companies, contributing 22% of total BizTech 100 employment.' },
    { title: 'Clean Energy Investment', content: 'Clean energy and grid modernization investments in Colorado have reached $15+ billion, positioning the state as a leader in energy technology.' },
  ];

  findings.forEach((f) => {
    doc.fontSize(12).font('Helvetica-Bold').text(f.title);
    doc.fontSize(11).font('Helvetica').text(f.content, { align: 'justify' });
    doc.moveDown();
  });

  doc.addPage();

  doc.fontSize(20).font('Helvetica-Bold').text('4. Top 10 Company Profiles');
  doc.moveDown();

  top10Companies.forEach((company, idx) => {
    doc.fontSize(14).font('Helvetica-Bold').text(`#${company.rank} ${company.name}`);
    doc.fontSize(10).font('Helvetica');
    doc.text(`Sector: ${company.sector} | Location: ${company.city}`);
    doc.text(`Employees: ${company.employees.toLocaleString()} | Growth: ${company.growth}`);
    doc.moveDown(0.5);
    
    if (idx === 4) {
      doc.addPage();
    }
  });

  doc.addPage();

  doc.fontSize(20).font('Helvetica-Bold').text('10. 2026 Outlook');
  doc.moveDown();
  doc.fontSize(11).font('Helvetica')
    .text('Colorado\'s technology ecosystem is positioned for continued growth in 2026. Key trends shaping the outlook include:', { align: 'justify' });
  doc.moveDown();

  const outlook = [
    'AI Integration: Expect accelerated AI adoption across all 13 technology sectors',
    'Space Economy Expansion: Sierra Space commercial operations and continued Space Command presence',
    'Quantum Computing Growth: NIST and CU Boulder research driving commercial applications',
    'Talent Pipeline: University partnerships strengthening with increased STEM graduates',
    'Venture Capital: Colorado VC deployment projected to reach $3+ billion',
    'Clean Energy Leadership: Federal incentives driving renewable technology investments',
  ];

  outlook.forEach((item) => doc.text(`• ${item}`));

  doc.moveDown(2);
  doc.fontSize(16).font('Helvetica-Bold').text('Looking Ahead: Q2 2026');
  doc.fontSize(11).font('Helvetica')
    .text('The Q2 2026 BizTech 100 update will include refreshed rankings, new company additions, and deeper sector analysis. Subscribe to our newsletter for quarterly updates.', { align: 'justify' });

  doc.addPage();

  doc.fontSize(20).font('Helvetica-Bold').text('11. About Colorado BizTech');
  doc.moveDown();
  doc.fontSize(11).font('Helvetica')
    .text('Colorado BizTech is the definitive reporting platform for Colorado\'s high-growth technology ecosystem. Our mission is to make Colorado a Top 5 state for high-quality technology companies.', { align: 'justify' });
  doc.moveDown();
  doc.fontSize(12).font('Helvetica-Bold').text('Our Approach');
  doc.fontSize(11).font('Helvetica')
    .text('We provide comprehensive directories, objective analyses, and peer-state benchmarks across 13 technology sectors. As a neutral reporter and facilitator, we deliver data-driven insights that help founders, investors, and supporting organizations make better decisions.', { align: 'justify' });
  doc.moveDown(2);

  doc.fontSize(12).font('Helvetica-Bold').text('Founded by Daniel Frey');
  doc.fontSize(11).font('Helvetica')
    .text('Daniel Frey founded Colorado BizTech with a vision to elevate Colorado\'s technology ecosystem through rigorous, objective analysis and community-driven insights.', { align: 'justify' });
  doc.moveDown(2);

  doc.fontSize(12).font('Helvetica-Bold').text('Contact');
  doc.fontSize(11).font('Helvetica');
  doc.text('Email: Dan@ColoradoBizTech.com');
  doc.text('Website: www.coloradobiztech.com');
  doc.text('Location: Boulder, Colorado');
  doc.moveDown(3);

  doc.moveTo(50, doc.y).lineTo(560, doc.y).stroke();
  doc.moveDown();
  doc.fontSize(9).fillColor('gray').text('© 2026 Colorado BizTech. All rights reserved. This report is provided for informational purposes only.', { align: 'center' });

  doc.end();
  console.log(`Full Report generated: ${filePath}`);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

generateExecutiveSummary();
generateFullReport();

console.log('PDF generation complete!');
