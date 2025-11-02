import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

const MovieHeader = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={6}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        px: 3,
        py: 2,
        mb: 3,
        borderRadius: 2,
        background: "linear-gradient(90deg, #1a1a1a, #2b2b2b 80%)",
        color: "white",
      }}
    >
      <IconButton
        aria-label="go back"
        onClick={() => navigate(-1)}
        sx={{
          color: "primary.main",
          "&:hover": { transform: "scale(1.2)" },
          transition: "transform 0.2s ease",
        }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      <Typography
        variant="h4"
        component="h3"
        align="center"
        sx={{
          flexGrow: 1,
          fontWeight: "bold",
          color: "primary.main",
          textShadow: "0px 2px 10px rgba(255,179,0,0.3)",
        }}
      >
        {movie.title}
        {movie.homepage && (
          <a
            href={movie.homepage}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "inherit",
              marginLeft: 8,
              textDecoration: "none",
            }}
          >
            <IconButton
              sx={{
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "rgba(255,179,0,0.1)",
                  transform: "scale(1.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <HomeIcon fontSize="medium" />
            </IconButton>
          </a>
        )}
        {movie.tagline && (
          <Typography
            variant="subtitle1"
            component="span"
            sx={{
              display: "block",
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "text.secondary",
              mt: 0.5,
            }}
          >
            “{movie.tagline}”
          </Typography>
        )}
      </Typography>

      <IconButton
        aria-label="go forward"
        onClick={() => navigate(+1)}
        sx={{
          color: "primary.main",
          "&:hover": { transform: "scale(1.2)" },
          transition: "transform 0.2s ease",
        }}
      >
        <ArrowForwardIcon fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;

