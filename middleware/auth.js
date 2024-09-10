const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Acceso denegado, no se proporcionó token.');

  try {
    const verified = jwt.verify(token, 'secretKey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Token inválido.');
  }
};

module.exports = verifyToken;
