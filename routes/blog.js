const express = require("express");
const mongodb = require("mongodb");
const db = require("../data/database");
const bcrypt = require('bcryptjs');

const ObjectId = mongodb.ObjectId;

const router = express.Router();


router.get("/blogs",async  function (req, res) {

  const posts = await db.getdb().collection('blogs').find().toArray();
    res.render('blogs-list',{posts:posts});
  });

  router.get('/blogs/:id',async function(req,res){

    const id = new ObjectId(req.params.id);
    const post = await db.getdb().collection('blogs').findOne({_id:id}) ;
     
    res.render('blog-detail',{post:post}) ;
  }) ;

module.exports = router ;