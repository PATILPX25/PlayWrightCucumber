import { Given, When, Then, context, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { expect } from "@playwright/test";
setDefaultTimeout(60*1000)

let browser: Browser;
let page: Page;

Given("I open the Google homepage", async ()=> {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();

  await page.goto("https://www.google.com");
  await page.waitForLoadState("domcontentloaded");
});

When('I enter {string} into the search bar', async function (searchText: string) {
  const searchBox = page.locator('textarea[name="q"]');
  await searchBox.fill(searchText);
});

When("I click the Search button", async function () {
  // Google hides the button until Enter is pressed
  await page.keyboard.press("Enter");
  console.log("This is click");
  
});

After(async function name() {
  try{
    if(page) await page.close();
    if(browser) await browser.close();
  }
  catch(e){}
})
