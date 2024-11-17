// The results page that displays the generated jukebox musical plot and playlist based on the user's input.

import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // For accessing navigation state and navigation
import PlaylistDisplay from "../components/PlaylistDisplay"; // Component to display the playlist
import RegenerateButton from "../components/RegenerateButton"; // Component for regenerating the results

/**
 * Results Component
 * Displays the generated jukebox musical plot and playlist based on the user's input.
 *
 * @returns {JSX.Element} - The Results page displaying the musical and playlist.
 */

function Results() {
    const location = useLocation(); // Access the state passed from the Home page
    const navigate = useNavigate(); // Hook to navigate to other routes

    // Destructure the data passed from the Home page
    const { food, outfit, mood, actors } = location.state || {};

    /**
     * Handles regeneration by navigating back to the Home page with the same inputs.
     */
    const handleRegenerate = () => {
        navigate("/results", {
            state: {
                food,
                outfit,
                mood,
                actors,
            },
        });
    };

    // Simulated API response (replace this with actual backend data)
    const generatedPlot = `Your jukebox musical features ${food} cuisine, styled with ${outfit} outfits, and a ${mood} mood. Stars include: ${actors.join(", ") || "a surprise cast!"}`;
    const playlist = [
        { name: "Song 1", artists: [{ name: "Artist 1" }] },
        { name: "Song 2", artists: [{ name: "Artist 2" }] },
    ]; // Simulated playlist data

    return (
        <div className="container mx-auto p-6">
            {/* Page title */}
            <h1 className="text-4xl font-bold mb-6">Your JukeCrate Musical</h1>
            {/* Display the generated musical plot */}
            <p className="text-lg text-gray-700 mb-4">{generatedPlot}</p>
            {/* Display the playlist */}
            <PlaylistDisplay tracks={playlist} />
            {/* Button to regenerate results */}
            <RegenerateButton onRegenerate={handleRegenerate} />
        </div>
    );
}

export default Results;
