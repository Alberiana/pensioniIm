const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const faceRecognition = require('face-api.js');



const signup =  async (req, res)=> {
  const { idCard, name, surname, faceImage } = req.body;

  // Check if all required fields are provided
  if (!idCard || !name || !surname || !faceImage) {
    return res.status(400).json({ error: 'Please provide all required information' });
  }
  const detection = await faceapi.detectSingleFace(faceImage);

  if (detection) {
    // If face recognition is successful, proceed with user signup
    const newUser = new User({
      idCard,
      name,
      surname,
    });

    newUser.save((err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to create user' });
      }
      res.status(200).json({ message: 'Signup successful', user });
    });
  } else {
    res.status(401).json({ error: 'Face recognition failed' });
  }
};



const login = async (req, res, next) => {
    try {
        const dbUser = await User.findOne({ where: { email: req.body.email } });
        if (!dbUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const compareRes = await bcrypt.compare(req.body.password, dbUser.password);
        if (compareRes) {
            const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
            res.status(200).json({ message: "User logged in", token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: "Error during login process" });
    }
};

const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secret');
        if (!decodedToken) {
            res.status(401).json({ message: 'Unauthorized' });
        } else {
            res.status(200).json({ message: 'Here is your resource' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Could not decode the token' });
    }
};

module.exports = { signup, login, isAuth };
