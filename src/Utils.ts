const { join, dirname, basename, resolve } = require('path')
const chromium = require('chrome-aws-lambda')
const { tmpdir } = require('os');
const { promisify } = require('util');
const { writeFile } = require('fs');
const writeFileAsync = promisify(writeFile)
const { randomBytes } = require('crypto')
const randomBytesAsync = promisify(randomBytes)


export const checkIsDev: boolean = !process.env.NOW_REGION

/**
 * Transformar o url de um arquivo local em um url que o Chrome possa entender.
 * @param {string} path 
 */
export function pathToFileURL(path: string) {
  const fileName = basename(path);
  const folderName = dirname(path);
  const fileUrl = 'file://' + join(folderName, encodeURIComponent(fileName));

  return fileUrl;
}

/**
 * Retorna as configurações de inicialização do Google Chrome dependendo do embiente
 * em que o programa está.
 */
export async function getChromeConfigs(): Promise<ChromeConfigs> {
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
export const PUBLIC_DIR_PATH: string = pathToFileURL( resolve(__dirname, '..', 'public').replace(/dist\\/g, '') )

/**
 * Salvar um arquivo em uma pasta temporária.
 * @param {string} contents 
 */
export async function writeTempFile(contents: string) {
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


type ErrorNumber = 400 | 403 | 404 | 500 | number;
interface ErrorTypes {
  message: string;
  /** https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status */
  code?: ErrorNumber;
}

/**
 * Criar um erro personalizado para mostrar mais informações ao cliente.
 */
export class HTTP_Error {
  public code?: ErrorNumber;
  public title: string;
  public message: string;
  public stack: any;

  constructor({ code = 500, message = 'Ocorreu um erro desconhecido. Veja mais no console' }: ErrorTypes) {
    this.title =
      (code === 400) ? 'Bad Request' :
      (code === 403) ? 'Forbidden' :
      (code === 404) ? 'Error 404' :
      'Internal Server Error'

    this.code = code;
    this.message = message;

    this.stack = (new Error()).stack;
  }
}