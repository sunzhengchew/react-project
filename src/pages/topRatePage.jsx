import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { getTopRateMoviesToday } from "../api/tmdb-api";
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const TopRatePage = (props) => {
  const [page, setPage] = useState(1);
  const moviesPerPage = 20;
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["top rate", page, moviesPerPage],
    queryFn: () => getTopRateMoviesToday(page, moviesPerPage),
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true

  return (
    <>
      <PageTemplate
        title="Top Rated Movies"
        movies={movies}
        action={(movie) => {
          return <><AddToFavoritesIcon movie={movie} /><AddToPlaylistIcon movie={movie} /></>
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
          mb: 4,
        }}
      >
        <Pagination
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#624242ff",
              borderColor: "#ffb300",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#ffb300",
              color: "#000",
            },
          }}
          count={Math.min(data.total_pages, 20)}
          page={page}
          onChange={(e, val) => setPage(val)}
          showFirstButton
          showLastButton
          size="large"
        />
      </Box>
    </>
  );
};

export default TopRatePage;