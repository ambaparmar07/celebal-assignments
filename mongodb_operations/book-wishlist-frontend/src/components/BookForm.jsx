import { useState, useEffect } from 'react';

const initialState = {
  title: '',
  author: '',
  genre: '',
  readStatus: 'Not Started'
};

const BookForm = ({ onCreate, onUpdate, editingBook }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    } else {
      setFormData(initialState);
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editingBook ? onUpdate(editingBook._id, formData) : onCreate(formData);
    setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div className="form-header">
        <h2>{editingBook ? '✏️ Edit Book' : '➕ Add a New Book'}</h2>
      </div>
      <div className="form-fields">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Enter book title" required />
        <input name="author" value={formData.author} onChange={handleChange} placeholder="Enter author's name" required />
        <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Enter genre" />
        <select name="readStatus" value={formData.readStatus} onChange={handleChange}>
          <option value="Not Started">Not Started</option>
          <option value="Reading">Reading</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="submit-btn">
        {editingBook ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
};

export default BookForm;
