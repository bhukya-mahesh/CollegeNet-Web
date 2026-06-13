import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return res.json({ success: false, message: "Unauthorized" });
    }
    try {
      const tokendecoded = jwt.verify(token, process.env.JWT_SECRET);

      if(tokendecoded.id){
        req.userId = tokendecoded.id;
      }else{
        return res.json({ success: false, message: "Unauthorized. login again!!" });
        }
        next();
    }catch(error){
        return res.json({ success: false, message:
            error.message
         });
    }

}