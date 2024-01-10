const express=require("express");
const methodOverride=require('method-override');
const bookController=require('../controller/bookController')
const routes=express();

routes.use(methodOverride('_method',{
    methods:['POST','GET']
}));

routes.get('/book',bookController.getAllBooks);
routes.post('/book', bookController.createBook);
routes.get('/book/:id',bookController.getBook);
routes.put('/book/edit/:id', bookController.updateBook);
routes.delete('/book/:id', bookController.deleteBook);

module.exports=routes;