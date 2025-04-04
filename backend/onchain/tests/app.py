import openai
from youtube_transcript_api import YouTubeTranscriptApi
from urllib.parse import urlparse, parse_qs
import os

def get_youtube_transcript(video_url):
    """Extract transcript from YouTube video."""
    try:
        parsed_url = urlparse(video_url)
        if parsed_url.netloc in ["youtu.be", "www.youtu.be"]:
            video_id = parsed_url.path[1:]
        elif parsed_url.netloc in ["www.youtube.com", "youtube.com"]:
            video_id = parse_qs(parsed_url.query).get("v", [None])[0]
        else:
            return "Invalid YouTube URL format"

        if not video_id:
            return "Could not extract video ID"

        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = " ".join([t['text'] for t in transcript])
        return text
    except Exception as e:
        return str(e)

def generate_questions(transcript):
    """Generate 5 easy, 5 medium, and 5 hard multiple-choice questions."""
    
    prompt = f"""Generate 5 easy, 5 medium, and 5 hard level multiple-choice questions based on the following transcript:\n
    {transcript}\n
    Each question should have 4 options and one correct answer. 
    Respond in the given JSON format:
    {{
        "easy": [
            {{"question": "Q1", "options": ["A", "B", "C", "D"], "answer": "A"}},
            ...
        ],
        "medium": [
            {{"question": "Q6", "options": ["A", "B", "C", "D"], "answer": "B"}},
            ...
        ],
        "hard": [
            {{"question": "Q11", "options": ["A", "B", "C", "D"], "answer": "C"}},
            ...
        ]
    }}
    """
    try:
        client = openai.OpenAI(api_key = os.getenv("OPENAI_API_KEY"))  # ✅ Correct API usage
        response = client.chat.completions.create(  # ✅ Correct API usage
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an AI that generates quiz questions."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1800,
            temperature=0.7
        )
        return response.choices[0].message.content
    except openai.OpenAIError as e:
        return f"OpenAI API Error: {str(e)}"
    except Exception as e:
        return f"Unexpected Error: {str(e)}"

def generate_quiz():
    """API Endpoint: Generates quiz questions"""
    video_url = "https://youtu.be/WEm3EUdicDg?si=-XjkHSIzIDBCyP4D"

    transcript = get_youtube_transcript(video_url)
    if "Could not retrieve" in transcript or "Error" in transcript:
        print({"error": "Failed to fetch transcript"})

    questions = generate_questions(transcript)

    print(questions)
generate_quiz()