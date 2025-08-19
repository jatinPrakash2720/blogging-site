import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import ComponentPlayground from "./pages/ComponentPlayground";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComponentPlayground />} />
        {/* Add other pages here later */}
      </Routes>
    </Router>
  );
}

export default App;
