// Contains functions for API integration.


/**
 * Mock function to simulate API responses during testing.
 * Returns a static musical plot and playlist.
 *
 * @param {Object} data - User input data (food, outfit, mood, cast, etc.).
 * @returns {Object} - A mock response simulating the backend API response.
 */
const mockGenerateMusical = async (data) => {
    console.log("Using mock API response for testing"); // Log to indicate mock mode
    return {
        plot: `This is a mock jukebox musical featuring ${data.food}, styled with ${data.outfit}, and set in a ${data.mood} mood. Cast: ${data.actors?.join(", ") || "a surprise!"}`,
        playlist: [
            { name: "Mock Song 1", artists: [{ name: "Mock Artist 1" }] },
            { name: "Mock Song 2", artists: [{ name: "Mock Artist 2" }] },
        ],
    };
};


/**
 * Real function to call the backend API for generating a musical.
 * Sends user input data to the backend and retrieves the response.
 *
 * @param {Object} data - User input data (food, outfit, mood, cast, etc.).
 * @returns {Object} - The response from the backend API, including the musical and playlist.
 * @throws {Error} - If the API call fails or returns an error response.
 */
const realGenerateMusical = async (data) => {
    console.log("Using real API response"); // Log to indicate real API mode
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

// Switch between mock and real API here
// Uncomment the desired line to toggle between mock and real API
export const generateMusical = realGenerateMusical; // Use the real API when API limits are reset
//export const generateMusical = mockGenerateMusical; // Use the mock API during testing
