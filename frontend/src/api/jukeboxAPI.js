// Contains functions for API integration.

/**
 * Function to call the backend API for generating a musical.
 * Sends user input data (food, outfit, mood, cast, etc.) to the backend
 * and retrieves the generated musical plot and playlist.
 *
 * @param {Object} data - An object containing user selections (food, outfit, mood, cast, etc.).
 * @returns {Object} - The response from the backend API, which includes the generated musical and playlist.
 * @throws {Error} - If the API call fails or returns an error response.
 */

export const generateMusical = async (data) => {
    // Make an HTTP POST request to the backend API.
    const response = await fetch(`${process.env.REACT_APP_API_URL}/generate`, {
        method: "POST", // Specify the HTTP method as POST to send data to the server.
        headers: { "Content-Type": "application/json" }, // Indicate that the request body is JSON.
        body: JSON.stringify(data), // Convert the JavaScript object to a JSON string to send in the request body.
    });

    // Check if the response from the server is not OK (status code outside the range 200-299).
    if (!response.ok) {
        // Throw an error with a descriptive message.
        throw new Error("Failed to generate musical");
    }

    // Parse the JSON response from the server and return it.
    return response.json();
};

