import { SxProps, Theme } from "@mui/material";

export const pageLayoutStyle = {
  p: 0,
  m: 1,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
};

export const navigationBarStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  p: 1,
}

export const pageContainerStyle = {
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
}

export const pageMemeFeedBox = {
  width: { xs: "95%", md: "80%", lg: "65%" },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  p: 2,
}

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "75%", md: "50%", lg: "25%" },
  p: 2,
}

export const homePageStyle = {
  my: 1,
  width: "100%",
  height: "100%",
};

export const menuButtonStyle = { p: 1, m: 2, width: "90%"};

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

export const desktopCardMediaStyle: SxProps<Theme> = {
  position: "relative",
  height: { md: 200, lg: 250 },
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
  fontSize: { xs: 15, sm: 15, md: 15, lg: 20 },
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
    xl: 35,
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
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
  letterSpacing: "0.5px",
};

export const memeQuoteContainerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: { xs: "90%", md: "50%" },
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};


