const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, './data')));

//websites scraped

URI1 = "https://fictionhorizon.com/best-anime-quotes/";
URI2 = "https://www.goalcast.com/anime-quotes/"

const quotes = []

//scraping wesbite 1

axios(URI1).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('.wp-block-quote')
        .each(
            function() {
                const quote = $(this).find('p').text();
                const author = $(this).find('cite').text();
                quotes.push({
                    quote, author
                });
            }
        );
    const jsonFile = JSON.stringify(quotes);
    fs.writeFile('data/quotes.json', jsonFile, function cb(err, data) {
        if(err) {
            console.log(err);
        }
    });
}).catch(err => {
    console.log(err);
}
);

// scraping website 2

axios(URI2).then(response => {
    const html = response.data
    const $ = cheerio.load(html)

    $('.wp-block-quote')
    .each(
        function(){
            const quote = $(this).find('p').text()
            const author = $(this).find('cite').text()
            quotes.push({quote,author})
        }
    )
    const jsonFile = JSON.stringify(quotes);
    fs.writeFile('data/quotes.json', jsonFile, function cb(err, data) {
        if(err) {
            console.log(err);
        }
    });
})


app.listen(process.env.PORT || 8080, () => {
    console.log("Started server");
});