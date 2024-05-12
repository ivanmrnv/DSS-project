import React, { useState } from 'react';
import './App.css';

const initialBooks = [
  { id: 1, title: 'The Name of the Wind', author: 'Patrick Rothfuss', isbn: '978-0-7564-0473-4', price: '$10.99', publicationDate: '2007-03-27' },
  { id: 2, title: 'The Wise Man\'s Fear', author: 'Patrick Rothfuss', isbn: '978-0-7564-0474-1', price: '$11.99', publicationDate: '2011-03-01' },
  { id: 3, title: 'The Book Thief', author: 'Markus Zusak', isbn: '978-0-375-84220-7', price: '$12.99', publicationDate: '2005-03-14' },
  { id: 4, title: 'Bridge of Clay', author: 'Markus Zusak', isbn: '978-0-375-84512-3', price: '$11.99', publicationDate: '2018-10-09' },
];

function App() {
  const [books, setBooks] = useState(initialBooks);
  const [selectedBook, setSelectedBook] = useState({
    id: '',
    title: '',
    author: '',
    isbn: '',
    price: '',
    publicationDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBook({ ...selectedBook, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBook.title || !selectedBook.author || !selectedBook.isbn || !selectedBook.price || !selectedBook.publicationDate) {
      alert('Моля, попълнете всички полета.'); return;
    }

    const existingBookIndex = books.findIndex(book => book.id === selectedBook.id);
    if (existingBookIndex !== -1) {

      const updatedBooks = [...books];
      updatedBooks[existingBookIndex] = { ...selectedBook };
      setBooks(updatedBooks);

    } else {

      const newId = books.length + 1;
      const newBook = { ...selectedBook, id: newId };
      setBooks([...books, newBook]);

    }
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleDelete = (id) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks.map((book, index) => ({ ...book, id: index + 1 })));
    if (selectedBook.id === id) {
      setSelectedBook({
        id: '',
        title: '',
        author: '',
        isbn: '',
        price: '',
        publicationDate: ''
      });
    }
  };

  const handleClear = () => {
    setSelectedBook({
      id: '',
      title: '',
      author: '',
      isbn: '',
      price: '',
      publicationDate: ''
    });
  };

return (
    <div className="App">
      <nav>LibrarySystem</nav>
      <div className="content-list">
        <h2>List Section</h2>
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <div onClick={() => handleBookSelect(book)}>
                <p className="id">{book.id}</p>
                <p className="field1">{book.title}</p>
                <p className="field2">{book.author}</p>
                <p className="field3">{book.isbn}</p>
                <p className="field4">{book.price}</p>
                <p className="field5">{new Date(book.publicationDate).toString()}</p>
              </div>
              <button className="deleteButton" onClick={(e) => {e.stopPropagation(); handleDelete(book.id);}}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="content-details">
        <h2>Details Section</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" id="field1" name="title" value={selectedBook.title} onChange={handleInputChange} placeholder="Title" />
          <input type="text" id="field2" name="author" value={selectedBook.author} onChange={handleInputChange} placeholder="Author" />
          <input type="text" id="field3" name="isbn" value={selectedBook.isbn} onChange={handleInputChange} placeholder="ISBN" />
          <input type="text" id="field4" name="price" value={selectedBook.price} onChange={handleInputChange} placeholder="Price" />
          <input type="date" id="field5" name="publicationDate" value={selectedBook.publicationDate} onChange={handleInputChange} placeholder="Publication Date" />
          <button id="saveButton" type="submit">Save</button>
          <button id="clearButton" type="button" onClick={handleClear}>Clear</button>
        </form>
      </div>
      <footer className="footer">
        <p>Thank you using this site!</p>
      </footer>
    </div>
  );
}

export default App;
