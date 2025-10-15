import pool from '../config/db.js';

// Toggle like for a post
export async function toggleLike(userId, postId) {
  // Check if like exists
  const existing = await pool.query(
    'SELECT * FROM likes WHERE user_id = $1 AND post_id = $2',
    [userId, postId]
  );

  if (existing.rows.length > 0) {
    // Unlike
    await pool.query(
      'DELETE FROM likes WHERE user_id = $1 AND post_id = $2',
      [userId, postId]
    );
    return false;
  } else {
    // Like
    await pool.query(
      'INSERT INTO likes (user_id, post_id) VALUES ($1, $2)',
      [userId, postId]
    );
    return true;
  }
}

// Count likes for a post
export async function countLikes(postId) {
  const result = await pool.query(
    'SELECT COUNT(*) FROM likes WHERE post_id = $1',
    [postId]
  );
  return parseInt(result.rows[0].count, 10);
}
