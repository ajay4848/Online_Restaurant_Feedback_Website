const express = require('express');
const bcrypt = require('bcryptjs') ;
const db = require('../data/database');
const { ObjectId } = require('mongodb');
const multer = require('multer') ;

const router = express.Router();

const storageConfig = multer.diskStorage({
    destination:function(req,file,cb) {
     cb(null,'images') ; 
    } ,

    filename:function(req,file,cb){
        cb(null,Date.now() + '-'+file.originalname) ;
    }
     
});
 const upload = multer({ storage:storageConfig
 }) ;

 router.get('/owners', function (req, res) {
   res.render('welcome' );
   });

router.get('/signup', function (req, res) {  
  let sessionInput = req.session.inputData ;

  if(!sessionInput){ 
   sessionInput = {
    hasError :false ,
    email:'',
    confirmEmail:'',
    password:''
 } ;
  }
  req.session.inputData=null;
  res.render('signup',{inputData:sessionInput});
});

router.get('/login', function (req, res) {

  let sessionInput = req.session.inputData ;

  if(!sessionInput){ 
   sessionInput = {
    hasError :false ,
    email:'',
    password:''
 } ;
  }
  req.session.inputData=null;
  res.render('login' ,{inputData:sessionInput});
});

router.post('/signup', async function (req, res) {
  
  const userData = req.body;
  const Entredemail = userData.email;
  const EntredconfirmEmail = userData['confirm-email'] ;
  const Entredpassword = userData.password ;

  if(!Entredemail || 
     !EntredconfirmEmail ||
     Entredemail!==EntredconfirmEmail ||
     Entredpassword.trim().length < 4|| 
     !Entredpassword   ||
     !Entredemail.includes('@')
    ){
      // console.log("Incorrect data") ;
      req.session.inputData = {
          hasError :true ,
          email:Entredemail ,
      confirmEmail:EntredconfirmEmail,
        message:"Invalid data" , 
        password:Entredpassword 
      }
 ;
      req.session.save(function(){
           res.redirect('/signup');
      })

     return  ;
    } 

    const existingUser = await db.getdb().collection('owners').findOne({email:Entredemail}) ;

    if(existingUser) {
      // console.log("Exist alreadty");
      req.session.inputData = {
        hasError :true ,
        email:Entredemail ,
    confirmEmail:EntredconfirmEmail,
      message:"User Exists Already" , 
      password:Entredpassword 
    }
    req.session.save(function(){
      res.redirect('/signup');
 })
     return ;
    }


   const hashPassword =  await bcrypt.hash(Entredpassword,12) ;

  const user ={
    email:Entredemail ,
    password:hashPassword 
  } ;

  await db.getdb().collection('owners').insertOne(user) ;

res.redirect('/login') ;


});

router.post('/login', async function (req, res) {

  const userData = req.body;
  const Entredemail = userData.email;
  const Entredpassword = userData.password ;

  const existingUser = await db.getdb().collection('owners').findOne({email:Entredemail}) ;

  if(!existingUser){
   req.session.inputData = {
    hasError :true ,
    email:Entredemail ,
    message:"Check your credentails!!" , 
  password:Entredpassword 
}
req.session.save(function(){
  res.redirect('/login');
})
 return ;
}      
  

   const passwordsAreEqual  = await bcrypt.compare(Entredpassword ,existingUser.password) 

   if(!passwordsAreEqual) {
    req.session.inputData = {
      hasError :true ,
      email:Entredemail ,
      message:"Check your credentails!!" , 
    password:Entredpassword 
  }
  req.session.save(function(){
    res.redirect('/login');
  })
   return ;
  }    
   

   
  //  console.log("is authencticated") ;

   req.session.user={id:existingUser._id, email:existingUser.email};

   req.session.isAuthenticated = true ;
   
     req.session.save(function(){
 
      res.redirect('/admin-blogs')
       
     } ) ;

});






router.post('/admin-blogs',upload.single('blogImage'), async function(req,res) {
 
   
  const email = req.body.email;
  const blogImage = req.file;
  
  const blog = {
      name:req.body.name,
      email:req.body.email ,
      title:req.body.title  ,
      summary:req.body.summary  ,
      content:req.body.content , 
      blogImage:blogImage.path   
  } ;

  await db.getdb().collection('blogs').insertOne(blog) ;
  
  res.redirect('/admin-blogs') ;
   
} ) ;
 

router.get('/admin-blogs', async function (req, res) {

if(!req.session.isAuthenticated) {
  // if(!res.locals.isAuth) {
    return res.status(401).render('401') ;     
}


const userposts = await db.getdb().collection('blogs').find({email:req.session.user.email}).toArray();

   res.render('blogs' , {posts:userposts});
});

router.get('/blog-detail/:id',async function(req,res) {
    const id = req.params.id ;
    const post = await db.getdb().collection('blogs').findOne({_id:new ObjectId(id)}) ;

    res.render('admin-blog-detail', {post:post}) ;
 
 }) ; 

 router.post('/delete-blog/:id',async  function(req,res){
  
  const id = req.params.id ;

  await db.getdb().collection('blogs').deleteOne({_id:new ObjectId(id)}) ;

  res.redirect('/admin-blogs')
   
 }) ;

 router.get('/update-blog/:id',async function(req,res) {

  let id;
  try {
    id = new ObjectId(req.params.id);
  } catch (error) {
    res.render("404");
  }

  const post = await db.getdb().collection('blogs').findOne({_id:id}) ;

  res.render('blog-update',{post:post}) ;

 }) ;

 router.post('/update-blog/:id' , async function(req,res) {
    
   let id = new ObjectId(req.params.id) ;
   
     await db.getdb().collection('blogs').updateOne({_id:id},{
         $set :{
             title:req.body.title,
             summary:req.body.summary,
             content:req.body.content,
         }
     }) ;
     res.redirect('/admin-blogs') ;
 } ) ;





router.get('/new-post' , function(req,res) {
  
  if(!req.session.isAuthenticated) {
    return res.status(401).render('401') ;     
  }
  res.render('blog-create') ; 
}) ;

router.get('/recommend' , function(req,res) {
  
if(!req.session.isAuthenticated) {
  return res.status(401).render('401') ;     
}

  res.render('recommend') ;
})

router.post('/recommend' ,upload.single('image') , async function(req,res) {
 
   const uploadedImage = req.file ;

   const restaurant = {
      name:req.body.name,
      cuisine:req.body.cuisine ,
      address:req.body.address,
      website:req.body.website ,
      description:req.body.description ,
      imagePath:uploadedImage.path 
   } ;

  await db.getdb().collection('restaurants').insertOne(restaurant) ;
   
  
    req.session.isAdded = true ;
    req.session.save(function(){
    
    res.redirect('/recommend') ;
  }) ;


}) ;


router.post('/logout', function (req, res) {

  req.session.user=null;
  req.session.isAuthenticated=false;

  res.redirect('/owners') ;

});

module.exports = router;
