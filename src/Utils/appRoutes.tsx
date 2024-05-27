import { Route, Routes } from "react-router";
import HomePage from "../components/HomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/signup" element={SignUpLogin} /> */}
      {/* <Route path="/create" element={CreateMeme} /> */}
    </Routes>
  );
};

export default AppRoutes;
