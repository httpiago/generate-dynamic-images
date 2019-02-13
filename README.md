# generate-dynamic-images 🤖

Um simples programa em Node que automatiza o processo de criação de imagens dinâmicas usando HTML e o Google Chrome em modo _headless_.

![](https://img.shields.io/badge/-HYPE%20ALERT!%20😂-red.svg) 
[![Online demo](https://img.shields.io/badge/Online-demo-brightgreen.svg)](https://generate-dynamic-images.herokuapp.com/?template=default&title=Hello%20Github%20user!&emoji=%F0%9F%9A%80%F0%9F%8C%8E)

## Pacotes usados 📦

- [puppeteer](https://www.npmts.com/package/puppeteer): Para manipular o G Chrome em modo _headless_.
- [micro](https://www.npmts.com/package/micro): Criar um simples servidor http.
- [typescript](https://www.npmts.com/package/typescript): Fazer a tipagem do código.
- [emojiOne](https://www.emojione.com/): Para renderizar os emojis nos templates.
- [concurrently](https://www.npmts.com/package/concurrently): Executar vários comandos em paralelo.
- [nodemon](https://www.npmts.com/package/nodemon): Restartar o servidor quando ocorrer uma alteração.

## Comandos 🤓

- `yarn run build` e `yarn run watch`: Compilar os códigos typescript.
- `yarn run start`: Iniciar o servidor (com os códigos compilados) na porta 3000.
- `yarn run dev`: Executa em paralelo os comandos "build" e "start" junto com o nomemon, para que o servidor se auto reiniciei quando ocorrer qualquer alteração de código (Veja também a sessão abaixo).

## Debug 👾

Esse projeto está configurado para rodar o debugger do VS Code, basta pressionar F5 e selecionar a opção "Attach to a running server".

**OBS**: Necessita que o comando `yarn run dev` seja executado antes em um terminal separado.

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

### Opções padrões de personalização

| Opção | Valores aceitos | Valor padrão | Opcional | Descrição |
|-------------|---|---|---|---|
| template    | Nome de algum arquivo na pasta "[templates](/templates)". | null | Não | Template a ser usado para a criação da imagem. |
| type        | "jpeg" ou "png" | jpeg | Sim | Mime type da imagem. |
| quality     | 0-100 | 90 | Sim | Qualidade do resultado (OBS: Só funciona se o type for "jpeg"). |
| transparent | true ou false | false | Sim | Use essa opção para remover o fundo da página (OBS: Só funciona se o type for "png" e se o template não conter um fundo também). |

#### Outros valores para personalizar a imagem em si (como "title", "withImage", ...) variam de acordo com o template. Veja as opções disponíveis para cada arquivo da pasta "[templates](/templates)".

## Templates 📚

Templates nada mais são do que um arquivo .ts que exporta por padrão uma função assíncrona pura que recebe as opções definidas no [query string](https://en.wikipedia.org/wiki/Query_string) das solicitações no primeiro argumento e retorna um html que será printado 🤔.  
Exemplo:

#### templates/FILE_NAME.ts:

```ts
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

## Hospedagem 🌎

Pode ser hospedado em qualquer servidor que aceite Node, como por exemplo o Heroku. Lembrando que é necessário a compilação dos códigos typescript.
> No caso do Heroku é necessário usar um [buildpack](https://github.com/jontewks/puppeteer-heroku-buildpack) para o puppeteer funcionar normalmente. Se você escolher outro serviço, terá que checar manualmente se ocorre algum problema.  O botão abaixo configura automaticamente o ambiente pra você.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/httpiago/generate-dynamic-images/tree/master)

## Inspirações 💭

Inspirado [nesse repositório](https://github.com/styfle/og-image).

## License 📜

MIT
