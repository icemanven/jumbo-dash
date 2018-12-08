const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const Moneda = require('../models/moneda');
const cors = require('cors');

router.options('*', cors());

router.get('/', cors(), (req, res, next) => {
  Moneda.find( (err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/:id', cors(), (req, res, next) =>{
  Moneda.findById(req.params.id,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', cors(), (req, res, next) => {
  if (req.body.principal === true) {
    Moneda.updateMany({},{ $set: { principal: false }},  { "multi": true }, (errr, postt) => {
      if (err) return next(errr);
      Moneda.create(req.body,  (err, post) => {
        if (err) return next(err);
        res.json(post);
      });
    })
  } else {
    Moneda.create(req.body,  (err, post) => {
      if (err) return next(err);
      res.json(post);
    });
  }

});

router.put('/:id', cors(),(req, res, next) => {
  if (req.body.principal === true) {
    Moneda.updateMany({},{ $set: { principal: false }},  { "multi": true }, (errr, postt) => {
      if (err) return next(errr);
      Moneda.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
        if (err) return next(err);
        res.json(post);
      });
    })
  } else {
    Moneda.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
      if (err) return next(err);
      res.json(post);
    });
  }

});

router.delete('/:id', cors(), (req, res, next) => {
  if (res.body.principal === false) {
    Moneda.findByIdAndRemove(req.params.id, req.body,  (err, post) => {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return next('No puede Eliminar la moneda principal')
  }

});

module.exports = router;
