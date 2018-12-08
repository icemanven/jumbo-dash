const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const cors = require('cors');
const Vendor = require('../models/vendor');

router.options('*', cors());

router.get('/:crmid', cors(), function(req, res, next) {
  const vendor = req.params.crmid;
  Vendor.findOne(vendor, function (err, vendor) {
    if (err) return next(err);
    res.json(vendor);
  });
});

router.post('/', cors(),function(req, res, next) {
  Vendor.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', cors(),function(req, res, next) {
  Vendor.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
