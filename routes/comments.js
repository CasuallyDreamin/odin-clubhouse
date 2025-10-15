import express from 'express';
import { ensureAuthenticated } from '../utils/authMiddleware.js';
import { getCommentsByPostId, createComment } from '../db/comments.js';
import { getPostById } from '../db/posts.js';

const router = express.Router();

// Fetch all comments for a specific post (optional, useful for admin panel)
router.get('/post/:postId', async (req, res) => {
  const post = await getPostById(req.params.postId);
  if (!post) return res.status(404).json({ error: 'Post not found.' });

  const comments = await getCommentsByPostId(post.id);
  res.json({ postId: post.id, comments });
});

// Create a comment for a post
router.post('/post/:postId', ensureAuthenticated, async (req, res) => {
  const userId = req.session.user.id;
  const postId = req.params.postId;
  const { body } = req.body;

  if (!body) return res.status(400).json({ error: 'Comment cannot be empty.' });

  await createComment(userId, postId, body);
  res.json({ success: true });
});

// Delete a comment (admin or author only — placeholder for now)
router.delete('/:commentId', ensureAuthenticated, async (req, res) => {
  // TODO: check if req.session.user is admin or author of the comment
  // Then call a db function to delete the comment
  res.json({ success: true, message: 'Delete endpoint placeholder' });
});

// Edit a comment (admin or author only — placeholder)
router.put('/:commentId', ensureAuthenticated, async (req, res) => {
  // TODO: check permissions and call db function to update comment
  res.json({ success: true, message: 'Edit endpoint placeholder' });
});

export default router;
