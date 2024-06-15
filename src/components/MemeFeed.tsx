// MemeFeed.tsx
import React, { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { useSelector } from "react-redux";
import { fetchMemes } from "../Redux/memeSlice";
import { RootState } from "../Redux/store";
import MemeCard from "./MemeCard";
import { Box } from "@mui/material";
import { useAppDispatch } from "../Redux/hook";

const MemeFeed: React.FC = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const { entities: memes, loading } = useSelector(
    (state: RootState) => state.memes
  );

  useEffect(() => {
    dispatch(fetchMemes());
  }, [dispatch]);

  console.log(memes)

  if (loading === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: "100%", height: 800, bgcolor: "background.paper", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <List
        height={800}
        width={500}
        itemSize={500}
        itemCount={memes.length}
        itemData={memes}
      >
        {({ index, style }) => (
          <div style={style}>
            <MemeCard meme={memes[index]} loggedInUser={loggedInUser}/>
          </div>
        )}
      </List>
    </Box>
  );
};

export default MemeFeed;
