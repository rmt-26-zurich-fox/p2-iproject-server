## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `GET /products`
- `PATCH /carts/:ProductId`
- `GET /carts`
- `DELETE /carts/:id`
- `PATCH /transactions/checkout`
- `GET /transactions`
- `POST /transactions`


### POST /register

#### Description

- Create a new user

#### Request

- Body
  ```json
  {
    "name": String,
    "password": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": 201,
    "message": "user with id ${createUser.id} and email ${createUser.email} has been created"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": [String]
    }
  }
  ```

  ### POST /login

#### Description

- login to system

#### Request

- Body
  ```json
  {
    "name": String,
    "password": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "access_token": String
  }
  ```

_401 - unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": "Invalid Name/Password"
    }
  }
  ```

### GET /products

#### Description

- Get all the products data

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "message": "success read all products",
    "products": [
        {
            "id": Integer,
            "name": String,
            "description": String,
            "price": Integer,
            "stock": Integer,
            "imageUrl": String
        },
        ...
    ]
  }

  ```

### PATCH /carts/:ProductId

#### Description

- add product to cart based on given product id

#### Response

_201 - OK_

- Headers
  ```json
  {
    "access_token": String,
  }

    ```

- Body
  ```json
  {
    "statusCode": 201,
    "message": "success create new cart",
    "updatedCart": {
        "quantity": Integer,
        "id": Integer,
        "UserId": Integer,
        "ProductId": Integer
    }
  }



_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "Product is Not Found"
    }
  }
  ```

_401 - Forbidden_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message":  "Please login"
    }
  }
  ```

### GET /carts

#### Description

- Get all carts of user logged in

#### Response

_200 - OK_

- Headers
  ```json
  {
    "access_token": String,
  }

    ```

- Body

  ```json
  {
    "statusCode": 200,
    "message": "success read carts",
    "carts": [
        {
            "id": Integer,
            "UserId": Integer,
            "ProductId": Integer,
            "quantity": Integer,
            "Product": {
                "id": Integer,
                "name": String,
                "description": String,
                "price": Integer,
                "stock": Integer,
                "imageUrl": String
            }
        },
        ...
    ]
  }


  ```

  _404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "You don't have carts"
    }
  }
  ```

_403 - Forbidden_

- Body
  ```json
  {
    "statusCode": 403,
    "error": {
      "message": "You don't have access"
    }
  }
  ```

### DELETE /carts/:id

#### Description

- Delete selected cart

#### Response

_200 - OK_

- Headers
  ```json
  {
    "access_token": String,
  }

    ```

- Body

  ```json
  {
    "statusCode": 200,
    "message": "success delete cart",
    "deletedCart": 1
  }

  ```

  _404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "Cart is Not Found"
    }
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": "Please login"

    }
  }
  ```

### PATCH /transactions/checkout

#### Description

- checkout the carts

#### Response

_201 - OK_

- Headers
  ```json
  {
    "access_token": String,
  }

    ```

- Body
  ```json
  {
    "statusCode": 201,
    "message": "success create new transaction",
    "newTransaction": {
        "paymentStatus": Boolean,
        "id": Integer,
        "UserId": Integer,
        "totalPrice": Integer,
        "products": Array,

    }
  }



_401 - Forbidden_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message":  "Please login"
    }
  }
  ```

### GET /transactions

#### Description

- Get all transactions of user logged in

#### Response

_200 - OK_

- Headers
  ```json
  {
    "access_token": String,
  }

    ```

- Body

  ```json
  {
    "statusCode": 200,
     "message": "success read all transactions",
     "totalAmount": [
        {
            "UserId": Integer,
            "totalPriceAll": Integer
        }
    ]
  }

  ```

  ```

_403 - Forbidden_

- Body
  ```json
  {
    "statusCode": 403,
    "error": {
      "message": "You don't have access"
    }
  }
  ```

### POST /transactions/payment

#### Description

- create a payment

#### Response

_201 - OK_

- Headers
  ```json
  {
    "access_token": String,
  }

    ```

- Body

  ```json
  {
    "statusCode": 200,
    "message": "transaction success",
    "transactionToken": {
        "token": String,
        "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/d67a0feb-9610-492e-a31a-e251e0a7e762"
    }
  }

  ```

  ```

_403 - Forbidden_

- Body
  ```json
  {
    "statusCode": 403,
    "error": {
      "message": "You don't have access"
    }
  }
  ```
### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```