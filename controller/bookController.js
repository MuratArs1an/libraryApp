const Book=require('../models/book');
const fs=require('fs');
const express=require('express');
const app=express();
const fileUpload = require('express-fileupload');

app.use(fileUpload());

exports.getAllBooks=async(req,res)=>{
    const books=await Book.find({})
    res.send(books)
}

exports.createBook = async (req, res) => {
    console.log(req.files);
    const uploadDir = "client/public/images";

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    try {
        const uploadedImage = req.files.image;
        const uploadPath = uploadDir + "/" + uploadedImage.name;

        uploadedImage.mv(uploadPath, async () => {
            try {
                const newBook = await Book.create({
                    ...req.body,
                    image: "/images/" + uploadedImage.name,
                });

                res.status(201).json(newBook);
            } catch (error) {
                console.error('Error creating book:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




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
    const deletedBook=await Book.deleteOne({_id:req.params.id});
    console.log(req.params.id);
    res.json(deletedBook);
}