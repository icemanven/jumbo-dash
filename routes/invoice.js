const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const Invoice = require('../models/invoice');
const cors = require('cors');

router.options('*', cors());

router.get('/', cors(), (req, res, next) => {
  Invoice.find({}, (err, invoice) => {
    if (!invoice) {
      res.json([]);
    } else {
      if (err) return next(err);
      res.json(invoice);
    }
  });
});

router.get('/:id', cors(), (req, res, next) =>{
  Invoice.findById(req.params.id,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', cors(), (req, res, next) => {
  Invoice.create(req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', cors(),(req, res, next) => {
  Invoice.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', cors(), (req, res, next) => {
  Invoice.findByIdAndRemove(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
