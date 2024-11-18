// The results page that displays the generated jukebox musical plot and playlist based on the user's input.

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlaylistDisplay from "../components/PlaylistDisplay";

function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    // State for generated plot, playlist, and loading/error status
    const [plot, setPlot] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Extract data passed from the Home page
    const { food, outfit, mood, actors } = location.state || {};

    // Function to fetch data from the backend
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
                    limit: 5, // Limit number of Spotify tracks
                }),
            });

            console.log("Backend response raw:", response);

            if (response.ok) {
                const data = await response.json();
                console.log("Parsed backend response:", data);
                setPlot(data.plot); // Set the generated plot
                setPlaylist(data.tracks || []); // Set the Spotify playlist
            } else {
                const errorData = await response.json();
                console.error("Error from backend:", errorData);
                setError(errorData.error || "Something went wrong.");
            }
        } catch (err) {
            console.error("API Fetch Error:", err);
            setError("Failed to connect to the backend. Is it running?");
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when the component is mounted
    useEffect(() => {
        if (food && outfit && mood) {
            fetchMusicalData();
        } else {
            setError("Missing required fields.");
            setLoading(false);
        }
    }, [food, outfit, mood]);

    const handleStartOver = () => {
        navigate("/");
    };

    const handleRegenerate = () => {
        fetchMusicalData(); // Re-fetch data
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <div className="container mx-auto p-6 text-center">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={handleStartOver}
                    className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Change Preferences
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 text-center">
            <h1 className="text-4xl font-bold mb-6">Your JukeCrate Musical</h1>
            <p className="text-lg text-gray-700 mb-4">{plot}</p>
            <PlaylistDisplay tracks={playlist} />
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={handleRegenerate}
                    className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    I Don’t Like This, Regenerate
                </button>
                <button
                    onClick={handleStartOver}
                    className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Change Preferences
                </button>
            </div>
        </div>
    );
}

export default Results;
