import { SxProps, Theme } from "@mui/material";

export const pageLayoutStyle = {
  // my: 1,
  m: 0,
  p: 0,
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%", // Ensure full width
  height: "100%"
};

export const homePageStyle = {
  my: 1,
  width: "100%",
  height: "100%",
};

export const mobileCardMediaStyle: SxProps<Theme> = {
  position: "relative",
  height: { xs: 300, sm: 350, md: 400, lg: 450 },
  width: "100%",
};

export const mobileCaptionStyle = {
  flexGrow: 1,
  mr: 1,
  fontSize: { xs: 18, sm: 23 },
};

export const mobileUserNameStyle = {
  fontSize: { xs: 15, sm: 20 },
};

export const desktopCardMediaStyle:  SxProps<Theme> = {
  position: "relative",
  height: { md: 250, lg: 300 },
  width: "100%",
};

export const desktopCaptionStyle = {
  flexGrow: 1,
  mr: 1,
  fontSize: { md: 10, lg: 15 },
};

export const portfolioCardMediaStyle = {
  position: "relative",
  height: { md: 250, lg: 300 },
  width: "100%",
};

export const portfolioCaptionStyle = {
  flexGrow: 1,
  mr: 1,
  fontSize: {xs:15, sm:15, md: 15, lg: 20 },
};

export const desktopUserNameStyle = {
  fontSize: { md: 10, lg: 13 },
};

export const headerTextStyle = {
   flexGrow: 1,
  fontSize: {
    xs: "2rem",
    sm: "2.5rem",
    md: "2.5rem",
    lg: "3.5rem",
    xl: "4rem",
  },
};

export const userNameStyle = {
  fontSize: {
    xs: 15,
    sm: 15,
    md: 18,
    lg: 20,
    xl: 35
  },
};


export const portfolioUserNameStyle = {
  fontSize: {
    xs: 10,
    sm: 12,
    md: 12,
    lg: 15,
    xl: 15,
  },
};

export const sideBarButtonStyle = {
  // marginBottom: 4,
  fontSize: {
    xs: 5,
    sm: 5,
    md: 7,
    lg: 10,
    xl: 17,
  },
  fontWeight: 900,
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  letterSpacing: '0.5px',
};
