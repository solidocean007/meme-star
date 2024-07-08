// MemeCard.tsx
import { useEffect, useState } from "react";
import { Card, CardMedia, Box, Modal, Button, Container } from "@mui/material";
import { ChangeType, MemeType, QuoteType, UsersType } from "../Utils/types";
import { MemeQuotes } from "./MemeQuotes";
import { leadingQuoteForMeme } from "../helperFunctions/leadingQuoteForMeme";
import CaptionWithLikes from "./CaptionWithLikes";
import { useNavigate } from "react-router";
import { applyChanges } from "../helperFunctions/applyChanges";
import { useAppDispatch } from "../Redux/store";

const MemeCard = ({
  meme,
  loggedInUser,
}: {
  meme: MemeType;
  loggedInUser: UsersType | null;
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
    navigate("/signup");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "#ffffff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  };

  return (
    <Card sx={{ maxWidth: 600, m: 2 }}>
      <CardMedia
        component="img"
        height="450"
        width="600"
        image={meme.imageUrl}
        // alt={meme.altImageText}
        sx={{ position: "relative" }}
      />

      {meme.allQuotes?.length && (
        <Box
          sx={{
            position: "absolute",
            bottom: 90,
            left: 15,
            width: "100%",
            height: 80,
            // textAlign?
            bgcolor: "rgba(255, 255, 255, 0.8)",
            padding: "10px",
          }}
        >
          <Container
            title="leading-caption"
            onClick={loggedInUser ? handleOpen : handleGoToSignUp}
            style={{ background: "transparent" }}
          >
            <CaptionWithLikes
              caption={captionWithMostLikes}
              user={loggedInUser}
            />
          </Container>
        </Box>
      )}
      <Button
        sx={{ fontSize: "20px" }}
        onClick={loggedInUser ? handleOpen : handleGoToSignUp}
      >
        (
        {loggedInUser
          ? `${meme.allQuotes && meme.allQuotes?.length} Quotes. Now add yours!`
          : "login to comment yours"}
        )
      </Button>
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
