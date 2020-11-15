// import puppeteer in login.js file
const puppeteer = require("puppeteer");

const id = "mapovif924@testbnk.com";
const pw = "12345678";

let tab;

// puppeteer functions => pending promise

// initialize a new browser window
let windowOpenPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});

windowOpenPromise
  .then(function (browser) {
    // get all opened tabs/pages ina form of array
    let pagesPromise = browser.pages();
    return pagesPromise;
  })
  .then(function (pages) {
    // [ tab ];
    let page = pages[0];
    tab = page;
    // goto to the given link on current page
    let gotoPromise = page.goto("https://www.hackerrank.com/auth/login");
    return gotoPromise;
  })
  .then(function () {
    let idTypedPromise = tab.type("#input-1", id);
    return idTypedPromise;
  })
  .then(function () {
    let pwTypedPromise = tab.type("#input-2", pw);
    return pwTypedPromise;
  })
  .then(function () {
    let loginPromise = tab.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button"
    );
    return loginPromise;
  })
  .then(function () {
    let waitAndClickPromise = waitAndClick("#base-card-1-link");
    return waitAndClickPromise; // Promise<Pending>
  })
  .then(function () {
    let waitAndClickPromise = waitAndClick('a[data-attr1="warmup"]');
    return waitAndClickPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector(
      ".js-track-click.challenge-list-item",
      { visible: true }
    );
    return waitPromise;
  })
  .then(function () {
    let allATagsPromise = tab.$$(".js-track-click.challenge-list-item");
    return allATagsPromise;
  })
  .then(function (allATags) {
    // [ <a> </a>   ,  <a> </a>   , <a> </a>   , <a> </a>   ];
    // let allLinksPromise = [Promise<data> , Promise<data> ,Promise<data> ,Promise<data> ];
    let allLinksPromise = [];
    for (let i = 0; i < allATags.length; i++) {
      let linkPromise = tab.evaluate(function (elem) {
        return elem.getAttribute("href");
      }, allATags[i]);
      allLinksPromise.push(linkPromise);
    }
    // Prmise <resolve>
    let pendingPromise = Promise.all(allLinksPromise);
    return pendingPromise;
  })
  .then(function (allLinks) {
    // [ link1 , link2 , link3 , link4  ];
    console.log(allLinks);
    let completeLinks = allLinks.map( function(link){
        return "https://www.hackerrank.com"+link;
    })
    console.log(completeLinks);
  })
  .catch(function(error){
      console.log(error);
  })


  function waitAndClick(selector){
      return new Promise( function(resolve , reject){
        let waitPromise = tab.waitForSelector(selector , { visible: true,});
        waitPromise.then(function(){
            let clickPromise = tab.click(selector);
            return clickPromise;
        })
        .then(function(){
               resolve(); 
        })
        .catch(function(error){
            reject(error);
        })
      });



  }