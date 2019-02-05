const url = require('url')

module.exports = async (req) => {
  const parsedUrl = url.parse(req.url, true)

  console.log('parsedUrl.query', parsedUrl.query)

  if (parsedUrl.search === '') return Promise.reject('Defina alguns argumentos no query string');

  return parsedUrl.query || {}
}