// Allows users to type actor names and add them to a list.

import React, { useState } from "react";

/**
 * ActorSelector Component
 * Allows users to input actor names and add them to a list.
 * @param {Function} setActors - A function to update the list of actors in the parent component.
 */

function ActorSelector({ setActors }) {
    const [actorInput, setActorInput] = useState("");

    /**
     * Function to add the current input to the actor list.
     */
    const handleAddActor = () => {
        if (actorInput.trim()) {
            // Add the new actor to the parent component's actor list
            setActors((prev) => [...prev, actorInput.trim()]);
            setActorInput(""); // Clear the input field
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Add Actors (Optional):</h2>
            <div className="flex items-center">
                <input
                    // Input field for actor names
                    type="text"
                    value={actorInput}
                    onChange={(e) => setActorInput(e.target.value)}
                    placeholder="Enter actor name"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Actor name input"
                />
                <button
                    // Button to add the entered actor to the list
                    onClick={handleAddActor}
                    className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default ActorSelector;
