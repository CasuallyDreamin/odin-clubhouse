import express from 'express';

const router = express.Router();

// GET secret passage page
router.get('/', (req, res) => {
  res.render('secret/enter', { title: "Enter the Secret Passage", error: null });
});

// POST secret passage form
router.post('/', (req, res) => {
  const { passphrase } = req.body;
  const SECRET_CODE = process.env.SECRET_CODE || "open-sesame";

  if (passphrase === SECRET_CODE) {
    req.session.secretPassed = true;
    return res.redirect('/posts'); // redirect to main feed after success
  }

  res.render('secret/enter', { title: "Enter the Secret Passage", error: "Wrong passphrase!" });
});

export default router;
