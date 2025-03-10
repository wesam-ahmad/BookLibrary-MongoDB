const Book = require("../models/bookModel");


exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find({ deleted: false }); 
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.addBook = async (req, res) => {
    try {
        const { title, author, pages } = req.body;
        const newBook = new Book({ title, author, pages });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: "Book not found" });
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.softDeleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndUpdate(id, { deleted: true }, { new: true });
        if (!deletedBook) return res.status(404).json({ message: "Book not found" });
        res.json({ message: "Book deleted (soft delete)" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
