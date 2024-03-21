const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../models/User.js');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = 'MynameisEndtoEndYoutubeChannel1$#';
const manMail = process.env.MAN_MAIL;
// router.post(
//   '/createuser',
//   [
//     body('email', 'Enter valid email id').isEmail(),
//     body('password', 'Password length should be alteast 5').isLength({
//       min: 5,
//     }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ error: errors.array() });
//     }

//     try {
//       const email = req.body.email;
//       const userData = await UserModel.findOne({ email });
//       if (userData) {
//         return res
//           .status(400)
//           .json({ error: [{ msg: 'Email id already exists' }] });
//       }
//     } catch (err) {
//       return res.status(400).json({ error: [{ msg: 'DB error' }] });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const secPassword = await bcrypt.hash(req.body.password, salt);

//     const user = new UserModel({
//       name: req.body.name,
//       password: secPassword,
//       email: req.body.email,
//       location: req.body.location,
//     });
//     try {
//       const response = await user.save();
//       res.json({ success: true });
//     } catch (err) {
//       console.log(err);
//       res.json({ success: false, error: [{ msg: 'DB error' }] });
//     }
//   }
// );

router.post(
  '/loginuser',
  [
    body('email', 'No such email id registered').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const email = req.body.email;
    const currpassword = req.body.password;

    try {
      const userData = await UserModel.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: 'Incorrect credentials' });
      }

      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare) {
        return res.status(400).json({ errors: 'Incorrect credentials' });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({
        success: true,
        authToken,
        role: email === manMail ? 'Manager' : 'Sales',
      });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);
module.exports = router;
