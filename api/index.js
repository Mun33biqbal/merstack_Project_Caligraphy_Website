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
    app.use("/api/auth", require("../backend/routes/authRoutes"));
    app.use("/api/products", require("../backend/routes/productRoutes"));
    app.use("/api/orders", require("../backend/routes/orderRoutes"));
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
    initializeRoutes();
    return app(req, res);
  } catch (err) {
    console.error('Handler error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};