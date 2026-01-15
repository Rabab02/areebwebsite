import express, { type Express } from "express";
import fs from "fs";
import path from "path";

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
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath!, "index.html"));
  });
}
