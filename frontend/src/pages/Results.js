// The results page that displays the generated jukebox musical plot and playlist based on the user's input.

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlaylistDisplay from "../components/PlaylistDisplay";
import RegenerateButton from "../components/RegenerateButton";

/**
 * Results Component
 * Displays the generated jukebox musical plot and playlist based on the user's input.
 * Includes buttons for regenerating or starting over.
 */
function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    const { food, outfit, mood, actors } = location.state || {};

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

    const handleStartOver = () => {
        navigate("/");
    };

    const generatedPlot = `Your jukebox musical features ${food} cuisine, styled with ${outfit} outfits, and a ${mood} mood. Stars include: ${actors.join(", ") || "a surprise cast!"}`;
    const playlist = [
        { name: "Song 1", artists: [{ name: "Artist 1" }] },
        { name: "Song 2", artists: [{ name: "Artist 2" }] },
    ];

    return (
        <div className="container mx-auto p-6 text-center">
            <h1 className="text-4xl font-bold mb-6">Your JukeCrate Musical</h1>
            <p className="text-lg text-gray-700 mb-4">{generatedPlot}</p>
            <PlaylistDisplay tracks={playlist} />
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={handleRegenerate}
                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition shadow-md"
                >
                    Yeah no, I don’t quite like this musical. Please Regenerate!
                </button>
                <button
                    onClick={handleStartOver}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow-md"
                >
                    Start Over
                </button>
            </div>
        </div>
    );
}

export default Results;
