import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Redux/store";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeType } from "../Utils/types";
import { addMeme } from "../api/addMeme";
import { createQuote } from "../api/createQuote";
import { showSnackbar } from "../Redux/snackBarSlice";
// import { addMemeToRedux } from "../Redux/memeSlice";

export const CreateMeme = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useSelector((state: RootState) => state.auth.user);

  const [image, setImage] = useState<File | null>(null);
  const [quote, setQuote] = useState("");

  const clearForm = () => {
    setImage(null);
    setQuote("");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleQuoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuote(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (image && loggedInUser && quote) {
        const addNewMemeChange: ChangeType = {
          type: "addMeme",
          data: {
            id: undefined,
            imageUrl: `/src/assets/images/${image.name}`, // what would be the image url if this was not using json-server?
            userId: loggedInUser.id,
          },
        };
        const addMemeResponse = await addMeme(addNewMemeChange.data);
        if (addMemeResponse) {
          // now that a new meme is created i need to create a new change that adds a quote
          const addNewQuoteChange: ChangeType = {
            type: "addQuote",
            data: {
              id: undefined,
              memeId: addMemeResponse.id,
              text: quote,
              userId: loggedInUser.id,
              userNameQuote: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
              quoteLikes: [],
            },
          };
          const addQuoteResponse = await createQuote(addNewQuoteChange.data);
          if (addQuoteResponse && addMemeResponse) {
            dispatch(
              showSnackbar({
                message: "Meme successfully created!",
                type: "success",
              })
            );
            clearForm();
          }
        }
      } else {
        dispatch(
          showSnackbar({
            message: "Please ensure image and quote are properly entered.",
            type: "error",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Card sx={{ p: 3, width: "100%", maxWidth: 600 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Create Meme
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Upload Image
            </Typography>
            <Button variant="contained" component="label">
              Upload File
              {/* <input type="file" hidden onChange={handleImageUpload} /> */}
              {/* <input type="text" onChange={handleImageUrlSave} /> */}
            </Button>
            {image && (
              <>
                <Typography sx={{ mt: 2 }}>{image.name}</Typography>
                <CardMedia
                  component="img"
                  sx={{ mt: 2, maxHeight: 400 }}
                  image={URL.createObjectURL(image)}
                  alt="Selected Image"
                />
              </>
            )}
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Your Quote
            </Typography>
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
