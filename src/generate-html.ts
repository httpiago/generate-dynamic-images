const createHtml = require('create-html')
const path = require('path');
const { tmpdir } = require('os');
const { promisify } = require('util');
const { writeFile } = require('fs');
const writeFileAsync = promisify(writeFile)
const cryptoModule = require('crypto')
const randomBytesAsync = promisify(cryptoModule.randomBytes)

/**
 * Gerar o HTML e salvar em uma pasta temporária.
 * @param {Object}
 */
module.exports = async (props: PropTypes) => {
  const {
    title = 'Olá mundo!'
  } = props

  const html = createHtml({
    head: `
      <style>
        body {
          background: #eee;
        }
      </style>
    `,
    body: `
      <h1>${title}</h1>
    `
  })

  return await writeTempFile(html)
}

/**
 * Salvar um arquivo em uma pasta temporária.
 * @param {string} contents 
 */
async function writeTempFile(contents: string) {
  const id = await randomBytesAsync(16)
  const randomPath = path.join(tmpdir(), `${id.toString("hex")}.html`);
  
  await writeFileAsync(randomPath, contents);

  return randomPath;
}
