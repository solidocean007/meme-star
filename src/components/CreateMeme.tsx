import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState, useAppDispatch } from "../Redux/store";
// import { logout } from "../Redux/authSlice";
import { Box, Button, Card, Container, TextField, Typography } from "@mui/material";

export const CreateMeme = () => {
  // const dispatch = useAppDispatch();
  // const loggedInUser = useSelector((state: RootState) => state.auth.user);
  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.auth.isAuthenticated
  // );
  
  const [image, setImage] = useState<File | null>(null);
  const [quote, setQuote] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleQuoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuote(event.target.value);
  };

  const handleSubmit = () => {
    // Handle meme submission logic
    console.log("Image:", image);
    console.log("Quote:", quote);
  };

  return (
    <Container>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Card sx={{ p: 3, width: "100%", maxWidth: 600 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Create Meme</Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Upload Image</Typography>
              <Button variant="contained" component="label">
                Upload File
                <input type="file" hidden onChange={handleImageUpload} />
              </Button>
              {image && (
                <Typography sx={{ mt: 2 }}>{image.name}</Typography>
              )}
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Your Quote</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your meme quote"
                value={quote}
                onChange={handleQuoteChange}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mr: 2 }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setImage(null);
                  setQuote("");
                }}
              >
                Reset
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
  );
};

export default CreateMeme;

