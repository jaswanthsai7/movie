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
      const response = await fetch(
        "https://moviedb-http-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response) {
        throw new Error("Something went wrong!");
      }

      const movieData = await response.json();
      const loaded = [];
      for (const key in movieData) {
        loaded.push({
          id: key,
          title: movieData[key].title,
          openingText: movieData[key].opening_crawl,
          releaseDate: movieData[key].release_date,
        });
      }

      // const data = movieData.results.map((movie) => {
      //   return {
      //     id: movie.episode_id,
      //     title: movie.title,
      //     releaseDate: movie.release_date,
      //     openingText: movie.opening_crawl,
      //   };
      // });
      setMovies(loaded);
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

  const addMovie = async (movie) => {
    const response = await fetch(
      "https://moviedb-http-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = response.json();
    console.log(data)
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie addMovie={addMovie} />
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{contents}</section>
    </React.Fragment>
  );
}

export default App;
