const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;
let mongodbUrl = 'mongodb://127.0.0.1:27017';
if(process.env.MONGODB_URL){
    mongodbUrl=process.env.MONGODB_URL;
}

async function connect() {
     
    const client  = await MongoClient.connect(mongodbUrl) ;
    database=client.db('WT') ;
}

function getDb(){
     if(!database){
        throw {message:'Database not established'}
     }
     return database ;
}
module.exports ={
    connectToDataBase:connect,
    getdb:getDb,
};