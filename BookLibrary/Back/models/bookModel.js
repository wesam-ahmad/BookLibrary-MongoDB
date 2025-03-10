const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Number, required: true },
    deleted: { type: Boolean, default: false } 
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
