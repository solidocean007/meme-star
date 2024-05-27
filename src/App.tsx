import { useState } from "react";
import AppRoutes from "./Utils/appRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { Container } from "@mui/material";
// import { FavoritesProvider } from "./Providers/favorite.providers";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
        <Container component="main" maxWidth="xl" sx={{ mt: 8, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              {/* <FavoritesProvider> */}
          <AppRoutes />
          {/* </FavoritesProvider> */}
          </Container>
        
        </Router>
      </Provider>
    </>
  );
}

export default App;
