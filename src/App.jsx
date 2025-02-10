import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landing/LandingPage";
import MainPage from "./pages/mainPage/MainPage";
import Profile from "./pages/profile/Profile";
import Payments from "./pages/payments/Payments";
import Details from "./pages/details/Details";
import Cards from "./pages/cards/Cards";
import Settings from "./pages/settings/Settings";
import Auth from "./admin/auth/Auth";
import MainPageAdmin from "./pages/mainPage/MainPageAdmin";
import AddCard from "./components/AddCard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/detail/:id" element={<Details />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/auth" element={<Auth />} />
        <Route path="/admin" element={<MainPageAdmin />}>
          <Route path="add" element={<AddCard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
