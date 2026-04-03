import { db } from "../db";
import { 
  subscribers, contactInquiries, companies, deals, surveyResponses, users, reportRegistrations,
  type InsertSubscriber, type Subscriber, 
  type InsertContactInquiry, type ContactInquiry, 
  type InsertCompany, type Company, 
  type InsertDeal, type Deal,
  type InsertSurveyResponse, type SurveyResponse,
  type InsertUser, type User,
  type InsertReportRegistration, type ReportRegistration
} from "@shared/schema";
import { eq, ilike, or, sql, desc } from "drizzle-orm";

export interface IStorage {
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getAllContactInquiries(): Promise<ContactInquiry[]>;
  
  createCompany(company: InsertCompany): Promise<Company>;
  getAllCompanies(): Promise<Company[]>;
  getCompaniesBySector(sector: string): Promise<Company[]>;
  searchCompanies(query: string, sector?: string, city?: string): Promise<Company[]>;
  getCompanyById(id: number): Promise<Company | undefined>;
  
  createDeal(deal: InsertDeal): Promise<Deal>;
  getAllDeals(): Promise<Deal[]>;
  searchDeals(query: string, round?: string, sector?: string): Promise<Deal[]>;
  getDealById(id: number): Promise<Deal | undefined>;
  
  createSurveyResponse(response: InsertSurveyResponse): Promise<SurveyResponse>;
  getAllSurveyResponses(): Promise<SurveyResponse[]>;
  
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined>;
  
  createReportRegistration(registration: InsertReportRegistration): Promise<ReportRegistration>;
  getReportRegistrationByEmail(email: string): Promise<ReportRegistration | undefined>;
  getAllReportRegistrations(): Promise<ReportRegistration[]>;
  updateReportRegistration(id: number, data: Partial<ReportRegistration>): Promise<ReportRegistration | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const [subscriber] = await db.insert(subscribers).values(insertSubscriber).returning();
    return subscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return subscriber;
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [inquiry] = await db.insert(contactInquiries).values(insertInquiry).returning();
    return inquiry;
  }

  async getAllContactInquiries(): Promise<ContactInquiry[]> {
    return await db.select().from(contactInquiries);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const [company] = await db.insert(companies).values(insertCompany).returning();
    return company;
  }

  async getAllCompanies(): Promise<Company[]> {
    return await db.select().from(companies).orderBy(companies.name);
  }

  async getCompaniesBySector(sector: string): Promise<Company[]> {
    return await db.select().from(companies).where(eq(companies.sector, sector)).orderBy(companies.name);
  }

  async searchCompanies(query: string, sector?: string, city?: string): Promise<Company[]> {
    const conditions = [];
    
    if (query) {
      conditions.push(
        or(
          ilike(companies.name, `%${query}%`),
          ilike(companies.description, `%${query}%`)
        )
      );
    }
    
    if (sector && sector !== 'all') {
      conditions.push(eq(companies.sector, sector));
    }
    
    if (city && city !== 'all') {
      conditions.push(eq(companies.city, city));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(companies).where(
        conditions.reduce((acc, cond, idx) => idx === 0 ? cond : sql`${acc} AND ${cond}`, sql`TRUE`)
      ).orderBy(companies.name);
    }
    
    return await db.select().from(companies).orderBy(companies.name);
  }

  async getCompanyById(id: number): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.id, id));
    return company;
  }

  async createDeal(insertDeal: InsertDeal): Promise<Deal> {
    const [deal] = await db.insert(deals).values(insertDeal).returning();
    return deal;
  }

  async getAllDeals(): Promise<Deal[]> {
    return await db.select().from(deals).orderBy(desc(deals.createdAt));
  }

  async searchDeals(query: string, round?: string, sector?: string): Promise<Deal[]> {
    const conditions = [];
    
    if (query) {
      conditions.push(
        or(
          ilike(deals.company, `%${query}%`),
          ilike(deals.leadInvestor, `%${query}%`)
        )
      );
    }
    
    if (round && round !== 'all') {
      conditions.push(eq(deals.round, round));
    }
    
    if (sector && sector !== 'all') {
      conditions.push(eq(deals.sector, sector));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(deals).where(
        conditions.reduce((acc, cond, idx) => idx === 0 ? cond : sql`${acc} AND ${cond}`, sql`TRUE`)
      ).orderBy(desc(deals.createdAt));
    }
    
    return await db.select().from(deals).orderBy(desc(deals.createdAt));
  }

  async getDealById(id: number): Promise<Deal | undefined> {
    const [deal] = await db.select().from(deals).where(eq(deals.id, id));
    return deal;
  }

  async createSurveyResponse(insertResponse: InsertSurveyResponse): Promise<SurveyResponse> {
    const [response] = await db.insert(surveyResponses).values(insertResponse).returning();
    return response;
  }

  async getAllSurveyResponses(): Promise<SurveyResponse[]> {
    return await db.select().from(surveyResponses).orderBy(desc(surveyResponses.createdAt));
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user;
  }

  async createReportRegistration(insertRegistration: InsertReportRegistration): Promise<ReportRegistration> {
    const [registration] = await db.insert(reportRegistrations).values(insertRegistration).returning();
    return registration;
  }

  async getReportRegistrationByEmail(email: string): Promise<ReportRegistration | undefined> {
    const [registration] = await db.select().from(reportRegistrations).where(eq(reportRegistrations.email, email));
    return registration;
  }

  async getAllReportRegistrations(): Promise<ReportRegistration[]> {
    return await db.select().from(reportRegistrations).orderBy(desc(reportRegistrations.createdAt));
  }

  async updateReportRegistration(id: number, data: Partial<ReportRegistration>): Promise<ReportRegistration | undefined> {
    const [registration] = await db.update(reportRegistrations).set(data).where(eq(reportRegistrations.id, id)).returning();
    return registration;
  }
}

export const storage = new DatabaseStorage();
