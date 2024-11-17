# Contains logic for interacting with the Spotify API.

# Contains logic for interacting with the Spotify API.

import requests
from config import SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET

def get_spotify_token():
    """
    Gets an access token for the Spotify API.
    Raises an exception if the token retrieval fails.
    """
    auth_url = 'https://accounts.spotify.com/api/token'
    payload = {
        'grant_type': 'client_credentials',
        'client_id': SPOTIFY_CLIENT_ID,
        'client_secret': SPOTIFY_CLIENT_SECRET
    }
    response = requests.post(auth_url, data=payload)
    
    # Handle response errors
    if response.status_code != 200:
        raise Exception(f"Failed to retrieve Spotify token: {response.json()}")

    return response.json().get('access_token')


def search_tracks(query, token, limit=10):
    """
    Searches for tracks on Spotify using a query string.
    Returns a list of tracks with a maximum number defined by 'limit'.
    
    :param query: The search query string (e.g., song name, artist).
    :param token: The Spotify access token.
    :param limit: The maximum number of tracks to return (default: 10).
    """
    url = f"https://api.spotify.com/v1/search?q={query}&type=track&limit={limit}"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(url, headers=headers)
    
    # Handle response errors
    if response.status_code != 200:
        raise Exception(f"Failed to search Spotify tracks: {response.json()}")
    
    return response.json().get('tracks', {}).get('items', [])


# Testing the Spotify API functionality
if __name__ == "__main__":
    try:
        # Get access token
        token = get_spotify_token()
        print(f"Spotify Token: {token}")

        # Test search_tracks
        query = "popular songs"
        tracks = search_tracks(query, token, limit=20)  # Retrieve up to 20 tracks
        print(f"Found {len(tracks)} tracks for query '{query}':")
        for idx, track in enumerate(tracks, start=1):
            track_name = track.get('name')
            artists = ", ".join(artist['name'] for artist in track.get('artists', []))
            print(f"{idx}. {track_name} by {artists}")

    except Exception as e:
        print(f"Error: {e}")
