var express = require('express');
var router = express.Router();
var topicsService = require("../services/topics.service");

/*Get all catagories*/
router.get('/', function (req, res, next) {
  topicsService.getAll(function (err, response) {
    if (err) {
      console.log("Failed to get topic!");
      res.status(500).send({ name: err.name, message: err.message });
    } else {
      console.log("Successfully fetched topic!");
      res.status(200).send(response);
    }
  });
});

/*Get topic by id*/
router.get('/:id', function (req, res, next) {
  topicsService.getById(req.params.id,function (err, response) {
    if (err) {
      console.log("Failed to get topic!");
      res.status(500).send({ name: err.name, message: err.message });
    } else {
      console.log("Successfully fetched topic!");
      res.status(200).send(response);
    }
  });
});

/*Create a topic*/
router.post('/', function (req, res, next) {
  topicsService.create(req.body, function (err, response) {
    if (!err) {
      console.log("Successfully created topic!");
      res.send(response);
    } else {
      console.log("Failed to create topic!");
      res.status(500).send({ name: err.name, message: err.message });
    }
  });
});

/*Update a topic*/
router.put('/:id', function (req, res, next) {
  topicsService.update(req.params.id, req.body, function (err, response) {
    if (!err) {
      console.log("Successfully updated topic!");
      res.send(response);
    } else {
      console.log("Failed to update topic!");
      res.status(500).send({ name: err.name, message: err.message });
    }
  });
});

/*Delete a topic*/
router.delete('/:id', function (req, res, next) {
  topicsService.remove(req.params.id, function (err, response) {
    if (!err) {
      console.log("Successfully deleted topic!");
      res.send(response);
    } else {
      console.log("Failed to delete topic!");
      res.status(500).send({ name: err.name, message: err.message });
    }
  });
});

module.exports = router;
