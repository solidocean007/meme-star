// MemeFeed.tsx
import React, { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { MemeType } from "../Utils/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemes } from "../Redux/memeSlice";
import { RootState } from "../Redux/store";
import MemeCard from "./MemeCard";
import { Box } from "@mui/material";

const MemeFeed: React.FC = () => {
  const dispatch = useDispatch();
  const { entities: memes, loading } = useSelector(
    (state: RootState) => state.memes
  ); // Destructure memes and loading directly

  useEffect(() => {
    dispatch(fetchMemes()); // Argument of type 'AsyncThunkAction<any, void, AsyncThunkConfig>' is not assignable to parameter of type 'UnknownAction'
  }, [dispatch]);

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
            <MemeCard meme={memes[index]} />
          </div>
        )}
      </List>
    </Box>
  );
};

export default MemeFeed;
