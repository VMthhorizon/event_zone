import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/styles/global-custom.css";
import "./assets/styles/custom-bootstrap.css";
import "./assets/styles/custom-bootstrap.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./Auth/AuthPage";
import NotFound from "./NotFound/NotFound";
import Homepage from "./Homepage/Homepage";
import Footer from "./Footer/Footer";
import Settings from "./Settings/Settings";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserProfile } from "./Redux/Slices/userSlice";
import DashboardPage from "./Dashboard/DashboardPage";
import EventDetailsPage from "./EventDetails/EventDetailsPage";
import NavbarHome from "./Homepage/Navbar/NavbarHome";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <NavbarHome />
        <main className="flex-grow-1 d-flex flex-column  ">
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/eventDetails/:id" element={<EventDetailsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
