const express=require('express');
//mongoose for mongoDb 
const mongoose=require('mongoose');
//methodOverride implement for unsupport put and delete request browser
const methodOverride=require('method-override');
const bookController=require('./controller/bookController');

const app=express();

//middleWare
app.use(methodOverride('_method',{
    methods:['POST','GET']
}));

//Routes
app.get('/',bookController.getAllBooks);
app.post('/book', bookController.createBook);
app.get('/book/:id',bookController.getBook);
app.put('/book/edit/:id', bookController.updateBook);
app.delete('/book/:id', bookController.deleteBook);






const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});