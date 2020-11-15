// import puppeteer in login.js file
const puppeteer = require('puppeteer');

const id = "mapovif924@testbnk.com";
const pw = "12345678";

let tab;

// puppeteer functions => pending promise

// initialize a new browser window 
let windowOpenPromise = puppeteer.launch({
    headless:false,
    defaultViewport: null,
    args : ["--start-maximized"]
});

windowOpenPromise.then(function(browser){
    // get all opened tabs/pages ina form of array
    let pagesPromise = browser.pages();
    return pagesPromise;
})
.then(function(pages){
    // [ tab ];
    let page = pages[0];
    tab = page;
    // goto to the given link on current page
    let gotoPromise = page.goto("https://www.hackerrank.com/auth/login");
    return gotoPromise;
})
.then(function(){
    let idTypedPromise = tab.type("#input-1" , id);
    return idTypedPromise;
})
.then(function(){
    let pwTypedPromise = tab.type("#input-2" , pw);
    return pwTypedPromise;
})
.then(function(){
    let loginPromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
    return loginPromise;
})
.then(function(){
    console.log("logged in !!!");
})
