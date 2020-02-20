const { launch } = require("qawolf");
const selectors = require("../selectors/registerTest");

describe('registerTest', () => {
  let browser;

  beforeAll(async () => {
    browser = await launch({ url: "http://localhost:3000/register" });
  });

  afterAll(() => browser.close());
  
  it('can click "username" input', async () => {
    await browser.click(selectors[0]);
  });
  
  it('can type into "username" input', async () => {
    await browser.type(selectors[1], "jerry");
  });
  
  it("can Tab", async () => {
    await browser.type(selectors[2], "↓Tab↑Tab");
  });
  
  it('can type into "email" input', async () => {
    await browser.type(selectors[3], "↓MetaLeft↑MetaLeft↓KeyW↓KeyO↓KeyI↓KeyU↑KeyO↓KeyE↑KeyI↑KeyW↑KeyU↑KeyE");
  });
  
  it('can click "password" input', async () => {
    await browser.click(selectors[4]);
  });
  
  it('can type into "password" input', async () => {
    await browser.type(selectors[5], "wiouer");
  });
  
  it('can click "Email Invalid email address" div', async () => {
    await browser.click(selectors[6]);
  });
  
  it('can click "email" input', async () => {
    await browser.click(selectors[7]);
  });
  
  it('can click "email" input', async () => {
    await browser.click(selectors[8]);
  });
  
  it('can click "email" input', async () => {
    await browser.click(selectors[9]);
  });
  
  it('can type into "email" input', async () => {
    await browser.type(selectors[10], "righway@cm.com");
  });
  
  it('can click "Full Name Email Email already in use Pas..." form', async () => {
    await browser.click(selectors[11]);
  });
  
  it('can click "password" input', async () => {
    await browser.click(selectors[12]);
  });
  
  it('can click "password" input', async () => {
    await browser.click(selectors[13]);
  });
  
  it('can click "password" input', async () => {
    await browser.click(selectors[14]);
  });
  
  it('can type into "password" input', async () => {
    await browser.type(selectors[15], "weroiuoiwe");
  });
  
  it('can click "email" input', async () => {
    await browser.click(selectors[16]);
  });
  
  it('can click "email" input', async () => {
    await browser.click(selectors[17]);
  });
  
  it('can click "email" input', async () => {
    await browser.click(selectors[18]);
  });
  
  it('can type into "email" input', async () => {
    await browser.type(selectors[19], "highway@yes.com");
  });
  
  it('can click "Register" button', async () => {
    await browser.click(selectors[20]);
  });
});