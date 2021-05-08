const headers = require('./header')
var fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({

        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
        'upgrade-insecure-requests': '1',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,en;q=0.8'
        // 'authority': 'www.etoro.com',
        // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
        // 'upgrade-insecure-requests': '1',
        // 'path': '/sapi/trade-data-real/live/public/portfolios?cid=3378352&format=json',
        // 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        // 'accept-encoding': 'gzip, deflate, br',
        // 'accept-language': 'en-US,en;q=0.9,en;q=0.8'
    })
    await page.goto('https://www.etoro.com/sapi/trade-data-real/live/public/portfolios?cid=3378352&format=json')
    fs.writeFile('parse.html',await page.content(), err =>{
        if (err){
            console.log(err)
            return
        }
    });
    await page.content()
    await page.cookies()
    // const cookies = await p
    // age.cookies()
    await page.screenshot({ path: 'parse.png' });
    await browser.close();
})();