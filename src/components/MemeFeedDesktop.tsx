import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Redux/store";
import { Box, CircularProgress, Grid } from "@mui/material";
import MemeCard from "./elements/MemeCard";
import { useEffect } from "react";
import { fetchMemes } from "../Redux/memeSlice";
import { showSnackbar } from "../Redux/snackBarSlice";
import { desktopCaptionStyle, desktopCardMediaStyle, desktopUserNameStyle } from "../styles/Styles";

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
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Grid sx={{ display: "flex", justifyContent: "space-around" }} container spacing={1}>
        {memes.map((meme, index) => (
          <Grid item md={6} lg={5} xl={4} key={index}>
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
