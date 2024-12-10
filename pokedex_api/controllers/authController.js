const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = [];


const register = (req, res) => {
  const { username, password, role } = req.body;
  

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }


  const hashedPassword = bcrypt.hashSync(password, 8);

  const newUser = { id: users.length + 1, username, password: hashedPassword, role: role || 'trainer' };
  users.push(newUser);

  res.status(201).json({ message: 'Usuario registrado con éxito' });
};


const login = (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ message: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login exitoso', token });
};

module.exports = { register, login };
