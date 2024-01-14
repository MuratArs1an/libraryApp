const express=require('express');
//mongoose for mongoDb 
const mongoose=require('mongoose');
const cors = require('cors');
const routes=require('./routes/routes')
const app=express();
const fileUpload = require('express-fileupload');


//middleWare
app.use(fileUpload())
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.static('client/src/images'))


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});