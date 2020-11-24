var questionDao = require('../daos/questionDao');

module.exports = {

    getAll: function (callback) {
        questionDao.getAll(function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        });
    },

    getById: function (id, callback) {
        questionDao.getById(id, function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        });
    },

    create: function (catagory, callback) {
        questionDao.create(catagory, function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        });
    },

    update: function (id, detailsToUpdate, callback) {
        questionDao.update(id, detailsToUpdate, function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        })
    },

    remove: function (id, callback) {
        questionDao.remove(id, function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        });
    }
}

