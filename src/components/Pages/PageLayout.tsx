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
import { headerTextStyle, pageLayoutStyle, userNameStyle } from "../Styles";

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

  return (
    <Container maxWidth={false} sx={{height: "100vh"}}>
      <AppBar
        position="static"
        style={{ background: "var(--dusty-cactus)", color: "black" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h1" component="div" sx={headerTextStyle}>
            MemeStar
          </Typography>
          <Box sx={{ display: "flex", mr: "2rem" }}>
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
    </Container>
  );
};

export default PageLayout;
