const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if(!authHeader) return res.status(401).json({ message: 'Pas de token' });
  const parts = authHeader.split(' ');
  if(parts.length !== 2) return res.status(401).json({ message: 'Token invalide' });
  const token = parts[1];
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  }catch(err){
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};
