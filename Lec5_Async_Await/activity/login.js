const puppeteer = require("puppeteer");


const id = "mapovif924@testbnk.com";
const pw = "12345678";


(async function(){
    try{
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
          });
        let pages = await browser.pages();
        let page = pages[0];
        await page.goto("https://www.hackerrank.com/auth/login");
        await page.type("#input-1", id);
        await page.type("#input-2", pw); 
        await page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
    }
    catch(error){
        console.log(error);
    }



})();


