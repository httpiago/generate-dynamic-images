const puppeteer = require('puppeteer-core')
const chromium = require('chrome-aws-lambda')
const { join, dirname, basename } = require('path')

const __DEV__: boolean = !process.env.NOW_REGION

/**
 * Criar uma nova instância do Google Chrome, tirar um print do arquivo passado
 * no argumento "url" e retornar o print.
 * @param {string} url
 */
module.exports = async (url: string, type: FileType = 'jpeg') => {
  const chromeLaunchConfigs = await getChromeConfigs();
  // Criar instância do Chrome
  const browser = await puppeteer.launch(chromeLaunchConfigs);

  const page = await browser.newPage();

  await page.setViewport({
    width: 2048,
    height: 1170
  });

  await page.goto(pathToFileURL(url));

  const file = await page.screenshot({
    type,
    quality: 90, // Entre 0 e 100 (somente para jpeg)
    fullPage: true, // Capturar toda a página além do viewport
    omitBackground: false // Opção para capturar a página com fundo transparent (somente para png)
  });

  await browser.close();

  return file;
}

/**
 * Transformar o url de um arquivo local em um url que o Chrome possa entender.
 * @param {string} path 
 */
function pathToFileURL(path: string) {
  const fileName = basename(path);
  const folderName = dirname(path);
  const fileUrl = 'file://' + join(folderName, encodeURIComponent(fileName));

  return fileUrl;
}

/**
 * Retorna as configurações de inicialização do Google Chrome dependendo do embiente
 * em que o programa está.
 */
async function getChromeConfigs(): Promise<ChromeConfigs> {
  return (__DEV__ === false)
    // Configurações do Chrome no ambiente de produção
    ? {
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    }
    // Configurações do Chrome no embiente de desenvolvimento
    : {
      args: [],
      // Local da instalação do Chrome no Windows
      executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
      headless: true,
    }
}