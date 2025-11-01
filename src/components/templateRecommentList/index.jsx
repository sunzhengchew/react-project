import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import RecommendedCard from "../recommendedList";
import Grid from "@mui/material/Grid";

function RecommentList({ movies, title, action }) {
  let displayedMovies = movies
  return (
      <Grid container sx={{flex: "1 1 500px"}}>
        <RecommendedCard action={action} movies={displayedMovies}></RecommendedCard>
      </Grid>
  );
}
export default RecommentList;