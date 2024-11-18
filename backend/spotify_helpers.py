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

    # Return the access token from the response
    return response.json().get('access_token')


def search_tracks(query, token, limit=10):
    """
    Searches for tracks on Spotify using a query string.
    Cleans and returns a simplified list of tracks with relevant fields.

    Args:
        query (str): The search query string (e.g., song name, artist).
        token (str): The Spotify access token.
        limit (int): The maximum number of tracks to return (default: 10).

    Returns:
        list: A list of cleaned track data.
    """
    url = f"https://api.spotify.com/v1/search?q={query}&type=track&limit={limit}"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(url, headers=headers)
    
    # Handle response errors
    if response.status_code != 200:
        raise Exception(f"Failed to search Spotify tracks: {response.json()}")
    
    tracks = response.json().get('tracks', {}).get('items', [])

    # Clean and simplify the track data
    cleaned_tracks = [
        {
            "name": track.get("name"),
            "artists": [{"name": artist.get("name")} for artist in track.get("artists", [])],
            "url": track.get("external_urls", {}).get("spotify"),
            "album": track.get("album", {}).get("name"),
            "preview_url": track.get("preview_url"),
        }
        for track in tracks
    ]

    return cleaned_tracks


# Testing the Spotify API functionality (optional)
if __name__ == "__main__":
    try:
        # Get access token
        token = get_spotify_token()
        print(f"Spotify Token: {token}")

        # Test search_tracks
        query = "popular songs"
        tracks = search_tracks(query, token, limit=10)  # Retrieve up to 10 tracks
        print(f"Found {len(tracks)} tracks for query '{query}':")
        for idx, track in enumerate(tracks, start=1):
            track_name = track.get('name')
            artists = ", ".join(artist['name'] for artist in track.get('artists', []))
            print(f"{idx}. {track_name} by {artists}")

    except Exception as e:
        print(f"Error: {e}")
