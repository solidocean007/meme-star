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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return isTabletOrLarger ? (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.default,
          mt: 10,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          width: "100%",
          height: "100vh",
          p: 2,
          pt: 4,
        }}
      >
        {children}
      </Box>
    </Drawer>
  ) : (
    <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
      <IconButton
        id="menu-button"
        aria-controls="menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "menu-button",
        }}
      >
        {React.Children.map(children, (child) => (
          <MenuItem onClick={handleClose}>{child}</MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default NavigationBar;
