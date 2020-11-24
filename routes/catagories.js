var express = require('express');
var router = express.Router();
var catagoriesService = require("../services/catagories.service");

/*Get all catagories*/
router.get('/', function (req, res, next) {
  catagoriesService.getAll(function (err, response) {
    if (err) {
      console.log("Failed to get catagory!");
      res.status(500).send({ name: err.name, message: err.message });
    } else {
      console.log("Successfully fetched catagory!");
      res.status(200).send(response);
    }
  });
});

/*Get catagory by id*/
router.get('/:id', function (req, res, next) {
  catagoriesService.getById(req.params.id,function (err, response) {
    if (err) {
      console.log("Failed to get catagory!");
      res.status(500).send({ name: err.name, message: err.message });
    } else {
      console.log("Successfully fetched catagory!");
      res.status(200).send(response);
    }
  });
});

/*Create a catagory*/
router.post('/', function (req, res, next) {
  catagoriesService.create(req.body, function (err, response) {
    if (!err) {
      console.log("Successfully created catagory!");
      res.send(response);
    } else {
      console.log("Failed to create catagory!");
      res.status(500).send({ name: err.name, message: err.message });
    }
  });
});

/*Update a catagory*/
router.put('/:id', function (req, res, next) {
  catagoriesService.update(req.params.id, req.body, function (err, response) {
    if (!err) {
      console.log("Successfully updated catagory!");
      res.send(response);
    } else {
      console.log("Failed to update catagory!");
      res.status(500).send({ name: err.name, message: err.message });
    }
  });
});

/*Delete a catagory*/
router.delete('/:id', function (req, res, next) {
  catagoriesService.remove(req.params.id, function (err, response) {
    if (!err) {
      console.log("Successfully deleted catagory!");
      res.send(response);
    } else {
      console.log("Failed to delete catagory!");
      res.status(500).send({ name: err.name, message: err.message });
    }
  });
});

module.exports = router;
