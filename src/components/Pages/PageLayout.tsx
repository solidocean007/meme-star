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
  Grid,
} from "@mui/material";
import { AccountCircle, LogoutSharp } from "@mui/icons-material";
import { UsersType } from "../../Utils/types";
import { useAppDispatch } from "../../Redux/store";
import { logout } from "../../Redux/authSlice";
import {
  headerTextStyle,
  pageLayoutStyle,
  sideBarButtonStyle,
  userNameStyle,
} from "../Styles";
import SideBarLayout from "../SideBarLayout";
import LeaderBoard from "../LeaderBoard";
import HowToPlay from "../HowToPlay";
import { useNavigate } from "react-router";

interface PageLayoutProps {
  children: ReactNode;
  isAuthenticated: boolean;
  loggedInUser: UsersType | null;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  showProfile: boolean;
}

const PageLayout = ({
  children,
  isAuthenticated,
  loggedInUser,
  setShowProfile,
  showProfile,
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

  const handleCreateMeme = () => {
    navigate("/create-meme-page");
  };

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
      sx={{ width: "100vw", height: "100vh" }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          p: 2,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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

      <Grid container spacing={1} m={0} p={0} sx={{ height: "100%" }}>
        <Grid item xs={12} md={1} p={0}>
          <SideBarLayout>
            <Button variant={undefined} color="info" onClick={handleCreateMeme}>
              <Typography
                variant="h3"
                sx={sideBarButtonStyle}
                color={theme.palette.text.primary}
              >
                Create Meme
              </Typography>
            </Button>
            <Box display={{ xs: "block", sm: "block", md: "none" }}>
              <Button
                variant={undefined}
                color="info"
                onClick={handleOpenLeaderBoard}
              >
                <Typography
                  variant="h3"
                  sx={sideBarButtonStyle}
                  color={theme.palette.text.primary}
                >
                  Show LeaderBoard
                </Typography>
              </Button>
            </Box>
            <Box>
              <Button
                variant={undefined}
                color="info"
                onClick={handleShowProfile}
              >
                <Typography
                  variant="h3"
                  sx={sideBarButtonStyle}
                  color={theme.palette.text.primary}
                >
                  {!showProfile ? "Profile" : "Close Profile"}
                </Typography>
              </Button>
            </Box>
            <Box>
              <Button
                variant={undefined}
                color="info"
                onClick={handleOpenHowToPlay}
              >
                <Typography
                  variant="h3"
                  sx={sideBarButtonStyle}
                  color={theme.palette.text.primary}
                >
                  How to Play
                </Typography>
              </Button>
            </Box>
          </SideBarLayout>
        </Grid>
        <Grid item xs={12} md={8} sx={{ height: "100%" }}>
          <Container maxWidth={false} disableGutters sx={pageLayoutStyle}>
            {children}
          </Container>
        </Grid>
        <Grid item xs={12} md={3} display={{ xs: "none", md: "block" }}>
          <SideBarLayout>
            <LeaderBoard />
          </SideBarLayout>
        </Grid>
      </Grid>
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
    </Container>
  );
};

export default PageLayout;
