import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  interest: text("interest").notNull(),
  comments: text("comments"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  sector: text("sector").notNull(),
  city: text("city").notNull(),
  website: text("website"),
  fundingStage: text("funding_stage"),
  fundingAmount: text("funding_amount"),
  employeeCount: text("employee_count"),
  founded: integer("founded"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const deals = pgTable("deals", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  round: text("round").notNull(),
  amount: text("amount").notNull(),
  leadInvestor: text("lead_investor"),
  articleLink: text("article_link"),
  dealDate: text("deal_date"),
  sector: text("sector"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const surveyResponses = pgTable("survey_responses", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  primaryRole: text("primary_role").notNull(),
  sector: text("sector"),
  featuresValued: text("features_valued"),
  topPriority: text("top_priority"),
  vcObstacle: text("vc_obstacle"),
  scalingHelps: text("scaling_helps"),
  podcastTopics: text("podcast_topics"),
  interviewSuggestions: text("interview_suggestions"),
  talentChallenge: text("talent_challenge"),
  jobsBoardInterest: text("jobs_board_interest"),
  additionalFeedback: text("additional_feedback"),
  notifyEmail: text("notify_email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  company: text("company"),
  title: text("title"),
  role: text("role"),
  interest: text("interest"),
  subscriptionTier: text("subscription_tier").default("free"),
  subscriptionStatus: text("subscription_status").default("active"),
  subscriptionStartDate: timestamp("subscription_start_date"),
  subscriptionEndDate: timestamp("subscription_end_date"),
  newsletterSubscribed: boolean("newsletter_subscribed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reportRegistrations = pgTable("report_registrations", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  interest: text("interest").notNull(),
  phone: text("phone"),
  website: text("website"),
  tier: text("tier").default("free"),
  newsletterOptIn: boolean("newsletter_opt_in").default(false),
  executiveSummaryDownloaded: boolean("executive_summary_downloaded").default(false),
  fullReportDownloaded: boolean("full_report_downloaded").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  subscribedAt: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
});

export const insertDealSchema = createInsertSchema(deals).omit({
  id: true,
  createdAt: true,
});

export const insertSurveyResponseSchema = createInsertSchema(surveyResponses).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertReportRegistrationSchema = createInsertSchema(reportRegistrations).omit({
  id: true,
  createdAt: true,
  executiveSummaryDownloaded: true,
  fullReportDownloaded: true,
});

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;

export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;

export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;

export type InsertDeal = z.infer<typeof insertDealSchema>;
export type Deal = typeof deals.$inferSelect;

export type InsertSurveyResponse = z.infer<typeof insertSurveyResponseSchema>;
export type SurveyResponse = typeof surveyResponses.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertReportRegistration = z.infer<typeof insertReportRegistrationSchema>;
export type ReportRegistration = typeof reportRegistrations.$inferSelect;
