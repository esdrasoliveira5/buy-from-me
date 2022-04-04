# buy-from-me-backend

## Sumário

- [Descrição](#Descrição)
- [Pré-requisitos](#Pre-requisitos)
  - [Instalação](#Instalação)
  - [Instruções para iniciar o projeto](#Intruções-para-iniciar-o-projeto)
- [Documentação](#Documentação)
  - [Listar usuário](#Listar-usuário)
  - [Logar usuário](#Logar-usuário)
  - [Registrar usuário](#Registrar-usuário) 
  - [Atualizar usuário](#Atualizar-usuário)
  - [Deletar usuário](#Deletar-usuário)
  - [Listar produto pelo id](#Listar-produto-pelo-id)
  - [Listar todos os produtos](#Listar-todos-os-produtos)
  - [Adiciona um game a coleção](#Adiciona-um-game-a-coleção)
  - [Listar produtos por filtro](#Listar-produtos-por-filtro)
  - [Cria um produto](#Cria-um-produto)
  - [Atualiza um status de um produto](#Atualiza-um-status-de-um-produto)
  - [Atualiza os dados de um produto](#Atualiza-os-dados-de-um-produto)
  - [Deleta um produto](#Deleta-um-produto)
  - [Busca um pedido](#Busca-um-pedido)
  - [Busca todos os pedidos](#Busca-todos-os-pedidos)
  - [Cria um pedido](#Cria-um-pedido)
  - [Deleta um pedido](#Deleta-um-pedido)


<br>

## Descrição

**Objetivo**: Neste projeto foi desenvolvido uma CRUD api que gerencia dados de um usuario e vendedor em um site de vendas, no formato de uma API RESTful, utilizando Typescript.

- Arquitetura REST;
- Autenticações e Permissões com JWT;
- Cryptografia de senha com bcrypt
- Banco de Dados PostgreSQL;
- Docker

## Pré-requisitos

- `npm version 6.14.13`
- `node version 14.17.0`
- `docker version 20.10.13`
- `docker-compose version 1.29.2`

## Instalação

- Clone o repositório
  ```sh
    git clone git@github.com:esdrasoliveira5/buy-from-me.git
- Vá para a pasta da aplicação
  ```sh
    cd buy-from-me

## Instruções para iniciar o projeto

<br>

- Comando para iniciar

  ```sh
  sudo docker-compose up

<br/>

## Documentação

<br/>

### **Listar usuário** 
##### `GET` /user/:id
  <br/>

  Esse endpoint retorna um usuario.
  
  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      `
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
          },
          "Products": [
            {
              "id": 2,
              "name": "Outra Coisa",
              "description": "Sei la",
              "price": 700,
              "sold": false,
              "new": true,
              "categoriesId": 2,
              "usersId": "e0805cfe-377e-4035-858c-7c9591b54683"
            }
          ],
          "Orders": [
            {
              "id": 2,
              "productsId": 5,
              "buyerId": "4",
              "sellerId": "2",
              "orderDate": "2022-03-31T20:19:29.715Z"
            }
          ],
          "sales": [
            {
              "id": 1,
              "productsId": 2,
              "buyerId": "1",
              "sellerId": "4",
              "orderDate": "2022-03-31T20:19:29.715Z"
            }
          ]
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




### **Listar produto pelo id**
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

### **Listar todos os produtos**
##### `GET` /product?pag=1
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

### **Listar produtos por filtro**
##### `GET` /product/filter?pag=1&filter=gte&price=1500&sold=false&newP=false&category=12&name=tv
  <br/>

  Esse endpoint lista todos os produtos em paginas de 20 resultados filtrando pelas querys.
  
  *Obs: Todos os filtros sao opcionais e podems ser usados em qualquer combinação.* 
  *Obs1: O filtro filter pode ser nos valores gte e lte, sendo gte produtos com o preço maior ou igual ao valor de price, e lte menor ou igual ao valor de price.* 

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

  *Obs: Apenas o usuario que criou o produto pode atualiza-lo.* 

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

  *Obs: Apenas o usuario que criou o produto pode atualiza-lo.* 

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

  *Obs: Apenas o usuario que criou o produto deleta-lo.* 

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


### **Busca um pedido**
##### `GET` /order/:id
  <br/>

  Esse endpoint retorna um pedido pelo id caso o token pertença ao comprador ou vendedor.

  *Obs: Apenas o usuario que criou o produto ou que fez o pedido pode acessa-lo.* 

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `response body`
    ```json
      {
          "id": 1,
          "productsId": 2,
          "buyerId": "1",
          "sellerId": "4"
      }
      ```
  <br/>
    
### **Busca todos os pedidos**
##### `GET` /order?filter=sellerId
  <br/>

  Esse endpoint retorna todas os pedidos filtrando pela query sellerId ou buyerId.

  *Obs: Apenas o usuario que criou o produto ou que fez o pedido pode acessa-lo.* 

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
              "id": 1,
              "productsId": 2,
              "buyerId": "1",
              "sellerId": "4"
          },
          {
              "id": 4,
              "productsId": 2,
              "buyerId": "1",
              "sellerId": "4"
          },
          {
              "id": 5,
              "productsId": 2,
              "buyerId": "1",
              "sellerId": "4"
          },
          {
              "id": 6,
              "productsId": 2,
              "buyerId": "1",
              "sellerId": "4"
          },
          {
              "id": 7,
              "productsId": 2,
              "buyerId": "1",
              "sellerId": "4"
          },
          {
              "id": 8,
              "productsId": 2,
              "buyerId": "1",
              "sellerId": "4"
          }
      ]
      ```
  <br/>

  ### **Cria um pedido**
##### `POST` /order
  <br/>

  Esse endpoint cria e retorna um pedido.

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `request body`
      ```json
      {
          "productsId": 2
      }
      ```

  - Exemplo `response body`
    ```json
      {
          "id": 16,
          "productsId": 2,
          "buyerId": "4",
          "sellerId": "2"
      }
      ```
  <br/>
  

  ### **Deleta um pedido**
##### `DELETE` /order/:id
  <br/>

  Esse endpoint deleta um pedido pelo id.

  *Obs: Apenas o usuario que criou o pedido pode deleta-lo.* 

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `response body`
    ```json
      {
          "message": "order deleted"
      }
      ```
  <br/>
  