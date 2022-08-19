## Endpoints

List of Available Endpoints:

- `POST /user/register` 
- `POST /user/login` 
- `POST /user/google-sign-in` 
- `GET /product/:id` 
- `GET /service/:id` 
- `GET /request` 
- `POST /request/product/:ProductId` 
- `POST /request/service/:ServiceId` 
- `GET /payment` 
- `POST /payment/status`

### POST /user/register

#### Description

- Create a new user data

#### Request

- Body
  ```json
  {
    "email": String,
    "password": String,
    "phoneNumber": String,
    "address": String,
    "role": String,
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    "statusCode": 201,
    "message": "Register success",
    "user": {
        "id": Integer,
        "email": String
    }
  }
  ```

  _400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

### POST /user/login

#### Description

- Login feature for user

#### Request

- Body
  ```json
  {
    "email": String,
    "password": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "data": {
      "user":
      {
      "id": Integer,
          "email": String,
          "role": String,
          "imageUrl": String,
      },
      "access_token": String,
    }
  }
  ```

_401 - Not Authorized_

- Body

  ```json
  {
    "statusCode": 401,
    "error": {
      "message": "Invalid email/password"
    }
  }
  ```

### POST /user/google-sign-in

#### Description

- Login as customer

#### Request

- Headers
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
    "statusCode": 200,
    "data": {
      "message": String,
      "access_token": String,
      "email": String,
    }
  }
  ```

### GET /product/:id

#### Description

- Get all the product provider data

#### Request

- Headers
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
    "statusCode": 200,
    "data": {
    "message": "Success read product from user (id)",
    "product": [
      {
        "id": Integer,
        "name": String,
        "price": Integer,
        "detail": String,
        "imageUrl": String,
        "UserId": Integer,
        "User": Object
      }
  }
  ```

### GET /service/:id

#### Description

- Get all the service provider data

#### Request

- Headers
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
    "statusCode": 200,
    "data": {
    "message": "Success read service from user (id)",
    "product": [
      {
        "id": Integer,
        "name": String,
        "price": Integer,
        "UserId": Integer,
        "User": Object
      }
  }
  ```

### GET /request

#### Description

- Get all request data of online user

#### Request

- Headers
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
    "statusCode": 200,
    "data": {
      "message": "Success read request from user (id)",
      "service": Array of Object,
      "product": Array of Object
    }
  }
  ```

### POST /request/product/:ProductId

#### Description

- add a product to user's request list

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```
- Params
  ```json
  "ProductId"
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    "statusCode": 201,
    "message": "Success add new product request",
    "data": {
      "product":{
        "ProductId": Integer,
        "UserId": Integer,
      }
    }
  }
  ```

  _400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

### POST /request/service/:ServiceId

#### Description

- add a service to user's request list

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```
- Params
  ```json
  "ServiceId"
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    "statusCode": 201,
    "data": {
      "message": "Success add new service request",
      "service":{
        "ServiceId": Integer,
        "UserId": Integer,
      }
    }
  }
  ```

  _400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

### GET /payment

#### Description

- Get request token to access snap payment windows from midtrans

#### Request

- Headers
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
    "statusCode": 201,
    "data": {
      "transaction" : {
        "token" : String
      }
    }
  }
  ```

### POST /payment/status

#### Description

- Change bill status

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    "statusCode": 201,
    "data": {
      "message": "Success update payment status"
    }
  }
  ```

  _400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
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
