const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const Penalidad = require('../models/panalidad');
const cors = require('cors');

router.options('*', cors());

router.get('/', cors(), (req, res, next) => {
  Penalidad.find( (err, penaliad) => {
    if (!penaliad) {
      res.json([]);
    } else {
      if (err) return next(err);
      res.json(penaliad);
    }
  });
});

router.get('/:id', cors(), (req, res, next) =>{
  Penalidad.findById(req.params.id,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', cors(), (req, res, next) => {
  Penalidad.create(req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', cors(),(req, res, next) => {
  Penalidad.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', cors(), (req, res, next) => {
  Penalidad.findByIdAndRemove(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
