# Contains logic for interacting with the Spotify API.

import requests
from config import SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET

def get_spotify_token():
    auth_url = 'https://accounts.spotify.com/api/token'
    payload = {
        'grant_type': 'client_credentials',
        'client_id': SPOTIFY_CLIENT_ID,
        'client_secret': SPOTIFY_CLIENT_SECRET
    }
    response = requests.post(auth_url, data=payload)
    if response.status_code != 200:
        raise Exception(f"Failed to retrieve Spotify token: {response.json()}")
    return response.json().get('access_token')

def search_tracks(query, token, limit=10):
    """
    Fetch popular songs related to the query.
    """
    url = f"https://api.spotify.com/v1/search?q={query}&type=track&limit={limit}"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        raise Exception(f"Failed to search Spotify tracks: {response.json()}")

    # Clean and simplify the track data
    tracks = response.json().get('tracks', {}).get('items', [])
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
