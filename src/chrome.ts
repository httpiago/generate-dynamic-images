import puppeteer from 'puppeteer'
import { pathToFileURL } from './Utils'

interface Configs {
  filePath: string;
  fileType: FileType;
  quality: number;
  omitBackground: boolean;
}

interface ChromeLaunchConfigs {
  args: string[];
  executablePath?: string;
  headless: boolean;
  defaultViewport?: object;
}

/**
 * Criar uma nova instância do Google Chrome e tirar um print do arquivo passado
 * no argumento "filePath".
 * @param {Object} configs - Algumas configurações a serem passadas ao navegador (Ver mais no README.md)
 * @returns {Image} Print gerado pelo Chrome
 */
async function getScreenshot(configs: Configs): Promise<Buffer> {
  const { filePath, fileType = 'jpeg', quality = 90, omitBackground = false } = configs

  // Criar instância do Chrome
  const browser = await puppeteer.launch({
    args: [ '--no-sandbox', '--disable-setuid-sandbox' ],
    // executablePath: null, // Instalação do Chrome local = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
    headless: true,
    defaultViewport: {
      width: 1, height: 1
    }
  } as ChromeLaunchConfigs);

  const page = await browser.newPage();

  await page.goto(pathToFileURL(filePath));
  
  await page.addStyleTag({
    content: `body { margin: 0; }`
  })

  const file = await page.screenshot({
    type: fileType,
    fullPage: true, // Capturar toda a página além do viewport
    ...(fileType === 'jpeg' && { quality }), // Qualidade do resultado (entre 0 e 100)
    ...(fileType === 'png' && { omitBackground }) // Opção para capturar a página com fundo transparent (somente para png)
  });

  await browser.close();

  return file;
}

export default getScreenshot
