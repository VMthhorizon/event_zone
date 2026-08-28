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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
