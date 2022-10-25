import "./assets/App.css";
import React from "react";
import PlusSquare from "./assets/svg/plus-square.svg";
import PersonCircle from "./assets/svg/person-circle.svg";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Feed from "./pages/Feed/Feed";
import Map from "./pages/Map/Map";
import CreatePost from "./pages/CreatePost/CreatePost";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="container">
      <div className="navbar">
        <div className="navbarStart">
          <h3>RoadMapper</h3>
        </div>
        <div className="navbarCenter">
          <h3
            className={`${
              location.pathname.endsWith("map") ? "active" : ""
            } cursor-pointy`}
            onClick={() => navigate("/feed")}
          >
            Feed
          </h3>
          <h3 className="divider">|</h3>
          <h3
            className={`${
              location.pathname.endsWith("feed") ? "active" : ""
            } cursor-pointy`}
            onClick={() => navigate("/map")}
          >
            Mapa
          </h3>
        </div>
        <div className="navbarEnd">
          <h3>Nahlásit</h3>
          <img
            className="cursor-pointy"
            src={PlusSquare}
            alt="plus square icon"
            onClick={() => navigate("/create")}
          />
          <img src={PersonCircle} alt="person circle icon" />
        </div>
      </div>
      <Routes>
        <Route path="/feed" element={<Feed />} />
        <Route path="/map" element={<Map />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Routes>
    </div>
  );
}

export default App;
