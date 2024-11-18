# Contains logic for interacting with the Spotify API.

import requests
from config import SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET

def get_spotify_token():
    """
    Retrieves an access token for Spotify API.
    """
    auth_url = 'https://accounts.spotify.com/api/token'
    payload = {
        'grant_type': 'client_credentials',
        'client_id': SPOTIFY_CLIENT_ID,
        'client_secret': SPOTIFY_CLIENT_SECRET
    }
    response = requests.post(auth_url, data=payload)
    response.raise_for_status()
    return response.json().get('access_token')

def search_tracks(query, token, limit=10):
    """
    Searches Spotify for tracks matching the query.
    """
    url = f"https://api.spotify.com/v1/search"
    headers = {"Authorization": f"Bearer {token}"}
    params = {"q": query, "type": "track", "limit": limit}

    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    tracks = response.json().get('tracks', {}).get('items', [])

    # Clean track data for the frontend
    return [
        {
            "name": track.get("name"),
            "artists": [{"name": artist.get("name")} for artist in track.get("artists", [])],
            "url": track.get("external_urls", {}).get("spotify"),
            "album": track.get("album", {}).get("name"),
            "preview_url": track.get("preview_url"),
        }
        for track in tracks
    ]
