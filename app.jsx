import React, { useState } from "react";

function App() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          author,
          published_date: publishedDate,
          genre,
        }),
      });
      if (response.ok) {
        setTitle("");
        setAuthor("");
        setPublishedDate("");
        setGenre("");
        setId("");
      } else {
        throw new Error("Failed to add new book");
      }
    } catch (error) {
      console.error("Error adding new book:", error);
    }
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <label>id:</label>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />

      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Author:</label>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      <label>Published Date:</label>
      <input
        type="date"
        value={publishedDate}
        onChange={(e) => setPublishedDate(e.target.value)}
      />

      <label>Genre:</label>
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <button type="submit">Add Book</button>
    </form>
    
  );
}

export default App;
