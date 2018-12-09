const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const Habitacion = require('../models/habitacion');
const cors = require('cors');

router.options('*', cors());

router.get('/', cors(), (req, res, next) => {
  Habitacion.find( (err, products) => {
    if (err) return next(err);
    res.json(products);
  }).populate('sistema.usuarioCreador', 'username')
      .populate('sistema.usuarioAsignado', 'username');
});

router.get('/:id', cors(), (req, res, next) =>{
  Habitacion.findById(req.params.id,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  }).populate('sistema.usuarioCreador', 'username')
      .populate('sistema.usuarioAsignado', 'username');
});

router.post('/', cors(), (req, res, next) => {
  Habitacion.create(req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', cors(),(req, res, next) => {
  Habitacion.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', cors(), (req, res, next) => {
  Habitacion.findByIdAndRemove(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
