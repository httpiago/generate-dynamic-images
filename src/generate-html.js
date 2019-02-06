const { resolve } = require('path');
const { existsSync: checkFileExists } = require('fs')
const { writeTempFile, HTTP_ERROR } = require('./Utils')

/**
 * Gerar o HTML do template e salvar em uma pasta temporária do sistema.
 * @param {Object} props Opções recebidas pelo query string
 */
module.exports = async ({ template, ...otherProps }) => {
  const templatePath = resolve(`./templates/${template}.js`)

  // Checar se o template existe
  if (checkFileExists(templatePath) === false) {
    throw new HTTP_ERROR({
      statusCode: 404,
      message: `Template "${template}" não existe.`
    });
  }

  // Importar template
  const content = require(templatePath)(otherProps);

  // Gerar HTML
  const html = `
    <body>
      ${content}
    </body>
  `

  return await writeTempFile(html)
}
