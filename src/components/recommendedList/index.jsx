import React from "react";
import RecCard from "../recCard";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

const RecommendedList = ({ movies, action }) => {
  return (
    <Box sx={{ overflowX: "auto", display: "flex", gap: 2, p: 2 }}>
      {movies.map((m) => (
        <Box key={m.id} sx={{minWidth: 220, maxWidth: 220,flexShrink: 0, marginRight: 2,}}>
          <RecCard movie={m} action={action} />
        </Box>
      ))}
    </Box>
  );
};

export default RecommendedList;
