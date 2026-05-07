const api_url = "programming-quotesapi.vercel.app/api/random";
const quote = document.getElementById("quote");
const author = document.getElementById("author");

async function getquote(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    
}

getquote(api_url)