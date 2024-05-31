// MemeCard.tsx
import React from "react";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import { MemeType } from "../Utils/types";
import { MemeQuotes } from "./MemeQuotes";
import { leadingQuoteForMeme } from "../api/leadingQuoteForMeme";
// import { useSelector } from "react-redux";
// import { RootState } from "../Redux/store";

const MemeCard = ({ meme }: { meme: MemeType }) => {
  const captionWithMostLikes = leadingQuoteForMeme(meme);
  console.log(captionWithMostLikes)
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="250"
        image={meme.imageUrl}
        // alt={meme.altImageText}
        sx={{ position: "relative"}}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 25,
          left: 15,
          width: "100%",
          bgcolor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
          padding: "8px",
        }}
      >
         <Typography variant="body2" color="text.primary" component="p">
            {`${captionWithMostLikes?.text}`}
          </Typography>
      </Box>
      <MemeQuotes quotes={meme.allQuotes} />
    </Card>
  );
};

export default MemeCard;
