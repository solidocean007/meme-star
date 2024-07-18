import { Route, Routes } from "react-router";
import HomePage from "../components/Pages/HomePage";
import LoginSignUp from "../components/Pages/LoginSignUpPage";
import { Container } from "@mui/material";
import { CreateMemePage } from "../components/Pages/CreateMemePage";

const AppRoutes = () => {
  return (
    <Container component="main" maxWidth="xl"  sx={{ px: 3 }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<LoginSignUp />} />
        <Route path="/create-meme-page" element={<CreateMemePage />} />
      </Routes>
    </Container>
  );
};

export default AppRoutes;
