const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const page = await browser.newPage();
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 const base=process.env.SITE_URL || 'http://127.0.0.1:8000/';
 let count=0;
 for (const width of [1440,768,390]) {
  await page.setViewportSize({width,height:950});
  for (const route of ['index','about','services','approach','insights','contact','privacy','legal']) {
   const response=await page.goto(base+route+'.html'); assert.equal(response.status(),200);
   assert.equal(await page.locator('h1').count(),1);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth), `${route}: overflow at ${width}`);
   assert(await page.locator('img').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0)),`${route}: image missing`);
   const refs=await page.locator('a[href]').evaluateAll(els=>els.map(e=>e.href));
   for(const url of new Set(refs)) { const result=await page.request.get(url); assert.equal(result.status(),200, url); }
   count++;
  }
 }
 await page.goto(base+'index.html');
 const toggle=page.getByRole('button',{name:/Menu/}); await toggle.click();
 assert.equal(await toggle.getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Escape'); assert.equal(await toggle.getAttribute('aria-expanded'),'false');
 await toggle.click(); await page.locator('#main-nav').getByRole('link',{name:'Services',exact:true}).click(); assert(page.url().includes('services.html'));
 await page.goto(base+'contact.html?subject=Capital%20Structuring#enquiry');
 assert.equal(await page.locator('select').inputValue(),'Capital Structuring');
 await page.getByRole('button',{name:'Save enquiry'}).click(); assert.equal(await page.locator('input[name=name]').evaluate(el=>el.validity.valueMissing),true);
 await page.locator('[name=name]').fill('Test Investor'); await page.locator('[name=email]').fill('investor@example.com'); await page.locator('[name=message]').fill('Please discuss this investment opportunity.'); await page.locator('[type=checkbox]').check();
 const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Save enquiry'}).click()]); assert.equal(download.suggestedFilename(),'TSQ-enquiry.txt');
 const stream=await download.createReadStream(); let content='';for await(const chunk of stream)content+=chunk; assert(content.includes('Test Investor')); assert(content.includes('Not sent.'));
 assert((await page.locator('#form-status').innerText()).includes('not been sent'));
 await page.setViewportSize({width:1440,height:1000});await page.goto(base); await page.screenshot({path:'/tmp/tsq-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'/tmp/tsq-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]); await browser.close();console.log(`PASS: ${count} page/viewport checks, links, images, keyboard menu, validation, subject selection and enquiry download; no browser errors.`);
})().catch(e=>{console.error(e);process.exit(1)});
