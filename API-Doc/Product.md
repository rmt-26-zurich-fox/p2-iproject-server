## Endpoints

List of Available Endpoints:

- `GET /products`
- `GET /carts`
- `POST /carts/:cakeId`
- `PATCH /carts/:cartId`
- `DELETE /carts/:cartId`
- `GET /payment`
- `DELETE /carts`

### GET /products

#### Description

- Get all Products

#### Response

_200 - OK_

- Body

  ```json
  [
    {
        "id": Integer,
        "name": String,
        "price": Integer,
        "category": String,
        "imageUrl": String,
        "createdAt": String,
        "updatedAt": String
    },
    ...
  ]
  ```

### GET /carts

#### Description

- Get all Cart

#### Request

- headers:

  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  [
    {
        "id": Integer,
        "CakeId": Integer,
        "UserId": Integer,
        "amount": Integer,
        "price": Integer,
        "createdAt": String,
        "updatedAt": String,
        "Cake": {
            "id": Integer,
            "name": String,
            "price": Integer,
            "category": String,
            "imageUrl": String,
            "createdAt": String,
            "updatedAt": String
        }
    }
    ...
  ]
  ```

### POST /carts/:cakeId

#### Description

- Create a new cart

#### Request

- headers:

  ```json
  {
    "access_token": String
  }
  ```

- Params

  ```json
  {
    "cakeId": Integer,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "message": "Item added to shopping cart"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": ["Invalid token"]
  }
  ```

### PATCH /carts/:cartId

#### Description

- Update cart amount

#### Request

- headers:

  ```json
  {
    "access_token": String
  }
  ```

- Params

  ```json
  {
    "cartId": Integer,
  }
  ```

- Body

  ```json
  {
    "amount": Integer,
  }
  ```

#### Response

_201 - Patched_

- Body
  ```json
  {
    "message": "Item updated"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": ["Invalid token"]
  }
  ```

### DELETE /carts/:cartId

#### Description

- Delete cart by ID

#### Request

- headers:

  ```json
  {
    "access_token": String
  }
  ```

- Params

  ```json
  {
    "cartId": Integer,
  }
  ```

#### Response

_200 - Deleted_

- Body
  ```json
  {
    "message": "Item removed"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": ["Invalid token"]
  }
  ```

### GET /payment

#### Description

- Get payment token

#### Request

- headers:

  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "trans_token": String
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": ["Invalid token"]
  }
  ```

### DELETE /carts

#### Description

- Delete carts by user

#### Request

- headers:

  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "message": "Checkout items removed"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": ["Invalid token"]
  }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "message": ["Internal server error"]
  }
  ```
