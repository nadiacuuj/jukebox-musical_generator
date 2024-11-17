// Provides a button to regenerate the musical concept.

import React from "react";

/**
 * RegenerateButton Component
 * Provides a button to regenerate the musical with the same inputs.
 * @param {Function} onRegenerate - A function to regenerate the musical.
 */

function RegenerateButton({ onRegenerate }) {
    return (
        <button
            onClick={onRegenerate}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
            I Don’t Like This Musical, Please Regenerate!
        </button>
    );
}

export default RegenerateButton;
