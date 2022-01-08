const mysql=require('mysql2')

var mysqlconnection=mysql.createConnection({
    //change below details according to your database connection
    host:"localhost",
    user:"root",
    password:"Holi@1112",
    database:"goals101"
})

mysqlconnection.connect((err)=>{
    if(!err){console.log("Connected");}
    else{
        console.log("Error while connecting");
        let err=new Error("Database connectivity failed")
        err.status=500
        next(err)
    }   
})


module.exports=mysqlconnection