const BookList = ({ books, onDelete, onEdit }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'status-completed';
      case 'Reading':
        return 'status-reading';
      default:
        return 'status-not-started';
    }
  };

  return (
    <div className="book-list-container">
      <h2>Your Wishlist</h2>
      {books.length === 0 ? (
        <div className="empty-state">
          <p>Your wishlist is empty. Add a book to get started!</p>
        </div>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <div className="book-card" key={book._id}>
              <div className="book-card-header">
                <h3>{book.title}</h3>
                <div className="book-actions">
                  <button onClick={() => onEdit(book)} className="icon-btn">✏️</button>
                  <button onClick={() => onDelete(book._id)} className="icon-btn">🗑️</button>
                </div>
              </div>
              <p className="book-author">by {book.author}</p>
              <div className="book-card-footer">
                <span className="book-genre">{book.genre}</span>
                <span className={`book-status ${getStatusClass(book.readStatus)}`}>
                  {book.readStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
