import express from 'express';
import books from './books/index.js';

const router = express.Router();

router.use('/books', books);

export default router;