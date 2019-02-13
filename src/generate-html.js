const { resolve } = require('path');
const { existsSync: checkFileExists } = require('fs')
const { writeTempFile, HTTP_ERROR } = require('./Utils')

const templatePath = resolve(`./templates/default.js`)

  // Checar se o template existe
console.log('checkFileExists', templatePath, '=>', checkFileExists(templatePath))

/**
 * Gerar o HTML do template e salvar em uma pasta temporária do sistema.
 * @param {Object} props Opções recebidas pelo query string
 * @returns {string} Caminho até onde o arquivo foi salvo na máquina
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
  const content = await require(templatePath)(otherProps);

  // Gerar HTML
  const html = `
    <body>
      ${content}
    </body>
  `

  // Salvar HTML em um arquivo na pasta temp do sistema
  return await writeTempFile(html)
}
