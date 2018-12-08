const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const User = require('../models/user.js');
const cors = require('cors');

router.options('*', cors());

router.get('/:username', cors(), function(req, res, next) {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (!user) {
      // res.sendStatus(404);
      res.json(false);
    } else {
      if (err) return next(err);
      return res.json(user);
    }
  });
});

router.get('/', cors(), function(req, res, next) {;
  User.find( (err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});



/* SAVE BOOK */
router.post('/', cors(),function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE BOOK */
router.put('/:id', cors(),function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
