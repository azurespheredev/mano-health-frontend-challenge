import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import MRFController from "~/controllers/MRFController";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Allow CORS
app.use("*", cors());

// Routers
app.get("/api/mrf/list", MRFController.getList);
app.get("/api/mrf/download/:filename", MRFController.downloadJSON);
app.post("/api/mrf/generate", MRFController.generateMRF);

serve({ fetch: app.fetch, port: 8080 });
console.log("Server is running on http://localhost:8080");
