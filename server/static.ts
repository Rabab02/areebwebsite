import express, { type Express, type Request, type Response } from "express";
import fs from "fs";
import path from "path";
import { getSEOData, getLanguageFromURL } from "./seo-config";
import { injectSEO } from "./seo-injector";

export function serveStatic(app: Express) {
  // When bundled, __dirname points to dist/, so public is at dist/public
  // Also try process.cwd() in case working directory is different
  const possiblePaths = [
    path.resolve(__dirname, "public"),                    // Standard: dist/public
    path.resolve(process.cwd(), "dist", "public"),        // From working dir
    path.resolve(process.cwd(), "public"),                // Direct public
  ];
  
  let distPath: string | null = null;
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      distPath = possiblePath;
      break;
    }
  }
  
  if (!distPath) {
    // More helpful error message
    const cwd = process.cwd();
    throw new Error(
      `Could not find the build directory. Tried paths:\n` +
      `  - ${path.resolve(__dirname, "public")}\n` +
      `  - ${path.resolve(cwd, "dist", "public")}\n` +
      `  - ${path.resolve(cwd, "public")}\n` +
      `Current working directory: ${cwd}\n` +
      `__dirname: ${__dirname}\n` +
      `Make sure dist/public/ folder exists with index.html inside.`
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  // Inject SEO meta tags server-side before serving
  app.use("*", (req: Request, res: Response) => {
    const indexPath = path.resolve(distPath!, "index.html");
    
    // Read the HTML file
    fs.readFile(indexPath, "utf-8", (err, html) => {
      if (err) {
        console.error("Error reading index.html:", err);
        return res.status(500).send("Internal Server Error");
      }

      // Get SEO data for this route
      const language = getLanguageFromURL(req.originalUrl);
      const seoData = getSEOData(req.path, language);

      // If we have SEO data, inject it into the HTML
      if (seoData) {
        try {
          const htmlWithSEO = injectSEO(html, seoData);
          res.setHeader("Content-Type", "text/html");
          return res.send(htmlWithSEO);
        } catch (error) {
          console.error("Error injecting SEO:", error);
          // Fall back to original HTML if injection fails
        }
      }

      // Fall back to original HTML
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    });
  });
}
