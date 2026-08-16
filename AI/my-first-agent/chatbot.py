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


def load_config():
    if os.path.exists(assistant_file):
        with open(assistant_file, 'r') as file:
            return json.load(file)
    return {}


def save_config(data):
    with open(assistant_file, 'w') as file:
        json.dump(data, file)


async def get_assistant_id(client, config):
    if config.get('assistant_id'):
        return config['assistant_id']

    assistant = await client.create_assistant(
        name='Sidekick', system_prompt="Hello! I'm Sidekick, your friendly assistant."
    )
    assistant_id = str(assistant.assistant_id)
    config['assistant_id'] = assistant_id
    save_config(config)
    return assistant_id


async def get_thread_id(client, config, assistant_id):
    # Reusing the same thread across runs is what gives the chatbot memory:
    # Backboard keeps the conversation history tied to a thread_id.
    if config.get('thread_id'):
        try:
            await client.get_thread(thread_id=config['thread_id'])
            return config['thread_id']
        except Exception:
            pass  # stored thread no longer exists, create a new one

    thread = await client.create_thread(assistant_id=assistant_id)
    thread_id = str(thread.thread_id)
    config['thread_id'] = thread_id
    save_config(config)
    return thread_id


async def chat():
    async with BackboardClient(api_key=api_key) as client:
        config = load_config()
        assistant_id = await get_assistant_id(client, config)
        thread_id = await get_thread_id(client, config, assistant_id)

        print('Chatbot started. Type "quit" to exit.')
        while True:
            user_input = input('> ')
            if user_input.lower() == 'quit':
                break
            response = await client.send_message(user_input, thread_id=thread_id, assistant_id=assistant_id)
            print(response.content)


if __name__ == '__main__':
    asyncio.run(chat())
