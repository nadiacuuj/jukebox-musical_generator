//  Allows users to select a mood from a dropdown menu.

import React from "react";

/**
 * MoodSelector Component
 * Allows users to select a mood from a dropdown menu.
 * @param {Function} setMood - A function to update the selected mood in the parent component.
 */

function MoodSelector({ setMood }) {
    // List of available moods
    const moods = ["Romantic", "Energetic", "Reflective", "Carefree", "Adventurous"];

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Pick a Mood:</h2>
            <select
                // Trigger setMood when the user selects an option
                onChange={(e) => setMood(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Select mood"
            >
                <option value="">Select a mood</option>
                {moods.map((mood) => (
                    // Render each mood option in the dropdown
                    <option key={mood} value={mood}>
                        {mood}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default MoodSelector;
