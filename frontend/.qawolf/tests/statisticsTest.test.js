const { launch } = require("qawolf");
const selectors = require("../selectors/statisticsTest");

describe('statisticsTest', () => {
  let browser;

  beforeAll(async () => {
    browser = await launch({ url: "http://localhost:3000/statistics" });
  });

  afterAll(() => browser.close());
  
  it('can click "Email" input', async () => {
    await browser.click(selectors[0]);
  });
  
  it('can type into "Email" input', async () => {
    await browser.type(selectors[1], "righway@cm.com");
  });
  
  it('can click "password" input', async () => {
    await browser.click(selectors[2]);
  });
  
  it('can type into "password" input', async () => {
    await browser.type(selectors[3], "oiweruiowr");
  });
  
  it('can click "Login" button', async () => {
    await browser.click(selectors[4]);
  });
  
  it('can click "Pileus Assignment" link', async () => {
    await browser.click(selectors[5]);
  });
  
  it('can click "Have Not Logged In? Register!" button', async () => {
    await browser.click(selectors[6]);
  });
  
  it('can click "username" input', async () => {
    await browser.click(selectors[7]);
  });
  
  it('can type into "username" input', async () => {
    await browser.type(selectors[8], "Jerry Liu");
  });
  
  it("can Tab", async () => {
    await browser.type(selectors[9], "↓Tab↑Tab");
  });
  
  it('can type into "email" input', async () => {
    await browser.type(selectors[10], "jerryliu@gmail.com");
  });
  
  it("can Tab", async () => {
    await browser.type(selectors[11], "↓Tab↑Tab");
  });
  
  it('can type into "password" input', async () => {
    await browser.type(selectors[12], "foryestoo2");
  });
  
  it('can click "Register" button', async () => {
    await browser.click(selectors[13]);
  });
});