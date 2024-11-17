# The main Flask application file that routes API requests.

from flask import Flask, request, jsonify
from gpt_helpers import generate_musical
from spotify_helpers import get_spotify_token, search_tracks

# Initialize the Flask app
app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate_musical_route():
    """
    API endpoint to generate a jukebox musical.
    Handles user input and returns a musical plot and playlist.
    """
    data = request.json
    food = data.get('food')
    outfit = data.get('outfit')
    mood = data.get('mood')
    cast = data.get('cast')
    actors = data.get('actors', [])

    # Generate the musical plot
    plot = generate_musical(food, outfit, mood, cast, actors)

    # Fetch Spotify playlist
    token = get_spotify_token()
    tracks = search_tracks(mood, token)

    # Return the response as JSON
    return jsonify({
        'plot': plot,
        'tracks': tracks
    })

if __name__ == '__main__':
    app.run(debug=True)
