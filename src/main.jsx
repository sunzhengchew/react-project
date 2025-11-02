import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import PlaylistMoviesPage from "./pages/playlistPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import TrendingPage from "./pages/trendingPage";
import TopRatePage from "./pages/topRatePage";
import PopularPage from "./pages/popularPage";
import UpcomingPage from "./pages/upcomingPage";
import PersonDetailsPage from "./pages/personDetailPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", 
    primary: {
      main: "#ffb300", 
    },
    secondary: {
      main: "#f44336", 
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    h5: { fontWeight: 600 },
    body1: { color: "#ddd" },
  },
});


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/movies/trending/today" element={<TrendingPage />} />
            <Route path="/movies/top-rated" element={<TopRatePage />} />
            <Route path="/movies/popular" element={<PopularPage />} />
            <Route path="/movies/upcoming" element={<UpcomingPage />} />
            <Route path="/person/:id" element={<PersonDetailsPage />} />
            <Route path="/movies/playlist" element={<PlaylistMoviesPage />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </ThemeProvider>
  );
};


const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);
