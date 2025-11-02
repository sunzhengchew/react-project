import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import {
  Card,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  TextField,
  FormControl,
  Select,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getGenres } from "../../api/tmdb-api";

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const genres = data.genres;
  if (genres[0].name !== "All") genres.unshift({ id: "0", name: "All" });

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e) => handleChange(e, "name", e.target.value);
  const handleGenreChange = (e) => handleChange(e, "genre", e.target.value);
  const handleYearChange = (e) => handleChange(e, "year", e.target.value);
  const handleRatingChange = (e) => handleChange(e, "minRating", e.target.value);

  const resetFilters = () => {
    props.onUserInput("name", "");
    props.onUserInput("genre", "0");
    props.onUserInput("year", "");
    props.onUserInput("minRating", "");
  };

  return (
    <Card
      sx={{
        background: "linear-gradient(180deg, #1a1a1a, #2b2b2b)",
        color: "white",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        p: 1,
        mb: 3,
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          <SearchIcon fontSize="large" /> Filter Movies
        </Typography>

        <Stack spacing={2}>
          <TextField
            fullWidth
            variant="filled"
            label="Search by title"
            type="search"
            value={props.titleFilter}
            onChange={handleTextChange}
            sx={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 1,
              input: { color: "white" },
            }}
          />

          <FormControl fullWidth variant="filled">
            <InputLabel id="genre-label" sx={{ color: "white" }}>
              Genre
            </InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={props.genreFilter}
              onChange={handleGenreChange}
              sx={{
                color: "white",
                ".MuiSelect-icon": { color: "white" },
              }}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            variant="filled"
            label="Release Year"
            type="number"
            value={props.yearFilter}
            onChange={handleYearChange}
            sx={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 1,
              input: { color: "white" },
            }}
          />
          <FormControl fullWidth variant="filled">
            <InputLabel id="rating-label" sx={{ color: "white" }}>
              Minimum Rating
            </InputLabel>
            <Select
              labelId="rating-label"
              id="rating-select"
              value={props.minRatingFilter}
              onChange={handleRatingChange}
              sx={{
                color: "white",
                ".MuiSelect-icon": { color: "white" },
              }}
            >
              <MenuItem value="">All</MenuItem>
              {[5, 6, 7, 8].map((r) => (
                <MenuItem key={r} value={r}>
                  {r}+
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.2)" }} />

        <Button
          variant="outlined"
          fullWidth
          onClick={resetFilters}
          sx={{
            color: "primary.main",
            borderColor: "primary.main",
            "&:hover": {
              backgroundColor: "rgba(255,179,0,0.1)",
            },
          }}
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}