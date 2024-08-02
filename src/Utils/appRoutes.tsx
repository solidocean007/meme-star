// approutes
import { Route, Routes } from "react-router";
import HomePage from "../components/Pages/HomePage";
import LoginSignUp from "../components/Pages/LoginSignUpPage";
import { Container } from "@mui/material";
import { CreateMemePage } from "../components/Pages/CreateMemePage";
import ThemeButton from "../components/ThemeButton";

const AppRoutes = () => {
  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxWidth: "100vw"
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-sign-up" element={<LoginSignUp />} />
        <Route path="/create-meme-page" element={<CreateMemePage />} />
      </Routes>
      <ThemeButton />
    </Container>
  );
};

export default AppRoutes;
