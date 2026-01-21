import { type Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { getSEOData, getLanguageFromURL } from "./seo-config";
import { injectSEO } from "./seo-injector";

const viteLogger = createLogger();

export async function setupVite(server: Server, app: Express) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, path: "/vite-hmr" },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  // Don't let Vite handle API routes - must be before vite.middlewares
  app.use((req, res, next) => {
    if (req.path.startsWith("/api") || req.originalUrl.startsWith("/api")) {
      return next();
    }
    vite.middlewares(req, res, next);
  });

  app.use("*", async (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith("/api")) {
      return next();
    }
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      let page = await vite.transformIndexHtml(url, template);
      
      // Inject SEO meta tags server-side
      const language = getLanguageFromURL(req.originalUrl);
      const seoData = getSEOData(req.path, language);
      
      if (seoData) {
        try {
          page = injectSEO(page, seoData);
        } catch (error) {
          console.error("Error injecting SEO in development:", error);
          // Continue with page as-is if injection fails
        }
      }
      
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
