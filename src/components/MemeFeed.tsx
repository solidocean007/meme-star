// MemeFeed.tsx
import React, { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { useSelector } from "react-redux";
import { fetchMemes } from "../Redux/memeSlice";
import { RootState, useAppDispatch } from "../Redux/store";
import MemeCard from "./elements/MemeCard";
import { Box, CircularProgress } from "@mui/material";
import { showSnackbar } from "../Redux/snackBarSlice";
import useWindowDimensions from "../helperFunctions/useWindowDimensions";
import {
  mobileCaptionStyle,
  mobileCardMediaStyle,
  mobileUserNameStyle,
} from "../styles/Styles";

const MemeFeed: React.FC = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const {
    entities: memes,
    loading,
    error,
  } = useSelector((state: RootState) => state.memes);
  const { width } = useWindowDimensions();

  // Calculate item size based on window width
  const getItemSize = (width: number) => {
    if (width < 400) return 300; // xSmall screens
    if (width < 600) return 350; // Small screens
    if (width < 960) return 400; // Medium screens
    if (width < 1280) return 450; // Large screens
    return 500; // Extra large screens
  };

  const itemSize = getItemSize(width);

  useEffect(() => {
    try {
      dispatch(fetchMemes());
    } catch {
      dispatch(showSnackbar({ message: "problem", type: "error" }));
    }
  }, [dispatch]);

  if (loading === "loading") {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // const itemWidth = 

  return (
    <Box>
      <List
        height={800}
        width={itemSize}
        itemSize={itemSize}
        itemCount={memes.length}
        itemData={memes}
      >
        {({ index, style }) => (
          <Box style={style}>
            <MemeCard
              meme={memes[index]}
              loggedInUser={loggedInUser}
              cardMediaStyle={mobileCardMediaStyle}
              captionStyle={mobileCaptionStyle}
              userNameStyle={mobileUserNameStyle}
            />
          </Box>
        )}
      </List>
    </Box>
  );
};

export default MemeFeed;
