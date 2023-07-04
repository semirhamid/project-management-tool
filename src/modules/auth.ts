import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

export const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}

export const createJwt = (user)=>{
    const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET)
    return token;
}

export const protectJwt = (req, res, next) =>{
    const bearer = req.headers.authorization;
    if(!bearer){
        res.status(401).json({message: "Unauthorized"});
        return;
    }
    const authorization = bearer.split(" ");
    const token = authorization[1];
    if(!token){
        res.status(401).json({message: "Invalid token"});
        return;
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(e){
        console.log(e);
        res.status(401).json({ message: "Invalid token" });

    }


}
