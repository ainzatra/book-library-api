import express from "express";
import { Book } from '../../../models/bookModel.js';

const router = express.Router();

// Create book/s 
router.post('/', async (req, res) => {
    try {
        const book = req.body;
        if (!book) {
            return res.status(400).send({ message: "No book to create." });
        }
        const newBook = {
            title: book.title,
            author: book.author,
            publishYear: book.publishYear,
        };

        await Book.create(newBook);
        
        return res.status(201).json(newBook);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});
// Fetch all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})
// Find book by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book){
            return res.status(404).json({message: "Book not found."});
        }
        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})
// Update book by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const {title, author, publishYear} = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).send({message: "Fill all required fields: title, author, publishYear"});
        }

        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result){
            return res.status(404).json({message: "Book not found."});
        }

        return res.status(200).send({ message: "Book updated successfully." });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})
// Delete book by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);
        if (!result){
            return res.status(404).json({message: "Book not found."});
        }

        return res.status(200).send({ message: "Book deleted successfully." });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

export default router;