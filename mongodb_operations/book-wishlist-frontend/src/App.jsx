import { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:3000/api/books');
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreate = async (bookData) => {
    await axios.post('http://localhost:3000/api/books', bookData);
    fetchBooks();
  };

  const handleUpdate = async (id, bookData) => {
    await axios.put(`http://localhost:3000/api/books/${id}`, bookData);
    setEditingBook(null);
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/books/${id}`);
    fetchBooks();
  };

  return (
    <div className="container">
      <header>
        <h1>Book Wishlist</h1>
        <p>Your personal space to track books you want to read.</p>
      </header>
      <main>
        <div className="book-form-container">
          <BookForm
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            editingBook={editingBook}
          />
        </div>
        <div className="book-list-container">
          <BookList
            books={books}
            onDelete={handleDelete}
            onEdit={setEditingBook}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
