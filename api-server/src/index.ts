import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import summaryRoutes from "./routes/summary";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/summary", summaryRoutes);

// Root route - redirect to API documentation or summary
app.get("/", (_req, res) => {
  res.send(`
    <html>
      <head>
        <title>User Data API</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          pre { background-color: #f5f5f5; padding: 15px; border-radius: 5px; overflow: auto; }
          h1, h2 { color: #333; }
          a { color: #0066cc; }
        </style>
      </head>
      <body>
        <h1>User Data API</h1>
        <p>Welcome to the User Data API. This API provides user data grouped by department.</p>

        <h2>Available Endpoints:</h2>
        <ul>
          <li><a href="/api/summary">/api/summary</a> - Get user data grouped by department</li>
          <li><a href="/health">/health</a> - Health check endpoint</li>
        </ul>

     
      </body>
    </html>
  `);
});

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Start server
app.listen(port, () => {
  console.log(`✅ API server running at http://localhost:${port}`);
  console.log(`🔍 Try accessing: http://localhost:${port}/api/summary`);
});
