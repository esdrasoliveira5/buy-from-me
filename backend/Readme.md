# buy-from-me-backend

## Sumário

- [Descrição](#Descrição)
- [Pré-requisitos](#Pre-requisitos)
  - [Instalação](#Instalação)
  - [Instruções para iniciar o projeto](#Intruções-para-iniciar-o-projeto)
- [Documentação](#Documentação)
  - [Verificar o estado da Api](#Verificar-o-estado-da-Api)
  - [Registrar usuário](#Registrar-usuário)
  - [Atualizar usuário](#Atualizar-usuário) 
  - [Deletar usuário](#Deletar-usuário)
  - [Buscar usuário](#Buscar-usuário)
  - [Criar categoria](#Criar-categoria)
  - [Listar todas as categorias relacionadas ao usuário](#Listar-todas-as-categorias-relacionadas-ao-usuário)
  - [Adiciona um game a coleção](#Adiciona-um-game-a-coleção)
  - [Atualiza a categoria de uma coleção](#Atualiza-a-categoria-de-uma-coleção)
  - [Deleta um game de uma coleção](#Deleta-um-game-de-uma-coleção)
  - [Lista uma coleção](#Lista-uma-coleção)
  - [Lista todas as coleções de um usuário](#Lista-todas-as-coleções-de-um-usuário)
  - [Lista todas as coleções de um usuário pela categoria](#Lista-todas-as-coleções-de-um-usuário-pela-categoria)


<br>

## Descrição

**Objetivo**: Este projeto, foi desenvolvido uma CRUD que gerencia dados de umusuario em um site de catalogo dee games, no formato de uma API RESTful, utilizando Typescript.

- Arquitetura REST;
- Autenticações e Permissões com JWT;
- Cryptografia de senha com bcrypt
- Banco de Dados PostgreSQL;
- Docker

## Pré-requisitos

- `npm version 6.14.13`
- `node version 14.17.0`
- `docker`
- `docker-compose`

## Instalação

- Clone o repositório
  ```sh
    git clone git@github.com:esdrasoliveira5/game-library-backend.git
- Vá para a pasta da aplicação
  ```sh
    cd game-library-backend

## Instruções para iniciar o projeto

<br>

- Comando para iniciar

  ```sh
    sudo docker-compose up

- Instalar dependencias

  ```sh
    npm install

- Configurar prisma client

  ```sh
    npx prisma generate

- Gerar bacno de dados

  ```sh
    npx prisma migrate dev

<br/>

## Documentação

<br/>

### **Logar usuário** 
##### `GET` /user/:id
  <br/>

  Esse endpoint retorna um usuario.

  - Exemplo `response body`
    ```json
      {
          "id": "e0805cfe-377e-4035-858c-7c9591b54683",
          "name": "Pedro",
          "lastName": "Vendedor",
          "email": "pedros@email.com",
          "password": "$2b$10$lG55yVCIP/AbhwBh.xmWLe8Q43gs27K6q2idJxr96YJA5odwMuYYK",
          "contact": 1058685717,
          "addressId": 8,
          "address": {
              "id": 8,
              "street": "Avamarela",
              "number": "500A",
              "district": "Santa Barbara",
              "zipcode": 321654000,
              "city": "Santa Avamarela",
              "statesId": 1
          }
      }
    ```
  <br/>

### **Logar usuário** 
##### `POST` /user/login
  <br/>

  Esse endpoint retorna um usuario e um token.

  - Exemplo `request body` 
    ``` json
      {
        {
            "email": "pedros@email.com",
            "password": "123456789asd"
        }
      }
    ```

  - Exemplo `response body`
    ```json
      {
          "user": {
              "id": "e0805cfe-377e-4035-858c-7c9591b54683",
              "name": "Pedro",
              "email": "pedros@email.com",
          },
          "token": "(bearer token)"
      }
    ```
  <br/>

### **Registrar usuário**
##### `POST` /user
<br/>

  Esse endpoint registra e retorna um usuario.

  - Exemplo `request body` 
    ``` json
        {
            "name": "Pedro",
            "lastName": "Vendedor",
            "email": "pedros@email.com",
            "password": "123456789asd",
            "contact": 31123456789,
            "street": "Avamarela",
            "number": "500A",
            "district": "Santa Barbara",
            "zipcode": 321654000,
            "city": "Santa Avamarela",
            "statesId": 1
        }
    ```

  - Exemplo `response body`
    ```json
        {
            "id": "e0805cfe-377e-4035-858c-7c9591b54683",
            "name": "Pedro",
            "lastName": "Vendedor",
            "email": "pedros@email.com",
            "password": "$2b$10$lG55yVCIP/AbhwBh.xmWLe8Q43gs27K6q2idJxr96YJA5odwMuYYK",
            "contact": 1058685717,
            "addressId": 8,
            "address": {
                "id": 8,
                "street": "Avamarela",
                "number": "500A",
                "district": "Santa Barbara",
                "zipcode": 321654000,
                "city": "Santa Avamarela",
                "statesId": 1
            }
        }
    ```
<br/>

### **Atualizar usuário**
##### `PUT` /user/:id
  <br/>

  Este endpoint atualiza e retorna os dados de um usuário.

  *Obs: Apenas o usuário autorizado pode atualizar.* 
  *Obs2: Os campos email, id e addressId nao podem ser atualizados.* 

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```
  - Exemplo `request body` 
    ``` json
      {
          "name": "Pedro",
          "lastName": "Cinza",
          "password": "123456789asd",
          "contact": 31123456789,
          "street": "Azul",
          "number": "800C",
          "district": "Sao Paulo",
          "zipcode": 321654000,
          "city": "Salazedo",
          "statesId": 2
      }
    ```

  - Exemplo `response body`
    ```json
      {
          "id": "7e49fec8-f187-4b44-a9b4-a14e77adbb27",
          "name": "Pedro",
          "lastName": "Cinza",
          "email": "pedros@email.com",
          "password": "$2b$10$bQPteH3jeI3ZkdvGTGvcGOVhM1a6RTU5n4WHH4PaNQDsEyzde9uqy",
          "contact": 1058685717,
          "addressId": 7,
          "address": {
              "id": 7,
              "street": "Azul",
              "number": "800C",
              "district": "Sao Paulo",
              "zipcode": 321654000,
              "city": "Salazedo",
              "statesId": 2
          }
      }
    ```
  <br/>

### **Deletar usuário**
##### `DELETE` /user/:id
  <br/>

  Esse endpoint deleta um usuário cadastrado.

  *Obs: Apenas o usuário autorizado pode deletar.* 

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```
      
  - Exemplo `response body`
    ```json
      {
          "message": "user deleted"
      }
    ```
  <br/>




### **Buscar produto**
##### `GET` /product/:id
  <br/>

  Esse endpoint busca e retorna um produto pelo id.
  
  - Exemplo `response body`
    ```json
      {
          "id": 1,
          "name": "TV",
          "description": "FullHd",
          "price": 1500,
          "sold": false,
          "new": false,
          "categoriesId": 12,
          "usersId": "1"
      }
    ```
  <br/>

### **Buscar produtos**
##### `GET` /product?page=1
  <br/>

  Esse endpoint retorna uma lista de 20 produtos por pagina.

  - Exemplo `request body` 
    ```json
      {
          "name": "categorie1"
      }
    ```
    
  - Exemplo `response body`
    ```json
      [
          {
              "id": 1,
              "name": "TV",
              "description": "FullHd",
              "price": 1500,
              "sold": false,
              "new": false,
              "categoriesId": 12,
              "usersId": "1"
          },
          {
              "id": 2,
              "name": "Celular",
              "description": "Ifome",
              "price": 2500,
              "sold": false,
              "new": false,
              "categoriesId": 15,
              "usersId": "2"
          },
          {
              "id": 3,
              "name": "TV2",
              "description": "FullHd2",
              "price": 1800,
              "sold": false,
              "new": false,
              "categoriesId": 12,
              "usersId": "2"
          },
          ....
      ]
      ```
  <br/>

### **Listar todas as categorias relacionadas ao usuário**
##### `GET` /product/filter?pag=1&filter=gte&price=1500&sold=false&newP=false&category=12&name=tv
  <br/>

  Esse endpoint lista todos os produtos em paginas de 20 resultados filtrando pelas querys.
  
  *Obs: Retorna apenas as categorias criadas pelo usuario.* 
  *Obs1: Todos os filtros sao opcionais e podems ser usados em qualquer combinação.* 
  *Obs2: O filtro filter pode ser nos valores gte e lte, sendo gte produtos com o preço maior ou igual ao valor de price, e lte menor ou igual ao valor de price.* 

  - Exemplo `response body`
    ```json
        [
          {
              "id": 1,
              "name": "TV",
              "description": "FullHd",
              "price": 1500,
              "sold": false,
              "new": false,
              "categoriesId": 12,
              "usersId": "1"
          },
          {
              "id": 2,
              "name": "TV 29",
              "description": "LCD",
              "price": 2500,
              "sold": false,
              "new": false,
              "categoriesId": 12,
              "usersId": "2"
          },
        ]
    ```
  <br/>
  
### **Cria um produto**
##### `POST` /product
  <br/>

  Esse endpoint cria um produto.

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `request body` 
    ```json
      {
          "name": "Computador Gamer",
          "description": "RGB e RTX3090",
          "price": 10000,
          "categoriesId": 1,
          "usersId": "e0805cfe-377e-4035-858c-7c9591b54683",
          "newProduct": true
      }
      ```
    
  - Exemplo `response body`
    ```json
      {
          "id": 17,
          "name": "Computador Gamer",
          "description": "RGB e RTX3090",
          "price": 10000,
          "sold": false,
          "new": true,
          "categoriesId": 1,
          "usersId": "e0805cfe-377e-4035-858c-7c9591b54683"
      }
      ```
  <br/>

  
### **Atualiza um status de um produto**
##### `PUT` /product/:id/sold
  <br/>

  Esse endpoint atualiza o status sold de um produto.

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `response body`
    ```json
      {
          "id": 17,
          "name": "Computador Gamer",
          "description": "RGB e RTX3090",
          "price": 10000,
          "sold": true,
          "new": true,
          "categoriesId": 1,
          "usersId": "e0805cfe-377e-4035-858c-7c9591b54683"
      }
      ```
  <br/>

  
### **Atualiza os dados de um produto**
##### `PUT` /product/:id
  <br/>

  Esse endpoint atualiza os dados de um produto.

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `request body` 
    ```json
        {
          "name": "Computador Gamer",
          "description": "RGB e RTX3090",
          "price": 15000,
          "categoriesId": 12,
          "newProduct": false
        }
      ```

  - Exemplo `response body`
    ```json
      {
          "id": 17,
          "name": "Computador Gamer",
          "description": "RGB e RTX3090",
          "price": 15000,
          "sold": false,
          "new": false,
          "categoriesId": 12,
          "usersId": "e0805cfe-377e-4035-858c-7c9591b54683"
      }
      ```
  <br/>


### **Deleta um produto**
##### `DELETE` /product/:id
  <br/>

  Esse endpoint deleta um produto.

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `response body` 
    ```json
      {
          "message": "product deleted"
      }
      ```
  <br/>



### **Lista todas as coleções de um usuário**
##### `GET` /collections/user/:page
  <br/>

  Esse endpoint retorna todas as coleções que pertencem ao usuario do token em paginas de até 20 objetos.

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `response body`
    ```json
      [
          {
              "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
              "gamesId": 12345,
              "categoriesId": 3,
              "games": {
                  "id": 12345,
                  "name": "game1",
                  "image": "image"
              }
          },
          {
              "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
              "gamesId": 12435,
              "categoriesId": 2,
              "games": {
                  "id": 12435,
                  "name": "game2",
                  "image": "image2"
              }
          },
          {
              "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
              "gamesId": 13423,
              "categoriesId": 1,
              "games": {
                  "id": 13423,
                  "name": "game4",
                  "image": "image4"
              }
          },
          {
              "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
              "gamesId": 13435,
              "categoriesId": 1,
              "games": {
                  "id": 13435,
                  "name": "game3",
                  "image": "image3"
              }
          }
      ]
      ```
  <br/>
    
### **Lista todas as coleções de um usuário pela categoria**
##### `GET` /collections/user/:page/:id
  <br/>

  Esse endpoint retorna todas as coleções que pertencem ao usuario relacionadas a categoria em paginas de até 20 objetos.

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `response body`
    ```json
      [
          {
              "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
              "gamesId": 13423,
              "categoriesId": 1,
              "games": {
                  "id": 13423,
                  "name": "game4",
                  "image": "image4"
              }
          },
          {
              "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
              "gamesId": 13435,
              "categoriesId": 1,
              "games": {
                  "id": 13435,
                  "name": "game3",
                  "image": "image3"
              }
          }
      ]
      ```
  <br/>