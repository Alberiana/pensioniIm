const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

// const signup = async (req, res, next) => {
//     try {
//         const dbUser = await User.findOne({ where: { email: req.body.email } });
//         if (dbUser) {
//             return res.status(409).json({ message: "Email already exists" });
//         } else if (req.body.email && req.body.password) {
//             const passwordHash = await bcrypt.hash(req.body.password, 12);
//             const createdUser = await User.create({
//                 email: req.body.email,
//                 name: req.body.name,
//                 password: passwordHash,
//             });
//             console.log('User created:', createdUser);
//             res.status(200).json({ message: "User created" });
//         } else {
//             return res.status(400).json({ message: "Invalid email or password provided" });
//         }
//     } catch (err) {
//         console.error('Error creating user:', err);
//         res.status(500).json({ message: "Error while creating the user" });
//     }
// };
const faceRecognition = require('your-face-recognition-library');
const User = require('../models/user'); // Assuming you have a User model

const signup = (req, res) => {
  const { idCard, name, surname, faceImage } = req.body;

  // Check if all required fields are provided
  if (!idCard || !name || !surname || !faceImage) {
    return res.status(400).json({ error: 'Please provide all required information' });
  }

  // Validate ID card, name, and surname (you may want to add more validation)
  // Example: Check if the ID card format is correct, etc.

  // Perform face recognition
  if (faceRecognition.verify(faceImage)) {
    // If face recognition is successful, proceed with user signup
    const newUser = new User({
      idCard,
      name,
      surname,
      // Other user properties...
    });

    // Save the user to the database
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

module.exports = { signup, login, isAuth };
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
