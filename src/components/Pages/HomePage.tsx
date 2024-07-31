import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Box,
  Grid,
  useMediaQuery,
  Theme,
} from "@mui/material";
import MemeFeed from "../MemeFeed";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import PageLayout from "./PageLayout";
import MemeFeedDesktop from "../MemeFeedDesktop";
import { homePageStyle } from "../Styles";
import UsersProfile from "./UserProfile";

const HomePage = () => {
  // const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [showProfile, setShowProfile] = useState(false);
  console.log(showProfile);

  useEffect(() => {
    console.log(showProfile)
  },[showProfile])


  const isTabletOrLarger = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("lg")
  );

  return (
    <div className="homepage">
      <PageLayout
        isAuthenticated={isAuthenticated}
        loggedInUser={loggedInUser}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
      >
        <Container disableGutters maxWidth={false} sx={homePageStyle}>
          
          <Grid container spacing={0} m={0} p={0} sx={{ height: "100%" }}>
            {/* <Grid item xs={11} md={11} sx={{ height: "100%" }}> */}
            <Grid item sx={{ height: "100%" }}>
              {showProfile ? (
                <UsersProfile />
              ) : isTabletOrLarger ? (
                <MemeFeedDesktop />
              ) : (
                <MemeFeed />
              )}
            </Grid>
          </Grid>
        </Container>
      </PageLayout>
    </div>
  );
};

export default HomePage;

