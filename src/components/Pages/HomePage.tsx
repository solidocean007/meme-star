import { useState } from "react";
import {
  useMediaQuery,
  Theme,
} from "@mui/material";
import MemeFeed from "../MemeFeed";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import PageLayout from "../Layouts/PageLayout";
import MemeFeedDesktop from "../MemeFeedDesktop";
import UsersProfile from "../Layouts/UserProfileLayout";
import CreateMeme from "../CreateMeme";

const HomePage = () => {
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [showProfile, setShowProfile] = useState(false);
  const [showCreateMeme, setShowCreateMeme] = useState(false);

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
      showCreateMeme={showCreateMeme}
      setShowCreateMeme={setShowCreateMeme}
    >
      {showProfile ? (
        <UsersProfile />
      ) : showCreateMeme ? (
        <CreateMeme />
      ) : isTabletOrLarger ? (
        <MemeFeedDesktop />
      ) : (
        <MemeFeed />
      )}
    </PageLayout>
  );
};

export default HomePage;
