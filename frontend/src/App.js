// Main React component that sets up routing.

// Import necessary libraries and components
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // For routing
import Home from "./pages/Home"; // Import Home page
import Results from "./pages/Results"; // Import Results page

/**
 * App Component
 * The main entry point of the application that sets up routing.
 */
function App() {
    return (
        <Router>
            {/* Define routes for the application */}
            <Routes>
                {/* Route for the Home page */}
                <Route path="/" element={<Home />} />
                {/* Route for the Results page */}
                <Route path="/results" element={<Results />} />
            </Routes>
        </Router>
    );
}

export default App;

