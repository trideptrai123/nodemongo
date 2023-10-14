const express = require("express");
const Author = require("../models/author"); // Import the Author model

const authorRouter = express.Router();

authorRouter
  .route("/")
  .get((req, res, next) => {
    Author.find({})
      .then((authors) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(authors);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Author.create(req.body)
      .then((author) => {
        console.log("Author Created:", author);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(author);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /authors");
  })
  .delete((req, res, next) => {
    Author.deleteMany({})
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

authorRouter
  .route("/:authorId")
  .get((req, res, next) => {
    Author.findById(req.params.authorId)
      .then((author) => {
        if (!author) {
          const err = new Error(
            `Author with ID ${req.params.authorId} not found`
          );
          err.status = 404;
          return next(err);
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(author);
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    Author.findByIdAndUpdate(
      req.params.authorId,
      {
        $set: req.body,
      },
      { new: true } // To return the updated author
    )
      .then((author) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(author);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Author.findByIdAndRemove(req.params.authorId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = authorRouter;
