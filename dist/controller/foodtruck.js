'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _foodtruck = require('../model/foodtruck');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    //CRUD read,update,delete
    // Create
    api.post('/add', function (req, res) {
        var newFoodTruck = new Foodtruck();
        newFoodTruck.name = req.body.name;

        newRest.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Foodtruck saved' });
        });
    });

    // read all reastaurants
    api.get('/', function (req, res) {
        Foodtruck.find({}, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            res.json(foodtruck);
        });
    });

    // /v1/foodtruck/:id Read one foodtruck

    api.get('/:id', function (req, res) {
        Foodtruck.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            res.json(foodtruck);
        });
    });

    //update /v1/foodtruck/:id -Update
    api.put('/:id', function (req, res) {

        Foodtruck.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            foodtruck.name = req.body.name;
            foodtruck.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Foodtruck info updated" });
            });
        });
    });

    api.delete('/:id', function (req, res) {
        Foodtruck.remove({
            _id: req.params.id

        }, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Foodtruck removed" });
        });
    });

    return api;
};
//# sourceMappingURL=foodtruck.js.map