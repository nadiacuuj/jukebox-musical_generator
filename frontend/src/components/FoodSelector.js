// Allows users to select food via image buttons.

import React, { useState } from "react"; // Import React and useState for state management

/**
 * FoodSelector Component
 * Allows users to select their favorite food by clicking on image buttons.
 * Highlights the selected food and displays it below the options.
 *
 * @param {Function} setFood - A function to update the selected food in the parent component.
 * @returns {JSX.Element} - The FoodSelector component.
 */
function FoodSelector({ setFood }) {
    // State to keep track of the selected food
    const [selectedFood, setSelectedFood] = useState("");

    // Array of food options with labels and images
    const foodOptions = [
        { label: "Italian", image: "/images/italian.jpg" },
        { label: "Sushi", image: "/images/sushi.jpg" },
        { label: "Street Food", image: "/images/streetfood.jpg" },
        { label: "Comfort Food", image: "/images/comfortfood.jpg" },
    ];

    /**
     * Handle selecting a food option.
     * Updates both the local state (for UI feedback) and the parent state.
     *
     * @param {string} food - The label of the selected food.
     */
    const handleSelect = (food) => {
        setSelectedFood(food); // Update local state
        setFood(food); // Update parent state via prop function
    };

    return (
        <div className="mt-6">
            {/* Section title */}
            <h2 className="text-xl font-semibold mb-4">Choose a type of Food:</h2>
            {/* Grid of food options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {foodOptions.map((food) => (
                    <button
                        key={food.label} // Unique key for each food option
                        onClick={() => handleSelect(food.label)} // Handle button click
                        className={`relative w-40 h-40 bg-cover bg-center rounded-lg shadow-md transform transition-all duration-300 border ${
                            selectedFood === food.label
                                ? "border-blue-500 scale-105" // Highlight selected food
                                : "border-gray-300" // Default border for unselected food
                        }`}
                        style={{
                            backgroundImage: `url(${food.image})`, // Set button background to food image
                        }}
                        aria-label={`Select ${food.label}`} // Accessibility label for screen readers
                    >
                        {/* Overlay text to show food label */}
                        <span className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold">
                            {food.label}
                        </span>
                    </button>
                ))}
            </div>
            {/* Display the selected food */}
            {selectedFood && (
                <p className="text-sm text-gray-600 mt-2">
                    Selected Food: <span className="font-bold">{selectedFood}</span>
                </p>
            )}
        </div>
    );
}

export default FoodSelector;
