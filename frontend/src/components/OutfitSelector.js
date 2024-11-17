// Allows users to select an outfit via image buttons.

import React from "react";

/**
 * OutfitSelector Component
 * Allows users to select an outfit by clicking on an image button.
 * The selected outfit is passed to the parent component through the setOutfit function.
 *
 * @param {Function} setOutfit - A function to update the selected outfit in the parent component.
 * @returns {JSX.Element} - A React component for selecting outfit options.
 */

function OutfitSelector({ setOutfit }) {
    // List of outfits and their corresponding images
    const outfitOptions = [
        { label: "Vintage", image: "/images/vintage.jpg" }, // Vintage style option
        { label: "Streetwear", image: "/images/streetwear.jpg" }, // Streetwear style option
        { label: "Formal", image: "/images/formal.jpg" }, // Formal wear option
        { label: "Beachwear", image: "/images/beachwear.jpg" }, // Beachwear option
    ];

    return (
        <div className="mt-6">
            {/* Title for the outfit selection section */}
            <h2 className="text-xl font-semibold mb-4">Choose an Outfit:</h2>
            {/* Grid container to display outfit options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {outfitOptions.map((outfit) => (
                    // Render a button for each outfit option
                    <button
                        key={outfit.label} // Unique key for each option
                        onClick={() => setOutfit(outfit.label)} // Update the selected outfit when clicked
                        className="relative w-40 h-40 bg-cover bg-center rounded-lg shadow-md hover:scale-105 transform transition-all duration-300 border border-gray-300"
                        style={{
                            backgroundImage: `url(${outfit.image})`, // Set the background image for the button
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        aria-label={`Select ${outfit.label}`} // Accessibility label
                    >
                        {/* Overlay text displaying the outfit label */}
                        <span className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold">
                            {outfit.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}

// Export the OutfitSelector component so it can be used in other parts of the application
export default OutfitSelector;
