import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Redux/store";
import { Box, Grid } from "@mui/material";
import MemeCard from "./MemeCard";
import { useEffect } from "react";
import { fetchMemes } from "../Redux/memeSlice";
import { showSnackbar } from "../Redux/snackBarSlice";

const MemeFeedDesktop = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const {
    entities: memes,
    loading,
    error,
  } = useSelector((state: RootState) => state.memes);

  useEffect(() => {
    try {
      dispatch(fetchMemes());
    } catch {
      dispatch(showSnackbar({ message: "problem", type: "error" }));
    }
  }, [dispatch]);

  if (loading === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const desktopCardMediaStyle = {
    position: "relative",
    height: { md: 250, lg: 300 }, // Responsive height
    width: "100%", // Make sure the image takes full width
  };

  const desktopCaptionStyle = {
    flexGrow: 1,
    mr: 1,
    fontSize: { md: 10, lg: 15 },
  };

  const desktopUserNameStyle = {
    fontSize: {  md: 10, lg: 10 },
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", p: 2 }}>
      <Grid container spacing={2}>
        {memes.map((meme, index) => (
          <Grid item lg={4} xl={3} key={index}>
            <MemeCard
              meme={meme}
              loggedInUser={loggedInUser}
              cardMediaStyle={desktopCardMediaStyle}
              captionStyle={desktopCaptionStyle}
              userNameStyle={desktopUserNameStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MemeFeedDesktop;
