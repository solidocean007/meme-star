// MemeFeed.tsx
import React, { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { useSelector } from "react-redux";
import { fetchMemes } from "../Redux/memeSlice";
import { RootState, useAppDispatch } from "../Redux/store";
import MemeCard from "./MemeCard";
import { Box } from "@mui/material";
import { showSnackbar } from "../Redux/snackBarSlice";

const MemeFeed: React.FC = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const { entities: memes, loading } = useSelector(
    (state: RootState) => state.memes
  );

  useEffect(() => {
    try{
      dispatch(fetchMemes());

    } catch{
      dispatch(showSnackbar({ message: 'problem', type: "error" }));
    }
  }, [dispatch]);

  if (loading === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: "100%", height: 800, bgcolor: "background.paper", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <List
        height={800}
        width={600}
        itemSize={550}
        itemCount={memes.length}
        itemData={memes}
      >
        {({ index, style }) => (
          <Box style={style}>
            <MemeCard meme={memes[index]} loggedInUser={loggedInUser}/>
          </Box>
        )}
      </List>
    </Box>
  );
};

export default MemeFeed;
