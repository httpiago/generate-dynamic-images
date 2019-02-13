import { parseEmojis } from '../src/Utils'

/**
 * Gerar html da uma imagem genérica para teste.
 * @async
 * @param {Object} props Valores recebidos no query string da solicitação.
 * @returns {Promise<string>} Template a ser renderizado.
 */
export default async (props: any): Promise<string> => {
  // Valores padrões
  const {
    title = "Olá mundo!",
    emoji = "🤙🌎"
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
        text-align: center;
      }
      .emoji {
        display: flex;
        flex-wrap: nowrap;
      }
      h1 {
        font-size: 62px;
        margin: 50px 0 0;
      }
    </style>

    <div class="container">
      <div class="emoji">
        ${parseEmojis(emoji).replace(/png\/32\//gm, 'png/128/')}
      </div>
      <h1>${title}</h1>
    </div>
  `
}
