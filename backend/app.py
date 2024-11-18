# The main Flask application file that routes API requests.

from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS to handle cross-origin requests
from gpt_helpers import generate_musical
from spotify_helpers import get_spotify_token, search_tracks
import os

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS for all routes (allow frontend to access backend)
CORS(app)

@app.route('/generate', methods=['POST'])
def generate_musical_route():
    """
    API endpoint to generate a jukebox musical and fetch Spotify tracks.
    """
    try:
        # Log incoming request data
        print("Received request data:", request.json)

        # Extract data from the POST request
        data = request.json
        food = data.get('food')
        outfit = data.get('outfit')
        mood = data.get('mood')
        cast = data.get('cast', "Default cast")
        actors = data.get('actors', [])
        limit = data.get('limit', 5)  # Default to 5 tracks if no limit provided

        # Validate required fields
        if not food or not outfit or not mood:
            print("Missing required fields: food, outfit, or mood.")
            return jsonify({'error': 'Food, outfit, and mood are required fields'}), 400

        # Generate the musical plot using OpenAI
        plot = None
        openai_status = "Success"
        try:
            print("Generating musical plot...")
            plot = generate_musical(food, outfit, mood, cast, actors)
            print("Generated plot:", plot)
        except Exception as e:
            openai_status = f"Error: {str(e)}"
            print(f"OpenAI API Error: {e}")

        # Fetch Spotify tracks based on the mood
        tracks = []
        spotify_status = "Success"
        try:
            print("Fetching Spotify tracks...")
            token = get_spotify_token()
            tracks = search_tracks(mood, token, limit=limit)
            print("Fetched tracks:", tracks)
        except Exception as e:
            spotify_status = f"Error: {str(e)}"
            print(f"Spotify API Error: {e}")

        # Return the plot, tracks, and API statuses as a JSON response
        print(f"API Response: plot={plot}, tracks={tracks}, statuses=openai={openai_status}, spotify={spotify_status}")
        return jsonify({
            'plot': plot,
            'tracks': tracks,
            'openai_status': openai_status,
            'spotify_status': spotify_status
        })
    except Exception as e:
        # Handle errors and log them
        print(f"Error in /generate route: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint to ensure the backend is running.
    """
    try:
        print("Health check passed.")
        return jsonify({'status': 'Backend is running'}), 200
    except Exception as e:
        print(f"Error in /health route: {e}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    # Run the Flask app in debug mode for development
    app.run(debug=True)
