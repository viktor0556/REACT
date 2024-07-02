// Implement a function that allows you to delete books from the list and database with the push of a button.

import React, { useState, useEffect } from 'react';

const DeleteBook = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/books/");
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          console.error('Failed to fetch Books');
        }
      } catch (error) {
        console.error('Error fetching Books:', error);
      }
    };
    fetchBooks();
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = fetch(`http://localhost:3000/api/books/${id}`,{
        method: 'DELETE',
      })
      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        console.log('Book deleted successfully');
      } else {
        console.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
      }

  return (
    <div>
      
      {books.length > 0 ? (
        <>
        <ul>
            {books.map((book) => (
              <li key={book.id}>
                ID: {book.id}<br />
                Title: {book.title}<br />
                Author: {book.author}<br />
                Published Date: {book.published_date}<br />
                Genre: {book.genre}<br />
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No Books available</p>
      )}
      
    </div>
  )
}

export default DeleteBook;
