import express from 'express';
import { ensureAuthenticated } from '../utils/authMiddleware.js';
import { getAllPosts, createPost, getPostById } from '../db/posts.js';
import { getCommentsByPostId, createComment } from '../db/comments.js';
import { toggleLike, countLikes } from '../db/likes.js';

const router = express.Router();

// Show all posts
router.get('/', async (req, res) => {
  const posts = await getAllPosts();
  const loggedIn = !!req.session.user;
  const title = "Clubhouse";
  res.render('posts/index', { title, posts, loggedIn, error: null });
});

// Show create post form
router.get('/create', ensureAuthenticated, (req, res) => {
  res.render('posts/create', { title: "New Post", error: null});
});

// Handle post creation
router.post('/create', ensureAuthenticated, async (req, res) => {
  const {title, body} = req.body;
  if (!title || !body) return res.render('posts/create', { title: "New Post", error: 'Post cannot be empty.' });

  await createPost(req.session.user.id, title, body);
  res.redirect('/posts');
});

// Show single post with comments
router.get('/:id', async (req, res) => {
  const post = await getPostById(req.params.id);
  if (!post) return res.status(404).send('Post not found.');

  const comments = await getCommentsByPostId(post.id);
  const likesCount = await countLikes(post.id);
  const loggedIn = !!req.session.user;

  res.render('posts/show', {  title: "New Post", error: null, post, comments, likesCount, loggedIn });
});

// Handle liking/unliking a post
router.post('/:id/like', ensureAuthenticated, async (req, res) => {
  const userId = req.session.user.id;
  const postId = req.params.id;

  const liked = await toggleLike(userId, postId);
  res.json({ success: true, liked });
});

// Handle adding a comment
router.post('/:id/comment', ensureAuthenticated, async (req, res) => {
  const userId = req.session.user.id;
  const postId = req.params.id;
  const { body } = req.body;

  if (!body) return res.status(400).json({ error: 'Comment cannot be empty.' });

  await createComment(userId, postId, body);
  res.redirect(`/posts/${postId}`);
});

export default router;
