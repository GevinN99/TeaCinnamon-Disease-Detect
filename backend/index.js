const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const session = require("express-session")
require("dotenv").config()

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express()

// Middleware
app.use(
	cors({
		origin: ["http://localhost:8081"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
)
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
	session({
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: true,
	})
)

// Connect to MongoDB
connectDB()

// Routes
app.use("/api/users", userRoutes)

// Export app for testing
module.exports = app;

// Start the server only if not in test mode
if (require.main === module) {
	const PORT = process.env.PORT || 8070;
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }

