import AppRoutes from "./Utils/appRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { setUser } from "./Redux/authSlice";
import SnackBarSlide from "./components/SnackBarSlide";
import { useAppDispatch } from "./Redux/store";
import "./App.css"


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userLoggedIn');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      dispatch(setUser(userData));
    }
  }, [dispatch]);

  return (
    <>
      <Router>
          <Container
            component="main"
            // maxWidth="xl"
            maxWidth={false}
            sx={{
              mt: 8,
              mb: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AppRoutes />
          </Container>
          <SnackBarSlide />
        </Router>
    </>
  );
}

export default App;
