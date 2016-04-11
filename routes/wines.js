var express = require('express'), 
    mongo = require('mongodb'), 
    router = express.Router();

var db = require('../db');

router.get('/', function(req, res) {
    var collection = db.get().collection('wines');

    collection.find().toArray(function(err, docs) {
        res.send(docs);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get().collection('wines');
    var id = req.params.id;
    var o_id = new mongo.ObjectID(id);

    collection.findOne({'_id': o_id}, function(err, doc) {
        res.send(doc);
    });
});

router.post('/', function(req, res) {
    var collection = db.get().collection('wines');
    var wine = req.body;

    collection.insert(wine, {safe:true}, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(result[0]);
        }
    });
});

router.put('/:id', function(req, res) {
    var collection = db.get().collection('wines');
    var id = req.params.id;
    var o_id = new mongo.ObjectID(id);
    var wine = req.body;

    collection.update({'_id':o_id}, wine, {safe:true}, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(wine);
        }
    });
});

router.delete('/:id', function(req, res) {
    var collection = db.get().collection('wines');
    var id = req.params.id;
    var o_id = new mongo.ObjectID(id);

    collection.remove({'_id':o_id}, {safe:true}, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            res.send(req.body);
        }
    });
});

module.exports = router;