import type { Express, Request, Response } from "express";
import { type Server } from "http";
import { contactFormSchema } from "../shared/contact-schema";
import { sendContactNotification, sendContactConfirmation } from "./email";
import { successResponse, errorResponse } from "./utils/api-response";
import { rateLimit } from "./middleware/rate-limit";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Test endpoint to verify routes are working
  app.get("/api/test", (req: Request, res: Response) => {
    res.json(successResponse("API is working!", { timestamp: new Date().toISOString() }));
  });

  // Contact form endpoint - rate limited to prevent spam
  app.post(
    "/api/contact",
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 5, // 5 submissions per 15 minutes
      message: "Too many submissions. Please try again later.",
    }),
    async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validationResult = contactFormSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        return res.status(400).json(
          errorResponse(firstError?.message || "Invalid form data")
        );
      }

      const formData = validationResult.data;

      // Send emails in parallel (non-blocking if one fails)
      await Promise.all([
        sendContactNotification(formData),
        sendContactConfirmation(formData).catch((err: unknown) => {
          // Log but don't fail if confirmation email fails
          console.error("Confirmation email failed:", err);
        }),
      ]);

      return res.status(200).json(
        successResponse("Thank you for your message. We'll get back to you soon!")
      );
    } catch (error: unknown) {
      console.error("Contact form error:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to send message. Please try again later.";
      
      return res.status(400).json(errorResponse(errorMessage));
    }
  }
  );

  return httpServer;
}
