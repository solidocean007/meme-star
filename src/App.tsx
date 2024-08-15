// app.tsx
import { useEffect } from "react";
import AppRoutes from "./Utils/appRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { setUser } from "./Redux/authSlice";
import SnackBarSlide from "./components/SnackBarSlide";
import { RootState, useAppDispatch } from "./Redux/store";
import "./App.css";
import { useSelector } from "react-redux";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./Utils/theme";
import { setTheme } from "./Redux/themeSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const storedUserData = localStorage.getItem("userLoggedIn");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      dispatch(setUser(userData));
    }
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme !== null) {
      dispatch(setTheme(JSON.parse(savedTheme)));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false}>
        <Router>
          <AppRoutes />
          <SnackBarSlide />
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
