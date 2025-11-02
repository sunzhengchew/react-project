import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarTodayTwoToneIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import img from "../../images/film-poster-placeholder.png";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

export default function MovieCard({ movie, action }) {
const { favorites, playlist, addToFavorites, addToPlaylist } = useContext(MoviesContext);

  const isFavorite = favorites.includes(movie.id);
const isInPlaylist = playlist.includes(movie.id);
movie.favorite = isFavorite;
movie.inPlaylist = isInPlaylist;

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  return (
    <Card
      sx={{
        background:
          "linear-gradient(180deg, rgba(26,26,26,0.95) 0%, rgba(40,40,40,0.95) 100%)",
        color: "white",
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0px 8px 30px rgba(0,0,0,0.5)",
        },
      }}
    >

      <CardHeader
        avatar={
          <>
          {movie.favorite && (
            <Tooltip title="In Favorites">
              <Avatar sx={{ backgroundColor: "#f44336", width: 30, height: 30 }}>
                <FavoriteIcon />
              </Avatar>
            </Tooltip>
          )}
          {movie.inPlaylist && (
        <Tooltip title="In Playlist">
          <Avatar sx={{ backgroundColor: "#1976d2", width: 30, height: 30 }}>
            <PlaylistAddCheckIcon fontSize="small" />
          </Avatar>
        </Tooltip>
      )}
      </>
        }
        title={
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              lineHeight: 1.2,
              minHeight: 48,
            }}
          >
            {movie.title}
          </Typography>
        }
      />


      <CardMedia
        sx={{
          height: 420,
          objectFit: "cover",
          filter: "brightness(0.9)",
          transition: "filter 0.3s ease",
          "&:hover": { filter: "brightness(1)" },
        }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
        alt={movie.title}
      />


      <CardContent sx={{ pt: 2 }}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body2" color="text.secondary">
              <CalendarTodayTwoToneIcon
                fontSize="small"
                sx={{ mr: 0.5, verticalAlign: "middle" }}
              />
              {movie.release_date || "N/A"}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body2" color="text.secondary" align="right">
              <StarRateIcon
                fontSize="small"
                sx={{ mr: 0.5, verticalAlign: "middle", color: "#ffb300" }}
              />
              {movie.vote_average ? movie.vote_average.toFixed(1) : "?"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>


      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          pb: 2,
        }}
      >
        {action(movie)}

        <Link
          to={`/movies/${movie.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "primary.main",
              color: "black",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#ffca28",
              },
            }}
          >
            More Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
