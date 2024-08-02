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
import UsersProfile from "./UserProfile";

const HomePage = () => {

  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [showProfile, setShowProfile] = useState(false);
  console.log(showProfile);

  useEffect(() => {
    console.log(showProfile);
  }, [showProfile]);

  const isTabletOrLarger = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("lg")
  );

  return (
    <PageLayout
      isAuthenticated={isAuthenticated}
      loggedInUser={loggedInUser}
      showProfile={showProfile}
      setShowProfile={setShowProfile}
      isTabletOrLarger={isTabletOrLarger}
    >
      {showProfile ? (
        <UsersProfile />
      ) : isTabletOrLarger ? (
        <MemeFeedDesktop />
      ) : (
        <MemeFeed />
      )}
    </PageLayout>
  );
};

export default HomePage;
