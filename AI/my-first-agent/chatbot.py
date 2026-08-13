import asyncio
import os
import json
from dotenv import load_dotenv
from backboard import BackboardClient

load_dotenv()

api_key = os.getenv('BACKBOARD_API_KEY')
if not api_key:
    raise ValueError('API key not found. Set the BACKBOARD_API_KEY environment variable.')

assistant_file = 'sidekick.json'


async def get_assistant_id(client):
    if os.path.exists(assistant_file):
        with open(assistant_file, 'r') as file:
            data = json.load(file)
            return data.get('assistant_id')

    assistant = await client.create_assistant(
        name='Sidekick', system_prompt="Hello! I'm Sidekick, your friendly assistant."
    )
    assistant_id = str(assistant.assistant_id)
    with open(assistant_file, 'w') as file:
        json.dump({'assistant_id': assistant_id}, file)
    return assistant_id


async def chat():
    async with BackboardClient(api_key=api_key) as client:
        assistant_id = await get_assistant_id(client)
        thread = await client.create_thread(assistant_id=assistant_id)
        thread_id = thread.thread_id

        print('Chatbot started. Type "quit" to exit.')
        while True:
            user_input = input('> ')
            if user_input.lower() == 'quit':
                break
            response = await client.send_message(user_input, thread_id=thread_id, assistant_id=assistant_id)
            print(response.content)


if __name__ == '__main__':
    asyncio.run(chat())
