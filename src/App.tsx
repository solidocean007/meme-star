import { useState } from "react";
import AppRoutes from "./Utils/appRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { FavoritesProvider } from "./Providers/favorite.providers";

function App() {
  return (
    <>
      <Router>
        <FavoritesProvider>
          <AppRoutes />
        </FavoritesProvider>
      </Router>
    </>
  );
}

export default App;
