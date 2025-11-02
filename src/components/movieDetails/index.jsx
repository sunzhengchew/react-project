import React, { useState } from "react";
import {
  Chip,
  Paper,
  Typography,
  Fab,
  Drawer,
  Stack,
  Divider,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRateIcon from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import LanguageIcon from "@mui/icons-material/Language";
import SavingsIcon from "@mui/icons-material/Savings";
import MovieReviews from "../movieReviews";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
  gap: 0.5,
};

const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const formatCurrency = (amount) =>
    amount ? `$${amount.toLocaleString()}` : "N/A";

  const getLanguageName = (code) => {
    try {
      const name = new Intl.DisplayNames(["en"], { type: "language" });
      return name.of(code) || code;
    } catch {
      return code;
    }
  };

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ mt: 2, mb: 1 }}>
        Overview
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "black",
          mb: 2,
          lineHeight: 1.7,
        }}
      >
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root, backgroundColor: "background.paper" }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.id || g.name}>
            <Chip label={g.name} sx={{ ...chip }} variant="outlined" />
          </li>
        ))}
      </Paper>

      <Paper
        component="ul"
        sx={{
          ...root,
          backgroundColor: "background.paper",
          mt: 2,
          p: 2,
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        }}
      >
        <Chip
          icon={<AccessTimeIcon />}
          label={`${movie.runtime || "?"} min`}
          sx={chip}
          color="primary"
          variant="outlined"
        />

        <Chip
          icon={<LanguageIcon />}
          label={`Language: ${getLanguageName(movie.original_language)}`}
          sx={chip}
        />

        <Chip
          icon={<SavingsIcon />}
          label={`Budget: ${formatCurrency(movie.budget)}`}
          sx={chip}
        />

        <Chip
          icon={<MonetizationIcon />}
          label={`Revenue: ${formatCurrency(movie.revenue)}`}
          sx={chip}
        />

        <Chip
          icon={<StarRateIcon sx={{ color: "#ffb300" }} />}
          label={`Rating: ${movie.vote_average?.toFixed(1)}`}
          sx={chip}
        />

        <Chip
          label={`Released: ${movie.release_date}`}
          sx={chip}
          color="secondary"
          variant="outlined"
        />
      </Paper>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1.5em",
          right: "1.5em",
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Reviews
      </Fab>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            p: 2,
            backgroundColor: "background.default",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}
        >
          Movie Reviews
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
