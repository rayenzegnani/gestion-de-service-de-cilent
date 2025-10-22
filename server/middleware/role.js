module.exports = function(allowed){
  return function(req, res, next){
    if(!req.user) return res.status(401).json({ message: 'Pas authentifié' });
    if(!allowed.includes(req.user.role)) return res.status(403).json({ message: 'Accès refusé' });
    next();
  }
};
