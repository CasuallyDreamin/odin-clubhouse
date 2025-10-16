function ensureSecretEntered(req, res, next) {
  // Allow the secret page itself without the check
  if (req.path === '/enter') return next();
    
  // If visitor hasn’t entered passphrase, redirect them
  if (!req.session.secretPassed) return res.redirect('/enter');

  next();
}

export default ensureSecretEntered;
