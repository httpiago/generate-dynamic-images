import { join, dirname, basename, resolve } from 'path'
import { tmpdir } from 'os'
import { promisify } from 'util'
import { writeFile } from 'fs'
import { randomBytes } from 'crypto'
import emoji from 'emojione'
const writeFileAsync = promisify(writeFile)
const randomBytesAsync = promisify(randomBytes)


export const checkIsDev: boolean = process.env.NODE_ENV !== 'production'

/**
 * Transformar o url de um arquivo local em um url que o Chrome possa entender.
 * @param {string} path 
 */
export function pathToFileURL(path: string): string {
  const fileName = basename(path);
  const folderName = dirname(path);
  const fileUrl = 'file://' + join(folderName, encodeURIComponent(fileName));

  return fileUrl;
}

/**
 * Retorna as configurações de inicialização do Google Chrome dependendo do embiente
 * em que o programa está.
 */
export async function getChromeConfigs(): Promise<ChromeLaunchConfigs> {
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
      args: [ '--no-sandbox', '--disable-setuid-sandbox' ],
      // executablePath: null,
      headless: true,
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
export async function writeTempFile(contents: string): Promise<string> {
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
export class HTTP_ERROR {
  public title: string;
  public statusCode: number;
  public message: string;

  constructor({ statusCode = 500, message = 'Ocorreu um erro desconhecido. Veja mais no console' }) {
    // Show call stack in console
    console.trace()

    // https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
    this.title =
      (statusCode === 400) ? 'Bad Request' :
      (statusCode === 403) ? 'Forbidden' :
      (statusCode === 404) ? 'Error 404' :
      'Internal Server Error'
    this.statusCode = statusCode
    this.message = message

    return this;
  }
}

/**
 * Converter os emojis (feios) nativos do sistema para o padrão EmojiOne.
 * @see http://www.emojione.com/
 * @param {string} [html] - string no padrão unicode (opcional)
 * @returns {Function|string}
 */
export function parseEmojis(html?: string): string|Function|any {
  // Se o html for passado como argumento
  if (typeof html !== 'undefined') return emoji.toImage(html);

  // Se nenhum argumento for passado, retornar uma função que pode ser usado no
  // retorno de uma promise. .then(parseEmojis())
  return (html: string): string => emoji.toImage(html);
}
