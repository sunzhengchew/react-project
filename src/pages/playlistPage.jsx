import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";
import WriteReview from "../components/cardIcons/writeReview";

const PlaylistPage = () => {
  const { playlist: movieIds = [] } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const playlistQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });

  const isPending = playlistQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = playlistQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="To Watch"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromPlaylistIcon movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );

};

export default PlaylistPage;