var express = require('express');
var router = express.Router();
var questionsService = require("../services/questions.service");

/*Get all questions*/
router.get('/', function (req, res, next) {
  questionsService.getAll(function (err, response) {
    if (err) {
      console.log("Failed to get question!");
      res.status(500).send({ name: err.name, message: err.message });
    } else {
      console.log("Successfully fetched question!");
      res.status(200).send(response);
    }
  });
});

/*Get question by id*/
router.get('/:id', function (req, res, next) {
  questionsService.getById(req.params.id,function (err, response) {
    if (err) {
      console.log("Failed to get question!");
      res.status(500).send({ name: err.name, message: err.message });
    } else {
      console.log("Successfully fetched question!");
      res.status(200).send(response);
    }
  });
});

/*Create a question*/
router.post('/', function (req, res, next) {
  questionsService.create(req.body, function (err, response) {
    if (!err) {
      console.log("Successfully created question!");
      res.send(response);
    } else {
      console.log("Failed to create question!");
      res.status(500).send({ name: err.name, message: err.message });
    }
  });
});

/*Update a question*/
router.put('/:id', function (req, res, next) {
  questionsService.update(req.params.id, req.body, function (err, response) {
    if (!err) {
      console.log("Successfully updated question!");
      res.send(response);
    } else {
      console.log("Failed to update question!");
      res.status(500).send({ name: err.name, message: err.message });
    }
  });
});

/*Delete a question*/
router.delete('/:id', function (req, res, next) {
  questionsService.remove(req.params.id, function (err, response) {
    if (!err) {
      console.log("Successfully deleted question!");
      res.send(response);
    } else {
      console.log("Failed to delete question!");
      res.status(500).send({ name: err.name, message: err.message });
    }
  });
});

module.exports = router;
