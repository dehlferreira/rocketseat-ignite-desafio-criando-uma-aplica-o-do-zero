<p align="center">
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-pré-requisitos">Pré-Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-configuração">Configuração</a>&nbsp;&nbsp;&nbsp;
  <br>
  <a href="#-instalando-dependências">Instalando dependências</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-iniciando-aplicação">Iniciando aplicação</a>&nbsp;&nbsp;&nbsp;

</p>

<br>

<h1 align="center">
  Space Traveling
</h1>

![home](.github/assets/home.png?style=flat)
![post](.github/assets/post.png?style=flat)

## 💻 Projeto

Este projeto foi desenvolvido para entrega do desafio do Ignite da Rocketseat. Tem como objetivo criar um blog do zero a partir de um layout disponibilizado, utlizando as tecnologias Next.JS integrando com o Prismic CMS, que faz o gerenciamento dos conteúdos que são postados no blog. Usamos também o modo Preview do Prismic CMS, que permite visualizar o post antes de ser publicado em produção. Utilizamos também o Utteranc, que disponibiliza uma área de comentários igual ao que é usado nas Issues do Github. Inclusive os comentários são armazenados nas próprias Issues do repositório do projeto.

Para visualizar a aplicação clique no link [space traveling](https://space-traveling.andrelf.dev)

<br>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Typescript](https://www.typescriptlang.org/docs/)
- [ReactJS](https://reactjs.org/docs/hello-world.html)
- [NextJS](https://nextjs.org/)
- [Prismic CMS](https://prismic.io/)
- [Utteranc](https://utteranc.es/)

<br>

## 🔖 Layout

No link abaixo você encontra o layout do projeto web. Lembrando que você precisa ter uma conta no [Figma](http://figma.com/) para acessá-lo.

- [Layout](https://www.figma.com/file/RgopQ8mTgJX8g8zXVJFo7M/Desafios-M%C3%B3dulo-3-ReactJS-(Copy)?node-id=17%3A2)

<br>

## ⚙ Pré-Requisitos

- [Node](https://nodejs.org/pt-br/)
- [Yarn](https://yarnpkg.com/getting-started)

<br>

## ⚙ Rodando a aplicação localmente
### ⚙ Configuração

No terminal clone o projeto para o diretório desejado:

```
git clone https://github.com/dehlferreira/rocketseat-ignite-desafio-criando-uma-aplica-o-do-zero.git
```

### ⚙ Instalando dependências

Para instalar, acesse o diretório onde você clonou o projeto:

```
cd rocketseat-ignite-desafio-criando-uma-aplica-o-do-zero
```

Instale as dependências:

```
yarn install
```

### ▶ Iniciando aplicação

Ainda no diretório do projeto, execute o comando no terminal:

```
yarn dev
```
Agora abra o navegador e copie o link a baixo:

```
http://localhost:3000/
```


Crie um arquivo .env.local na raiz do projeto e insira as variáveis de ambiente.
É necessário ter uma conta configurada no Prismic CMS.

```cl
PRISMIC_API_ENDPOINT=
PRISMIC_ACCESS_TOKEN=
```
<br>

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo de [LICENÇA](https://github.com/GBDev13/space-traveling/blob/master/LICENSE) para detalhes.

---

Feito com ❤️  por André Luiz Ferreira
