const express = require('express');
const Leader = require('../models/leaders'); // Import the Leader model

const leaderRouter = express.Router();

leaderRouter.route('/')
  .get((req, res, next) => {
    Leader.find({})
      .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Leader.create(req.body)
      .then((leader) => {
        console.log('Leader Created:', leader);
        res.statusCode = 201; // 201 Created status code
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    const leaderId = req.params.leaderId;
    console.log('Received leader ID:', leaderId);
    console.log('Request body:', req.body); // Assuming you have a route parameter for the leader's ID
    Leader.findByIdAndUpdate(leaderId, { $set: req.body }, { new: true })
      .then((leader) => {
        if (leader) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(leader);
        } else {
          res.statusCode = 404;
          res.end('Leader not found');
        }
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    const leaderId = req.params.leaderId; // Assuming you have a route parameter for the leader's ID
    Leader.findByIdAndDelete(leaderId)
      .then((response) => {
        if (response) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(response);
        } else {
          res.statusCode = 404;
          res.end('Leader not found');
        }
      })
      .catch((err) => next(err));
  })
  leaderRouter.route('/:leaderId') // Use a separate route for retrieving a leader by ID
  .get((req, res, next) => {
    const leaderId = req.params.leaderId; // Get the leader ID from the route parameter
    Leader.findById(leaderId)
      .then((leader) => {
        if (leader) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(leader);
        } else {
          res.statusCode = 404;
          res.end('Leader not found');
        }
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    const leaderId = req.params.leaderId;
    
    Leader.findByIdAndUpdate(leaderId, { $set: req.body }, { new: true })
      .then((leader) => {
        if (leader) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(leader);
        } else {
          res.statusCode = 404;
          res.end('Leader not found');
        }
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    const leaderId = req.params.leaderId;
    Leader.findByIdAndDelete(leaderId)
      .then((response) => {
        if (response) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(response);
        } else {
          res.statusCode = 404;
          res.end('Leader not found');
        }
      })
      .catch((err) => next(err));
  });
  
module.exports = leaderRouter;
