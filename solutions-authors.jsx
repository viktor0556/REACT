import React, { useState, useEffect } from 'react';

const AuthorsList = () => {

  const [authors, setAuthor] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/books/authors");
        if (response.ok) {
          const data = await response.json();
          setAuthor(data);
        } else {
          console.error('Failed to fetch authors');
        }
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, [])

  return (
    <div>
      authors:
      <ul>{authors.length !== 0 && authors.map((author, index) => (
        <li key={index}>{author.author}</li>
      ))}</ul>
    </div>
  )
}

export default AuthorsList;
