import type { Request, Response, NextFunction } from "express";

/**
 * Middleware to disable caching on all routes by setting cache-control headers
 * This ensures clients and intermediary caches don't store responses
 *
 * @param _req - Express request object (not used)
 * @param res - Express response object to set headers on
 * @param next - Express next function to continue middleware chain
 */
const noCache = (_req: Request, res: Response, next: NextFunction): void => {
  res.set({
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "Surrogate-Control": "no-store",
  });
  next();
};

export default noCache;
