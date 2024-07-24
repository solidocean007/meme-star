import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Card,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../Redux/store";
import { getUsersMemes } from "../../api/getUsersMemes";
import { showSnackbar } from "../../Redux/snackBarSlice";
import { getUsersQuotes } from "../../api/getUsersQuotes";
import { useNavigate } from "react-router";
import { MemeType, QuoteType } from "../../Utils/types";
import MemeCard from "../MemeCard";
import { desktopCaptionStyle, desktopCardMediaStyle, desktopUserNameStyle } from "../Styles";

const UsersProfile = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const allMemes = useSelector((state: RootState) => state.memes.entities);
  const [showProfileMemes, setShowProfileMemes] = useState(true);
  const navigate = useNavigate();

  if (!loggedInUser) {
    navigate("/login-sign-up");
  }

  const toggleProfileContent = () => {
    setShowProfileMemes(!showProfileMemes);
  };

  const userMemes = allMemes.filter(meme => meme.createdBy.id === loggedInUser?.id);

  // const profileCardMediaStyle = {
  //   position: "relative",
  //   height: { md: 250, lg: 350 },
  //   width: "100%",
  // };

  // const profileCaptionStyle = {
  //   flexGrow: 1,
  //   mr: 1,
  //   fontSize: { md: 15, lg: 25 },
  // };

  // const profileUserNameStyle = {
  //   fontSize: { md: 15, lg: 20 },
  // };

  return (
    <Container maxWidth={false}>
      <Container>
        <Box display="flex" alignItems="center">
          <Avatar
            alt={`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}
            src={loggedInUser.profileImage}
          />
          <Box ml={2}>
            <Typography variant="h4">
              {loggedInUser?.firstName} {loggedInUser?.lastName}
            </Typography>
          </Box>
        </Box>
      </Container>
      <Tabs value={!showProfileMemes} onChange={toggleProfileContent} centered>
        <Tab label="Memes" />
        <Tab label="Quotes" />
      </Tabs>
      <Box mt={2} sx={{ width: "100%", p: 2 }}>
        {showProfileMemes ? (
          <Grid container spacing={2}>
            {userMemes.map((meme, index) => (
              <Grid item xs={8} sm={7} md={6} lg={5} xl={4} key={index}>
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
        ) : (
          <Box>
            {userQuotes.map((quote, index) => (
              <Box key={index} mb={2}>
                <Typography>"{quote.text}"</Typography>
                <Typography variant="caption">
                  - {quote.userNameQuote}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UsersProfile;
