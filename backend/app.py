from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

# Load your OpenAI API key from .env
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/generate-feedback', methods=['GET'])
def generate_feedback():
    data = request.json
    question = data.get('question')
    answer = data.get('answer')
    question = "Tell me about a time when you were asked to do something you had never done before. How did you react? What did you learn?"
    answer = "Certainly. When confronted with a task I had never encountered before, my initial reaction was one of curiosity and determination. Rather than being overwhelmed, I approached the challenge with an open mind and a willingness to learn. I sought guidance from colleagues or resources available, and I was proactive in seeking out the necessary knowledge and skills to tackle the task effectively. Throughout the process, I embraced the opportunity for growth and development, recognizing that stepping out of my comfort zone was essential for personal and professional advancement. As I navigated through unfamiliar territory, I remained adaptable and resilient, persevering through setbacks and leveraging each experience as a learning opportunity. Ultimately, I emerged from the situation with a newfound sense of confidence and capability, equipped with valuable insights and skills that I could apply to future endeavors. This experience reinforced the importance of adaptability, resourcefulness, and a proactive approach when faced with new challenges, qualities that I continue to uphold in my professional endeavors."

    
    # Construct the prompt for GPT    
    try:
        # Make a request to the OpenAI API
        response = openai.chat.completions.create(
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
        feedback = response.choices[0].message.content.strip()
        return jsonify({"feedback": feedback})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)