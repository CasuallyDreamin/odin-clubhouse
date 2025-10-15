import express from 'express';
import session from 'express-session';
import pool from './config/db.js';
import sessionConfig from './config/session.js';
import { initDB } from './db/init.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import { setUserLocals } from './utils/authMiddleware.js';

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
    app.use(session(sessionConfig));
    app.use(setUserLocals);

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
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
