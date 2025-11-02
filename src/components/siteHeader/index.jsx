import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MovieCreationTwoToneIcon from "@mui/icons-material/MovieCreationTwoTone";
import Box from "@mui/material/Box";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Playlist", path: "/movies/playlist" },
    { label: "Trending Today", path: "/movies/trending/today" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Upcoming", path: "/movies/upcoming" },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(90deg, #1a1a1a 0%, #2b2b2b 80%)",
          color: "primary.main",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
            }}
            onClick={() => navigate("/")}
          >
            <MovieCreationTwoToneIcon
              fontSize="large"
              sx={{
                color: "primary.main",
                mr: 1,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                letterSpacing: 1,
              }}
            >
              TMDB Client
            </Typography>
          </Box>{(
            <Box sx={{ display: "flex", gap: 2 }}>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                  sx={{
                    color: "primary.main",
                    fontWeight: "bold",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "rgba(255,179,0,0.1)",
                    },
                    borderRadius: "20px",
                    px: 2,
                  }}
                >
                  {opt.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
