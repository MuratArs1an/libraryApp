const mongoose=require('mongoose');
const Schema=mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/library-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//mongose ile oluşturulan database şeması
const BookSchema=new Schema({
    title:String,
    author:String,
    pages:Number,
    stock:Number
})

//şemamızı mongoose model olarak ekliyoruz 
const Book=mongoose.model('book',BookSchema);

module.exports=Book;