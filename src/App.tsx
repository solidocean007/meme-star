import AppRoutes from "./Utils/appRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { setUser } from "./Redux/authSlice";
import SnackBarSlide from "./components/SnackBarSlide";
import { useAppDispatch } from "./Redux/store";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userLoggedIn");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      dispatch(setUser(userData));
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <AppRoutes />
        <SnackBarSlide />
      </Router>
    </>
  );
}

export default App;
