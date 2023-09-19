import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LaunchTable from "./components/LaunchTable/LaunchTable";
import LaunchDetails from "./components/LaunchDetails/LaunchDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LaunchTable />} />
        <Route path="/launch/:id" element={<LaunchDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
