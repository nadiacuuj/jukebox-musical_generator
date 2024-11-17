// Allows users to type actor names and add them to a list.

import React, { useState } from "react"; // Import React and useState for state management

/**
 * ActorSelector Component
 * Allows users to add actors by typing their names and clicking "Add".
 * Displays a list of added actors below the input field.
 *
 * @param {Function} setActors - A function to update the list of actors in the parent component.
 * @returns {JSX.Element} - The ActorSelector component.
 */
function ActorSelector({ setActors }) {
    const [actorInput, setActorInput] = useState(""); // Input field state
    const [actors, setLocalActors] = useState([]); // State to store the list of added actors

    /**
     * Add the typed actor to the list.
     * Clears the input field after adding.
     */
    const addActor = () => {
        if (actorInput.trim()) {
            const updatedActors = [...actors, actorInput]; // Add the new actor to the list
            setLocalActors(updatedActors); // Update local state
            setActors(updatedActors); // Update parent state
            setActorInput(""); // Clear the input field
        }
    };

    return (
        <div className="mt-6">
            {/* Section title */}
            <h2 className="text-xl font-semibold mb-4">Add Actors (Optional):</h2>
            {/* Input field and "Add" button */}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={actorInput} // Bind the input value to the state
                    onChange={(e) => setActorInput(e.target.value)} // Update state on input change
                    placeholder="Enter actor name"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={addActor} // Call addActor function on click
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                >
                    Add
                </button>
            </div>
            {/* Display the list of added actors */}
            {actors.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-md font-semibold">Added Actors:</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                        {actors.map((actor, index) => (
                            <li key={index} className="text-sm">{actor}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ActorSelector;
