const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const SalesOrder = require('../models/salesorder');
const cors = require('cors');

router.options('*', cors());

router.get('/', cors(), (req, res, next) => {
  SalesOrder.find({}, (err, salesorder) => {
    if (!salesorder) {
      res.json([]);
    } else {
      if (err) return next(err);
      res.json(salesorder);
    }
  });
});

router.get('/:id', cors(), (req, res, next) =>{
  SalesOrder.findById(req.params.id,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', cors(), (req, res, next) => {
  SalesOrder.create(req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', cors(),(req, res, next) => {
  SalesOrder.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', cors(), (req, res, next) => {
  SalesOrder.findByIdAndRemove(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
