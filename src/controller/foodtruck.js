import mongoose from 'mongoose';
import {Router} from 'express';
import FoodTruck from '../model/foodtruck';
import Review from '../model/review'
import {authenticate} from '../middleware/authMiddleware';


export default ({config, db}) => {
    let api = Router();

    //CRUD read,update,delete
    // Create
    api.post('/add',authenticate, (req, res) => {
        let newFoodTruck = new FoodTruck();
        newFoodTruck.name = req.body.name;
        newFoodTruck.foodtype = req.body.foodtype;
        newFoodTruck.avgcost = req.body.avgcost;

        newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;

        newFoodTruck.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Foodtruck saved'});

        });

    });

    // read all reastaurants
    api.get('/', authenticate,(req, res) => {
        FoodTruck.find({}, (err, foodtruck) => {
            if (err) {
                res.send(err);
            }
            res.json(foodtruck);

        });
    });

    // /v1/foodtruck/:id Read one foodtruck

    api.get('/:id', authenticate,(req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.send(err);
            }
            res.json(foodtruck);

        });
    });

    //update /v1/foodtruck/:id -Update
    api.put('/:id', authenticate,(req, res) => {

        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.send(err);
            }
            foodtruck.name = req.body.name;
            foodtruck.foodtype = req.body.foodtype;
            foodtruck.avgcost = req.body.avgcost;
            foodtruck.geometry.coordinates = req.body.geometry.coordinates;
            foodtruck.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({message: "Foodtruck info updated"});
            });
        });


    });

    api.delete('/:id',authenticate, (req, res) => {
        FoodTruck.remove({
            _id: req.params.id


        }, (err, foodtruck) => {
            if (err) {
                res.send(err);
            }
            res.json({message: "Foodtruck removed"});
        });
    });
    //add rev for specific foodtruck id
    api.post('/reviews/add/:id',authenticate,(req,res)=>{
        FoodTruck.findById(req.params.id,(err, foodtruck)=>{
            if(err){
                res.send(err);
            }
            let newReview = new Review();
            newReview.title = req.body.title;
            newReview.text = req.body.text;
            newReview.foodtruck = foodtruck._id;
            newReview.save((err,review)=>{
                if(err){
                    res.send(err);
                }
                foodtruck.reviews.push(newReview);
                foodtruck.save(err =>{
                    if(err){
                        res.send(err);
                    }
                    res.json({message:'foodtruck rev is saved!'})
                });
            });

        });
    });

    //get reviews for specific food truck

    api.get('/reviews/:id',authenticate,(req,res)=>{
        Review.find({foodtruck:req.params.id},(err,reviews)=>{
            if(err){
                res.send(err);
            }
            res.json(reviews);
        });

    });


    return api;

}