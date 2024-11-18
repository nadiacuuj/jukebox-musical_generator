// The results page that displays the generated jukebox musical plot and playlist based on the user's input.

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlaylistDisplay from "../components/PlaylistDisplay";

function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    const [plot, setPlot] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { food, outfit, mood, actors } = location.state || {};

    const fetchMusicalData = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://127.0.0.1:5000/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    food,
                    outfit,
                    mood,
                    actors,
                    limit: 5,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setPlot(data.plot);
                setPlaylist(data.tracks || []);
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Something went wrong.");
            }
        } catch (err) {
            setError("Failed to connect to the backend. Is it running?");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (food && outfit && mood) {
            fetchMusicalData();
        } else {
            setError("Missing required fields.");
            setLoading(false);
        }
    }, [food, outfit, mood]);

    const handleStartOver = () => navigate("/");

    const handleRegenerate = () => fetchMusicalData();

    if (loading) return <p>Loading...</p>;

    if (error) {
        return (
            <div className="container mx-auto text-center">
                <p className="text-red-500">{error}</p>
                <button onClick={handleStartOver} className="btn btn-primary">
                    Start Over
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Your JukeCrate Musical</h1>
            <div className="bg-gray-100 p-6 mb-6 rounded shadow">
                <p className="text-lg">{plot}</p>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Generated Playlist:</h2>
            <PlaylistDisplay tracks={playlist} />
            <div className="flex justify-center gap-4 mt-6">
                <button onClick={handleRegenerate} className="btn btn-danger">
                    Regenerate!
                </button>
                <button onClick={handleStartOver} className="btn btn-primary">
                    Start Over
                </button>
            </div>
        </div>
    );
}

export default Results;
