const express=require('express');
const postgresClient=require('./config/db');
const cors = require('cors');
const routes=require('./routes/routes')
const app=express();
const fileUpload = require('express-fileupload');


//middleWare
app.use(fileUpload())
app.use(cors());
app.use(express.json());
app.use('/',routes);
app.use(express.static('client/src/images'))


const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    postgresClient.connect(err=>{
        if(err){
            console.log('connection error', err.stack);
        }else{
            console.log('db connection successful');
        }
    })
});