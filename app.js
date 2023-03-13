import express from 'express'
import connect from './db/connect.js';
import {config} from 'dotenv'
import router from './routes/userRoutes.js';
import require_auth from './middleware/require_auth.js';
import quiz_router from './routes/quiz_routes.js';

config()

const app = express()

app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.method,req.path);
    next()
})

app.use('/api/v1',router)

const PORT = process.env.PORT

connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to the db");
    app.listen(PORT,()=>{
        console.log(`Server is live @ http://localhost:${PORT}`);
    })

}).catch((error)=>{
    console.log('Error:',error);
})

app.get('/',(req,res)=>{
    res.status(200).json({greeting:'Questioneer app server'})
})

app.use(require_auth)
app.use('/api/v1/quiz',quiz_router)