// Displays the playlist fetched from the Spotify API.

import React from "react";

/**
 * PlaylistDisplay Component
 * Displays a list of tracks retrieved from the Spotify API.
 * @param {Array} tracks - An array of track objects to display.
 */

function PlaylistDisplay({ tracks }) {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Generated Playlist:</h2>
            <ul className="list-disc ml-5">
                {tracks.map((track, index) => (
                    // Render each track with its name and artist(s)
                    <li key={index} className="mb-2">
                        <strong>{track.name}</strong> by {track.artists.map((artist) => artist.name).join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlaylistDisplay;
