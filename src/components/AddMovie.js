import React, { useRef } from "react";
import classes from "./AddMovie.module.css";

export default function AddMovie(props) {
  const titleRef = useRef();
  const openingTextRef = useRef();
  const releaseDateRef = useRef();

  const addMovieHandler = (event) => {
    event.preventDefault();
    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    props.addMovie(movie);
    titleRef.current.value=''
   openingTextRef.current.value=''
   releaseDateRef.current.value=''
  };

  return (
    <form onSubmit={addMovieHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening">Opening Text</label>
        <input type="text" id="opening" ref={openingTextRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="date" id="date" ref={releaseDateRef} />
      </div>
      <button className={classes.control}>Submit</button>
    </form>
  );
}
