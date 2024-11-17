// Allows users to select food via image buttons.

import React from "react";

/**
 * FoodSelector Component
 * Allows users to select their favorite food by clicking on an image button.
 * The selected food is passed to the parent component through the setFood function.
 *
 * @param {Function} setFood - A function to update the selected food in the parent component.
 * @returns {JSX.Element} - A React component for selecting food options.
 */

function FoodSelector({ setFood }) {
    // Array of food options with labels and image paths
    const foodOptions = [
        { label: "Italian", image: "/images/italian.jpg" }, // Italian food option
        { label: "Sushi", image: "/images/sushi.jpg" },     // Sushi food option
        { label: "Street Food", image: "/images/streetfood.jpg" }, // Street Food option
        { label: "Comfort Food", image: "/images/comfortfood.jpg" }, // Comfort Food option
    ];

    return (
        <div className="mt-6">
            {/* Title for the food selection section */}
            <h2 className="text-xl font-semibold mb-4">Choose Your Favorite Food:</h2>
            {/* Grid container to display food options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {foodOptions.map((food) => (
                    // Render a button for each food option
                    <button
                        key={food.label} // Unique key for each option
                        onClick={() => setFood(food.label)} // Update the selected food when clicked
                        className="relative w-40 h-40 bg-cover bg-center rounded-lg shadow-md hover:scale-105 transform transition-all duration-300 border border-gray-300"
                        style={{
                            backgroundImage: `url(${food.image})`, // Set the background image for the button
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        aria-label={`Select ${food.label}`} // Accessibility label
                    >
                        {/* Overlay text displaying the food label */}
                        <span className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold">
                            {food.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}

// Export the FoodSelector component so it can be used in other parts of the application
export default FoodSelector;
