var catagoryDao = require('../daos/catagoryDao');

module.exports = {

    getAll: function (callback) {
        catagoryDao.getAll(function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        });
    },

    getById: function (id, callback) {
        catagoryDao.getById(id, function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        });
    },

    create: function (catagory, callback) {
        catagoryDao.create(catagory, function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        });
    },

    update: function (id, detailsToUpdate, callback) {
        catagoryDao.update(id, detailsToUpdate, function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        })
    },

    remove: function (id, callback) {
        catagoryDao.remove(id, function (err, res) {
            if(err){
                callback(err,null);
            } else {
                callback(null,res);   
            }
        });
    }
}

