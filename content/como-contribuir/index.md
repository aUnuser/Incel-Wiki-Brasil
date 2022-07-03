---
title: "Incel Wiki Brasil: Como Contribuir"
description:
---
1. Familiarize-se com o Github (pode ser usado totalmente no browser).
2. Familiarize-se com a organização de conteúdo do framework: [Content Organization](https://gohugo.io/content-management/organization/).
3. Crie uma pasta em `/content/w/` com o nome do artigo, sem acentos e com palavras separadas por hífen (ex: nome-do-artigo).
4. Crie um arquivo chamado `index.md` dentro dela.
5. Se for usar imagens, crie uma pasta chamada images ao lado do `index.md` e as coloque lá.
6. Dentro do `index.md` copie e cole a chamada *frontmatter*: 
    ```
    +++
    title = "Título"
    categorias = [ "Categoria 1", "Categoria 2" ]
    description = "Primeiro parágrafo do artigo, sem markdown."

    [original_article]
    title = "Incel"
    link = "https://incels.wiki/w/Incel"
    +++
    ```
7. Preencha a frontmatter com os dados do artigo a ser criado e do artigo a ser traduzido.
8. Traduza o artigo abaixo da frontmatter.
9. Se for incluir um índice, coloque "`{{</* toc */>}}`" no local onde fica o índice no artigo original.