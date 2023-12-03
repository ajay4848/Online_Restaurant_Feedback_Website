const express = require("express");
const mongodb = require("mongodb");
const uuid = require('uuid');
const db = require("../data/database");
const { render } = require("ejs");


const ObjectId = mongodb.ObjectId;


const router = express.Router();


router.get("/", function (req, res) {
    res.redirect("/index");
  });

  router.get('/index',function(req,res){
    res.render('index') ;
})

router.get('/about',function(req,res){
    res.render('about') ;
})

router.get('/restaurants',async function(req,res){
    
    const restaurants = await db.getdb().collection('restaurants').find({}).toArray();
    
    
    res.render('restaurants' , {restaurants:restaurants} ) ;
}) ;

router.get('/restaurants/:id', async function(req,res){
  const id = new ObjectId(req.params.id);
  const restaurant = await db.getdb().collection('restaurants').findOne({_id:id})
  
  //  console.log(restaurant) ;

  res.render('restaurants-detail', {restaurant:restaurant}) ;
     
   
}) ;

  module.exports = router ;