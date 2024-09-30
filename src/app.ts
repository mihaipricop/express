import express from "express";
import session from "express-session";
import cors from 'cors';
import dataRoutes from "./routes/data.routes";
import { morganMiddleware } from "./middleware/logger";
import passport from "./middleware/passportConfig";
import { loginUser, registerUser, logoutUser } from "./controllers/auth.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morganMiddleware); // Added missing semicolon

// Session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());


// Routes for handling authentication
app.post('/login', passport.authenticate('local'), loginUser)
app.post('/register', registerUser)
app.get('/logout', logoutUser)

// Routes for handling data CRUD
app.use("/data", dataRoutes);

// Catch-all route
app.use("/", (_req, res) => {
  res.json({ message: "Backend catch-all" });
});

export default app;