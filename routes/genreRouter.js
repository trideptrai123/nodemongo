const express = require('express');
const Genre = require('../models/genre'); // Import the Genre model

const genreRouter = express.Router();

genreRouter.route('/')
  .get((req, res, next) => {
    Genre.find({})
      .then((genres) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(genres);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Genre.create(req.body)
      .then((genre) => {
        console.log('Genre Created:', genre);
        res.statusCode = 201; // 201 Created status code
        res.setHeader('Content-Type', 'application/json');
        res.json(genre);
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    const genreId = req.params.genreId;
    console.log('Received genre ID:', genreId);
    console.log('Request body:', req.body); // Assuming you have a route parameter for the genre's ID
    Genre.findByIdAndUpdate(genreId, { $set: req.body }, { new: true })
      .then((genre) => {
        if (genre) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(genre);
        } else {
          res.statusCode = 404;
          res.end('Genre not found');
        }
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    const genreId = req.params.genreId; // Assuming you have a route parameter for the genre's ID
    Genre.findByIdAndDelete(genreId)
      .then((response) => {
        if (response) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(response);
        } else {
          res.statusCode = 404;
          res.end('Genre not found');
        }
      })
      .catch((err) => next(err));
  });

genreRouter.route('/:genreId') // Use a separate route for retrieving a genre by ID
  .get((req, res, next) => {
    const genreId = req.params.genreId; // Get the genre ID from the route parameter
    Genre.findById(genreId)
      .then((genre) => {
        if (genre) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(genre);
        } else {
          res.statusCode = 404;
          res.end('Genre not found');
        }
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    const genreId = req.params.genreId;

    Genre.findByIdAndUpdate(genreId, { $set: req.body }, { new: true })
      .then((genre) => {
        if (genre) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(genre);
        } else {
          res.statusCode = 404;
          res.end('Genre not found');
        }
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    const genreId = req.params.genreId;
    Genre.findByIdAndDelete(genreId)
      .then((response) => {
        if (response) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(response);
        } else {
          res.statusCode = 404;
          res.end('Genre not found');
        }
      })
      .catch((err) => next(err));
  });

module.exports = genreRouter;
