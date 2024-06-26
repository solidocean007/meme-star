import { Typography, Box, Badge } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { QuoteType } from "../Utils/types";

interface CaptionWithLikesProps {
  caption: QuoteType | null; // Update this to allow null, matching your usage when there might be no quote.
}

const CaptionWithLikes = ({ caption }: CaptionWithLikesProps) => {
  if (!caption) return null; // Handle null case

  const text = caption.text;
  const numberOfLikes = caption.quoteLikes.length;

  return (
    <Box sx={{ display: "flex", alignItems: "center", pr: 10 }}>
      <Typography variant="subtitle1" sx={{ flexGrow: 1, mr: 1 }}>
        {text}
      </Typography>
      {numberOfLikes > 0 && (
        <Badge badgeContent={numberOfLikes} color="primary">
          <FavoriteIcon color="success" />
        </Badge>
      )}
    </Box>
  );
};

export default CaptionWithLikes;
