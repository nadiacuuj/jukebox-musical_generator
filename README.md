# "JukeCRATE Musical" Generator

## Overview

The JukeCrate Musical Generator is a Broadway-inspired webapp project that:

1. Takes your preferences (mood, food, themes, cast, etc.).
2. Generates a custom jukebox musical plot using OpenAI’s GPT API.
3. Curates a Spotify playlist of Broadway/musical theatre songs to match the mood and vibe of your musical.

Unlike traditional Jukebox musicals—which are usually tied to just one artist or album (Mamma Mia! = ABBA, Jersey Boys = The Four Seasons)—this generator (or at least was supposed to) pull from different artists and different albums to create something fresh. And instead called it a JukeCRATE musical, since a crate sometimes holds a bunch of different boxes. But the code behind playlist generation is still really wonky so I'm still working on making that better.

![image](https://github.com/user-attachments/assets/0358a363-cb3c-4fd2-9676-6632d5e4a49c)


## Preface (for presentation)

I realized that my actual project only takes about 30 seconds to demo — so, to stretch things out, I’ll preface my presentation with some backstory (and hopefully use up some time)!

From pretty early on in the course, I knew I wanted to create a data product. Data has always fascinated me—not as just numbers or algorithms, but as something that exists everywhere around us. Ideas for this project evolved over time. Early on, I considered using demographics and creating something fun, like a "Buzzfeed-style quiz" based on mood and other factors to generate a tailored Broadway playlist for brushing your teeth.

But when I revisited the assignment guidelines, I realized this approach didn’t quite fit. The goal was to combine an outside musical with themes and topics from class, and my original idea didn’t align perfectly with that. That’s when I decided: the "outside class" element could be data itself.

Why Data? Data has been a big part of my journey. Growing up in Asia, where computer science (CS) was the default career path for many, I naturally found myself coding—just like my brother, sister-in-law, cousins, and friends. But while I enjoyed problem-solving, I realized I wasn’t drawn to pure software development.

Then, I discovered data science—not just as a technical field, but as a way to blend logic with creativity. While it’s full of math (a lot of math), it also offers opportunities to think outside the box—like with this project. That’s what led me to build the Jukecrate Musical Generator, combining data, Broadway, and topics from class into something both analytical and expressive.

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


### Obtain API Keys

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
