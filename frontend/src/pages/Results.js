// The results page that displays the generated jukebox musical plot and playlist based on the user's input.

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlaylistDisplay from "../components/PlaylistDisplay";

function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    // State to store the musical plot, playlist, and request states
    const [plot, setPlot] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Extract data passed from the Home page
    const { food, outfit, mood, actors } = location.state || {};

    // Function to fetch the jukebox musical and playlist from the backend
    const fetchMusicalData = async () => {
        setLoading(true);
        setError(""); // Reset errors

        try {
            console.log("Sending request to backend:", { food, outfit, mood, actors });

            const response = await fetch("http://127.0.0.1:5000/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    food,
                    outfit,
                    mood,
                    actors,
                    limit: 5, // Limit the number of Spotify tracks
                }),
            });

            console.log("Raw backend response:", response);

            if (response.ok) {
                const data = await response.json();
                console.log("Parsed backend response:", data);
                setPlot(data.plot); // Save the generated plot
                setPlaylist(data.tracks || []); // Save the Spotify playlist
            } else {
                const errorData = await response.json();
                console.error("Backend returned an error:", errorData);
                setError(errorData.error || "Something went wrong.");
            }
        } catch (err) {
            console.error("Error fetching API:", err);
            setError("Failed to connect to the backend. Is it running?");
        } finally {
            setLoading(false); // Loading complete
        }
    };

    // Trigger fetch when component mounts
    useEffect(() => {
        if (food && outfit && mood) {
            fetchMusicalData();
        } else {
            setError("Missing required fields.");
            setLoading(false);
        }
    }, [food, outfit, mood]);

    // Start over navigation
    const handleStartOver = () => {
        navigate("/");
    };

    // Regenerate the musical plot and playlist
    const handleRegenerate = () => {
        fetchMusicalData();
    };

    // Loading state
    if (loading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    // Error state
    if (error) {
        return (
            <div className="container mx-auto p-6 text-center">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={handleStartOver}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow-md"
                >
                    Start Over
                </button>
            </div>
        );
    }

    // Render plot and playlist
    return (
        <div className="container mx-auto p-6 text-center">
            <h1 className="text-4xl font-bold mb-6 text-indigo-700">Your JukeCrate Musical</h1>
            <div className="bg-gray-100 p-6 rounded-md shadow-lg mb-6">
                <p className="text-lg text-gray-700 leading-relaxed">{plot}</p>
            </div>
            <div className="bg-white p-4 shadow rounded-md">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Generated Playlist:</h2>
                <PlaylistDisplay tracks={playlist} />
            </div>
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={handleRegenerate}
                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition shadow-md"
                >
                    Regenerate!
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
