const { PUBLIC_DIR_PATH } = require('../src/Utils')

/**
 * Gerar html da uma imagem genérica para teste.
 * @async
 * @param {Object} props Valores recebidos no query string da solicitação.
 * @returns {Promise<string>} Template a ser renderizado.
 */
module.exports = async (props) => {
  const {
    title = "Olá mundo!",
    withImage = 'true'
  } = props

  return `
    <style>
      body {
        background: #eee;
        width: 720px;
        word-break: break-word;
        margin: 0;
      }
      .container {
        padding: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      img {
        height: 140px;
      }
      h1 {
        font-size: 62px;
        margin: 50px 0 0;
      }
    </style>

    <div class="container">
      ${withImage === 'true'
        ? (
          `<img src="${PUBLIC_DIR_PATH}/big_heart.png">`
        )
        : ''
      }
      <h1>${title}</h1>
    </div>
  `
}
