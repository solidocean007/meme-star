// sidebarlayout.tsx
import { ReactNode } from "react";
import {
  Container,
  Theme,
  useTheme,
} from "@mui/material";

interface SideBarLayoutProps {
  children: ReactNode;
}

const SideBarLayout = ({ children }: SideBarLayoutProps) => {
  const theme = useTheme<Theme>();

  const sideBarLayoutStyle = {
    display: "flex",
    flexDirection: { xs: "row", md: "column" },
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    p: 0,
    margin: "auto",
    textAlign: "center",
    pt: 4,
  };

  return <Container disableGutters sx={sideBarLayoutStyle}>{children}</Container>;
};

export default SideBarLayout;
