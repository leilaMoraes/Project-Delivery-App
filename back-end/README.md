# Rotas App de Delivery

---
<details>
<summary><strong> 1 -) Rota POST | /login</strong> </br>
  Realizar o login do usuário.
</summary> 

- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
	"email": "zebirita@email.com",
	"password": "$#zebirita#$",
  }
  ```
 - Se o login foi feito com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http
	```json
	{ 
	  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjgzMTM3MzI5LCJleHAiOjE2ODMxNDgxMjl9.cjmLcBN-rIxae64Uoi0xrJOnLHZwLf9B8ngZf_-k-cM"
	}
	```

- Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```
</details>

---
<details>
<summary><strong> 2 -) Rota POST | /register</strong> </br>
Realizar o cadastro de um novo usuário.
</summary>

- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
	"email": "email@email.com",
	"password": "email12345",
	"name": "Rafael Silva",
	"role": "customer"
  }
  ```
- Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser um dos exemplos abaixo, com um status http `400`:
    ```json
    {
	  "message": "\"campo\" is required",
    }
    ```
  
- Se a requisição não tiver o campo `email` devidamente preenchido com o formato `<prefixo@dominio.com>`, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"email\" must be a valid email"
    }
    ```

- Se a requisição não tiver o campo `password` devidamente preenchido com 6 caracteres ou mais, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"password\" length must be at least 6 characters long"
    }
    ```

- Se a requisição não tiver o campo `name` devidamente preenchido com 12 caracteres ou mais, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"name\" length must be at least 12 characters long"
    }
    ```

 - Se a requisição enviar o campo `email` com um email que já existe, o resultado retornado deverá ser conforme exibido abaixo, com um status http `409`:
    ```json
    {
      "message": "User already exists!"
    }
    ```
  
 - Se o user for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
      }
      ```

</details>

---
<details>
<summary><strong> 3 -) Rota GET | /products <br/>
 Retornar todos os produtos cadastrados.
 </strong></summary>

- Se faz necessário informar o headers authorization com o valor do token gerando via login ou registro de usuário.Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```
 - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token must be a valid token"
    }
    ```
- Ao listar usuários com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
	      "id": 1,
	      "name": "Skol Lata 250ml",
	      "price": 2.2,
	      "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg"
      }

      /* ... */
    ]
    ```
</details>

---
<details>
<summary><strong> 4 -) Rota POST | /products/register </strong> </br>
 Realizar o cadastro de um novo produto.</summary>

- Se faz necessário informar o headers authorization com o valor do token gerando via login ou registro de usuário.Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```
- Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token must be a valid token"
    }
    ```
- O corpo da requisição deverá seguir o formato de multipart/form-data e na estrutura abaixo, onde o campo `image` deve ser o upload de um arquivo de imagem:
  ```json
  {
	"name": "Coca",
	"price": 5.50,
	"image": coca.jpg
  }
  ```


- Se o produto for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
    ```json
      {
      	"id": 1.
		"name": "coca",
		"price": 5.5
		"urlImage": "http://localhost:3001/images/coca.jpg"
      }
</details>

---
<details>
<summary><strong> 5 -)Rota POST | /sales </strong> </br> Realizar o cadastro de uma nova comprar.</summary>

- Se faz necessário informar o headers authorization com o valor do token gerando via login ou registro de usuário.Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```
- Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token must be a valid token"
    }
    ```
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
      "userId": 3,
      "sellerId": 2,
      "totalPrice": 10.00,
      "deliveryAddress": "Rua 1",
      "deliveryNumber": 10,
      "cart": [{
        "productId": 2, "quantity": 1
      }, {"productId": 3, "quantity": 1}]
    }
  ```
- Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser um dos exemplos abaixo, com um status http `400`:
    ```json
    {
	  "message": "\"campo\" is required",
    }
    ```
- Se a venda for criada com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
    ```json
       {
      	"id": 1,
      	"userId": 3,
      	"sellerId": 2,
      	"totalPrice": 10,
      	"deliveryAddress": "Rua 1",
      	"deliveryNumber": "10",
      	"saleDate": "2023-05-04T12:37:55.000Z",
      	"status": "Pendente",
      	"products": [
			{
			  "id": 2,
			  "name": "Heineken 600ml",
			  "price": 7.5,
			  "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
			  "quantity": 1
			},
			{
			  "id": 3,
			  "name": "Antarctica Pilsen 300ml",
			  "price": 2.49,
			  "urlImage": "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
			  "quantity": 1
			}
     	 ]
    	}
  ```
  


</details>

---
<details>
<summary><strong> 6 -) Rota GET | /sales/customer/:id</strong> </br>
Realizar a busca das compras de um cliente.
</summary>

- Se faz necessário informar o headers authorization com o valor do token gerando via login ou registro de usuário.Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```
 - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token must be a valid token"
    }
    ```
 - Se a requisição for feita com um id que não exista, o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Customer not found"
    }
    ```
- Se a requisição não for feita por um client, o resultado retornado deverá ser conforme exibido abaixo, com um status http `403`:
	```json
	    {
	      "message": "Only customers can access this page"
	    }
	```

- Ao listar as vendas do cliente com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
        "id": 1,
        "userId": 3,
        "sellerId": 2,
        "totalPrice": 10,
        "deliveryAddress": "Rua 1",
        "deliveryNumber": "10",
        "saleDate": "2023-05-04T12:37:55.000Z",
        "status": "Pendente",
        "products": [
          {
            "id": 2,
            "name": "Heineken 600ml",
            "price": 7.5,
            "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
            "quantity": 1
          },
          {
            "id": 3,
            "name": "Antarctica Pilsen 300ml",
            "price": 2.49,
            "urlImage": "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
            "quantity": 1
          }
        ]
      },

      /* ... */
    ]
    ```
</details>

---
<details>
<summary><strong> 7 -) Rota GET | /sales/seller/:id</strong> </br>
Realizar a busca das compras de um vendedor.
</summary>

- Se faz necessário informar o headers authorization com o valor do token gerando via login ou registro de usuário.Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```
 - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token must be a valid token"
    }
    ```
 - Se a requisição for feita com um id que não exista, o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Seller not found"
    }
    ```
- Se a requisição não for feita por um vendedor, o resultado retornado deverá ser conforme exibido abaixo, com um status http `403`:
	```json
	    {
	      "message": "Only sellers can access this page"
	    }
	```

- Ao listar as vendas do cliente com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
        "id": 1,
        "userId": 3,
        "sellerId": 2,
        "totalPrice": 10,
        "deliveryAddress": "Rua 1",
        "deliveryNumber": "10",
        "saleDate": "2023-05-04T12:37:55.000Z",
        "status": "Pendente",
        "products": [
          {
            "id": 2,
            "name": "Heineken 600ml",
            "price": 7.5,
            "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
            "quantity": 1
          },
          {
            "id": 3,
            "name": "Antarctica Pilsen 300ml",
            "price": 2.49,
            "urlImage": "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
            "quantity": 1
          }
        ]
      },

      /* ... */
    ]
    ```
</details>

---
<details>
<summary><strong> 8 -) Rota PATCH | /sales/status/:id</strong> </br>
Realizar a mudança do status do pedido.
</summary>

- Se faz necessário informar o headers authorization com o valor do token gerando via login ou registro de usuário.Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```
 - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token must be a valid token"
    }
    ```dos os usuários cadastrados
- Se a requisição não for feita por um vendedor, o resultado retornado deverá ser conforme exibido abaixo, com um status http `403`:
    ```json
	{
	  "message": "Only sellers can access this page"
	}
    ```
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
	"status": 'Entrege'
  }
  ```
 - Se a requisição for feita com um id que não exista, o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Sale not found"
    }
    ```
- Se a requisição for feita com status inválido, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"status\" must be one of [Pendente, Preparando, Entregue]"
    }
    ```
- Se a requisição for feita com uma venda que já foi entregue, o resultado retornado deverá ser conforme exibido abaixo, com um status http `422`:
    ```json
    {
      "message": "Sale already delivered"
    }
    ```

- Ao mudar o status da compra com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
    	"message": "Status updated"
    }
    ```
</details>

---
<details>
<summary><strong> 9 -) Rota POST | /admin</strong> </br>
Realizar o cadastro de um novo usuário.
</summary>

- Se faz necessário informar o headers authorization com o valor do token gerando via login ou registro de usuário.Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```
 - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token must be a valid token"
    }
    ```
- Se a requisição não for feita por um vendedor, o resultado retornado deverá ser conforme exibido abaixo, com um status http `403`:
    ```json
	{
	  "message": "Only admins can access this page"
	}
    ```

- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
	"email": "email@email.com",
	"password": "email12345",
	"name": "Rafael Silva",
	"role": "customer"
  }
  ```
- Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser um dos exemplos abaixo, com um status http `400`:
    ```json
    {
	  "message": "\"campo\" is required",
    }
    ```
  
- Se a requisição não tiver o campo `email` devidamente preenchido com o formato `<prefixo@dominio.com>`, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"email\" must be a valid email"
    }
    ```

- Se a requisição não tiver o campo `password` devidamente preenchido com 6 caracteres ou mais, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"password\" length must be at least 6 characters long"
    }
    ```

- Se a requisição não tiver o campo `name` devidamente preenchido com 12 caracteres ou mais, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"name\" length must be at least 12 characters long"
    }
    ```

 - Se a requisição enviar o campo `email` com um email que já existe, o resultado retornado deverá ser conforme exibido abaixo, com um status http `409`:
    ```json
    {
      "message": "User already exists!"
    }
    ```
  
 - Se o user for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
    ```json
      {
        "id": 1,
		"email": "email@email.com",
		"name": "Rafael Silva",
		"role": "customer"
      }
      ```

</details>

---
<details>
<summary><strong> 10 -) Rota GET | /admin</strong> </br>
 Retornar todos os usuários cadastrados.
</summary>

- Se faz necessário informar o headers authorization com o valor do token gerando via login ou registro de usuário.Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```
 - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token must be a valid token"
    }
    ```
- Se a requisição não for feita por um vendedor, o resultado retornado deverá ser conforme exibido abaixo, com um status http `403`:
    ```json
	{
	  "message": "Only admins can access this page"
	}
    ```

- Ao listar usuários com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
        "id": 1,
        "name": "Cliente Zé Birita",
        "email": "zebirita@email.com",
        "role": "customer"
      }

      /* ... */
    ]
    ```

</details>

---
<details>
<summary><strong> 11 -) Rota DELETE | /admin/:id</strong> </br>
 Realizar a remoção de um usuário.
</summary>

- Se faz necessário informar o headers authorization com o valor do token gerando via login ou registro de usuário.Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```
 - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token must be a valid token"
    }
    ```
- Se a requisição não for feita por um vendedor, o resultado retornado deverá ser conforme exibido abaixo, com um status http `403`:
    ```json
	{
	  "message": "Only admins can access this page"
	}
    ```

 - Se a requisição for feita com um id que não exista, o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "User not found!"
    }
    ```

- Ao remover o usuário com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `204`:

</details>

---
