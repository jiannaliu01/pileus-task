const { launch } = require("qawolf");
const selectors = require("../selectors/loginTest");

describe('loginTest', () => {
  let browser;

  beforeAll(async () => {
    browser = await launch({ url: "http://localhost:3000/" });
  });

  afterAll(() => browser.close());
  
  it('can click "Email" input', async () => {
    await browser.click(selectors[0]);
  });
  
  it('can type into "Email" input', async () => {
    await browser.type(selectors[1], "message");
  });
  
  it('can click "password" input', async () => {
    await browser.click(selectors[2]);
  });
  
  it('can type into "password" input', async () => {
    await browser.type(selectors[3], "no");
  });
  
  it('can click "Email Password Password needs to have mo..." div', async () => {
    await browser.click(selectors[4]);
  });
  
  it('can click "Email" input', async () => {
    await browser.click(selectors[5]);
  });
  
  it('can click "Email" input', async () => {
    await browser.click(selectors[6]);
  });
  
  it('can click "Email" input', async () => {
    await browser.click(selectors[7]);
  });
  
  it('can type into "Email" input', async () => {
    await browser.type(selectors[8], "m");
  });
  
  it('can click "Email" input', async () => {
    await browser.click(selectors[9]);
  });
  
  it('can click "Email" input', async () => {
    await browser.click(selectors[10]);
  });
  
  it('can type into "Email" input', async () => {
    await browser.type(selectors[11], "righway@cm.com");
  });
  
  it('can click "password" input', async () => {
    await browser.click(selectors[12]);
  });
  
  it('can click "password" input', async () => {
    await browser.click(selectors[13]);
  });
  
  it('can type into "password" input', async () => {
    await browser.type(selectors[14], "no234234");
  });
  
  it('can click "Login" button', async () => {
    await browser.click(selectors[15]);
  });
  
  it('can click "password" input', async () => {
    await browser.click(selectors[16]);
  });
  
  it('can click "password" input', async () => {
    await browser.click(selectors[17]);
  });
  
  it('can type into "password" input', async () => {
    await browser.type(selectors[18], "oiweruiowr");
  });
  
  it('can click "Login" button', async () => {
    await browser.click(selectors[19]);
  });
});