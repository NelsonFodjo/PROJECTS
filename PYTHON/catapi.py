import requests

def cats():
    url = "https://catfact.ninja/fact"
    cat = requests.get(url)

    if cat.status_code == 200:
        print(cat.json())



cats()
