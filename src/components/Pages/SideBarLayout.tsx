import { ReactNode } from "react";
import { Container } from "@mui/material";

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
    backgroundColor: "rgba(1000, 6000, 9000, .4)",
    margin: "auto",
    textAlign: "center",
    pt: 4,
  };

  return (
    <Container maxWidth={false} disableGutters sx={sideBarLayoutStyle}>
      {children}
    </Container>
  );
};

export default SideBarLayout;
