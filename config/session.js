// session.js
import session from "express-session";

export default session({
  secret: process.env.SESSION_SECRET || "changeme",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // set true if using https
});
