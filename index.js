var fs = require('fs');

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())


const headers = {

    // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
    // 'upgrade-insecure-requests': '1',
    // 'path': '/',
    // 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    // 'accept-encoding': 'gzip, deflate, br',
    // 'accept-language': 'en-US,en;q=0.9,en;q=0.8'
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
    'upgrade-insecure-requests': '1',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,en;q=0.8'
}

const index_url = 'https://www.etoro.com/';
const parse_url = 'https://www.etoro.com/sapi/trade-data-real/live/public/portfolios?cid=3378352';


puppeteer.launch({
    // args: [ '--proxy-server=http://14.225.5.68/' ]
}).then(async browser=>{
    const page = await browser.newPage();
    console.log("Set index.html headers")
    await page.setExtraHTTPHeaders(headers)

    console.log(`go to: with 30 sec timeout`)
    console.log(index_url)
    await page.goto(index_url,{waitUntil: 'networkidle0'}).catch(err=>console.log(err));

    // await page.waitForTimeout(30000)
    const content = await page.content().catch(err=>{
        console.log(err)})
    await page.waitForTimeout(20000)
    console.log('write index./html')
    fs.writeFile('result/pages/index.html', content, err => {
        if (err) {
            console.log(err)
            return null
        }
    });

    // console.log('get cookies')
    const cookies = await page.cookies().catch(errors=>{
        console.log(errors)
    })

    // console.log('write cookies')
    // fs.writeFile('cookies.json', JSON.stringify(cookies), err => {
    //     if (err) {
    //         console.log(err)
    //         return null
    //     }
    // });
    console.log('index.png screenshot')
    await page.screenshot({path: 'result/screenshots/index.png'});

    for (let i=0;i<50;i++){


        console.log('go to with 20 times')
        console.log(`${i} time out 2 sec`)
        await page.goto(parse_url,{waitUntil: 'networkidle0'} )
            .catch(err=>{
            console.log(err)})
        await page.waitForTimeout(3000)
        console.log(`write ${i}.html`)

        fs.writeFile(`result/pages/${i}.html`, await page.content().catch(err=>{
            console.log(err)}), err => {
            if (err) {
                console.log(err)
                return null
            }
        });

        console.log(`screenshot ${i}.png`)
        await page.screenshot({path: `result/screenshots/${i}.png`});}

    console.log('close browser')
    await browser.close();
})

// (async () => {
//
//     const browser = await puppeteer.launch();
//
// })();

//
// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setExtraHTTPHeaders(headers)
//     await page.goto(parse_url)
//     fs.writeFile('parse.html',await page.content(), err =>{
//         if (err){
//             console.log(err)
//             return null
//         }
//     });
//     await page.content()
//     await page.cookies()
//     // const cookies = await page.cookies()
//     await page.screenshot({ path: 'parse.png' });
//     await browser.close();
// })();
