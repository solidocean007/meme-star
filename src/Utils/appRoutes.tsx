// approutes
import { Route, Routes } from "react-router";
import HomePage from "../components/Pages/HomePage";
import LoginSignUp from "../components/Pages/LoginSignUpPage";
import { Container } from "@mui/material";
import { CreateMemePage } from "../components/Pages/CreateMemePage";
import ThemeButton from "../components/ThemeButton";

const AppRoutes = () => {
  return (
      // <Container component="main" maxWidth={false} sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: "100vh" }}>
      <Container component="main" >
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
