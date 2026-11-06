import { defineConfig } from "@playwright/test";

const phone = { hasTouch: true, isMobile: true };

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: { baseURL: "http://localhost:4173/tango-dojo/", trace: "retain-on-failure" },
  webServer: {
    command: "npm run build && npm run preview -- --port 4173 --strictPort",
    url: "http://localhost:4173/tango-dojo/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: "phone-360", use: { viewport: { width: 360, height: 740 }, ...phone } },
    { name: "phone-390", use: { viewport: { width: 390, height: 844 }, ...phone } },
    { name: "tablet-768", use: { viewport: { width: 768, height: 1024 } } },
    { name: "desktop-1280", use: { viewport: { width: 1280, height: 800 } } },
    { name: "phone-390-dark", use: { viewport: { width: 390, height: 844 }, ...phone, colorScheme: "dark" } },
    { name: "desktop-1280-dark", use: { viewport: { width: 1280, height: 800 }, colorScheme: "dark" } },
  ],
});
