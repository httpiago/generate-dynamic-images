const puppeteer = require('puppeteer-core')
const { getChromeConfigs, pathToFileURL} = require('./Utils')

/**
 * Criar uma nova instância do Google Chrome, tirar um print do arquivo passado
 * no argumento "url" e retornar o print.
 */
module.exports = async ({ filePath, fileType = 'jpeg', quality = 90, omitBackground = false }) => {
  const chromeLaunchConfigs = await getChromeConfigs();
  // Criar instância do Chrome
  const browser = await puppeteer.launch(chromeLaunchConfigs);

  const page = await browser.newPage();

  await page.setViewport({
    width: 1,
    height: 1
  });

  await page.goto(pathToFileURL(filePath));

  const file = await page.screenshot({
    type: fileType,
    fullPage: true, // Capturar toda a página além do viewport
    ...(fileType === 'jpeg' && { quality }), // Qualidade do resultado (entre 0 e 100)
    ...(fileType === 'png' && { omitBackground }) // Opção para capturar a página com fundo transparent (somente para png)
  });

  await browser.close();

  return file;
}
