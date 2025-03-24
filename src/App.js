// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "/Users/pranaysinguluri/movie-bluff/src/Pages/Login.jsx";
// import Homly from "/Users/pranaysinguluri/movie-bluff/src/Pages/Homly.jsx";
// import Plot from "/Users/pranaysinguluri/movie-bluff/src/Pages/Plot.jsx";
// import PrivateRoute from "/Users/pranaysinguluri/movie-bluff/src/Components /PrivateRoute.jsx";

import { Routes, Route} from "react-router-dom";
import Homly from "/Users/pranaysinguluri/movie-bluff/src/Pages/Homly.jsx";
import Login from "/Users/pranaysinguluri/movie-bluff/src/Pages/Login.jsx";
import SignUp from "/Users/pranaysinguluri/movie-bluff/src/Pages/SignUp.jsx";
import About from "Pages/About";
import Plot from "Pages/Plot";
//import Home from "/Users/pranaysinguluri/movie-bluff/src/Pages/Homly.jsx";
import ErrorPage from "Pages/ErrorPage";
import Profile from "/Users/pranaysinguluri/movie-bluff/src/Pages/Profile.jsx";



function App() {
  return (
    <Routes>
      <Route path="*" element={<Homly />} />
      <Route path="/home/*" element={<Homly />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About/>}/>
      <Route path="/plot" element={<Plot/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/*" element={<ErrorPage />} /> 
    </Routes>
  );
}

export default App;
