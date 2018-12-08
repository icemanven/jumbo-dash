const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const Book = require('../models/Book.js');
const cors = require('cors');

router.options('*', cors());
/* GET ALL BOOKS */
router.get('/', cors(), (req, res, next) => {
  Book.find( (err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', cors(), (req, res, next) =>{
  Book.findById(req.params.id,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', cors(), (req, res, next) => {
  Book.create(req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE BOOK */
router.put('/:id', cors(),(req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', cors(), (req, res, next) => {
  Book.findByIdAndRemove(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
