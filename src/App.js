import "./App.css";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import React, { useCallback, useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response) {
        throw new Error("Something went wrong!");
      }

      const movieData = await response.json();

      const data = movieData.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });
      setMovies(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  let contents = <p>No Movies Found</p>;
  if (movies.length > 0) {
    contents = <MoviesList movies={movies} />;
  }
  if (isLoading) {
    contents = <p>Loading...</p>;
  }
  if (error) {
    contents = <p>{error}</p>;
  }

const addMovie=(movie)=>{
 console.log(movie)
}


  return (
    <React.Fragment>
      
      <section><AddMovie addMovie={addMovie}/>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{contents}</section>
    </React.Fragment>
  );
}

export default App;
