const jwt = require('jsonwebtoken');

exports.verufy = (req,res,next)=>{
    const token  = req.header('auth_token');

    if(!token){
        return res.status(401).json("Access Denied");
    }
    else{
        try{
            const TOKEN_SECRET =
              process.env.TOKEN_SECRET || "hdioehfduewuifbjrfugr";
                const verify = jwt.verify(token, TOKEN_SECRET);
                 req.user = verify;
                next();
        }
        catch{
            res.status(401).send("Invalid Token");
        }
    }
}