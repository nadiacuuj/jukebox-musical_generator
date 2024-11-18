// The homepage where users select food, outfit, mood, and actors to customize their jukebox musical.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodSelector from "../components/FoodSelector";
import MoodSelector from "../components/MoodSelector";
import OutfitSelector from "../components/OutfitSelector";
import ActorSelector from "../components/ActorSelector";

/**
 * Home Component
 * Provides a form for users to customize their jukebox musical.
 * Validates that required fields are selected before proceeding.
 */
function Home() {
    const [food, setFood] = useState("");
    const [outfit, setOutfit] = useState("");
    const [mood, setMood] = useState("");
    const [actors, setActors] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleGenerate = () => {
        // Check if required fields are selected
        if (!food || !outfit || !mood) {
            setErrorMessage("Please select a food, an outfit, and a mood to proceed.");
            return;
        }

        // Clear error message and navigate to Results page
        setErrorMessage("");
        navigate("/results", {
            state: {
                food,
                outfit,
                mood,
                actors,
            },
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6">Create Your JukeCrate Musical</h1>
            <p className="text-lg text-gray-700 mb-4">
                Select some random preferences below to generate your personalized jukebox musical.
            </p>
            <FoodSelector setFood={setFood} />
            <OutfitSelector setOutfit={setOutfit} />
            <MoodSelector setMood={setMood} />
            <ActorSelector setActors={setActors} />
            {/* Display error message if validation fails */}
            {errorMessage && (
                <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
            )}
            {/* Generate button */}
            <button
                onClick={handleGenerate}
                className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
                Generate My Musical
            </button>
        </div>
    );
}

export default Home;
