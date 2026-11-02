import { useState } from "react";
import "./App.css";

function App() {
  // The list of movies. Starts empty.
  const [movies, setMovies] = useState([]);

  // What the user is typing in the form right now.
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(3);

  // Add a new movie to the list.
  function addMovie(event) {
    event.preventDefault(); // stop the page from reloading

    // Don't add a movie with no title.
    if (title.trim() === "") {
      return;
    }

    const newMovie = {
      id: Date.now(), // a unique number to identify this movie
      title: title,
      comment: comment,
      rating: rating,
    };

    // Make a new list with all the old movies + the new one.
    setMovies([...movies, newMovie]);

    // Clear the form.
    setTitle("");
    setComment("");
    setRating(3);
  }

  // Remove a movie by its id.
  function removeMovie(id) {
    // Keep every movie EXCEPT the one with this id.
    const newList = movies.filter(function (movie) {
      return movie.id !== id;
    });
    setMovies(newList);
  }

  // Turn a number (like 3) into emojis (⭐⭐⭐).
  function showStars(number) {
    return "⭐".repeat(number);
  }

  return (
    <div className="app">
      <h1>Movies Watch List</h1>

      {/* The form to add a movie */}
      <form className="form" onSubmit={addMovie}>
        <label>
          Movie title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Inception"
          />
        </label>

        <label>
          Your review
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you think?"
          />
        </label>

        <label>
          Stars: {showStars(rating)}
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={1}>1 star</option>
            <option value={2}>2 stars</option>
            <option value={3}>3 stars</option>
            <option value={4}>4 stars</option>
            <option value={5}>5 stars</option>
          </select>
        </label>

        <button type="submit">Add movie</button>
      </form>

      {/* The list of movies */}
      <h2>Watched ({movies.length})</h2>

      {movies.length === 0 && (
        <p className="empty">No movies yet. Add the first one above.</p>
      )}

      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie">
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="stars">{showStars(movie.rating)}</p>
              {movie.comment !== "" && (
                <p className="comment">{movie.comment}</p>
              )}
            </div>
            <button className="remove" onClick={() => removeMovie(movie.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;