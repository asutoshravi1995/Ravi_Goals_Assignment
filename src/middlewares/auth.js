const express=require('express')
const Connection=require('../utilities/connection')


let auth=(req,res,next)=>{
try{
    //Authentication for /Offers API
    if(req.method=='GET'){
        let offerId=req.query.offerid
        let userId=req.query.uid
            //Validating OfferID
            if(!userId && offerId && !isNaN(offerId)){
                            //checking offerId
                            Connection.query(`select * from offers where offerId=${offerId}`, (err,rows,_field)=>{
                                            if(!err){
                                                if(rows.length>0){
                                                    next()
                                                }
                                                else{
                                                    let err1=new Error("Wrong offerID")
                                                    err1.status= 403
                                                    next(err1)
                                                }
                                            }
                                            else{
                                                next(err)
                                            }
                            })
            }
            //validating UserID
            else if((userId && !offerId && !isNaN(userId))){
                        Connection.query(`select * from users where userId=${userId}`, (err,rows,_field)=>{
                                if(!err){
                                    if(rows.length>0){
                                        next()
                                    }
                                    else{
                                        let err1=new Error("Wrong UserId")
                                        err1.status= 403
                                        next(err1)
                                    }
                                }
                                else{
                                    next(err)
                                }
                        })
            }
            else{
                let err=new Error("Bad Request, Please check URL")
                err.status=400
                next(err)
            }

    }

    //Authentication for /claim API
    else if(req.method=='POST'){
                    let offerId=req.body.offerid
                    let userId=req.body.uid
                    //Validating User ID
                    if(userId && !isNaN(userId) && offerId && !isNaN(offerId) ){
                        Connection.query(`select * from users where userId=${userId}`, (err,rows,_field)=>{
                                if(!err){
                                    if(rows.length>0){
                                        //validating Offer
                                                Connection.query(`select * from offers where offerId=${offerId}`, (err,rows,_field)=>{
                                                    if(!err){
                                                        if(rows.length>0){
                                                            next()
                                                        }
                                                        else{
                                                            let err1=new Error("Wrong OfferID")
                                                            err1.status= 403
                                                            next(err)
                                                        }
                                                    }
                                                    else{
                                                        next(err)
                                                    }
                                                })
                                    }
                                    else{
                                        let err1=new Error("Wrong UserId")
                                        err1.status= 403
                                        next(err1)
                                    }
                                }
                                else{
                                    next(err1)
                                }
                        })
                        
                    }
                    else{
                        let err=new Error("Bad Request, Please check URL")
                        err.status=400
                        next(err)
                    }
    }
    else{
            let err=new Error("Bad Request, Please check URL")
            

            err.status=400
            next(err)
    }
    
}
catch(err){
    next(err)
}
}
module.exports=auth