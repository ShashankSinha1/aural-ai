from bs4 import BeautifulSoup
import requests
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

novoURL = "https://novoresume.com/career-blog/behavioral-interview-questions"

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
data = requests.get(novoURL)

if data.status_code == 200:
    soup = BeautifulSoup(data.text, 'html.parser')
    questions = soup.select('strong:not(.banner-subheadline.subheadline-17 *)')

    for question in questions:
        text_question = question.text
        if "?" in text_question:
            text_question = text_question[text_question.index('-')+1: len(text_question)]
            response = supabase.table('interview_questions').insert({"question": text_question}).execute()


db = supabase.table('interview_questions').select('*').execute()
print(db)


