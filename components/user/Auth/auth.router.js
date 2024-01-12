const express = require('express');
const router = express.Router();
const Controller = require('./auth.controller');
const passport = require('passport');
const User = require('../../../models/User');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const EmailService = require('../../../config/mailService');
function generateUniqueId(email) {
    return crypto.createHash('sha256').update(email).digest('hex');
  }
router.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
      if (err) {
        console.log('Error from server:', err); // Log error from server
        return res.status(500).send(err);
      }
      if (!user) {
        console.log('Error from user:', info.message); // Log error from user
        return res.status(400).send(info.message);
      }
      // NEED TO CALL req.login()!!!
      req.login(user, function(err) {
        if (err) { return next(err); }
        return res.status(200).send(user);
      });
    })(req, res, next);
  }
  );

  router.post('/register', async (req, res, next) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const id = generateUniqueId(email);
  
      const user = await User.findOne({ 'id': id });
      if (user) {
        return res.status(400).send('This email has already been registered');
      } else {
        const newUser = new User();
        newUser.id = id;
        newUser.name = name;
        newUser.email = email;
        newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const token = crypto.randomBytes(20).toString('hex');
        newUser.emailVerificationToken = token;
        newUser.emailVerificationExpires = Date.now() + 3600000;
        // req.logIn(user, function (err) {
          //   if (err) { return next(err); }
          //   const token = crypto.randomBytes(20).toString('hex');
          //   user.emailVerificationToken = token;
          //   user.emailVerificationExpires = Date.now() + 3600000; // 1 hour
          //   // Gửi email xác nhận
          //   EmailService({ customerMail: email, token: token });
          //   return res.redirect('/login');
          //   ;
          // })
        const savedUser = await newUser.save();
        await EmailService({ customerMail: email, href: `https://flashcard-backend-kuup.onrender.com/auth/verify/${token}`, subject: "Monen app - Email Verification" });
  
        return res.status(200).send(savedUser);
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });
router.get('/verify/:token', Controller.Verify);

module.exports = router