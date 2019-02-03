const url = require('url')

module.exports = async (req) => {
  const parsedUrl = url.parse(req.url, true)

  if (parsedUrl.search === '') return false;

  return parsedUrl.query
}