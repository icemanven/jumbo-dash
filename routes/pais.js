const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const Pais = require('../models/pais');
const cors = require('cors');

router.options('*', cors());

router.get('/', cors(), (req, res, next) => {
  Pais.find( (err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/:pais', cors(), function(req, res, next) {;

  Pais.findOne({'info.nombre': req.params.pais }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/:id', cors(), (req, res, next) =>{
  Pais.findById(req.params.id,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', cors(), (req, res, next) => {
  Pais.create(req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', cors(),(req, res, next) => {
  Pais.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', cors(), (req, res, next) => {
  Pais.findByIdAndRemove(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
