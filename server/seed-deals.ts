import { db } from "../db";
import { deals } from "@shared/schema";

const sampleDeals = [
  {
    company: "Sierra Space",
    round: "Series F",
    amount: "$290M",
    leadInvestor: "General Atlantic",
    articleLink: null,
    dealDate: "Sep 2025",
    sector: "Space",
  },
  {
    company: "Crusoe Energy",
    round: "Series C",
    amount: "$350M",
    leadInvestor: "G2 Venture Partners",
    articleLink: null,
    dealDate: "Aug 2025",
    sector: "Energy",
  },
  {
    company: "Anduril Industries",
    round: "Series E",
    amount: "$1.5B",
    leadInvestor: "Founders Fund",
    articleLink: null,
    dealDate: "Aug 2025",
    sector: "AI",
  },
  {
    company: "Boom Supersonic",
    round: "Series C",
    amount: "$270M",
    leadInvestor: "American Express Ventures",
    articleLink: null,
    dealDate: "Jul 2025",
    sector: "Space",
  },
  {
    company: "Inscripta",
    round: "Series E",
    amount: "$150M",
    leadInvestor: "Venrock",
    articleLink: null,
    dealDate: "Jun 2025",
    sector: "Biotech",
  },
  {
    company: "ColdQuanta (Infleqtion)",
    round: "Series B",
    amount: "$110M",
    leadInvestor: "Tiger Global",
    articleLink: null,
    dealDate: "May 2025",
    sector: "Quantum",
  },
  {
    company: "Uplight",
    round: "Series C",
    amount: "$150M",
    leadInvestor: "Inclusive Capital",
    articleLink: null,
    dealDate: "Apr 2025",
    sector: "Energy",
  },
  {
    company: "Viome",
    round: "Series C",
    amount: "$75M",
    leadInvestor: "Bold Capital",
    articleLink: null,
    dealDate: "Mar 2025",
    sector: "Biotech",
  },
  {
    company: "Atom Computing",
    round: "Series B",
    amount: "$60M",
    leadInvestor: "Innovation Endeavors",
    articleLink: null,
    dealDate: "Feb 2025",
    sector: "Quantum",
  },
  {
    company: "OrbitFab",
    round: "Series B",
    amount: "$28M",
    leadInvestor: "8090 Industries",
    articleLink: null,
    dealDate: "Jan 2025",
    sector: "Space",
  },
  {
    company: "Array Labs",
    round: "Seed",
    amount: "$15M",
    leadInvestor: "Lux Capital",
    articleLink: null,
    dealDate: "Dec 2024",
    sector: "Space",
  },
  {
    company: "AtomTCAD",
    round: "Series A",
    amount: "$12M",
    leadInvestor: "Foundry Group",
    articleLink: null,
    dealDate: "Nov 2024",
    sector: "Quantum",
  },
  {
    company: "Umoja Biopharma",
    round: "Series C",
    amount: "$53M",
    leadInvestor: "MPM Capital",
    articleLink: null,
    dealDate: "Oct 2024",
    sector: "Biotech",
  },
  {
    company: "Vorto",
    round: "Series B",
    amount: "$45M",
    leadInvestor: "Tiger Global",
    articleLink: null,
    dealDate: "Sep 2024",
    sector: "AI",
  },
  {
    company: "Strive Health",
    round: "Series D",
    amount: "$166M",
    leadInvestor: "CapitalG",
    articleLink: null,
    dealDate: "Aug 2024",
    sector: "Biotech",
  },
];

export async function seedDeals() {
  console.log("Seeding deals...");
  
  for (const deal of sampleDeals) {
    try {
      await db.insert(deals).values(deal);
      console.log(`Added: ${deal.company} - ${deal.round}`);
    } catch (error) {
      console.log(`Skipped (may already exist): ${deal.company}`);
    }
  }
  
  console.log("Seeding complete!");
}

seedDeals().then(() => process.exit(0)).catch(console.error);
