# Contains logic for interacting with the OpenAI GPT API.

import openai
from config import OPENAI_API_KEY

# Set the OpenAI API key from environment variables
openai.api_key = OPENAI_API_KEY

def generate_musical(food, outfit, mood, cast, actors=None):
    """
    Generate a jukebox musical concept with formatted sections:
    - Title
    - Acts and Scenes
    - Original Songs
    - Closing Thoughts
    """
    # Prompt includes user inputs for tailored musical generation
    prompt = f"""
    Create a jukebox musical formatted as follows:
    - Title: (Unique title for the musical)
    - Act 1: (Brief description)
      Scene 1: (Details)
      Scene 2: ...
    - Original Songs: (List a few unique song titles for the musical)
    - Closing Thoughts: (Summary of the musical's theme)
    - Food: {food}
    - Outfit: {outfit}
    - Mood: {mood}
    - Cast: {cast}
    """
    # Include optional actors in the prompt
    if actors:
        prompt += f" Include actors: {', '.join(actors)}."

    try:
        # Use GPT API to generate a creative response
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert playwright and storyteller."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,  # Limit token size for detailed responses
            temperature=0.7,  # Adjust temperature for creative variance
        )
        # Return the generated plot, trimmed of whitespace
        return response["choices"][0]["message"]["content"].strip()
    except openai.error.OpenAIError as e:
        # Handle API errors gracefully
        return f"An error occurred while generating the musical: {e}"
