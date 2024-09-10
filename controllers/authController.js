const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [{ username: 'sebas', password: bcrypt.hashSync('12345', 10) }];

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).send('Usuario no encontrado');

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) return res.status(400).send('Contraseña incorrecta');

  const token = jwt.sign({ username: user.username }, 'secretKey', { expiresIn: '1h' });
  res.json({ token });
};
