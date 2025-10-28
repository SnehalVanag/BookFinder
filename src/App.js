// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";

function App() {
  const [bookTitle, setBookTitle] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    if (!bookTitle) return;
    setLoading(true);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${bookTitle}`);
      const data = await response.json();
      setBooks(data.docs.slice(0, 10)); // Top 10 results
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h1>📚 Book Finder</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter book title..."
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid #888",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          🔍 Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <div style={{ marginTop: "20px" }}>
        {books.length > 0 ? (
          books.map((book, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                margin: "10px auto",
                padding: "10px",
                width: "60%",
                textAlign: "left",
              }}
            >
              <h3>{book.title}</h3>
              <p>
                <strong>Author:</strong> {book.author_name ? book.author_name.join(", ") : "Unknown"}
              </p>
              <p>
                <strong>First Published:</strong> {book.first_publish_year || "N/A"}
              </p>
              {book.cover_i && (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  style={{ borderRadius: "8px", width: "100px", height: "150px" }}
                />
              )}
            </div>
          ))
        ) : (
          !loading && <p>No books found. Try searching something else.</p>
        )}
      </div>
    </div>
  );
}

export default App;
