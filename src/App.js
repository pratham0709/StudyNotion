import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/common/Navbar";
import Signup from "./Pages/Signup"
import { useState } from "react";
import Login from "./Pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="flex flex-col w-screen min-h-screen bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
