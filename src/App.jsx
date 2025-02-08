import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landing/LandingPage";
import MainPage from "./pages/mainPage/MainPage";
import Profile from "./pages/profile/Profile";
import Payments from "./pages/payments/Payments";
import Details from "./pages/details/Details";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/detail/:id" element={<Details />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
