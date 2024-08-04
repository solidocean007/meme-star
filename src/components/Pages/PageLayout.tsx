// pagelayout.tsx
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
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        p: 0,
        m: 0,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
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

      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
          },
          justifyContent: "start",
          alignItems: "start",
          width: "100%",
          height: "100%",
          p: 0,
        }}
      >
        <Box>
          <NavigationBar>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  md: "column",
                  lg: "column",
                  xl: "column",
                },
                justifyContent: "center",
                alignItems: "center",
                p: 1,
                // maxWidth: "50%",
              }}
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
        </Box>
        <Box
          sx={{
            width: { xs: "95%", md: "80%", lg: "65%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          {children}
        </Box>
        {isTabletOrLarger && (
          <Box
            sx={{ display: { xs: "none", lg: "block" }, width: "20%", p: 2 }}
          >
            <LeaderBoard />
          </Box>
        )}
      </Container>

      {openHowToPlay && (
        <Modal open={openHowToPlay} onClose={handleCloseHowToPlay}>
          <Card sx={{ bgcolor: "white" }}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "95%", sm: "75%", md: "50%", lg: "25%" },
                p: 2,
              }}
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
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "95%", sm: "75%", md: "50%", lg: "25%" },
                p: 2,
              }}
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
