import app from './server';
import dotenv from 'dotenv';
dotenv.config();
import config from './config';

app.listen(config.port, ()=>{
    console.log(`Server listening on port http://localhost:${config.port}`);
})