const puppeteer = require('puppeteer')
const { join, dirname, basename } = require('path')

/**
 * Criar uma nova instância do Google Chrome, tirar um print do arquivo passado
 * no argumento "url" e retornar o print.
 * @param {string} url
 */
module.exports = async (url, type) => {
  'use strict';
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setViewport({
    width: 2048,
    height: 1170
  });

  await page.goto(pathToFileURL(url));

  const file = await page.screenshot({ type });

  await browser.close();

  return file;
}

/**
 * Transformar o url de um arquivo local em um url que o Chrome possa entender.
 * @param {string} path 
 */
function pathToFileURL(path) {
  const fileName = basename(path);
  const folderName = dirname(path);
  const fileUrl = 'file://' + join(folderName, encodeURIComponent(fileName));

  return fileUrl;
}