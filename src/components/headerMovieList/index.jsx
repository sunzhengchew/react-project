import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={6}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        p: 2,
        mb: 2,
        borderRadius: 2,
        background: "linear-gradient(90deg, #1a1a1a, #2b2b2b 90%)",
        color: "#fff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      {/* 🔙 Back Button */}
      <IconButton
        aria-label="go back"
        onClick={() => navigate(-1)}
        sx={{
          color: "primary.main",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.2)",
            backgroundColor: "rgba(255,179,0,0.1)",
          },
        }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      {/* 🎬 Title */}
      <Typography
        variant="h4"
        component="h3"
        sx={{
          flexGrow: 1,
          textAlign: "center",
          fontWeight: "bold",
          color: "primary.main",
          textShadow: "0px 2px 10px rgba(255,179,0,0.4)",
          letterSpacing: 1,
        }}
      >
        {title}
      </Typography>

      {/* 🔜 Forward Button */}
      <IconButton
        aria-label="go forward"
        onClick={() => navigate(+1)}
        sx={{
          color: "primary.main",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.2)",
            backgroundColor: "rgba(255,179,0,0.1)",
          },
        }}
      >
        <ArrowForwardIcon fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;

