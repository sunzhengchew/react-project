import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Snackbar,
  Alert,
  Paper,
  Divider,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router";

const ratings = [
  { value: 5, label: "Excellent" },
  { value: 4, label: "Good" },
  { value: 3, label: "Average" },
  { value: 2, label: "Poor" },
  { value: 1, label: "Terrible" },
];

const ReviewForm = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [rating, setRating] = useState(3);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/movies/favorites");
  };

  const defaultValues = { author: "", review: "", rating: 3 };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (review) => {
    review.movieId = movie.id;
    review.rating = rating;
    context.addReview(movie, review);
    setOpen(true);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        mt: 4,
        mx: "auto",
        p: 4,
        width: "100%",
        maxWidth: 600,
        background: "linear-gradient(180deg, #1e1e1e, #2b2b2b)",
        borderRadius: 4,
        color: "white",
      }}
    >

      <Typography
        variant="h4"
        sx={{
          mb: 2,
          textAlign: "center",
          fontWeight: "bold",
          color: "primary.main",
          letterSpacing: 1,
        }}
      >
        Write a Review
      </Typography>
      <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.2)" }} />

      <Snackbar
        open={open}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={handleSnackClose}
          sx={{ width: "100%" }}
        >
          <Typography variant="h6">
            ✅ Thank you for submitting your review!
          </Typography>
        </Alert>
      </Snackbar>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        noValidate
      >
        <Controller
          name="author"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              label="Author's Name"
              required
              sx={{
                input: { color: "white" },
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: 1,
              }}
              InputLabelProps={{ style: { color: "#ccc" } }}
              error={!!errors.author}
              helperText={errors.author?.message}
            />
          )}
        />

        <Controller
          name="review"
          control={control}
          rules={{
            required: "Review cannot be empty.",
            minLength: { value: 10, message: "Review is too short." },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              label="Your Review"
              multiline
              minRows={6}
              fullWidth
              required
              sx={{
                input: { color: "white" },
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: 1,
              }}
              InputLabelProps={{ style: { color: "#ccc" } }}
              error={!!errors.review}
              helperText={errors.review?.message}
            />
          )}
        />

        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Select Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              variant="filled"
              helperText="Choose how you’d rate this movie"
              sx={{
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: 1,
                "& .MuiSelect-icon": { color: "white" },
              }}
              InputLabelProps={{ style: { color: "#ccc" } }}
            >
              {ratings.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              px: 4,
              borderRadius: "25px",
              "&:hover": { backgroundColor: "#ffca28", color: "#000" },
            }}
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => reset(defaultValues)}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              px: 4,
              borderRadius: "25px",
              "&:hover": { backgroundColor: "rgba(244,67,54,0.1)" },
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ReviewForm;

