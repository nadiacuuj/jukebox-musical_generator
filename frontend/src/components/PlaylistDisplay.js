// Displays the playlist fetched from the Spotify API.

import React from "react";

/**
 * PlaylistDisplay Component
 * Dynamically displays a list of tracks with song names and their respective artists.
 *
 * @param {Array} tracks - An array of track objects to display.
 * @returns {JSX.Element} - A styled playlist component.
 */
function PlaylistDisplay({ tracks }) {
    // Check if tracks are empty or undefined, and display a fallback message if needed
    if (!tracks || tracks.length === 0) {
        return <p className="text-gray-500 mt-4">No playlist available. Please try again.</p>;
    }

    return (
        <div className="mt-6">
            {/* Playlist title */}
            <h2 className="text-xl font-semibold mb-4">Generated Playlist:</h2>
            {/* Display the list of tracks */}
            <ul className="list-disc pl-6 text-gray-700">
                {tracks.map((track, index) => (
                    <li key={index} className="mb-3">
                        {/* Song name */}
                        <strong className="text-blue-600">{track.name}</strong>{" "}
                        {/* Artist(s) */}
                        <span className="text-sm text-gray-500">
                            by {track.artists.map((artist) => artist.name).join(", ")}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlaylistDisplay;
