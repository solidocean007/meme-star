// MemeCard.tsx
import { useState } from "react";
import { Card, CardMedia, Box, Modal, Button } from "@mui/material";
import { MemeType, UsersType } from "../Utils/types";
import { MemeQuotes } from "./MemeQuotes";
import { leadingQuoteForMeme } from "../api/helperFunctions/leadingQuoteForMeme";
import CaptionWithLikes from "./CaptionWithLikes";
import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";
// import { RootState } from "../Redux/store";

const MemeCard = ({ meme, loggedInUser }: { meme: MemeType, loggedInUser: UsersType }) => {
  const navigate = useNavigate();
  const captionWithMostLikes = leadingQuoteForMeme(meme);
  const [openQuotes, setOpenQuotes] = useState(false);
  // console.log("meme: ", meme);
  const handleClose = () => {
    setOpenQuotes(false);
  };

  const handleOpen = () => {
    setOpenQuotes(true);
  };

  const handleGoToSignUp = () => {
    navigate('/signup')
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // bgcolor: "#ffffff",
    bgcolor: "#ffffff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  // console.log(meme.allQuotes)
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
      <Box
        sx={{
          position: "absolute",
          bottom: 45,
          left: 15,
          width: "100%",
          height: 40,
          // textAlign?
          bgcolor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
          padding: "8px",
        }}
      >
        <CaptionWithLikes caption={captionWithMostLikes} />
      </Box>
     <Button onClick={ loggedInUser ? handleOpen : handleGoToSignUp}>
        ({loggedInUser ? `${meme.allQuotes && meme.allQuotes?.length - 1} Other Quotes. Now add yours!` : 'login to comment yours'})
      </Button>
      <Modal // this modal should be absolutely positioned center to the window or body
        open={openQuotes}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MemeQuotes quotes={meme.allQuotes} currentUser={loggedInUser} />
        </Box>
      </Modal>
    </Card>
  );
};

export default MemeCard;
