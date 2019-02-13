const { HTTP_ERROR } = require('./Utils')
const url = require('url')

/**
 * Transformar o query string da solicitação em um object que possa ser
 * entendido pelo JavaScript.
 * @returns {Object}
 */
module.exports = async (req) => {
  const { query } = url.parse(req.url, true);

  // Checar se o client definiu um template a ser usado
  if (typeof query.template === 'undefined' || query.template === '') {
    throw new HTTP_ERROR({
      statusCode: 400,
      message: 'Defina um template a ser usado. <a href="?template=default">Exemplo</a>'
    });
  }

  return query || {}
}