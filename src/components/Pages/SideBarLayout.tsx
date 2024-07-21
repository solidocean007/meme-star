import { ReactNode } from "react";
import {
  Container,
} from "@mui/material";

interface SideBarLayoutProps {
  children: ReactNode;
}

const SideBarLayout = ({
  children,
}: // theme,
SideBarLayoutProps) => {
  const sideBarLayoutStyle = {
    my: 2,
    display: "flex",
    flexDirection: { xs: "row", md: "column" },
    alignItems: "center",
    justifyContent: "start",
    width: "100%", // Ensure full width
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "2rem",
    // padding: theme.spacing(2),
    // borderRadius: theme.shape.borderRadius,
    margin: "auto",
    textAlign: "center",
  };

  return (
    <Container maxWidth={false} sx={sideBarLayoutStyle}>
      {children}
    </Container>
  );
};

export default SideBarLayout;
