import openai

from config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

try:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Generate a simple test response."}
        ]
    )
    print(response["choices"][0]["message"]["content"].strip())
except openai.OpenAIError as e:
    print(f"An error occurred: {e}")
