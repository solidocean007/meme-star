// approutes
import { Route, Routes } from "react-router";
import HomePage from "../components/Pages/HomePage";
import LoginSignUp from "../components/Pages/LoginSignUpPage";
import { Container } from "@mui/material";
import ThemeButton from "../components/elements/ThemeButton";

const AppRoutes = () => {
  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxWidth: "100vw",
        justifyContent: "center"
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-sign-up" element={<LoginSignUp />} />
      </Routes>
      <ThemeButton />
    </Container>
  );
};

export default AppRoutes;
