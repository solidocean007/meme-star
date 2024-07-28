import React from "react";
import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";

const TabItem = styled(Tab)(({ theme }) => ({
  opacity: 1,
  overflow: "initial",
  paddingTop: theme.spacing(2.5),
  minHeight: theme.spacing(7),
  color: "#fff",
  // background: "rgba(255, 255, 255, 0)",
  background: "transparent",
  transition: "0.2s",
  zIndex: "var(--_zIndex)",
  marginTop: theme.spacing(1),
  textTransform: "initial",
  [theme.breakpoints.up("md")]: {
    minWidth: 120,
  },
  "&::before, &::after": {
    content: '" "',
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  "&:before": {
    // backgroundColor: (theme.vars || theme).palette.grey[500], // Property 'vars' does not exist on type 'Theme'
    backgroundColor: "blue", // Property 'vars' does not exist on type 'Theme'
    transform: "skewY(-6deg)",
    transformOrigin: "100%",
    zIndex: -1,
  },
  "&::after": {
    left: "unset",
    pointerEvents: "none",
    transition: "0.2s",
    transform: "translateX(100%)",
    display: "block",
    width: 8,
    zIndex: 2,
    background:
      "linear-gradient(to top right, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 45%, transparent, transparent 64%)",
  },
  [`&.${tabClasses.selected}`]: {
    color: (theme.vars || theme).palette.text.primary,
    zIndex: 100,
    "&:before": {
      // backgroundColor: "#fff",
      backgroundColor: "green",
      boxShadow: "3px 3px 8px 0 rgba(0,0,0,0.38)",
    },
    "&:after": {
      width: theme.spacing(3.5),
    },
  },
}));

interface TabsSerratedProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export function TabsSerrated({ value, onChange }: TabsSerratedProps) {
  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: "transparent" }}>
      <Toolbar sx={{ overflow: "hidden", minHeight: 72 }}>
        <Tabs
          textColor="inherit"
          value={value}
          onChange={onChange}
          sx={{
            alignSelf: "flex-end",
            overflow: "visible",
            [`& .${tabsClasses.scroller}`]: {
              overflow: "visible !important",
            },
            [`& .${tabsClasses.indicator}`]: {
              display: "none",
            },
          }}
        >
          {["Memes", "Quotes"].map((label, index) => (
            <TabItem key={index} disableRipple label={label} sx={{ zIndex: 100 - index }} />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}
