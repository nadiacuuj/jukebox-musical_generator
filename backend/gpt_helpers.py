# Contains logic for interacting with the OpenAI GPT API.

import openai
from config import OPENAI_API_KEY

# Set the API key for OpenAI
openai.api_key = OPENAI_API_KEY

def generate_musical(food, outfit, mood, cast, actors=None):
    """
    Generates a jukebox musical concept based on user inputs using OpenAI's ChatCompletion endpoint.
    """
    # Construct the user prompt
    prompt = f"""
    Create a jukebox musical:
    - Food: {food}
    - Outfit: {outfit}
    - Mood: {mood}
    - Cast: {cast}
    """
    if actors:
        prompt += f" Include actors: {', '.join(actors)}."

    try:
        # Call the OpenAI ChatCompletion endpoint
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Change to "gpt-4" if available
            messages=[
                {"role": "system", "content": "You are an expert playwright and storyteller."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.7,  # Adjust temperature for creativity (0.7 allows some creativity)
        )
        # Extract and return the generated content
        return response["choices"][0]["message"]["content"].strip()

    except openai.error.OpenAIError as e:
        # Handle errors gracefully
        return f"An error occurred while generating the musical: {e}"

# Test the generate_musical function
if __name__ == "__main__":
    # Example inputs for testing
    test_food = "Italian"
    test_outfit = "Vintage"
    test_mood = "Romantic"
    test_cast = "Main cast"
    test_actors = ["Actor 1", "Actor 2"]

    # Generate a musical and print the result
    print("Generated Jukebox Musical Plot:")
    print(generate_musical(test_food, test_outfit, test_mood, test_cast, test_actors))
