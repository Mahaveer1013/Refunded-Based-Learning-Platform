import openai
import os


def generate_questions():
    """Check if a given course matches any in the list and suggest the most relevant one if no exact match is found."""

    prompt = """
    Given the following list of courses:

    [
        { "id": 3, "name": "JavaScript" },
        { "id": 4, "name": "Java" },
        { "id": 5, "name": "C++" },
        { "id": 6, "name": "C#" },
        { "id": 7, "name": "PHP" },
        { "id": 8, "name": "Ruby" },
        { "id": 9, "name": "Python" },
        { "id": 10, "name": "Go" },
        { "id": 11, "name": "Kotlin" },
        { "id": 13, "name": "Dart" },
        { "id": 14, "name": "MCP",  }
    ]
    
    **Rules:**
    - Your response must be either a number (the `id` of the course) or `False`.  
    - Do not provide explanations, just return the number or `False`.

    If I wish to learn any new technology, check if it exactly matches one of the courses above:  
    - If it matches, return only the `id` of the matching course.  
    - If it doesn't match but is related to one of the courses (e.g., Flask is related to Python), return the `id` of the closest related course.  
    - If there is no reasonable match, return `False`.  
    
    Now I wish to learn Flask.  
    **Respond with only the number or `False`.**
    """

    try:
        client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=10,  # Ensuring minimal output
            temperature=0.0,  # Ensuring deterministic response
        )
        return response.choices[0].message.content.strip()  # Removing unwanted whitespace
    except openai.OpenAIError as e:
        return f"OpenAI API Error: {str(e)}"
    except Exception as e:
        return f"Unexpected Error: {str(e)}"


print(generate_questions())
