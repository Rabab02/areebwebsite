/**
 * Simple rate limiting to prevent spam
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message?: string; // Custom error message
}

export function rateLimit(options: RateLimitOptions) {
  const { windowMs, maxRequests, message = "Too many requests, please try again later." } = options;

  return (req: { ip?: string }, res: { status: (code: number) => { json: (data: unknown) => void } }, next: () => void) => {
    const key = req.ip || "unknown";
    const now = Date.now();

    // Get or create entry
    let entry = store[key];

    if (!entry || entry.resetTime < now) {
      // Create new entry or reset expired one
      entry = {
        count: 1,
        resetTime: now + windowMs,
      };
      store[key] = entry;
      return next();
    }

    // Increment count
    entry.count++;

    if (entry.count > maxRequests) {
      return res.status(429).json({
        success: false,
        message,
        retryAfter: Math.ceil((entry.resetTime - now) / 1000),
      });
    }

    next();
  };
}
