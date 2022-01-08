const fs = require('fs');
let requestlogger=(req,res,next) => {
	fs.appendFile('RequestLogger.txt', new Date().toDateString() + ' ' + req.method  + ' ' +  req.url  +  "\n" , (err) => {
	  if (err) {
				console.log("logging request failed");
			   }
	});			
   next();	
}
module.exports = requestlogger;
