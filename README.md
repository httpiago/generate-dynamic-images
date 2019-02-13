# generate-dynamic-images

Um simples servidor em Node que automatiza o processo de criação de imagens dinâmicas usando HTML e o Google Chrome.

#### [Inspirado nesse repositório](https://github.com/styfle/og-image) • [Online demo](https://generate-dynamic-image.herokuapp.com/?template=default&title=Hello%20Github%20user!&emoji=%F0%9F%9A%80%F0%9F%8C%8E)

## Pacotes usados

- [puppeteer](https://www.npmjs.com/package/puppeteer)
- [micro](https://www.npmjs.com/package/micro)
- [typescript](https://www.npmjs.com/package/typescript)

## Fluxograma

![Fluxograma do processo](/public/fluxograma.jpeg)

- O passo 1 ocorre no arquivo `src/parser.js`
- Os passos 2 e 3 acontecem nos arquivos `templates/**.js` e `src/generate-html.js`, respectivamente
- Os passos 4 e 5 acontecem no arquivo `src/chrome.js`

## Exemplo de solicitação

Você deve passar as opções que o arquivo "/src/generate-html.js" irá receber através do _query string_ do url, veja o exemplo abaixo:

```bash
curl http://localhost:3000?template=default&title=Custom%20title
```

#### Resposta:

```
Status: 200 OK
Content-Type: image/jpeg
Content-Length: *
Cache-Control: public, immutable, no-transform, max-age=31536000
```

### Opções padrões de personalização

| Opção | Valores aceitos | Valor padrão | Opcional | Descrição |
|-------------|---|---|---|---|
| template    | Nome de algum arquivo na pasta "[templates](/templates)". | null | Não | Template a ser usado para a criação da imagem. |
| type        | "jpeg" ou "png" | jpeg | Sim | Mime type da imagem. |
| quality     | 0-100 | 90 | Sim | Qualidade do resultado (OBS: Só funciona se o type for "jpeg"). |
| transparent | true ou false | false | Sim | Use essa opção para remover o fundo da página (OBS: Só funciona se o type for "png" e se o template não conter um fundo também). |

#### Outros valores para personalizar a imagem em si (como "title", "withImage", ...) variam de acordo com o template. Veja as opções disponíveis em cada arquivo da pasta "[template](/template)".

## Templates

Templates nada mais são do que um arquivo .ts que exporta por padrão uma função assíncrona pura que recebe as opções definidas no query string das solicitações no primeiro argumento e retorna um html que será printado. Exemplo:

#### templates/FILE_NAME.ts:

```js
import { PUBLIC_DIR_PATH } from '../src/Utils'

/**
 * Gerar HTML de uma imagem genérica para teste.
 * @async
 * @param {Object} props - Valores recebidos no query string da solicitação.
 * @returns {Promise<string>} Template a ser renderizado.
 */
export default async (props) => {
  // Valores padrões
  const {
    bigTitle = "Olá mundo!"
  } = props

  return `
    <style>
      body { background: #000; color: #fff }
    </style>

    <img src="${PUBLIC_DIR_PATH}/Twitter_Logo.png" />

    <h1>${bigTitle}</h1>
  `
}
```

O arquivo acima poderá ser acessado por meio da url:

```bash
curl http://localhost:3000?template=FILE_NAME&bigTitle=Hello
```

> **Dica:** Você pode usar emojis nos templates tanto no formado [unicode](https://unicode.org/emoji/charts/full-emoji-list.html) quanto no formato [shortname](https://gist.github.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb) que os emojis ~~feios~~ nativos do sistema irão ser convertidos para os do [EmojiOne](https://www.emojione.com/). 🎉😍💯❤

## Hospedagem

Pode ser hospedado em qualquer servidor que aceite Node, como por exemplo o Heroku. Lembrando que é necessário a compilação dos códigos typescript.
> No caso do Heroku é necessário usar um [buildpack](https://github.com/jontewks/puppeteer-heroku-buildpack) para o puppeteer funcionar normalmente. Se você escolher outro serviço, terá que checar manualmente se ocorre algum problema.  O botão abaixo configura automaticamente o ambiente pra você.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/httpiago/generate-dynamic-images/tree/master)

## License

MIT
