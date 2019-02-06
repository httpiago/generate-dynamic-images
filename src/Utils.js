const { join, dirname, basename, resolve } = require('path')
const chromium = require('chrome-aws-lambda')
const { tmpdir } = require('os');
const { promisify } = require('util');
const { writeFile } = require('fs');
const writeFileAsync = promisify(writeFile)
const { randomBytes } = require('crypto')
const randomBytesAsync = promisify(randomBytes)


const checkIsDev = !process.env.NOW_REGION

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

/**
 * Retorna as configurações de inicialização do Google Chrome dependendo do embiente
 * em que o programa está.
 */
async function getChromeConfigs() {
  return (checkIsDev === true)
    // Configurações do Chrome no embiente de desenvolvimento
    ? {
      args: [],
      // Local da instalação do Chrome no Windows
      executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
      headless: true,
    }
    // Configurações do Chrome no ambiente de produção
    : {
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    }
}

/**
 * Caminho para a pasta "public" que pode ser acessada tanto no servidor
 * como localmente.
 */
const PUBLIC_DIR_PATH = pathToFileURL( resolve(__dirname, '..', 'public').replace(/dist\\/g, '') )

/**
 * Salvar um arquivo em uma pasta temporária.
 * @param {string} contents 
 */
async function writeTempFile(contents) {
  let htmlFilePath

  if (checkIsDev) {
    // Usar um nome único para não criar um monte de arquivo desnecessário no computador local
    htmlFilePath = join(tmpdir(), `puppeteer-generate-image-test.html`);
  }
  else {
    // Criar um nome aleatório para que um arquivo não sobescreva outro no servidor
    const id = await randomBytesAsync(16)
    htmlFilePath = join(tmpdir(), `${id.toString("hex")}.html`);
  }
  
  await writeFileAsync(htmlFilePath, contents);

  return htmlFilePath
}

/**
 * Criar um erro personalizado para mostrar mais informações ao cliente.
 */
class HTTP_ERROR {
  constructor({ statusCode = 500, message = 'Ocorreu um erro desconhecido. Veja mais no console' }) {
    const error = new Error(message)

    // https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
    error.title =
      (statusCode === 400) ? 'Bad Request' :
      (statusCode === 403) ? 'Forbidden' :
      (statusCode === 404) ? 'Error 404' :
      'Internal Server Error'
    
    error.statusCode = statusCode

    return error;
  }
}

module.exports = {
  PUBLIC_DIR_PATH,
  checkIsDev,
  pathToFileURL,
  getChromeConfigs,
  writeTempFile,
  HTTP_ERROR
}