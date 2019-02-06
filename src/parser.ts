import { HTTP_Error } from './Utils'
const url = require('url')

export default async (req: any) => {
  const { query } = url.parse(req.url, true);

  // Checar se o client definiu um template a ser usado
  if (typeof query.template === 'undefined' || query.template === '') {
    throw new HTTP_Error({
      code: 400,
      message: 'Defina um template a ser usado. <a href="?template=default">Exemplo</a>'
    });
  }

  return query || {}
}