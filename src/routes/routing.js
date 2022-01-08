const express=require('express')
const Auth=require('../middlewares/auth')
const routing=express.Router()
const db= require('../controllers/db')

routing.use(Auth)
// API for /offers/?uid=<userid>
routing.get('/offers',async(req,res,next)=>{
    let offerId=req.query.offerid
    let userId=req.query.uid
    if((userId && !offerId && !isNaN(userId))){
            try{ 
                res.setHeader('Content-Type', 'application/json')
                    let rows=await db.findall()
                    if(rows && rows.length>0){
                            let offerObj={
                                            data:rows,
                                            status:"success",
                                            message:"Offers fetched Successfull"
                                        }
                            let offerJson=JSON.stringify(offerObj)
                                res.send(offerJson)
                    }
                    else{
                        let err=new Error("No Data Found")
                        err.status=404
                        throw err
                    } 
            }
            catch(err){
                    throw err
            }   
    }
    else{
        next()
    }

    
})

// API for /offers/?offerid=<offerid>
routing.get('/offers',async(req,res,next)=>{
    try{
        let offerId=req.query.offerid
        res.setHeader('Content-Type', 'application/json')
                let rows=await db.findoffer(offerId)
                        if(rows && rows.length>0){
                                let offerObj={
                                                data:rows,
                                                status:"success",
                                                message:"Offers fetched Successfull"
                                            }
                                res.send(JSON.stringify(offerObj))
                            }
                        else{ 
                            let err= new Error("Wrong Offer ID")
                            err.status=400
                            throw err
                        }
        }
    catch(err){
            throw err
        }        
    }
)

// API for /claim
routing.post('/claim',async(req,res,next)=>{
    let userId=req.body.uid
    let offerId=req.body.offerid
    res.setHeader('Content-Type', 'application/json')
           await db.add(userId,offerId)
           .then((result)=>{
               res.send(result)
           })
           .catch((err)=>{
               next(err)
           })

})

routing.all('/*',(req,res)=>{
    res.send(JSON.stringify({ status:"Bad Request", message:"Something went Wrong check your URL"}))
})




module.exports=routing