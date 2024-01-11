const express = require('express');
const router = express.Router();
const Controller = require('./auth.controller');
const passport = require('passport');
const User = require('../../../models/User');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
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
        // const token = crypto.randomBytes(20).toString('hex');
        // newUser.emailVerificationToken = token;
        // newUser.emailVerificationExpires = Date.now() + 3600000;
        newUser.emailVerified = true;

        await newUser.save();
        req.logIn(newUser, function (err) {
            if (err) { return next(err); }

            // const token = crypto.randomBytes(20).toString('hex');
            // user.emailVerificationToken = token;
            // user.emailVerificationExpires = Date.now() + 3600000; // 1 hour
            // Gửi email xác nhận
            // EmailService({ customerMail: email, token: token });
            // return res.redirect('/login');
            return res.status(200).send(newUser);
            ;
          })
        // const savedUser = await newUser.save();
        // await EmailService({ customerMail: email, href: `http://localhost:3000/register/verify/${token}`, subject: "TCG-Trading Card Games - Email Verification" });
  
        // return res.redirect('/login');
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });
module.exports = router