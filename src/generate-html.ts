const createHtml = require('create-html')
const { join } = require('path');
const { existsSync: checkFileExists } = require('fs')
import { writeTempFile, HTTP_Error } from './Utils'

/**
 * Gerar o HTML do template e salvar em uma pasta temporária.
 * @param {Object}
 */
export default async ({ template, ...otherProps }: any) => {
  const templatePath = join(__dirname, `../templates/${template}.js`)

  // Checar se o template existe
  if (checkFileExists(templatePath) === false) {
    throw new HTTP_Error({ code: 404, message: `Template "${template}" não existe.` });
  }

  const content = require(templatePath)(otherProps)
  // Gerar HTML
  const html = createHtml({
    body: content
  })

  return await writeTempFile(html)
}
