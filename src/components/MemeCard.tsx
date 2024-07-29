import { useEffect, useState } from "react";
import { Card, CardMedia, Box, Modal, Container, Button } from "@mui/material";
import { ChangeType, ProcessedMemeType, QuoteType, UsersType } from "../Utils/types";
import { MemeQuotes } from "./MemeQuotes";
import { leadingQuoteForMeme } from "../helperFunctions/leadingQuoteForMeme";
import CaptionWithLikes from "./CaptionWithLikes";
import { useNavigate } from "react-router";
import { applyChanges } from "../helperFunctions/applyChanges";
import { useAppDispatch } from "../Redux/store";
import {
  captionStyleType,
  cardMediaStyleType,
  userNameStyleType,
} from "../Utils/styleTypes";

const MemeCard = ({
  meme,
  loggedInUser,
  cardMediaStyle,
  captionStyle,
  userNameStyle,
}: {
  meme: ProcessedMemeType;
  loggedInUser: UsersType | null;
  cardMediaStyle: cardMediaStyleType;
  captionStyle: captionStyleType;
  userNameStyle: userNameStyleType;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const captionWithMostLikes = leadingQuoteForMeme(meme);
  const [localQuotes, setLocalQuotes] = useState<QuoteType[]>(
    meme.allQuotes || []
  );
  const [openQuotes, setOpenQuotes] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<ChangeType[]>([]);

  useEffect(() => {
    if (!openQuotes && pendingChanges.length > 0) {
      applyChanges({
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: { xs: "90%", md: "50%" },
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  };

  const captionContainerStyle = {
    background: "rgba(255, 255, 255, 0.8)",
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
    <Card sx={{ m: 2, position: "relative" }}>
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
              {loggedInUser && meme.allQuotes.find((quote) => quote.userId == loggedInUser.id)
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
        <Box sx={style}>
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
