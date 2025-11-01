import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getPersonDetails, getPersonMovieCredits } from "../api/tmdb-api";
import { Box, Typography, Avatar } from "@mui/material";
import PageTemplate from "../components/templateMovieListPage";

const PersonDetailsPage = () => {
  const { id } = useParams();

  const { data: person, isLoading: personLoading, isError: personError } = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPersonDetails,
  });

  const { data: credits, isLoading: creditsLoading } = useQuery({
    queryKey: ["person-movies", { id }],
    queryFn: getPersonMovieCredits,
  });

  if (personLoading) return <Spinner />;
  if (personError) return <h1>Failed to load person</h1>;

  const movies = credits?.cast || [];

  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <Avatar
        alt={person.name}
        src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
        sx={{ width: 200, height: 200, margin: "auto" }}
      />
      <Typography variant="h4" sx={{ mt: 2 }}>
        {person.name}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: "gray" }}>
        {person.biography || "No biography available."}
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Filmography
      </Typography>
      <PageTemplate
        title=""
        movies={movies}
        action={() => null}
      />
    </Box>
  );
};

export default PersonDetailsPage;
