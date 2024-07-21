import { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import { AccountCircle, LogoutSharp } from "@mui/icons-material";
import { UsersType } from "../../Utils/types";
import { useAppDispatch } from "../../Redux/store";
import { logout } from "../../Redux/authSlice";

interface PageLayoutProps {
  children: ReactNode;
  isAuthenticated: boolean;
  loggedInUser: UsersType | null;
  handleGoToLoginSignUp: () => void;
}

const PageLayout = ({
  children,
  isAuthenticated,
  loggedInUser,
  handleGoToLoginSignUp,
}: PageLayoutProps) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const pageLayoutStyle = {
    // my: 1,
    m: 0,
    p: 0,
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%", // Ensure full width
  };

  const headerTextStyle = {
    // flexGrow: 1,
    fontSize: {
      xs: "2rem",
      sm: "2.5rem",
      md: "2.5rem",
      lg: "3.5rem",
      xl: "4rem",
    },
  };

  const userNameStyle = {
    fontSize: {
      xs: "1rem",
      sm: "1.5rem",
    },
  };

  return (
    <>
      <AppBar
        position="static"
        style={{ background: "var(--dusty-cactus)", color: "black" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h1" component="div" sx={headerTextStyle}>
            MemeStar
          </Typography>
          <Box sx={{display: "flex", mr: "2rem"}}>
            <IconButton color="inherit" onClick={handleGoToLoginSignUp}>
              <AccountCircle />
            </IconButton>
            {isAuthenticated && (
              <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                <Typography variant="h2" component="div" sx={userNameStyle}>
                  {`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}
                </Typography>
                <IconButton color="inherit" onClick={handleLogout}>
                  <LogoutSharp />
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* <Container maxWidth={false} sx={pageLayoutStyle}> */}
      <Container sx={pageLayoutStyle}>
      
        {children}
      </Container>
    </>
  );
};

export default PageLayout;
