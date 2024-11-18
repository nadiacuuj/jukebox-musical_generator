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
        # Extract and log incoming request data
        data = request.json
        food = data.get('food')
        outfit = data.get('outfit')
        mood = data.get('mood')
        actors = data.get('actors', [])
        limit = data.get('limit', 5)

        # Ensure all required fields are present
        if not food or not outfit or not mood:
            return jsonify({'error': 'Food, outfit, and mood are required fields'}), 400

        # Generate plot with fictional characters inspired by actors
        try:
            plot = generate_musical(food, outfit, mood, actors)
        except Exception as e:
            return jsonify({'error': f"OpenAI Error: {str(e)}"}), 500

        # Fetch a diverse and popular playlist
        try:
            token = get_spotify_token()
            tracks = search_tracks(food + " " + outfit + " " + mood, token, limit)
        except Exception as e:
            return jsonify({'error': f"Spotify Error: {str(e)}"}), 500

        return jsonify({'plot': plot, 'tracks': tracks})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
