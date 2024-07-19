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

  const userLiked = user
    ? caption.quoteLikes.some(
        (like: LikedQuotesType) => like.userId === user.id
      )
    : false;

  const text = caption.text;
  const numberOfLikes = caption.quoteLikes.length;

  const captionStyle = {
    flexGrow: 1,
    mr: 1,
    fontSize: { xs: 15, sm: 20, md: 25, lg: 25 },
  };

  const userNameQuoteStyle = {
    fontSize: { xs: 10, sm: 15, md: 20, lg: 20 },
  };

  const captionBoxStyle = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <Box sx={captionBoxStyle}>
      <Box>
        <Typography variant="h3" sx={captionStyle}>
          {text}
        </Typography>
        <Typography variant="h4" sx={userNameQuoteStyle}>
          by: {caption.userNameQuote}
        </Typography>
      </Box>

      {numberOfLikes > 0 && (
        <Badge badgeContent={numberOfLikes} color="primary">
          {userLiked ? (
            <FavoriteIcon color="success" />
          ) : (
            <FavoriteBorderOutlined color="disabled" />
          )}
        </Badge>
      )}
    </Box>
  );
};

export default CaptionWithLikes;
