import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protectJwt } from './modules/auth';
import { create } from 'domain';
import { createNewUser, signin } from './handlers/user';

const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200)
    res.json({ message: "Hello from server" });
});

app.use("/api", protectJwt, router)
app.use("/signup", createNewUser)
app.use("/signin", signin)

app.use((err, req, res, next) => {
    if(err.type == "auth"){
        res.status(401).json({message: "Invalid username or password"});
    }else if (err.type == "input"){
        res.status(400).json({message: err.message});
    }else{
        res.status(500).json({message: "Something went wrong"});
    }
})
export default app;