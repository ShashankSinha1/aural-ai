from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
from openai import OpenAI
import openai

app = Flask(__name__)
load_dotenv()

# Load your OpenAI API key from .env
openai.api_key = os.getenv('OPENAI_API_KEY')

completion = openai.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
  ]
)

print(completion.choices[0].message)