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
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  console.log(showProfile);

  const handleGoToLoginSignUp = () => {
    if (!isAuthenticated) {
      navigate("/login-sign-up");
    }
  };

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
        <Container maxWidth={false} sx={homePageStyle}>
          {!isAuthenticated && (
            <Box m={2} width="100%">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleGoToLoginSignUp}
              >
                Sign Up / Log In
              </Button>
            </Box>
          )}
          <Grid container spacing={1} m={0} p={0} sx={{ height: "100%" }}>
            <Grid item xs={12} md={12} sx={{ height: "100%" }}>
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

