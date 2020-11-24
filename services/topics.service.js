var topicDao = require('../daos/topicDao');

module.exports = {

    getAll: function (callback) {
        topicDao.getAll(function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        });
    },

    getById: function (id, callback) {
        topicDao.getById(id, function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        });
    },

    create: function (catagory, callback) {
        topicDao.create(catagory, function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        });
    },

    update: function (id, detailsToUpdate, callback) {
        topicDao.update(id, detailsToUpdate, function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        })
    },

    remove: function (id, callback) {
        topicDao.remove(id, function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        });
    }
}

