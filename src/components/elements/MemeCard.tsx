import { useEffect, useState } from "react";
import { Card, CardMedia, Box, Modal, Container, Button } from "@mui/material";
import {
  ChangeType,
  ProcessedMemeType,
  QuoteType,
  UsersType,
} from "../../Utils/types";
import { MemeQuotes } from "./MemeQuotes";
import { leadingQuoteForMeme } from "../../helperFunctions/leadingQuoteForMeme";
import CaptionWithLikes from "./CaptionWithLikes";
import { useNavigate } from "react-router";
import { applyChangesToMemes } from "../../helperFunctions/applyChangesToMemes";
import { useAppDispatch } from "../../Redux/store";
import { Theme } from "@mui/material/styles";

import { useTheme } from "@emotion/react";
import {
  CaptionStyleType,
  CardMediaStyleType,
  UserNameStyleType,
} from "../../Utils/styleTypes";
import { memeQuoteContainerStyle } from "../../styles/Styles";

const MemeCard = ({
  meme,
  loggedInUser,
  cardMediaStyle,
  captionStyle,
  userNameStyle,
}: {
  meme: ProcessedMemeType;
  loggedInUser: UsersType | null;
  cardMediaStyle: CardMediaStyleType;
  captionStyle: CaptionStyleType;
  userNameStyle: UserNameStyleType;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const captionWithMostLikes = leadingQuoteForMeme(meme);
  const [localQuotes, setLocalQuotes] = useState<QuoteType[]>(
    meme.allQuotes || []
  );
  const [openQuotes, setOpenQuotes] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<ChangeType[]>([]);
  const theme = useTheme() as Theme;

  useEffect(() => {
    if (!openQuotes && pendingChanges.length > 0) {
      applyChangesToMemes({
        pendingChanges,
        setPendingChanges,
        dispatch,
        setLocalQuotes,
      });
    }
  }, [openQuotes, pendingChanges, dispatch, setLocalQuotes]);

  const handleClose = () => {
    setOpenQuotes(false);
  };
  const handleOpen = () => setOpenQuotes(true);

  const handleGoToSignUp = () => {
    navigate("/login-sign-up");
  };

  const captionContainerStyle = {
    background:
      theme.palette.mode === "dark"
        ? "rgba(0, 0, 0, 0.8)"
        : "rgba(255, 255, 255, 0.8)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
  };

  return (
    <Card sx={{ position: "relative", margin: "10px" }}>
      <CardMedia component="img" src={meme.imageUrl} sx={cardMediaStyle} />
      {meme.allQuotes?.length && (
        <Box sx={captionContainerStyle}>
          <Container
            title="leading-caption"
            onClick={loggedInUser ? handleOpen : handleGoToSignUp}
            sx={{ background: "transparent" }}
          >
            <CaptionWithLikes
              caption={captionWithMostLikes}
              user={loggedInUser}
              captionStyle={captionStyle}
              userNameStyle={userNameStyle}
            />
            <Button
              sx={{
                fontSize: { xs: 8, sm: 8, md: 10, lg: 13 }, // Responsive font size
              }}
              onClick={loggedInUser ? handleOpen : handleGoToSignUp}
            >
              {loggedInUser &&
              meme.allQuotes.find((quote) => quote.userId == loggedInUser.id)
                ? null
                : `${meme.allQuotes?.length || 0} Quotes. Now add yours!`}
              {/* {loggedInUser && meme.allQuotes.find((quote) => quote.userId !== loggedInUser.id)
                ? `${meme.allQuotes?.length || 0} Quotes. Now add yours!`
                : "login to comment yours"} */}
            </Button>
          </Container>
        </Box>
      )}

      <Modal
        open={openQuotes}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={memeQuoteContainerStyle}>
          <MemeQuotes
            localQuotes={localQuotes}
            setPendingChanges={setPendingChanges}
            pendingChanges={pendingChanges}
            memeId={meme.id}
            currentUser={loggedInUser}
            setLocalQuotes={setLocalQuotes}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </Card>
  );
};

export default MemeCard;
