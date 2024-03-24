from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import openai
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your OpenAI API key from .env
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/generate-feedback', methods=['GET','POST'])  # You likely only need POST here
def generate_feedback():
    data = request.get_json()  # Correct method to get JSON data
    question = data.get('question')
    answer = data.get('answer')

    try:
        # Make a request to the OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{
                "role": "system",
                "content": f"Given the question: '{question}', and the answer: '{answer}', provide detailed feedback on the answer."
            }],
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
        )
        
        # Extract and return the generated text as a JSON response
        feedback = response.choices[0].message['content']  # Assuming this is the correct path
        return jsonify({"feedback": feedback})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)