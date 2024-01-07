const Book=require('../models/book');

exports.getAllBooks=async(req,res)=>{
    const books=await Book.find({})
    res.send(books)
}

exports.createBook=async(req, res)=>{
    await Book.create(req.body);

}

exports.getBook=async(req, res)=>{
    const book=await Book.findOne({_id:req.params.id})
    res.send(book)
}

exports.updateBook=async(req, res)=>{
    try{
        const book=await Book.findOne({_id:req.params.id});
        if(!book){
            return res.status(404).send("Book not found");
        }
        book.title=req.body.title;
        book.author=req.body.author;
        book.pages=req.body.pages;
        book.stock=req.body.stock;
        await book.save();
    }catch(err){
        res.status(500).send('Internal Server Error')
    }
}

exports.deleteBook=async(req, res)=>{
    await Book.deleteOne({_id:req.params.id});
    console.log(req.params.id);
}