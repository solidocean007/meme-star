import AppRoutes from "./Utils/appRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./Redux/store";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { setUser } from "./Redux/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Attempt to retrieve the user data from local storage
    const storedUserData = localStorage.getItem('userLoggedIn');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      dispatch(setUser(userData)); // Dispatch an action to set user data in the Redux store
    }
  }, [dispatch]);
  return (
    <>
      <Provider store={store}>
        <Router>
          <Container
            component="main"
            maxWidth="xl"
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
        </Router>
      </Provider>
    </>
  );
}

export default App;
