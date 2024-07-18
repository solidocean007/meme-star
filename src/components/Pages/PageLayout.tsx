import React, { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import { AccountCircle, LogoutSharp, Margin } from "@mui/icons-material";
import { UsersType } from "../../Utils/types";

interface PageLayoutProps {
  children: ReactNode;
  isAuthenticated: boolean;
  loggedInUser: UsersType | null;
  handleGoToLoginSignUp: () => void;
  handleLogout: () => void;
}

const PageLayout = ({
  children,
  isAuthenticated,
  loggedInUser,
  handleGoToLoginSignUp,
  handleLogout,
}: PageLayoutProps) => {
  const pageLayoutStyle = {
    my: 4,
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%", // Ensure full width
  };

  const footerStyle = {
    bgcolor: "primary.main",
    color: "white",
    py: 3,
    mt: 4,
    textAlign: "center",
    width: "100%",
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
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton> */}
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

      <Container maxWidth={false} sx={pageLayoutStyle}>
        {children}
      </Container>

      <Box component="footer" sx={footerStyle}>
        <Container maxWidth="md">
          <Typography variant="body1">Your daily dose of fun</Typography>
          <Typography variant="caption">© 2024 MemeStar</Typography>
        </Container>
      </Box>
    </>
  );
};

export default PageLayout;
