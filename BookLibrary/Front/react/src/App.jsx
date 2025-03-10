import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/books";

const App = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [pages, setPages] = useState("");
    const [editingBook, setEditingBook] = useState(null);

    // Fetch books
    useEffect(() => {
        axios.get(API_URL)
            .then(response => setBooks(response.data))
            .catch(error => console.error("Error fetching books:", error));
    }, []);

    // Add or Update book
    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookData = { title, author, pages: Number(pages) };

        if (editingBook) {
            // Update book
            try {
                const response = await axios.put(`${API_URL}/${editingBook._id}`, bookData);
                setBooks(books.map(book => (book._id === editingBook._id ? response.data : book)));
                setEditingBook(null);
            } catch (error) {
                console.error("Error updating book:", error);
            }
        } else {
            // Add book
            try {
                const response = await axios.post(API_URL, bookData);
                setBooks([...books, response.data]);
            } catch (error) {
                console.error("Error adding book:", error);
            }
        }

        setTitle("");
        setAuthor("");
        setPages("");
    };

    // Soft delete book
    const deleteBook = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setBooks(books.filter(book => book._id !== id));
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    // Load book data into form for editing
    const editBook = (book) => {
        setTitle(book.title);
        setAuthor(book.author);
        setPages(book.pages);
        setEditingBook(book);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h2>Book Management</h2>

            {/* Book Form */}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <input type="number" placeholder="Pages" value={pages} onChange={(e) => setPages(e.target.value)} required />
                <button type="submit">{editingBook ? "Update Book" : "Add Book"}</button>
                {editingBook && <button onClick={() => setEditingBook(null)}>Cancel</button>}
            </form>

            {/* Book List */}
            <ul>
                {books.map(book => (
                    <li key={book._id}>
                        {book.title} by {book.author} ({book.pages} pages)
                        <button onClick={() => editBook(book)}>Edit</button>
                        <button onClick={() => deleteBook(book._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
