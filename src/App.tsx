// app.tsx
import { useEffect } from "react";
import AppRoutes from "./Utils/appRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { setUser } from "./Redux/authSlice";
import { RootState, useAppDispatch } from "./Redux/store";
import "./App.css";
import { useSelector } from "react-redux";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./Utils/theme";
import { setTheme } from "./Redux/themeSlice";
import SnackBarSlide from "./components/elements/SnackBarSlide";
import { getOneUser } from "./api/getOneUser";

const App = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const checkUserExists = async () => {
      const storedUserData = localStorage.getItem("userLoggedIn");

      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        
        try {
          const user = await getOneUser(userData.id);
          if (user) {
            dispatch(setUser(userData));
          } else {
            localStorage.removeItem("userLoggedIn");
            dispatch(setUser(null));
          }
        } catch (error) {
          console.error('Error checking user:', error);
        }
      }

      const savedTheme = localStorage.getItem('isDarkMode');
      if (savedTheme !== null) {
        dispatch(setTheme(JSON.parse(savedTheme)));
      }
    };

    checkUserExists();
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
