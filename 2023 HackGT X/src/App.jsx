import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Stats from "./pages/Stats/Stats";
import Sidebar from "./components/Sidebar/Sidebar";
import Intro from "./pages/Intro/Intro";
// import Details from "./src/pages/Details";
// import Profile from "./src/pages/Profile";

const App = () => {
  return (
    <Router>
      <>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          {/* 
          <Route path="/details" element={<Details />} />
          <Route path="/profile" element={<Profile />} />
          */}
        </Routes>
      </>
    </Router>
  );
};

export default App;
