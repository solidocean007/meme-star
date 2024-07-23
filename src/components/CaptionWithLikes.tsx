import { Typography, Box, Badge } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LikedQuotesType, QuoteType, UsersType } from "../Utils/types";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { captionStyleType, userNameStyleType } from "../Utils/styleTypes";

interface CaptionWithLikesProps {
  caption: QuoteType | null;
  user: UsersType | null;
  captionStyle: captionStyleType;
  userNameStyle: userNameStyleType;
}

const CaptionWithLikes = ({ caption, user, captionStyle, userNameStyle }: CaptionWithLikesProps) => {
  if (!caption) return null;

  const userLiked = user
    ? caption.quoteLikes.some(
        (like: LikedQuotesType) => like.userId === user.id
      )
    : false;

  const text = caption.text;
  const numberOfLikes = caption.quoteLikes.length;

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
        <Typography variant="h4" sx={userNameStyle}>
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
