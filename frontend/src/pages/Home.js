// The homepage where users select food, outfit, mood, and actors to customize their jukebox musical.

import React, { useState } from "react"; // React library and useState hook for managing state
import { useNavigate } from "react-router-dom"; // For navigation to other pages
import FoodSelector from "../components/FoodSelector"; // Component for selecting food
import MoodSelector from "../components/MoodSelector"; // Component for selecting mood
import OutfitSelector from "../components/OutfitSelector"; // Component for selecting outfit
import ActorSelector from "../components/ActorSelector"; // Component for adding actors

/**
 * Home Component
 * Provides a form for users to customize their jukebox musical by selecting
 * food, outfit, mood, and actors. Navigates to the Results page on submission.
 *
 * @returns {JSX.Element} - The Home page for user input.
 */

function Home() {
    // State variables for storing user selections
    const [food, setFood] = useState(""); // Selected food
    const [outfit, setOutfit] = useState(""); // Selected outfit
    const [mood, setMood] = useState(""); // Selected mood
    const [actors, setActors] = useState([]); // List of selected actors

    const navigate = useNavigate(); // Hook to navigate to other routes

    /**
     * Handles the form submission and navigates to the Results page.
     */
    const handleGenerate = () => {
        // Navigate to the Results page with the selected data as state
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
            {/* Page title */}
            <h1 className="text-4xl font-bold mb-6">Create Your JukeCrate Musical</h1>
            {/* Brief instructions for the user */}
            <p className="text-lg text-gray-700 mb-4">
                Select your preferences below to generate your personalized jukebox musical.
            </p>
            {/* Render selection components */}
            <FoodSelector setFood={setFood} />
            <OutfitSelector setOutfit={setOutfit} />
            <MoodSelector setMood={setMood} />
            <ActorSelector setActors={setActors} />
            {/* Button to submit the selections */}
            <button
                onClick={handleGenerate} // Trigger form submission on click
                className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
                Generate My Musical
            </button>
        </div>
    );
}

export default Home;
