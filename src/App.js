import "./App.css";
import MoviesList from "./components/MoviesList";
import React, { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMovieHandler = () => {
    fetch("https://swapi.dev/api/films/")
      .then((response) => {return response.json()})
      .then((movieData) => {
        const data = movieData.results.map((movie) => {
          return {
            id: movie.episode_id,
            title: movie.title,
            releaseDate: movie.release_date,
            openingText: movie.opening_crawl,
          };
        });
        setMovies(data);
      }).catch(error=>console.error(error));
  };


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
