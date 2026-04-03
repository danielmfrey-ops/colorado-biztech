import type { Express } from "express";
import { type Server } from "http";
import express from "express";
import path from "path";
import bcrypt from "bcrypt";
import { storage } from "./storage";
import { insertSubscriberSchema, insertContactInquirySchema, insertSurveyResponseSchema, insertReportRegistrationSchema } from "@shared/schema";
import { sendSurveyNotification } from "./email-service";

const SALT_ROUNDS = 12;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Serve downloads folder for PDFs and screenshots
  app.use('/downloads', express.static(path.resolve(process.cwd(), 'public/downloads')));
  
  app.post("/api/subscribe", async (req, res) => {
    try {
      const data = insertSubscriberSchema.parse(req.body);
      
      const existing = await storage.getSubscriberByEmail(data.email);
      if (existing) {
        return res.status(409).json({ 
          error: "This email is already subscribed to our newsletter." 
        });
      }

      const subscriber = await storage.createSubscriber(data);
      res.status(201).json({ 
        success: true, 
        message: "Successfully subscribed to the newsletter!",
        subscriber: { id: subscriber.id, email: subscriber.email }
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to subscribe" });
      }
    }
  });

  app.post("/api/register", async (req, res) => {
    try {
      const { tier, newsletter, ...registrationData } = req.body;
      
      // Validate using Zod schema
      const parseResult = insertReportRegistrationSchema.safeParse({
        ...registrationData,
        tier: tier || 'free',
        newsletterOptIn: newsletter || false
      });
      
      if (!parseResult.success) {
        return res.status(422).json({ 
          error: "Validation failed", 
          details: parseResult.error.errors.map(e => e.message).join(', ')
        });
      }

      const validatedData = parseResult.data;

      // Check if already registered
      const existingRegistration = await storage.getReportRegistrationByEmail(validatedData.email);
      if (existingRegistration) {
        return res.status(200).json({ 
          success: true, 
          email: validatedData.email,
          message: "Welcome back! You already have access to the reports.",
          reportUrl: '/downloads/biztech100-full-report.pdf',
          summaryUrl: '/downloads/biztech100-executive-summary.pdf',
          registrationId: existingRegistration.id
        });
      }

      // Also subscribe to newsletter if opted in
      if (validatedData.newsletterOptIn) {
        const existing = await storage.getSubscriberByEmail(validatedData.email);
        if (!existing) {
          await storage.createSubscriber({ email: validatedData.email });
        }
      }

      // Save registration to the dedicated table
      const registration = await storage.createReportRegistration(validatedData);

      res.status(201).json({ 
        success: true, 
        email: validatedData.email,
        message: "Registration successful! You now have access to the BizTech 100 reports.",
        reportUrl: '/downloads/biztech100-full-report.pdf',
        summaryUrl: '/downloads/biztech100-executive-summary.pdf',
        registrationId: registration.id
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: "Registration failed. Please try again." });
    }
  });

  app.post("/api/track-download", async (req, res) => {
    try {
      const { registrationId, reportType } = req.body;
      
      if (!registrationId || !reportType) {
        return res.status(400).json({ error: "Missing registrationId or reportType" });
      }

      if (reportType !== 'executive_summary' && reportType !== 'full_report') {
        return res.status(400).json({ error: "Invalid reportType" });
      }

      const updateData = reportType === 'executive_summary' 
        ? { executiveSummaryDownloaded: true }
        : { fullReportDownloaded: true };

      await storage.updateReportRegistration(registrationId, updateData);

      res.json({ success: true });
    } catch (error) {
      console.error('Track download error:', error);
      res.status(500).json({ error: "Failed to track download" });
    }
  });

  app.get("/api/registrations", async (req, res) => {
    try {
      const registrations = await storage.getAllReportRegistrations();
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch registrations" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactInquirySchema.parse(req.body);
      
      const inquiry = await storage.createContactInquiry(data);
      res.status(201).json({ 
        success: true, 
        message: "Thank you for your inquiry! We'll get back to you within 24 hours.",
        inquiry: { id: inquiry.id }
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to submit inquiry" });
      }
    }
  });

  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllContactInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  });

  app.get("/api/companies", async (req, res) => {
    try {
      const { search, sector, city } = req.query;
      
      let companies;
      if (search || sector || city) {
        companies = await storage.searchCompanies(
          search as string || '',
          sector as string,
          city as string
        );
      } else {
        companies = await storage.getAllCompanies();
      }
      
      res.json(companies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch companies" });
    }
  });

  app.get("/api/companies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const company = await storage.getCompanyById(id);
      
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch company" });
    }
  });

  app.get("/api/deals", async (req, res) => {
    try {
      const { search, round, sector } = req.query;
      
      let dealsList;
      if (search || round || sector) {
        dealsList = await storage.searchDeals(
          search as string || '',
          round as string,
          sector as string
        );
      } else {
        dealsList = await storage.getAllDeals();
      }
      
      res.json(dealsList);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch deals" });
    }
  });

  app.get("/api/deals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deal = await storage.getDealById(id);
      
      if (!deal) {
        return res.status(404).json({ error: "Deal not found" });
      }
      
      res.json(deal);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch deal" });
    }
  });

  app.post("/api/survey/submit", async (req, res) => {
    try {
      const data = insertSurveyResponseSchema.parse(req.body);
      
      const response = await storage.createSurveyResponse(data);
      
      if (data.notifyEmail) {
        const existing = await storage.getSubscriberByEmail(data.notifyEmail);
        if (!existing) {
          await storage.createSubscriber({ email: data.notifyEmail });
        }
      }

      // Send email notification to admin (Dan@ColoradoBizTech.com)
      const adminEmail = 'Dan@ColoradoBizTech.com';
      sendSurveyNotification(
        adminEmail,
        data.email,
        data.primaryRole,
        data.featuresValued || '',
        data.additionalFeedback || ''
      ).catch(err => console.error('Failed to send notification email:', err));
      
      res.status(201).json({ 
        success: true, 
        message: "Survey submitted successfully! Thank you for your feedback.",
        id: response.id
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to submit survey" });
      }
    }
  });

  app.get("/api/survey/responses", async (req, res) => {
    try {
      const responses = await storage.getAllSurveyResponses();
      res.json(responses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch survey responses" });
    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, password, firstName, lastName, phone, company, title, role, interest, newsletterSubscribed } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters" });
      }

      const existing = await storage.getUserByEmail(email);
      if (existing) {
        return res.status(409).json({ error: "An account with this email already exists" });
      }

      const passwordHash = await hashPassword(password);

      const user = await storage.createUser({
        email,
        passwordHash,
        firstName: firstName || null,
        lastName: lastName || null,
        phone: phone || null,
        company: company || null,
        title: title || null,
        role: role || null,
        interest: interest || null,
        newsletterSubscribed: newsletterSubscribed || false,
        subscriptionTier: "free",
        subscriptionStatus: "active",
      });

      if (newsletterSubscribed) {
        const existingSub = await storage.getSubscriberByEmail(email);
        if (!existingSub) {
          await storage.createSubscriber({ email });
        }
      }

      // Set session
      req.session.userId = user.id;
      req.session.userEmail = user.email;

      res.status(201).json({ 
        success: true, 
        message: "Account created successfully!",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          subscriptionTier: user.subscriptionTier
        }
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ error: "Failed to create account" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isValidPassword = await verifyPassword(password, user.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Set session
      req.session.userId = user.id;
      req.session.userEmail = user.email;

      res.json({ 
        success: true, 
        message: "Login successful!",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          subscriptionTier: user.subscriptionTier,
          subscriptionStatus: user.subscriptionStatus
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Check current session
  app.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.json({ authenticated: false, user: null });
      }

      const user = await storage.getUserById(req.session.userId);
      if (!user) {
        req.session.destroy(() => {});
        return res.json({ authenticated: false, user: null });
      }

      res.json({
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          company: user.company,
          subscriptionTier: user.subscriptionTier,
          subscriptionStatus: user.subscriptionStatus
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to check session" });
    }
  });

  // Logout
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      res.json({ success: true, message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/user/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUserById(id);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        title: user.title,
        role: user.role,
        subscriptionTier: user.subscriptionTier,
        subscriptionStatus: user.subscriptionStatus,
        newsletterSubscribed: user.newsletterSubscribed
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  return httpServer;
}
