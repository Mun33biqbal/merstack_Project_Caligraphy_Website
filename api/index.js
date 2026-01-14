const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../backend/config/db");

dotenv.config();
connectDB();

const app = express();

// ENABLE CORS
const allowedOrigins = process.env.ORIGIN ? process.env.ORIGIN.split(',') : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

// Serve uploads folder
app.use('/uploads', express.static('../backend/uploads'));
// Lazy-initialize routes to avoid module-load crashes in serverless runtime
let initialized = false;
function initializeRoutes() {
  if (initialized) return;
  try {
    // Register routes without the '/api' prefix. Vercel routes '/api/*' to this function,
    // so we'll strip the '/api' prefix from incoming requests in the handler below.
    app.use("/auth", require("../backend/routes/authRoutes"));
    app.use("/products", require("../backend/routes/productRoutes"));
    app.use("/orders", require("../backend/routes/orderRoutes"));
    initialized = true;
  } catch (err) {
    console.error('Failed to initialize routes:', err);
    // Do not throw here so the function can return a controlled error response.
  }
}

app.get("/", (req, res) => {
  res.send("Calligraphy API Running");
});

// Export a serverless-compatible handler for Vercel
module.exports = (req, res) => {
  try {
    // Vercel invokes the function at the same path it received (e.g., '/api/').
    // Strip the '/api' prefix so Express routes (registered without '/api') match correctly.
    if (req.url && req.url.startsWith('/api')) {
      req.url = req.url.replace(/^\/api/, '') || '/';
    }

    initializeRoutes();
    return app(req, res);
  } catch (err) {
    console.error('Handler error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};