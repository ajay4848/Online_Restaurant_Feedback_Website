require('dotenv').config() ;
const express = require('express') ;
const path = require('path');

let port = 3000 ;
if(process.env.PORT) {
  port = process.env.PORT ;
}
let mongodbUrl = 'mongodb://127.0.0.1:27017';
if(process.env.MONGODB_URL){
    mongodbUrl=process.env.MONGODB_URL;
}

const session = require('express-session') ;
const mongodbStore = require('connect-mongodb-session');
const db = require('./data/database');

const restaurantRoutes = require('./routes/restaurant');
const blogRoutes = require('./routes/blog');
const demoRoutes = require('./routes/demo');
const { ObjectId } = require('bson');


const MongoDBStore = mongodbStore(session); 
const app = express();



const sessionStore =new MongoDBStore({
  uri:mongodbUrl ,
  databaseName:'WT',
  collection:'sessions'
}) ;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(express.static('public')) ;
app.use('/images' , express.static('images'));
app.use('/restaurants/images',express.static('images'));
app.use('/blogs/images',express.static('images'));


app.use(session({
  secret:'super-secret',
  resave:false ,
  saveUninitialized:false ,
  store:sessionStore,
  cookie:{
    maxAge:60*1000*60*24*1
  }

})) ;

app.use(function(req,res,next){
    const user = req.session.user ;
   const isAuth = req.session.isAuthenticated ;

   if(!user || !isAuth) {
    return  next();
   }
  //  const userd = await db.getdb().collection('oweners').findOne({_id:new ObjectId(user.id)}) ;
  
   res.locals.isAdded = req.session.isAdded;
   res.locals.email = user.email ;
   res.locals.isAuth = isAuth ;

   next();

}) ;



app.use(demoRoutes);
app.use(restaurantRoutes);
app.use(blogRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDataBase().then(function(){
    app.listen(port);
  }).catch(function (error) {
    console.log('Connecting to the database failed!');
  });;
  
  
