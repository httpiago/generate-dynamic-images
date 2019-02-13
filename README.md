# generate-dynamic-images 🤖

Um simples programa em Node que automatiza o processo de criação de imagens dinâmicas usando HTML e  
o Google Chrome em modo _headless_. [Veja alguns exemplos de uso](#exemplos-de-uso-).

![](https://img.shields.io/badge/-HYPE%20ALERT!%20😂-red.svg) 
[![Online demo](https://img.shields.io/badge/Online-demo-brightgreen.svg)](https://generate-dynamic-images.herokuapp.com/?template=default&title=Hello%20Github%20user!&emoji=%F0%9F%9A%80%F0%9F%8C%8E)

## Pacotes usados 📦

- [puppeteer](https://www.npmjs.com/package/puppeteer): Para manipular o G Chrome em modo _headless_.
- [micro](https://www.npmjs.com/package/micro): Criar um simples servidor http.
- [typescript](https://www.npmjs.com/package/typescript): Fazer a tipagem do código.
- [emojiOne](https://www.emojione.com/): Para renderizar os emojis bonitos nos templates.
- [concurrently](https://www.npmjs.com/package/concurrently): Executar vários comandos em paralelo no terminal.
- [nodemon](https://www.npmjs.com/package/nodemon): Restartar o servidor quando ocorrer uma alteração nos arquivos.

## Comandos 🤓

- `yarn run build` e `yarn run watch`: Compilar os códigos typescript.
- `yarn run start`: Iniciar o servidor em modo produção (com os códigos compilados) na porta 3000.
- `yarn run dev`: Executa em paralelo os comandos "build" e "start" junto com o nomemon, para que o servidor se auto reiniciei quando ocorrer qualquer alteração de código (Veja também a sessão abaixo).

## Fluxograma 🤔

![Fluxograma do processo](/public/fluxograma.jpeg)

- O passo 1 ocorre no arquivo [src/parser.ts](/src/parser.ts).
- Os passos 2 e 3 acontecem nos arquivos [templates/**.ts](/templates/default.ts) e [src/generate-html.ts](/src/generate-html.ts), respectivamente.
- Os passos 4 e 5 acontecem no arquivo [src/chrome.ts](/src/chrome.ts).

## Exemplo de solicitação 👨‍🏫

Você deve passar as opções que o arquivo "/src/generate-html.ts" irá receber através do _query string_ do url, veja o exemplo abaixo:

```
curl http://localhost:3000?template=default&type=jpeg&title=Custom%20title
```

#### Resposta:

```
Status: 200 OK
Content-Type: image/jpeg
Content-Length: *
Cache-Control: public, immutable, no-transform, max-age=31536000
```

### Opções padrões de personalização ⚙

| Opção | Valores aceitos | Valor padrão | Opcional | Descrição |
|-------------|---|---|---|---|
| template    | Nome de algum arquivo na pasta "[templates](/templates)". | undefined | Não | Template a ser usado para a criação da imagem. |
| type        | "jpeg" ou "png" | jpeg | Sim | Mime type da imagem. |
| quality     | 0-100 | 90 | Sim | Qualidade do resultado (OBS: Só funciona se o type for "jpeg"). |
| transparent | true ou false | false | Sim | Use essa opção para remover o fundo da página (OBS: Só funciona se o type for "png" e se o template não conter um fundo também). |

#### Outros valores para personalizar a imagem em si (como "title", "background", ...) variam de acordo com o template. Veja as opções disponíveis para cada arquivo na pasta "[templates](/templates)".

## Templates 📚

Templates nada mais são do que um arquivo .ts que exporta por padrão uma função assíncrona pura que recebe as opções definidas no [query string](https://en.wikipedia.org/wiki/Query_string) das solicitações no primeiro argumento e retorna um html que será printado 🤔.  
Exemplo:

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

## Debug 👾

Esse projeto tem suporte ao debugger do VS Code, basta pressionar F5 e selecionar a opção "Attach to a running server". **OBS**: Você deve primeiro executar o comando `yarn run dev` em um terminal separado.

## Hospedagem 🌎

Pode ser hospedado em qualquer servidor que aceite Node, como por exemplo o Heroku. Lembrando que é necessário a compilação dos códigos typescript.
> No caso do Heroku é necessário usar um [buildpack](https://github.com/jontewks/puppeteer-heroku-buildpack) para o puppeteer funcionar normalmente. Se você escolher outro serviço, terá que checar manualmente se ocorre algum problema.  O botão abaixo configura automaticamente o ambiente pra você.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/httpiago/generate-dynamic-images/tree/master)

## Exemplos de uso 💡

-  Automatizar a criação de thumbnails para vídeos do YouTube ou seu blog.
-  Automatizar a criação de imagens para serem compartilhadas nas redes sociais pro designer da empresa não ter que fazer manualmente.
-  Criar uma variação de um logotipo para um evento sazonal.
-  Personalizar a foto de perfil do usuário (cortar, adicionar um ícone/distintivo no canto, ...).
-  Edição de fotos usando [css filters](https://css-tricks.com/almanac/properties/f/filter/) (Por que não?).
-  Usando o [GitHub Webhooks](https://developer.github.com/webhooks/) é possível criar um serviço que automaticamente detecta uma nova [release em um repo](https://github.com/httpiago/generate-dynamic-images/releases)  e [publica um tweet](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update) com uma imagem personalizada (com o número da versão, destaques, ...) anunciando a nova versão.
-  As possibilidades são infinitas!

## Inspirações 💭

Inspirado [nesse repositório](https://github.com/styfle/og-image).

## License 📜

MIT
