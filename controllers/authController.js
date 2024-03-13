const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');


async function login(req, res) {
  const { username, password } = req.body;
  console.log(username,password);
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    
    if (!user) {
      return res.status(400).json({ message: 'users doesn"t exist' });
    }

    // Convert stored password (buffer) to string before comparing
    const storedPassword = user.password.toString();
    const isPasswordValid = await bcrypt.compare(password, storedPassword);

    if (password!=storedPassword) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ token, user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


async function signUp(req, res) {
  const { username, password, email, id } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (id, email, username, password) VALUES ($1, $2, $3, $4)',[id,email,username,password]);
    const token = jwt.sign({ id: id, username: username }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ message: 'success', token });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(400).json({ message: 'some error occured' });
  }
}
module.exports = { signUp , login  };
