# Trivia

![Preview do Trivia](./trivia.jpg)

O Trivia é um jogo de perguntas e respostas onde você pode testar seus conhecimentos em variados tipos de categorias. Responda perguntas desafiadoras e veja quantos pontos você consegue obter!

## Funcionalidades

- Responder perguntas de diferentes categorias.
- Testar seus conhecimentos em diversos assuntos.
- Obter pontuações com base nas respostas corretas.

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- React
- React Router (para navegação)
- Redux (para gerenciamento de estado)
- Jest (para testes)
- React Testing Library (para testes)

## Pré-requisitos

Certifique-se de que você tenha a versão 16 ou 18 do Node.js instalada em seu sistema antes de executar o projeto.

## Como Executar o Projeto

Siga os passos abaixo para executar o projeto em sua máquina local:

1. Faça o clone deste repositório em um diretório de sua preferência utilizando o seguinte comando:

```
git clone git@github.com:albertoflorence/trivia.git
```

2. Navegue até o diretório do projeto:

```
cd trivia
```

3. Instale as dependências necessárias executando o seguinte comando:

```
npm install
```

4. Com todas as dependências instaladas, agora você pode iniciar o aplicativo usando o seguinte comando:

```
npm start
```

O aplicativo será iniciado em modo de desenvolvimento e estará acessível em [http://localhost:3000](http://localhost:3000).

## Como Executar os Testes

O projeto utiliza o Jest e o React Testing Library para os testes. Para executar os testes, você pode usar o seguinte comando:

```
npm test
```

Isso iniciará a execução dos testes automatizados e você verá os resultados no console.

## Estrutura do Projeto

Aqui está uma breve visão geral da estrutura de pastas do projeto:

```
trivia/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── redux/
  │   ├── utils/
  │   ├── App.js
  │   ├── index.js
  │   └── ...
  ├── public/
  │   ├── index.html
  │   └── ...
  ├── package.json
  ├── README.md
  └── ...
```

- A pasta `src` contém todos os arquivos do código-fonte do aplicativo.
- `components` e `pages` contêm os componentes React utilizados no aplicativo.
- `reducers` e `actions` contêm o gerenciamento de estado através do Redux.
- `utils` contém funções auxiliares utilizadas no projeto.
- `App.js` é o componente raiz do aplicativo que controla a estrutura geral da aplicação.
- `index.js` é o ponto de entrada do aplicativo, onde ele é renderizado na página HTML.
- A pasta `public` contém arquivos estáticos, como o arquivo `index.html`, que é a página base do aplicativo.

Sinta-se à vontade para explorar e modificar o código conforme suas necessidades.
