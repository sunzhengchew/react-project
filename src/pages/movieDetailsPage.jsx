import { useParams, Link } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { getMovieRecommendations } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import RecommentList from "../components/templateRecommentList";
import { getMovieCredits } from "../api/tmdb-api";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import noneImg from "../images/none.jpg";

const MoviePage = (props) => {
  const { id } = useParams();

  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ['movie', { id: id }],
    queryFn: getMovie,
  })

  const { data: recData, error: recError, isPending: recPending, isError: recIsError } = useQuery({
    queryKey: ['recommendations', { id }],
    queryFn: getMovieRecommendations,
  });
  const recommendedMovies = recData?.results || [];

  const { data: credits, isPending: creditsLoading, isError: creditsError, error: creditsErrMsg } = useQuery({
    queryKey: ["credits", { id }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>
          <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Cast</h2>
          {creditsLoading ? (
            <Spinner />
          ) : creditsError ? (
            <p style={{ textAlign: "center", color: "red" }}>
              Failed to load credits: {creditsErrMsg.message}
            </p>
          ) : (
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                gap: 2,
                p: 2,
                scrollSnapType: "x mandatory",
              }}
            >
              {credits?.cast?.slice(0, 20).map((actor) => (
                <Box
                  key={actor.id}
                  sx={{
                    minWidth: 140,
                    flexShrink: 0,
                    textAlign: "center",
                    scrollSnapAlign: "start",
                  }}
                >
                  <Link to={`/person/${actor.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                        : noneImg
                    }
                    alt={actor.name}
                    style={{
                      width: "100%",
                      maxWidth: 170,
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {actor.name}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    as {actor.character}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
          <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Recommended Movies</h2>
          {recPending ? (
            <Spinner />
          ) : recIsError ? (
            <p style={{ textAlign: "center", color: "red" }}>
              Failed to load recommendations.
            </p>
          ) : recommendedMovies.length > 0 ? (
            <RecommentList
              title=""
              movies={recommendedMovies}
              action={() => null}
            />
          ) : (
            <p style={{ textAlign: "center" }}>No recommendations available.</p>
          )}
        </>
      ) : (
        <p>Waiting for movie details...</p>
      )}
    </>
  );
};

export default MoviePage;
