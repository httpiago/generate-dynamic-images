import parseRequest from './parser'
import generateHTML from './generate-html'
import getScreenshot from './chrome'
import { IncomingMessage, ServerResponse } from 'http'

/**
 * Função acionada pelo pacote micro sempre que o servidor for chamado na porta 3000.
 */
export default async function requestHandler(req: IncomingMessage, res: ServerResponse) {
  try {
    // Pegar as informações passada no queryString
    const parsedReq = await parseRequest(req)

    // Mostrar a requisição no console
    // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
    console.log('\x1b[34m%s\x1b[0m', 'GET /', parsedReq)

    // Gerar o HTML da página
    const filePath = await generateHTML(parsedReq)
    const fileType: FileType = parsedReq.type || 'jpeg'

    // Tirar um print da página salva no passo anterior
    const file = await getScreenshot({
      filePath,
      fileType,
      quality: Number(parsedReq.quality) || 90,
      omitBackground: parsedReq.transparent === 'true'
    })

    // Enviar imagem de volta ao client
    res.statusCode = 200;
    res.setHeader('Content-Type', `image/${fileType}`);
    res.setHeader('Cache-Control', `public, immutable, no-transform, max-age=31536000`);
    res.end(file);
  }
  catch (error) {
    // ERRROOOUU!
    res.statusCode = error.code || 500;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`
      <h1 style="font-size: 3em;">${error.title}</h1>
      <p style="margin: -20px 0 40px;font-size: 18px;">${error.message}</p>
      <p>Veja mais informações no console.</p>
    `);

    console.error(error);
  }
}
