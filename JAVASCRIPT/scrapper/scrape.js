async function getHeadlines() {
  try {
    const url = 'https://www.axios.com/';
    
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36'
      }
    });
    const $ = cheerio.load(data);
    
    const headlines = [];

    $('h2 a, .headline a').each((index, element) => {
      headlines.push($(element).text().trim());
    });

    console.log(headlines);
  } catch (error) {
    console.error('Error fetching the data:', error);
  }
}

getHeadlines();