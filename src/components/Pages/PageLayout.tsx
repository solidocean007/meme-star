import { ReactNode, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  useTheme,
  Theme,
  Button,
  Modal,
  Card,
} from "@mui/material";
import { AccountCircle, LogoutSharp } from "@mui/icons-material";
import { UsersType } from "../../Utils/types";
import { useAppDispatch } from "../../Redux/store";
import { logout } from "../../Redux/authSlice";
import {
  headerTextStyle,
  menuButtonStyle,
  modalStyle,
  navigationBarStyle,
  pageContainerStyle,
  pageLayoutStyle,
  pageMemeFeedBox,
  sideBarButtonStyle,
  userNameStyle,
} from "../Styles";
import LeaderBoard from "../LeaderBoard";
import HowToPlay from "../HowToPlay";
import { useNavigate } from "react-router";
import NavigationBar from "../NavigationBar";

interface PageLayoutProps {
  children: ReactNode;
  isAuthenticated: boolean;
  loggedInUser: UsersType | null;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  showProfile: boolean;
  isTabletOrLarger: boolean;
  showCreateMeme: boolean;
  setShowCreateMeme: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageLayout = ({
  children,
  isAuthenticated,
  loggedInUser,
  setShowProfile,
  showProfile,
  isTabletOrLarger,
  showCreateMeme,
  setShowCreateMeme,
}: PageLayoutProps) => {
  // const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const dispatch = useAppDispatch();
  const [openLeaderBoard, setOpenLeaderBoard] = useState(false);
  const [openHowToPlay, setOpenHowToPlay] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };
  const theme = useTheme<Theme>();
  const navigate = useNavigate();

  const handleCreateMeme = () => setShowCreateMeme((prev) => !prev);

  const handleOpenLeaderBoard = () => setOpenLeaderBoard(true);

  const handleCloseLeaderBoard = () => setOpenLeaderBoard(false);

  const handleGoToLoginSignUp = () => {
    if (!isAuthenticated) {
      navigate("/login-sign-up");
    }
  };

  const handleShowProfile = () => {
    setShowProfile((prevShowProfile) => !prevShowProfile);
  };

  const handleOpenHowToPlay = () => {
    setOpenHowToPlay(true);
  };

  const handleCloseHowToPlay = () => {
    setOpenHowToPlay(false);
  };

  return (
    <Container maxWidth={false} disableGutters sx={pageLayoutStyle}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          p: 0,
          maxWidth: "100%",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h1"
            component="div"
            sx={headerTextStyle}
            color={theme.palette.text.secondary}
          >
            MemeStar
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mr: "2rem" }}>
            <IconButton onClick={handleGoToLoginSignUp} color="primary">
              <AccountCircle
                sx={{ fontSize: { xs: "20", sm: "25", md: "30", lg: "40px" } }}
              />
            </IconButton>
            {!isAuthenticated && (
              <Button
                color="primary"
                variant="contained"
                onClick={handleGoToLoginSignUp}
                sx={sideBarButtonStyle}
              >
                Sign Up / Log In
              </Button>
            )}

            {isAuthenticated && (
              <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h2"
                  component="div"
                  sx={userNameStyle}
                  color={theme.palette.text.secondary}
                >
                  {`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}
                </Typography>
                <IconButton onClick={handleLogout} color="primary">
                  <LogoutSharp />
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container disableGutters maxWidth={false} sx={pageContainerStyle}>
        <NavigationBar>
          <Box
            sx={navigationBarStyle}
          >
            <Button
              variant="contained"
              color="info"
              onClick={handleCreateMeme}
              sx={menuButtonStyle}
            >
              <Typography variant="h4" color={theme.palette.text.primary}>
                {!showCreateMeme ? "Create Meme" : "Home"}
              </Typography>
            </Button>

            {!isTabletOrLarger && (
              <Button
                variant="contained"
                color="info"
                onClick={handleOpenLeaderBoard}
                sx={menuButtonStyle}
              >
                <Typography variant="h4" color={theme.palette.text.primary}>
                  LeaderBoard
                </Typography>
              </Button>
            )}
            <Button
              variant="contained"
              color="info"
              onClick={handleShowProfile}
              sx={menuButtonStyle}
            >
              <Typography variant="h4" color={theme.palette.text.primary}>
                {!showProfile ? "Profile" : "Close Profile"}
              </Typography>
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={handleOpenHowToPlay}
              sx={menuButtonStyle}
            >
              <Typography variant="h4" color={theme.palette.text.primary}>
                How to Play
              </Typography>
            </Button>
          </Box>
        </NavigationBar>
        <Box
          sx={pageMemeFeedBox}
        >
          {children}
        </Box>
        {isTabletOrLarger && (
          <Box
            sx={{ display: { xs: "none", lg: "block" }, width: "25%", p: 2 }}
          >
            <LeaderBoard />
          </Box>
        )}
      </Container>

      {openHowToPlay && (
        <Modal open={openHowToPlay} onClose={handleCloseHowToPlay}>
          <Card sx={{ bgcolor: "white" }}>
            <Box
              sx={modalStyle}
            >
              <HowToPlay open={openHowToPlay} onClose={handleCloseHowToPlay} />
              <Button onClick={handleCloseHowToPlay} fullWidth>
                Close
              </Button>
            </Box>
          </Card>
        </Modal>
      )}
      {openLeaderBoard && (
        <Modal open={openLeaderBoard} onClose={handleCloseLeaderBoard}>
          <Card sx={{ bgcolor: "white" }}>
            <Box
              sx={modalStyle}
            >
              <LeaderBoard />
              <Button onClick={handleCloseLeaderBoard} fullWidth>
                Close
              </Button>
            </Box>
          </Card>
        </Modal>
      )}
    </Container>
  );
};

export default PageLayout;
