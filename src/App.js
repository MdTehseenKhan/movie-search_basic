import { useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

// e617b7c2
// c032e2d7

const API_URL = "http://www.omdbapi.com/?apikey=c032e2d7";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieSearch</h1>

      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          searchMovies(searchTerm);
        }}
      >
        <input
          placeholder="Search for movies"
          defaultValue="batman"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          type="search"
        />
        <button
          type="submit"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        >
          <img src={SearchIcon} alt="Search" />
        </button>
      </form>

      <div className="container">
        {movies?.length > 0 ? (
          movies.map((movie) => {
            return <MovieCard movie={movie} />;
          })
        ) : (
          <div className="empty">
            <h2>Not Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
