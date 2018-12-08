const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const Servicio = require('../models/servicio');
const cors = require('cors');

router.options('*', cors());

router.get('/', cors(), (req, res, next) => {
  Servicio.find({}, (err, servicios) => {
    if (!servicios) {
      res.json([]);
    } else {
      if (err) return next(err);
      res.json(servicios);
    }
  }).populate('sistema.usuarioCreador', 'username')
    .populate('sistema.usuarioAsignado', 'username');
});

router.get('/:id', cors(), (req, res, next) =>{
  Servicio.findById(req.params.id,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  }).populate('sistema.usuarioCreador', 'username')
    .populate('sistema.usuarioAsignado', 'username');
});

router.post('/', cors(), (req, res, next) => {
  Servicio.create(req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', cors(),(req, res, next) => {
  Servicio.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', cors(), (req, res, next) => {
  Servicio.findByIdAndRemove(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
