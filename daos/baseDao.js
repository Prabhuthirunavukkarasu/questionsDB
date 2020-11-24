var mongodb = require('./mongoUtil');

function getAll(callback) {
    var db = mongodb.getDb();
    var coll = db.collection(this.getCollectionName());
    coll.find({}).toArray(function (err, result) {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }
    });
}

function getById(id, proj, callback) {
    var db = mongodb.getDb();
    var coll = db.collection(this.getCollectionName());
    coll.findOne({ _id: mongodb.ObjectID(id) }, proj, function (err, result) {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }
    });

}

function create(record, callback) {
    var db = mongodb.getDb();
    var coll = db.collection(this.getCollectionName());
    coll.insertOne(record, function (err, result) {
        if (!err) {
            callback(null, result.ops[0]);
        } else {
            callback(err, null);
        }
    });
}

function update(id, detailsToUpdate, callback) {
    var db = mongodb.getDb();
    var coll = db.collection(this.getCollectionName());

    var deletedId;
    if (detailsToUpdate._id) {
        deletedId = detailsToUpdate._id;
        delete detailsToUpdate._id;
    }

    coll.updateOne({ _id: mongodb.ObjectID(id) }, { $set: detailsToUpdate }, { multi: false }, function (err, result) {
        if (deletedId) {
            detailsToUpdate._id = deletedId;
        }
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }
    });

}

function remove(id, callback) {
    var db = mongodb.getDb();
    var coll = db.collection(this.getCollectionName());
    coll.deleteOne({ _id: mongodb.ObjectID(id) }, function (err, result) {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }
    });
}

module.exports = function BaseDao(collectionName) {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        update: update,
        remove: remove,
        getCollectionName: function () {
            return collectionName;
        },
    };
};