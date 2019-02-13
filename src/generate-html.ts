import { resolve } from 'path';
import { existsSync as checkFileExists } from 'fs'
import { writeTempFile, HTTP_ERROR, parseEmojis } from './Utils'

interface Arguments {
  template: string,
  [key: string]: any
}

/**
 * Gerar o HTML do template e salvar em uma pasta temporária do sistema.
 * @param {Object} props Opções recebidas pelo query string
 * @returns {string} Caminho até onde o arquivo foi salvo na máquina
 */
async function generateHTML({ template, ...otherProps }: Arguments): Promise<string> {
  const templatePath = resolve(__dirname, `../templates/${template}.js`)

  // Checar se o template existe
  if (checkFileExists(templatePath) === false) {
    throw new HTTP_ERROR({
      statusCode: 404,
      message: `Template "${template}" não existe.`
    });
  }

  // Importar template
  const content = await import(templatePath)
    .then(module => module.default(otherProps))
    .then(parseEmojis());

  // Gerar HTML
  const html = `
    <body>
      ${content}
    </body>
  `

  // Salvar HTML em um arquivo na pasta temp do sistema
  return await writeTempFile(html)
}

export default generateHTML
