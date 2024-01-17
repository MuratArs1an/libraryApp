const fs=require('fs');
const express=require('express');
const app=express();
const fileUpload = require('express-fileupload');
const postgresClient = require('../config/db');

app.use(fileUpload());

exports.getAllBooks=async(req,res)=>{
    try {
        const text ="SELECT * FROM books ORDER BY id ASC";

        const { rows } = await postgresClient.query(text)
        return res.status(200).json(rows)
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message }) 
    }
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
        
        await uploadedImage.mv(uploadPath);

        const image = "/images/" + uploadedImage.name;
        console.log(image);

        // SQL query
        const text = "INSERT INTO books (title, author, pages, stock, images, details) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
        
        // Values for the query come from req (kullanıcı istek yaptıkça gelecek)
        const values = [req.body.title, req.body.author, req.body.pages, req.body.stock, image, req.body.details];
        
        // Execute the query
        const { rows } = await postgresClient.query(text, values);

        // Send the response with the correct image path
        res.status(201).json({ message: rows[0] });
    } catch (error) {
        console.error('Error creating book:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};





exports.getBook=async(req, res)=>{
    try {
        const { id } = req.params
        const text ="SELECT * FROM books WHERE id = $1";
        const values = [id]
        const { rows } = await postgresClient.query(text,values)
        return res.status(200).json(rows)
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message }) 
    }
}

exports.updateBook=async(req, res)=>{
    try{
        const { id } = req.params
        const text="UPDATE books SET title= $1, author= $2, pages=$3, stock=$4, images=$5, details=$6 WHERE id=$7 RETURNING *"
        const values = [req.body.title, req.body.author, req.body.pages, req.body.stock, req.body.images, req.body.details, id];
        const {rows}= await postgresClient.query(text, values);
        if(!rows.length){
            res.status(400).json({message:"User Not Found"})
        }
        return res.status(200).json({ updatedBook: rows[0] })
    }catch(err){
        return res.status(500).send('Internal Server Error')
    }
}

exports.deleteBook=async(req, res)=>{
    try {
        const { id } = req.params

        const text = "DELETE FROM books WHERE id = $1 RETURNING *"

        const values = [id]

        const { rows } = await postgresClient.query(text, values)
        if(!rows.length)
            return res.status(404).json({ message: 'Book not found.' })

        return res.status(200).json({ deletedBook: rows[0] })
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })   
    }
}