import { Route, Routes } from "react-router";
import HomePage from "../components/Pages/HomePage";
import LoginSignUp from "../components/Pages/LoginSignUpPage";
import { Container } from "@mui/material";
import { CreateMemePage } from "../components/Pages/CreateMemePage";
import ThemeButton from "../components/ThemeButton";

const AppRoutes = () => {
  return (
    // <Container component="main" maxWidth="xl"  sx={{ px: 3 }}>
    // <Container component="main" sx={{ px: 3 }}>
    <Container component="main" maxWidth={false} sx={{position:"relative"}}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<LoginSignUp />} />
        <Route path="/create-meme-page" element={<CreateMemePage />} />
      </Routes>
      <ThemeButton />
    </Container>
  );
};

export default AppRoutes;
