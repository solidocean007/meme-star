import { Route, Routes } from "react-router";
import HomePage from "../components/HomePage";
import LoginSignUp from "../components/LoginSignUp";
import { Container } from "@mui/material";

const style = {
  mt: 8,
  mb: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const AppRoutes = () => {
  return (
    <Container component="main" maxWidth="xl" sx={style}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<LoginSignUp />} />
      </Routes>
    </Container>
  );
};

export default AppRoutes;
