const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const app = express();

URI = "https://fictionhorizon.com/best-anime-quotes/";

axios(URI).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const quotes = [];

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
    fs.writeFile('quotes.json', jsonFile, function cb(err, data) {
        if(err) {
            console.log(err);
        }
    });
}).catch(err => {
    console.log(err);
}
);

app.listen(process.env.PORT || 8080, () => {
    console.log("Started server");
});