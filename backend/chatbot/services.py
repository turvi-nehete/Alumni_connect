import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


SYSTEM_PROMPT = """
You are an assistant for the AlumniConnect platform.

You help users:
- navigate the app
- understand mentorship, jobs, and events
- answer platform-related questions

Do not invent features.
Be concise and helpful.
"""


def chatbot_brain(user_text, user_context=None):
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_text},
    ]

    if user_context:
        messages.insert(1, {
            "role": "system",
            "content": f"User context: {user_context}"
        })

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )

    return response.choices[0].message.content
