# Loads and manages environment variables.

import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Access API keys from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
