// Allows users to select an outfit via image buttons.

import React, { useState } from "react"; // Import React and useState for state management

/**
 * OutfitSelector Component
 * Allows users to select an outfit by clicking on image buttons.
 * Highlights the selected outfit and displays it below the options.
 *
 * @param {Function} setOutfit - A function to update the selected outfit in the parent component.
 * @returns {JSX.Element} - The OutfitSelector component.
 */
function OutfitSelector({ setOutfit }) {
    // State to keep track of the selected outfit
    const [selectedOutfit, setSelectedOutfit] = useState("");

    // Array of outfit options with labels and images
    const outfitOptions = [
        { label: "Vintage", image: "/images/vintage.jpg" },
        { label: "Streetwear", image: "/images/streetwear.jpg" },
        { label: "Formal", image: "/images/formal.jpg" },
        { label: "Beachwear", image: "/images/beachwear.jpg" },
    ];

    /**
     * Handle selecting an outfit option.
     * Updates both the local state (for UI feedback) and the parent state.
     *
     * @param {string} outfit - The label of the selected outfit.
     */
    const handleSelect = (outfit) => {
        setSelectedOutfit(outfit); // Update local state
        setOutfit(outfit); // Update parent state via prop function
    };

    return (
        <div className="mt-6">
            {/* Section title */}
            <h2 className="text-xl font-semibold mb-4">Choose a style of Outfit:</h2>
            {/* Grid of outfit options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {outfitOptions.map((outfit) => (
                    <button
                        key={outfit.label} // Unique key for each outfit option
                        onClick={() => handleSelect(outfit.label)} // Handle button click
                        className={`relative w-40 h-40 bg-cover bg-center rounded-lg shadow-md transform transition-all duration-300 border ${
                            selectedOutfit === outfit.label
                                ? "border-blue-500 scale-105" // Highlight selected outfit
                                : "border-gray-300" // Default border for unselected outfit
                        }`}
                        style={{
                            backgroundImage: `url(${outfit.image})`, // Set button background to outfit image
                        }}
                        aria-label={`Select ${outfit.label}`} // Accessibility label for screen readers
                    >
                        {/* Overlay text to show outfit label */}
                        <span className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold">
                            {outfit.label}
                        </span>
                    </button>
                ))}
            </div>
            {/* Display the selected outfit */}
            {selectedOutfit && (
                <p className="text-sm text-gray-600 mt-2">
                    Selected Outfit: <span className="font-bold">{selectedOutfit}</span>
                </p>
            )}
        </div>
    );
}

export default OutfitSelector;
