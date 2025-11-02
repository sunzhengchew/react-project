import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from '@mui/material/Avatar';
import img from '../../images/film-poster-placeholder.png';

export default function recCard({ movie, action }) { 

  const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };


  return (
    <Card
    sx={{
        width: 220, // ⬅ fixed width
        height: 380, // ⬅ fixed height for uniformity
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        transition: "transform 0.2s ease",
        "&:hover": { transform: "scale(1.05)" },
      }}
      >
      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p" sx={{ fontSize:20,fontWeight: 600, px: 1 }}>
            {movie.title}{" "}
          </Typography>
        }
      />
      <Link to={`/movies/${movie.id}`}>
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
          </Link>
    </Card>
  );
}
