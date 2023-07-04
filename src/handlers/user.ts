import { comparePassword, createJwt, hashPassword } from '../modules/auth';
import prisma from '../utils/db';
import bcrypt from 'bcrypt';

export const createNewUser = async (req, res, next)=>{
    try{
        const hashedPassword = await hashPassword(req.body.password);

        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: hashedPassword
            }
        });

        const token = createJwt(user);
        res.json({
            token
        })
        res.status = 201
    }catch(e){
        //handled by main error handler
        e.type = "auth"
        next(e)
    }
    
}

export const signin = async (req, res) => {

    const user = await prisma.user.findUnique({where:{
        username: req.body.username
    }});
    const isValid = await comparePassword(req.body.password, user.password);
    if(!isValid){
        res.status(401).json({message: "Invalid username or password"});
        return;
    }
    const token = createJwt(user);
    res.json({token});
}