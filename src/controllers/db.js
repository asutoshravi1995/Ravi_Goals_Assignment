const Connection=require('../utilities/connection')
let db={}

// Function to find all offers and return 
db.findall=async()=>{
        return new Promise((resolve,reject) => {
             Connection.query("select * from offers;", (err, rows, _field) => {
                if (!err) {
                    resolve(rows)
                }
                else{reject(err)}
                
            });
        })
    }
//Fucntion get a user details
db.getUser=(userid)=>{
        return new Promise((resolve,reject)=>{
            Connection.query(`select * from users where userId=${userid}`, (err,rows,_field)=>{
                    if(!err){
                        if(rows.length>0){
                            resolve(rows)
                        }
                        else{
                            reject(false) }
                    }
            })
        })
}

// Function to find one perticular offer and return the details
db.findoffer=async(offerid)=>{
        return new Promise((resolve,reject) => {
             Connection.query( `select * from offers where offerId=${offerid};`, (err, rows, _field) => {
                if (!err) {
                    resolve(rows)
                }
                else {reject(err)}
                
            });
        })
    }

// Function to claim an offer and add that to database
db.add=async(userid,offerid)=>{
        return new Promise(async(resolve,reject)=>{
            let offerDetail=await db.findoffer(offerid)
            let userDetail=await db.getUser(userid)
            if(offerDetail && offerDetail.length>0){        
                        //checking if offer exist or not
                        Connection.query(`INSERT INTO users_and_offers (userId,offerId) VALUES (${userid},${offerid});`,(err,rows,_field)=>{
                            if(!err){
                                let offer_points=offerDetail[0].offer_value;
                                let user_point=userDetail[0].total_cash_earned + offer_points
                                //checking if user exist or not
                                Connection.query(`UPDATE users SET total_cash_earned=${user_point} WHERE userId=${userid}`,(err,row,_field)=>{
                                    if(!err){
                                        resolve(JSON.stringify({ data:user_point, status:"Sucess", message:"Offer is claimed"}))
                                    }
                                    else{
                                        reject(err)
                                    }
                                })
                            }
                            else{
                                err=new Error("Offer already claimed")
                                err.status=409
                                reject(err)
                            }
                        })
            }            
            else{
                let err=new Error("Wrong Offer ID")
                err.status=404
                reject(err)
            }
        })
}

module.exports=db