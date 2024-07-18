const puppeteer = require('puppeteer')
const fs = require('fs');
const cheerio = require('cheerio')
const readline = require('readline');
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time);
    })
}
async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 500);
        });
    });
}
// const browserPath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
/**
 * 
 * @param {bili的上传地址url} url 
 * @param {'./files目录下的文件名称'} name 
 * @param {视频url作为简介内容} ref 
 * @param {账号cookie的地址} cookiePath
 * @param {标签数组} tipArray
 * @returns 
 */
exports.crawlerUpload = (url, name, ref, cookiePath, tipArray = [], localStoragePath) => {
    return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            executablePath: '/usr/bin/google-chrome-stable',
            defaultViewport: { width: 1920, height: 1080 },
            //             args: ['--start-maximized'],
            // executablePath: browserPath,
            // defaultViewport:{
            //     width:1920,
            //     height:1080
            // },
            headless: 'new',
        })
        const cookiesString = fs.readFileSync(cookiePath);
        const cookies = JSON.parse(cookiesString);

        const localStorageString = fs.readFileSync(localStoragePath);
        const localStorages = JSON.parse(localStorageString);


        const page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.bilibili.com/');
        await sleep(2000)
        await page.setCookie(...cookies);
        // 设置localStorage的值
        await page.evaluate(() => {
            // 导入数据到localStorage
            for (const key in localStorages) {
                if (Object.hasOwnProperty.call(localStorages, key)) {
                    localStorage.setItem(key, localStorages[key]);
                }
            }
        });
        await sleep(1000)
        await page.goto('https://www.bilibili.com/');
        await sleep(10000)
        await page.goto(url);
        console.log('?????')
        await sleep(2000)
        let input
        try {
            input = await page.waitForXPath('//input[@type="file"]')
        } catch (e) {
            await sleep(180000000)
            reject('tookenFalse')
        }
        await sleep(2000)
        await input.uploadFile(`${name}`)
        let noexits = true
        do {
            await sleep(1000)
            const html = await page.content()
            const $ = cheerio.load(html)
            //            console.log('hello',$('#video-up-app > div.content > div > div > div.video-basic > div.form > div:nth-child(1) > span.quick-fill-entrance'))
            if ($('#video-up-app > div.content > div > div > div.video-basic > div.form > div:nth-child(1) > span.quick-fill-entrance').length == 0) {
                const input = await page.waitForXPath('//input[@type="file"]')
                await sleep(2000)
                await input.uploadFile(`${name}`)
            }
            if ($('#video-up-app > div.content > div > div > div.video-basic > div.video-file > div.file-block > div.file-block-detail > div.file-block-status > div.file-block-status-text > .success').length > 0) {

                const getcookies = await page.cookies();
                fs.writeFileSync(cookiePath, JSON.stringify(getcookies));
                // 获取localStorage中的所有键
                const keys = Object.keys(localStorage)
                let obj = {}
                // 遍历每个键并获取对应的值
                for (const key of keys) {
                    const value = localStorage.getItem(key)
                    obj[key] = value
                }
                fs.writeFileSync(localStoragePath,JSON.stringify(obj))

                console.log('上传结束')
                noexits = false
                await sleep(2000)
                await page.click('#video-up-app > div.content > div > div > div.video-basic > div.form > div:nth-child(10) > div > span > span > label > span.bcc-checkbox-checkbox')
                await sleep(1000)
                await page.$eval('#video-up-app > div.videoup-notification-dialog.bcc-dialog__wrap.bcc-dialog__wrap-mask > div > div.bcc-dialog__header > i', (element) => {
                    element.click()
                });
                await sleep(1000)
                await page.$eval('.tag-list > .hot-tag-container', (element) => {
                    element.click()
                });
                // await page.click('.label .des')
                await sleep(5000)
                for (let i = 0; i < tipArray.length; i++) {
                    await page.focus('#tag-container > div.tag-input-wrp > div > div.input-instance > input');
                    await sleep(1000)
                    await page.evaluate((props) => {
                        // document.getElementsByClassName('search-criteria-input').value = '';
                        document.querySelector("#tag-container > div.tag-input-wrp > div > div.input-instance > input").value = props.mytest;
                    }, { mytest: tipArray[i] });
                    await sleep(1000)
                    await page.keyboard.press('Enter');
                }
                const elements = await page.$$('.tag-list > .hot-tag-container');
                // console.log('elements',elements)
                for (const element of elements) {
                    await element.click();
                    await sleep(1000)
                }
                await sleep(1000)
                await page.$eval('.label .des', (element) => {
                    element.click()
                });
                await sleep(1000)
                await page.$eval('#video-up-app > div.content > div > div > div.video-basic > div.form > div.setting > div > div:nth-child(1) > div.setting-content > div:nth-child(3) > label > span.bcc-checkbox-checkbox', (element) => {
                    element.click()
                });
                await sleep(1000)
                await page.$eval('#video-up-app > div.content > div > div > div.video-basic > div.form > div:nth-child(7) > div > div.desc-text-wrp > div > div.editor.ql-container > div.ql-editor.ql-blank > p', (element, props) => {
                    element.innerText = props.ref; // 替换为新的文本内容
                }, { ref });
                await sleep(3000)
                await autoScroll(page)
                //                await sleep(3000)
                //                await page.waitForXPath('.submit-add')
                //                await page.$eval('.submit-add', (element) => {
                //                    element.click()
                //                });
                page.click('#video-up-app > div.content > div > div > div.video-basic > div.form > div:nth-child(16) > div > span.submit-add')
                await sleep(5000)
            } else {
                readline.cursorTo(process.stdout, 0);
                process.stdout.write('uploading.....\n')
                let log = $('#video-up-app > div.content > div > div > div.video-basic > div.video-file > div.file-block > div.file-block-detail > div.file-block-progress > div > div').css('width')
                process.stdout.write(`'${log}'`)
                //                if($('#video-up-app > div.content > div > div > div.video-basic > div.video-file > div.file-block > div.file-block-detail > div.file-block-progress > div > div').css('width') == 'undefind'){
                //                	await input.uploadFile(`${name}`)
                //                }
                readline.moveCursor(process.stdout, 0, -1);
            }

        } while (noexits);
        await browser.close()
        await sleep(1000)
        resolve('done')
    })

}

// (async () => {
//     console.log(await crawler('https://member.bilibili.com/platform/upload/video/frame'))
// })()
