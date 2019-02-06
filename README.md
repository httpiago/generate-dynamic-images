# puppeteer-generate-image

Um simples servidor em Node que automatiza o processo de criação de imagens dinâmicas usando HTML.

#### [Inspirado nesse repositório](https://github.com/styfle/og-image) • [Online demo](https://puppeteer-generate-image-ee5mis3oh.now.sh?title=Hello%20Github%20user!)

## Pacotes usados

- [TypeScript](https://www.npmjs.com/package/typescript)
- [puppeteer-core](https://www.npmjs.com/package/puppeteer-core)
- [micro](https://www.npmjs.com/package/micro)
- [create-html](https://www.npmjs.com/package/create-html)

## Fluxograma

![Fluxograma do processo](/fluxograma.jpeg)


## Exemplo de solicitação

Você deve passar as opções que o arquivo "/src/generate-html.ts" irá receber através do _query string_ do url, veja o exemplo abaixo:

```
curl http://localhost:3000?title=Custom%20title
```

#### Resposta:

```
Status: 200 OK
Content-Type: image/jpeg
Content-Length: *
Cache-Control: public, immutable, no-transform, max-age=31536000
```

## Hospedagem

Pode ser hospedado em qualquer servidor que aceite Node e que tenha suporte ao Chrome, como o [now](https://zeit.co/now), AWS Lambda e Google Cloud Functions.  
Caso contrário será necessário substituir o pacote "puppeteer-core" pelo "puppeteer" que faz o download da versão mais recente do Chromium durante a instalação dos pacotes. [Ler mais sobre diferenças entre os dois](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteer-vs-puppeteer-core).

> OBS: Os arquivos typescripts devem ser compilados usando o comando "build", configure isso no seu serviço de hospedagem ou compile antes de fazer o deploy.

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/httpiago/puppeteer-generate-image)

## License

MIT
