// TopBarLayout.tsx
import { ReactNode } from "react";
import {
  Container,
  Theme,
  useTheme,
} from "@mui/material";

interface TopBarLayoutProps {
  children: ReactNode;
}

const TopBarLayout = ({ children }: TopBarLayoutProps) => {
  const theme = useTheme<Theme>();

  const topBarLayoutStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    pt: {sx: 1, md: 2, lg: 3, xl: 4  },
    margin: "auto",
    textAlign: "center",
  };

  return <Container disableGutters sx={topBarLayoutStyle}>{children}</Container>;
};

export default TopBarLayout;
