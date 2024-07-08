import { Typography, Box, Badge } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LikedQuotesType, QuoteType, UsersType } from "../Utils/types";
import { FavoriteBorderOutlined } from "@mui/icons-material";

interface CaptionWithLikesProps {
  caption: QuoteType | null;
  user: UsersType | null;
}


const CaptionWithLikes = ({ caption, user }: CaptionWithLikesProps) => {
  if (!caption) return null;

const userLiked = user ? caption.quoteLikes.some((like: LikedQuotesType) => like.userId === user.id) : false;

  const text = caption.text;
  const numberOfLikes = caption.quoteLikes.length;

  return (
    <Box sx={{ display: "flex", height: "100%", width: "80%", alignItems: "center", pb: 3 }}>
      <Typography variant="h5" sx={{ flexGrow: 1, mr: 1 }}>
        {text}
      </Typography>
      {numberOfLikes > 0 && (
        <Badge badgeContent={numberOfLikes} color="primary">
          {userLiked ? <FavoriteIcon color="success" /> : <FavoriteBorderOutlined color="disabled" />}
        </Badge>
      )}
    </Box>
  );
};

export default CaptionWithLikes;
