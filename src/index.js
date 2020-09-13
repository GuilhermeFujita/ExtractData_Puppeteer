const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://busca.magazineluiza.com.br/busca?q=iphone');

  await page.evaluate(() => {
    //Pegar todas as infos do navegador
    const rawItems = document.querySelectorAll('.nm-product-item');
    //Transformar em objetos JS
    const itemsArray = [...rawItems]
    //console.log('Raw', rawItems)
    const products = [];
    itemsArray.map(product => {
      const finalProduct = {
        name: product.innerText.substring(0, product.innerText.indexOf('R$')-3),
        price: product.innerText.substring(product.innerText.indexOf('R$'))
      }
      products.push(finalProduct)
    })

    console.log('Products Array',products)
    //Retornar
  });

  //await browser.close();
})();