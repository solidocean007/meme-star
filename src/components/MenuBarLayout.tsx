// Menubarlayout.tsx
import { ReactNode } from "react";
import {
  Container,
  Theme,
  useTheme,
} from "@mui/material";

interface MenuBarLayoutProps {
  children: ReactNode;
}

const MenuBarLayout = ({ children }: MenuBarLayoutProps) => {
  const theme = useTheme<Theme>();

  const menuBarLayoutStyle = {
    display: "flex",
    flexDirection: { xs: "row", lg: "column" },
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    pt: {sx: 1, md: 2, lg: 3, xl: 4  },
    margin: "auto",
    textAlign: "center",
  };

  return <Container disableGutters sx={menuBarLayoutStyle}>{children}</Container>;
};

export default MenuBarLayout;
