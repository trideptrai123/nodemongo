const express = require('express');
const Promotion = require('../models/promotions'); // Import the Promotion model

const promoRouter = express.Router();

promoRouter.route('/')
  .get((req, res, next) => {
    Promotion.find({})
      .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Promotion.create(req.body)
      .then((promotion) => {
        console.log('Promotion Created:', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
  })
  .delete((req, res, next) => {
    Promotion.deleteMany({})
      .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch((err) => next(err));
  });
  promoRouter.route('/:promoId')
  .get((req, res, next) => {
    Promotion.findById(req.params.promoId)
      .then((promotion) => {
        if (!promotion) {
          const err = new Error(`Promotion with ID ${req.params.promoId} not found`);
          err.status = 404;
          return next(err);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    Promotion.findByIdAndUpdate(
      req.params.promoId,
      {
        $set: req.body
      },
      { new: true } // To return the updated promotion
    )
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Promotion.findByIdAndRemove(req.params.promoId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch((err) => next(err));
  });
module.exports = promoRouter;
