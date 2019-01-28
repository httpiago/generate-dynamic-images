# generate-image

Um simples servidor que gera imagens usando HTML.

[Inspirado nesse repositório](https://github.com/styfle/og-image)

## Workflow

- O client faz uma requisição ao servidor.
- O servidor pega as informações da solicitação e cria um html simples.
- O html é salvo em um arquivo temporário.
- O servidor lança uma instância do Chrome usando o puppeteer e tira um screenshot do html salvo no item anterior.
- O servidor retorna a imagem do print ao client

## Pacotes usados

- [puppeteer-core](https://www.npmjs.com/package/puppeteer-core)
- [micro](https://www.npmjs.com/package/micro)
- [create-html](https://www.npmjs.com/package/create-html)

## Hospedagem

Tentar hospedar no Now igual ao og-image
