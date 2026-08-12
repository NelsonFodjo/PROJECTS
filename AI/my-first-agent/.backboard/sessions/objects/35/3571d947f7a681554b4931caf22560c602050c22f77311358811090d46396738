import os
import json
from backboard_sdk import BackboardClient
api_key = os.getenv('BACKBOARD_API_KEY')\nif not api_key:\n    raise ValueError('API key not found. Set the BACKBOARD_API_KEY environment variable.')
client = BackboardClient(api_key=api_key)
assistant_file = 'sidekick.json'
if os.path.exists(assistant_file):\n    with open(assistant_file, 'r') as file:\n        data = json.load(file)\n        assistant_id = data.get('assistant_id')
else:\n    assistant_id = client.create_assistant(name='Sidekick', system_prompt="Hello! I'm Sidekick, your friendly assistant.")\n    with open(assistant_file, 'w') as file:\n        json.dump({'assistant_id': assistant_id}, file)
def chat():\n    thread_id = client.create_thread(assistant_id=assistant_id, memory_mode='Auto')\n    print('Chatbot started. Type "quit" to exit.')\n    while True:\n        user_input = input('> ')\n        if user_input.lower() == 'quit':\n            break\n        response = client.send_message(thread_id=thread_id, message=user_input)\n        print(response['reply'])
if __name__ == '__main__':\n    chat()\n
