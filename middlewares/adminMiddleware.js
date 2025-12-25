const jwt= require('jsonwebtoken')

const adminMiddleware = (req,res,next)=>{
    console.log("inside adminMiddleware");
    // get token
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    if(token){
        // verify token
        try{
            const jwtResponse = jwt.verify(token,process.env.JWTSECRET)
            console.log(jwtResponse);
            req.payload = jwtResponse.userMail
            const role = jwtResponse.role
            if(role=='admin'){
                next()
            }else{
                res.status(401).json("Authorization failed!!!Unauthorised user...")
            }
        }catch{
                 res.status(401).json("Authorization failed!!!Invalid Token...")
        }
    }else{
          res.status(401).json("Authorization failed!!!Token Missing...")
    }
}

module.exports = adminMiddleware