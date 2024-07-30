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
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container disableGutters maxWidth={false} sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Router>
          <AppRoutes />
          <SnackBarSlide />
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
