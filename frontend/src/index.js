// Entry point for the React application.

import React from "react"; // Import React library
import ReactDOM from "react-dom"; // Import ReactDOM for rendering
import App from "./App"; // Import the main App component
import "./index.css"; // Import global CSS (includes Tailwind CSS directives)

// Render the App component into the root element of the HTML file
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
