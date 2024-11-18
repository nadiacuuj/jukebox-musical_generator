// Entry point for the React application.

import React from "react"; // Import React library
import { createRoot } from "react-dom/client"; // Import createRoot for React 18
import App from "./App"; // Import the main App component
import "./index.css"; // Import global CSS (includes Tailwind CSS directives)

// Get the root element
const container = document.getElementById("root");

// Create a root and render the App component
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
