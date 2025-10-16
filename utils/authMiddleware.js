function ensureAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

function setUserLocals(req, res, next) {
  res.locals.user = req.session.user || null;
  next();
}

function ensureAuthenticatedAPI(req, res, next) {
  if (req.session.user) return next();
  return res.status(401).json({ error: "Unauthorized" });
}

export { ensureAuthenticated, ensureAuthenticatedAPI, setUserLocals };
