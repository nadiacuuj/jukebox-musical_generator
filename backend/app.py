# The main Flask application file that routes API requests.

from flask import Flask, request, jsonify
from flask_cors import CORS
from gpt_helpers import generate_musical
from spotify_helpers import get_spotify_token, search_tracks
import os

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests


@app.route('/generate', methods=['POST'])
def generate_musical_route():
    """
    API endpoint to generate a jukebox musical and fetch Spotify tracks.
    """
    try:
        # Parse incoming request data
        data = request.json
        food = data.get('food')
        outfit = data.get('outfit')
        mood = data.get('mood')
        actors = data.get('actors', [])
        limit = data.get('limit', 5)

        # Validate required inputs
        if not food or not outfit or not mood:
            return jsonify({'error': 'Food, outfit, and mood are required fields'}), 400

        # Generate the fictional character(s) based on actors
        character_descriptions = []
        for actor in actors:
            character_descriptions.append(f"A unique character inspired by {actor}.")

        # Generate the musical plot
        plot = None
        openai_status = "Success"
        try:
            plot = generate_musical(
                food=food,
                outfit=outfit,
                mood=mood,
                cast="; ".join(character_descriptions)
            )
        except Exception as e:
            openai_status = f"OpenAI Error: {str(e)}"

        # Generate a Spotify playlist based on all inputs
        tracks = []
        spotify_status = "Success"
        try:
            token = get_spotify_token()
            query = f"{food} {outfit} {mood} playlist"  # Build a query for Spotify
            tracks = search_tracks(query, token, limit=limit)
        except Exception as e:
            spotify_status = f"Spotify Error: {str(e)}"

        # Return combined results
        return jsonify({
            'plot': plot,
            'tracks': tracks,
            'openai_status': openai_status,
            'spotify_status': spotify_status
        })
    except Exception as e:
        return jsonify({'error': f"Server Error: {str(e)}"}), 500


@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint to ensure the backend is running.
    """
    return jsonify({'status': 'Backend is running'}), 200


if __name__ == '__main__':
    app.run(debug=True)
