<img src="public/images/logo.png"  width="350">

Dostawa é um projeto completo voltado para construção de APIs REST que agrega em sua espinha dorsal várias bibliotecas e frameworks indispensáveis no processo de construção de APIs profissionais.

## O que este projeto contém?

A raiz deste projeto contém os arquivos necessários para configuração e inicialização do **Docker Container** em `Dockerfile` e `docker-compose.yml` e **Versionamento Semântico** para controle de versões (tags) no GIT. O repositório **GIT** deve conter apenas os arquivos fonte do projeto e os necessários a sua configuração, os demais deverão ser ignorados inserindo suas referencias em `.gitignore`. O arquivo `.gitlab-ci-yml` é responsável pelas configurações de **CI** (Integração Contínua), recurso utilizado para subir as versões em ambientes sem a necessidade de gerar manualmente o WAR, dist e outros para os subir em servidores web.

## Principais bibliotecas/frameworks

*  [NodeJS](https://nodejs.org/en/)
*  [ExpressJS](https://expressjs.com/pt-br/)
*  [Sequelize (ORM)](https://sequelize.org/)
*  [Mongoose](https://mongoosejs.com/)
*  [JWT](https://jwt.io/)
*  [OneSignal](https://onesignal.com/)
*  ES7 (ECMAScript 7)

## Estrutura do diretório
```
./
|-- config/ # Configurações gerais do ExpressJS 
|-- lib/ # Configurações de bibliotecas utilizadas no framework
|-- public/ # Diretório de conteúdo público, como: css, js, html, etc
|-- src/ # Priincipal diretório da API
    |-- controllers/ # Classes com os métodos que serão chamados pela rota
    |-- models/ # Modelo de dados (Domain)
    |-- repositories/ # Classes com as regras de negócio
    |-- routes/ # Classes com as rotas da API
    |-- app.js
|-- test/
|-- views/
|-- .babelrc
|-- .env.example # Arquivo exemplo com variaveis de ambiente para o projeto, deve ser alterado e renomeado para .env
|-- .eslintrc
|-- .gitignore
|-- .gitlab-ci.yml
|-- Dockerfile
|-- LICENCE
|-- README.md
|-- docker-compose.yml
|-- packge.json
|-- start.sh
```

## Como instalar
`npm install`

## Como iniciar

1. Configure o banco, preferencialmente MySQL ou MariaDB;
3. Criar o arquivo `.env` com base no arquivo `.env-example`;
4. Rode a aplicação com `npm run start`. O serviço responde em `http://localhost:3000/`
5. No seu SGBD, exceute o script abaixo para popular as tabelas de cadastros básicos:

```
INSERT INTO plans (id, name, price, active, created_at, updated_at) 
    VALUES(1, 'Grátis', 0.00, 1, '2020-07-03 11:20:00.000', '2020-07-03 11:20:00.000');
INSERT INTO profiles (id, name, description, active, created_at, updated_at, pai_id) 
    VALUES(1, 'Administrador', NULL, 1, '2020-07-03 11:21:00.000', '2020-07-03 11:21:00.000', NULL);
```
5. Para acessar os recursos da API, crie um conta fazendo um POST em createAccount, conforme abaixo:
 
```
POST /createAccount

{
	"email": "<SEU_EMAIL>",
	"pass": "<SENHA>",
	"name": "<NOME>",
	"genre": "<SEXO (M)MASCULINIO (F)FEMININO>",	
	"plan_id": <ID DO PLANO INSERIDO>
}
```
>  A senha deve ser convertida em MD5. Por exemplo, para a senha 123456 informe e10adc3949ba59abbe56e057f20f883e

>  Após criar a conta é necessário retornar ao SGBD e na tabela `users` alterar o valor do atributo `active` para 1.

## Passo-a-passo para criar novas rotas

1.  Criar a classe model/domain em `models/` ([DataTypes Sequelize](https://sequelize.org/master/manual/model-basics.html#data-types);)
2.  Criar a classe repository em `repositories/`;
3.  Criar a classe controller em `controllers/`;
4.  criar a classe route em `routes/`;
5.  Na classe `lib/SequelizeDB.js` importe e inicialize o modelo
```
import Teste from  '../src/models/Teste'

...

// Init Models
const models = {
    ...
    Teste: Teste.init(sequelize, Sequelize)
}
```
6.  Na classe `src/app.js` importe e inicialize a rota
```
...
import TesteRoute from './routes/TesteRoute'
...
app.use('/testes', checkJWT, TesteRoute)
```
7. Be Happy

>  Siga o mesmo padrão dos arquivos, nomenclaturas e estruturas já existentes, fica mais fácil colocaborar onde todos seguem o mesmo padrão.

## Faça parte e Contribua!
Faça parte desse projeto, contribua! Teste, agregue novas funcionalidades e recursos. USE!