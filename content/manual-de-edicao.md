+++
title = "Manual de Edição"
description = "Esta é uma wiki estática baseada no framework Hugo e alavancada no Github, e por isso o processo de edição é bastante diferente do das wikis tradicionais. Segue abaixo um manual explicando como funciona, como editar e as práticas exigidas."
+++
EM CONSTRUÇÃO 

Esta é uma wiki estática baseada no framework [Hugo](https://gohugo.io/) e alavancada no [Github](https://github.com/), e por isso o processo de edição é bastante diferente do das wikis tradicionais. Segue abaixo um manual explicando como funciona, como editar, as regras e as guidelines.

{{< toc >}}

## Regras
* Não adicione conteúdo que viole a lei brasileira.
* Não faça apologia à violência e nem à nenhuma outra atividade ilegal.
* Não crie páginas a respeito de pessoas menores de 18 anos.
* Não crie uma página sobre você mesmo.
* Não faça edições maliciosas contra incels.
* Não crie páginas que já não estejam na [Incel Wiki](https://incels.wiki).
* Não use apenas tradutores automáticos. Se usar algum, faça o polimento da fluência e verifique se o sentido do texto original foi mantido.

## Guidelines
* Evite remover grandes quantidades de texto.
* Artigos ficam na pasta `artigos`.
* Páginas simples ficam na pasta `content`.
* Quando for criar uma nova página, nomeie o arquivo com o título do artigo em letras minúsculas, sem acentos, sem "Ç" e com hífens no lugar dos espaços. Isso é necessário porque o nome do arquivo vai ser a [slug](https://pt.m.wikipedia.org/wiki/Slug_(programa%C3%A7%C3%A3o)) da página.
* Quando precisar linkar uma página interna da wiki que ainda não existe, se refira à futura URL da página seguindo a regra citada acima. Por exemplo, a futura URL do artigo "Love Shyness" seria "/artigos/timidez-amorosa". Quando for fazer isso, olhe se a mesma página já foi linkada em outro artigo e se refira à mesma URL linkada lá, de forma a manter a coerência e o funcionamento da wiki. Entretanto, alguns títulos de artigos não devem ser traduzidos, ou porque o termo já é popularizado como estrangeirismo no português, ou simplesmente porque não existe tradução direta.
* Não traduza com tradutores automáticos.
* Sempre coloque o índice no mesmo lugar do artigo original.

## Organização de arquivos
Abaixo está a estrutura de pastas do site, localizada no [nosso repositório do Github](https://github.com/aUnuser/Incel-Wiki-Brasil). As que nos interessam agora são a `/assets` e a `/content`. Dentro da pasta `/content` ficam todas as páginas do site, e na pasta `/content/artigos` ficam especificamente os artigos. As páginas que ficam fora da pasta `/content/artigos` são páginas que não são artigos. Dentro da pasta `/assets/imagens` ficam todas as imagens utilizadas nas páginas.
```
├───assets
│   └───imagens
├───content
│   ├───artigos
│   │   ├───denise-donelly.md
│   │   ├───efeitos-adversos-da-incelidade.md
│   │   ├───incel.md
│   │   └───perguntas-frequentes-sobre-a-incelidade.md
│   ├───_index.md
│   ├───aviso-legal.md
│   ├───manual-de-contribuicao.md
│   └───sobre.md
├───data
├───public
├───resources
├───static
└───themes
```

## Criando uma página
![O que é slug?](imagens/o-que-e-slug.jpg "dr")

1. Crie um arquivo `.md` dentro da pasta `/content` ou da `/content/artigos`.
2. O nome do arquivo **deve** ser o nome da página, mas com todas as letras minúsculas, sem acentos, sem "ç" e com hífens no lugar dos espaços. A razão disso é que o nome do arquivo será a *slug* da página.
3. Dentro do arquivo em branco, insira a *frontmatter*.
4. Preencha a frontmatter.

## Estrutura de uma página
### Frontmatter
Frontmatter é o conjunto de dados de um arquivo `.md`. Todos os artigos `.md` devem tê-la. Ela usa a sintaxe [TOML](https://pt.frwiki.wiki/wiki/TOML), sempre com três "`+`" em cima e três embaixo:
{{< highlight toml "linenos=inline" >}}
+++
title = "Título do artigo"
categorias = [ "Categoria 1", "Categoria 2" ]
description = "Descrição. Pode ser o primeiro parágrafo do artigo, porém sem markdown."

# Título e link do artigo original.
[artigo_original]
title = "Denise Donelly"
link = "https://incels.wiki/w/Denise_Donnelly"

# Dados da personalidade do artigo (opcional).
[personalidade]
nome = "Denise Donelly"
foto = ""
foto_desc = ""
[[personalidade.meta]]
nascimento = "?"
morte = ""
ocupacao = "Acadêmica"
alma_mater = """
* Florida University
* University of New Hampshire
"""
campo = "Sociologia"
+++
{{< / highlight >}}
### Conteúdo
O conteúdo é escrito com [Markdown](https://docs.pipz.com/central-de-ajuda/learning-center/guia-basico-de-markdown#open)
* Observações:
  * Nunca use o título 1 nas páginas.
  * As imagens devem ser escritas da seguinte forma, incluindo sempre o "dr": `![Legenda da imagem](imagens/nome-da-imagem.jpg "dr)`.