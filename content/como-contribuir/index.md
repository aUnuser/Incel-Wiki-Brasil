+++
title = "Como contribuir"
description = ""
+++
Esta é uma wiki estática baseada no framework [Hugo](https://gohugo.io/) e alavancada no [Github](https://github.com/), e por isso o processo de edição é bastante diferente do das wikis tradicionais. Segue abaixo um guia explicando como funciona e como editar.

{{< toc >}}

## O que é o Hugo
Hugo é um *static site generator* (SSG). Isto é, ele funciona gerando um conjunto de arquivos HTML a partir de um conjunto de arquivos [Markdown](https://pt.wikipedia.org/wiki/Markdown) e de templates. Dessa forma, o site é exibido no navegador e não envia informações de volta ao servidor. Um site que funciona dessa forma se chama um site *estático*.

Isso significa que o processo de edição é mais complicado do que o das wikis tradicionais, mas em compensação tem uma série de vantagens em relação à elas, como por exemplo baixo custo e rápido carregamento de páginas.

## Organização de conteúdo do Hugo
```
https://github.com/aUnuser/Incel-Wiki-Brasil
├───config
├───content
│   ├───_index.md
│   ├───aviso-legal
│   │   └───index.md
│   ├───como-contribuir
│   │   └───index.md
│   ├───sobre
│   │   └───index.md
│   └───artigos
│       ├───_index.md
│       ├───efeitos-adversos-da-incelidade
│       │   ├───index.md
│       │   └───imagens
│       └───incel
│           ├───index.md
│           └───imagens
├───data
├───public
├───resources
├───static
└───themes
```
Para facilitar o entendimento, organizei a explicação em pontos:
1. No diagrama acima está a estrutura de pastas que guarda todos os arquivos do site. O que importa para nós agora é a pasta `content`.
2. Dentro da pasta `content` vivem um arquivo chamado `_index.md` e algumas pastas, e dentro de cada pasta existem outros arquivos, chamados `index.md`(sem o underline "_").
3. Toda pasta que possui um arquivo `index` é uma página no site, onde seu conteúdo está escrito no arquivo `index`. Podemos pensar no `index` como se fosse a "cabeça" da página.
4. Se o `index` de página X é precedido por um underline "_", significa que existem outras páginas debaixo dessa página X na hierarquia. Ou seja, significa que essa página X é uma *seção*.
5. A pasta `content` então é uma página que abriga todas as outras páginas do site, ou uma seção. O seu `_index.md` possui o conteúdo da [página inicial do site](/).
6. Como pode ser visto no diagrama, a pasta `content` possui dentro de si as seguintes pastas: (1)`aviso-legal`, (2)`como-contribuir`, (3)`sobre` e (4)`artigos`.
7. As pastas 1, 2 e 3 possuem dentro de si um `index.md`, sem o underline "_". Ou seja, estas pastas são páginas simples.
8. A pasta `artigos` possui dentro de si outras páginas e um arquivo `_index.md`, o que significa que ela também é uma seção. Nesse caso, ela é a sessão que abriga os artigos da wiki.
9. Dentro da pasta `artigos` existem várias pastas, cada uma contendo um `index.md`. Ou seja, os artigos da wiki são páginas simples.
10. Dentro da pasta de cada artigo existe uma pasta `imagens`, onde vivem as imagens usadas no artigos.
11. Usando a terminologia oficial do Hugo, cada pasta que possui um `_index.md` é um "galho" (branch), e cada uma que possui um `index.md` sem underline "_" é uma "folha" (leaf).
12. Para editar o conteúdo de uma página, edite o seu `index`.
13. Para criar uma página, crie no lugar apropriado de `content` uma pasta nomeada com o nome da página sem acentos, com hífens no lugar de espaços e sem letras maiúsculas, e então crie um arquivo `index` dentro dela.
14. Os arquivos `index` possuem a extensão `.md`, o que significa que são arquivos markdown.

## Trabalhando com arquivos Markdown
[Em construção]

## Editando pelo Github no navegador
[Em construção]