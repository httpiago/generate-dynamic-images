const { PUBLIC_DIR_PATH } = require('../src/Utils')

/**
 * Gerar html da uma imagem para ser compartilhada no twitter.
 * 
 * @param {Object} props Valores recebidos no query string da solicitação.
 */
module.exports = (props) => {
  const {
    username = "github"
  } = props

  return `
    <style>
      body {
        background: #1DA1F2;
        min-width: 500px;
        word-break: break-word;
        font-family: Helvetica Neue LT,Helvetica Neue,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
        text-align: center;
        margin: 0;
        color: #FFF;
        text-shadow: 0 2px 2px rgba(0,0,0,.2);
      }
      .container {
        padding: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      img {
        height: 150px;
      }
      h1 {
        font-size: 62px;
        margin: 20px 0 0;
      }
    </style>

    <div class="container">
      <img src="${PUBLIC_DIR_PATH}/Twitter_Logo.png">
      <h1>Usuário: @${username}</h1>
    </div>
  `
}