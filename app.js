import express from 'express';
import pool from './config/db.js';
import sessionConfig from './config/session.js';
import { initDB } from './db/init.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import { setUserLocals } from './utils/authMiddleware.js';
import expressLayouts from "express-ejs-layouts";

const app = express();

async function startServer() {
  try {
    // Test database connection
    await pool.query('SELECT 1');
    console.log('Database connection successful');

    // Initialize database schema
    await initDB();

    // Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(sessionConfig);
    app.use(setUserLocals);

    app.use(express.static('public'));
    app.set('view engine', 'ejs');
    app.use(expressLayouts);
    app.set("layout", "layouts/main");
    // Routes
    app.use('/auth', authRoutes);
    app.use('/posts', postRoutes);
    app.use('/comments', commentRoutes);

    // Home route (optional)
    app.get('/', (req, res) => {
      res.redirect('/posts');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
