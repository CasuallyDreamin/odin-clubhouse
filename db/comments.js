import pool from '../config/db.js';

// Get comments for a post with author username
export async function getCommentsByPostId(postId) {
  const result = await pool.query(`
    SELECT comments.*, users.username
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.post_id = $1
    ORDER BY comments.created_at ASC
  `, [postId]);
  return result.rows;
}

// Create a new comment
export async function createComment(userId, postId, body) {
  const result = await pool.query(
    'INSERT INTO comments (user_id, post_id, body) VALUES ($1, $2, $3) RETURNING *',
    [userId, postId, body]
  );
  return result.rows[0];
}
