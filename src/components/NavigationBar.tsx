import React, { ReactNode, useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Theme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface NavigationBarProps {
  children: ReactNode;
}

const NavigationBar = ({ children }: NavigationBarProps) => {
  const theme = useTheme<Theme>();
  const isTabletOrLarger = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md")
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      {isTabletOrLarger ? (
        <Box
          sx={{
            width: 240,
            flexShrink: 0,
            height: "100vh",
            backgroundColor: theme.palette.background.default,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            p: 2,
            pt: 2,
            mt: 2,
          }}
        >
          {children}
        </Box>
      ) : (
        <Box sx={{width: "100%", display: "flex", justifyContent: "center", p: "0" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon  sx={{ fontSize: "50px", color: theme.palette.text.secondary }} />
          </IconButton>
          <Drawer
            anchor="top"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            sx={{
              [`& .MuiDrawer-paper`]: {
                boxSizing: "border-box",
                width: "100%",
                backgroundColor: theme.palette.background.default,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                p: 2,
                pt: 4,
              }}
              onClick={handleDrawerToggle}
            >
              {children}
            </Box>
          </Drawer>
        </Box>
      )}
    </>
  );
};

export default NavigationBar;
