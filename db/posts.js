import pool from '../config/db.js';

// Get all posts with author username
export async function getAllPosts() {
  const result = await pool.query(`
    SELECT posts.*, users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `);
  return result.rows;
}

// Get a single post by ID
export async function getPostById(id) {
  const result = await pool.query(`
    SELECT posts.*, users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.id = $1
  `, [id]);
  return result.rows[0];
}

// Create a new post
export async function createPost(userId, title, body) {
  const result = await pool.query(
    'INSERT INTO posts (user_id, title, body) VALUES ($1, $2, $3) RETURNING *',
    [userId, title, body]
  );
  return result.rows[0];
}
