const fs = require('fs');
const { Builder, By, Key, until } = require('selenium-webdriver');

const cards = fs.readFileSync('cards.txt')
  .toString()
  .split('\n')
  .map(entry => /\d{0,} {0,}(.*)/.exec(entry)[1]);

console.log('cards', cards);

(async () => {
  const driver = await new Builder().forBrowser('firefox').build();
  for (const card of cards) {
    await driver.get('https://www.cardkingdom.com');
    await driver.findElement(By.id('tags')).sendKeys(card, Key.ENTER);
    await driver.switchTo().newWindow('tab');
  }
  driver.close();
})();
