const createHtml = require('create-html')
const { resolve } = require('path');
const { existsSync: checkFileExists } = require('fs')
import { writeTempFile, HTTP_Error, checkIsDev } from './Utils'

/**
 * Gerar o HTML do template e salvar em uma pasta temporária.
 * @param {Object}
 */
export default async ({ template, ...otherProps }: any) => {
  const templatePath = resolve(__dirname, `../templates/${template}.js`)

  // Checar se o template existe
  if (checkFileExists(templatePath) === false) {
    throw new HTTP_Error({ code: 404, message: `Template "${template}" não existe.` });
  }

  // Importar template
  const content = await import(templatePath);
  // Gerar HTML
  const html = createHtml({
    body: content.default(otherProps)
  })

  return await writeTempFile(html)
}
