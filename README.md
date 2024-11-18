# Jukecrate Musical Generator


---

## Local Setup

Follow these steps to set up the Jukecrate Musical Generator locally (on your own computer), enabling you to explore its features.

### 1. Clone the Repository and Navigate Into the Project Directory:

```bash
git clone https://github.com/nadiacuuj/jukecrate_musical_generator.git
cd jukecrate_musical_generator
```

### 2. Configure Environment Variables

Create two identical .env files, and first place one in the backend directory, and then the other in the frontend directory.

Backend .env file
```bash
# Navigate to the backend directory
cd backend

# Create a .env file
touch .env
```

Add the following variables to the backend .env file:
```bash
# Backend Environment Variables
OPENAI_API_KEY=<your_openai_api_key>
SPOTIFY_CLIENT_ID=<your_spotify_client_id>
SPOTIFY_CLIENT_SECRET=<your_spotify_client_secret>

# Frontend Environment Variables
REACT_APP_API_URL=http://127.0.0.1:5000
```

Frontend .env file
```bash
# Navigate to the frontend directory
cd ../frontend

# Create a .env file
touch .env
```

Add the same variables to the frontend .env file:
```bash
# Backend Environment Variables
OPENAI_API_KEY=<your_openai_api_key>
SPOTIFY_CLIENT_ID=<your_spotify_client_id>
SPOTIFY_CLIENT_SECRET=<your_spotify_client_secret>

# Frontend Environment Variables
REACT_APP_API_URL=http://127.0.0.1:5000
```


### Obtaining Spotify Client ID and Spotify Client Secret

To integrate Google OAuth into your application, follow these steps to obtain your Google Client ID and Google Client Secret:

1. **Go to the Google Cloud Console**: Visit [Google Cloud Console](https://console.cloud.google.com/).

2. **Create a New Project**

3. **Create Credentials**:

   - Go to "APIs & Services" > "Credentials."

   - Click on "Create Credentials" and select "OAuth client ID."

   - If prompted, configure the consent screen by providing the necessary information.

   - Choose "Web application" as the application type.

   - Add your authorized redirect URIs (e.g., `http://localhost:3000/callback`).

4. **Get Your Client ID and Client Secret**

### 3. Backend Setup

create a virtual environment in the root directory, install dependencies, and activate it:
```bash
python -m venv .venv

.venv\Scripts\activate # On Windows use .venv\Scripts\activate
source .venv/bin/activate # On macOS and Linux:

pip install -r backend/requirements.txt
```

### 4. Run the Backend Server
Start the FastAPI server to serve the API on http://localhost:8000:

```bash
uvicorn main:app --reload
```
or
```
python3 -m uvicorn main:app --reload
```

### 5. Frontend Setup
Open a new terminal, navigate to the frontend directory, install dependencies, and start the React application:

```bash
cd ../frontend
npm install
npm start
```

## Scraping
In the scrape.py file, adjust the X in count -= X to scrape a portion or all events.

```python

#make count -= 1 to capture all events!
    while count > 0:
        load_more()
        count -= 10
        time.sleep(0.5)
```

