import { Typography, Box, Badge } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { QuoteType } from "../Utils/types";

interface CaptionWithLikesProps {
  caption: QuoteType | null;
}

const CaptionWithLikes = ({ caption }: CaptionWithLikesProps) => {
  if (!caption) return null;

  const text = caption.text;
  const numberOfLikes = caption.quoteLikes.length;

  return (
    <Box sx={{ display: "flex", height: "100%", width: "80%", alignItems: "center", pb: 3 }}>
      <Typography variant="h5" sx={{ flexGrow: 1, mr: 1 }}>
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
