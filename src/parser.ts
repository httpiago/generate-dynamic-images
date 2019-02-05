const url = require('url')

module.exports = async (req: any) => {
  const parsedUrl = url.parse(req.url, true)

  // Verificar se o usuário difiniu alguma opção no query string
  if (parsedUrl.search === '') {
    return Promise.reject('Defina alguns argumentos no query string');
  }

  return parsedUrl.query || {}
}