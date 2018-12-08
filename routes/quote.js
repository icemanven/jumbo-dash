const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const Quote = require('../models/quote');
const cors = require('cors');

router.options('*', cors());

router.get('/', cors(), (req, res, next) => {
  Quote.find({}, (err, quotes) => {
    if (!quotes) {
      res.json([]);
    } else {
      if (err) return next(err);
      res.json(quotes);
    }
  });
});

router.get('/:id', cors(), (req, res, next) =>{
  Quote.findById(req.params.id,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', cors(), (req, res, next) => {
  Quote.create(req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', cors(),(req, res, next) => {
  Quote.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', cors(), (req, res, next) => {
  Quote.findByIdAndRemove(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
