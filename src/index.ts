const parseRequest = require('./parser')
const generateHTML = require('./generate-html')
const getScreenshot = require('./chrome')

/**
 * Função acionada pelo pacote micro sempre que o servidor for chamado na porta 3000.
 */
module.exports = async (req: any, res: any) => {
  try {
    // Pegar as informações passada no queryString
    const parsedReq = await parseRequest(req)
    
    // Mostrar a requisição no console
    // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
    console.log('\x1b[34m%s\x1b[0m', 'GET /', parsedReq)

    // Gerar o HTML da página
    const filePath = await generateHTML(parsedReq)
    const fileType: FileType = parsedReq.type || 'jpeg' // 'jpeg' or 'png'

    // Tirar um print da página salva no passo anterior
    const file = await getScreenshot(filePath, fileType)

    // Enviar imagem de volta ao client
    res.statusCode = 200;
    res.setHeader('Content-Type', `image/${fileType}`);
    res.setHeader('Cache-Control', `public, immutable, no-transform, max-age=31536000`);
    res.end(file);
  }
  catch (err) {
    // ERROR!
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <h1>Server Error</h1>
      <p>Sorry, there was a problem</p>
      <p>${err}</p>
    `);
    
    console.error(err);
  }
}