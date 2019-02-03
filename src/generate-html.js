const createHtml = require('create-html')
const path = require('path');
const { tmpdir } = require('os');
const { promisify } = require('util');
const { writeFile } = require('fs');
const writeFileAsync = promisify(writeFile)
const crypto = require('crypto')
const randomBytesAsync = promisify(crypto.randomBytes)

/**
 * Gerar o HTML e salvar em uma pasta temporária.
 * @param {Object}
 */
module.exports = async (props) => {
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
async function writeTempFile(contents) {
  const id = await randomBytesAsync(16)
  const randomPath = path.join(tmpdir(), `${id.toString("hex")}.html`);
  
  await writeFileAsync(randomPath, contents);

  return randomPath;
}
