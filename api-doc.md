# News Portal API Documentation

## ENDPOINTS :

1. `POST /admin/register`
2. `POST /admin/login`
3. `POST /cust/register`
4. `POST /cust/login`
5. `POST /cust/googleSignIn`
6. `GET /products`
7. `GET /products/:productId`
8. `POST /products/add`
9. `GET /cart`
10. `DELETE /cart`
11. `GET /cart/total`
12. `DELETE /products/:productId/delete`
13. `POST /cart/:productId`
14. `DELETE /cart/:cartId`


&nbsp;

## `POST /admin/register`

- Description :
  - Register a new admin
- Request:
  - Body :

```json
{
  "email": "String",
  "password": "string"
}
```

_Response(201 : Created):_

```json
{
  "createdAdmin": {
    "email": "string",
    "role": "admin"
  }
}
```

_Response (400 - Bad Request):_

```json
{ "message": "errors from SequelizeUniqueConstraintError" }
OR
{ "message": "errors from SequelizeValidationError" }
```

## `POST /admin/login`

- Description :
  - admin login
- Request:
  - Body :

```json
{
  "email": "string",
  "password": "string"
}
```

_Response(201 : Created):_

```json
{
  "access_token": "string"
}
```

_Response (401 - Unauthorized):_

```json
{ "message": "invalid email/password!" }
```
## `POST /cust/register`

- Description :
  - customer Register
- Request
  - Body:

```json
{
  "email": "String",
  "password": "string"
}
```

- _Response(201 : Created):_

```json
"access_token": "string",
"findCustomer":{
    "email": "string",
    "role": "string",
}
```

_Response (400 - Bad Request):_

```json
{ "message": "errors from SequelizeUniqueConstraintError" }
OR
{ "message": "errors from SequelizeValidationError" }
```

## `POST /cust/login`

- Description :
  - User login
- Request
  - Body:

```json
{
  "email": "String",
  "password": "string"
}
```

- _Response(201 : Created):_

```json
"access_token": "string",
"findCustomer":{
    "email": "string",
    "role": "string",
}
```

_Response (401 - Unauthorized):_

```json
{ "message": "invalid email/password!" }
```

## `POST /cust/googleSignIn`

- Description :
  - User login via google or create new user account if not exist
- Request
  - Body:

```json
{
  "email": "String",
  "password": "string"
}
```

- _Response(201 : Created):_

```json
"access_token": "string",
"user":{
    "email": "string",
    "role": "string",
}
```

_Response (401 - Unauthorized):_

```json
{ "message": "invalid email/password!" }
```

## `GET /products`

Description :

- get all products

Request:

- body :

```json
{
  "title": "string",
  "content": "text",
  "imgUrl": "string",
  "authorId": "integer",
  "categoryId": "integer"
}
```

_Response (200 - OK)_

```json
{
  [
    {"id": "integer",
    "name" : "string",
    "type" : "string",
    "description" : "text",
    "imageUrl1" :"string",
    "imageUrl2" :"string",
    "videolink" : "string"
  }
  ]
}
```

_Response (404 - NOT FOUND)_

```json
{ "message": "Product not found" }
```

## `GET /cart`

- Description :

  - get customer cart

- Request:
  - Headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK):_

```json
[
  {
    "id":"integer",
    "userId": "integer",
    "productId":"integer",
    "price":"integer"
  }
]
```

 ## `GET /products/:productId`
- Description:
  - Get spesific product by its id
- Request:
  - Params:

```json
{
  "productId": "integer "
}
```

- _Response(200-OK):_


```json
{
  [
    {"id": "integer",
    "name" : "string",
    "type" : "string",
    "description" : "text",
    "imageUrl1" :"string",
    "imageUrl2" :"string",
    "videolink" : "string"
  }
  ]
}
```

- _Response(404 - NOT FOUND):_

```json
{ "message": "Data not found" }
```
## `GET /cart`

- Description :

  - get customer cart

- Request:
  - Headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK):_

```json
[
  {
    "id":"integer",
    "userId": "integer",
    "productId":"integer",
    "price":"integer"
  }
]
```
## `DELETE /cart`

- Description:

  - Empty card upon checkot

- Request:
  - headers :

```json
{
  "access_token": "string"
}
```

- _Response(200-OK):_

```json
{ "message": "checkout succesful" }
```

- _Response(404-NOT FOUND):_

```json
{ "message":"cart is empty already" }
```

## `GET /cart/total`

- Description:
  - Get total price of all items in cart
- Request:
  - headers :

```json
{
  "access_token": "string"
}
```

- _Response(200-OK):_

```json
integer
```
## `DELETE /products/:productId/delete`
- Description:
Delete product from the database

- Request:
  - headers :

```json
{
  "access_token": "string"
}
```

- Admin authorization needed

- _Response(200-OK):_

```json
{ "message": "Product deleted successfully" }
```
- _Response(404-NOT FOUND):_

```json
{ "message":"Product not found" }
```

## POST `/cart/:productId`
- Description:
add products to cart

- Require:
  - params :

```json
{"productId" : "integer"}
```
  - headers :

```json
{
  "access_token": "string"
}
```
- _Response(200-OK):_

```json
{ "message": "Success adding product with id ${productId} to cart!" }
```


## DELETE `/cart/:cartId`

- Description : remove item from cart
- Require:
  - params :

```json
{"cartId" : "integer"}
```
  - headers :

```json
{
  "access_token": "string"
}
```

- _Response(200-OK):_

```json
{ "message": "Cart item with id ${cartId} is successfully removed" }
```
- _Response(404-NOT FOUND):_

```json
{ "message":"Product not found" }
```

## GLOBAL ERROR
- _Response(500-INTERNAL SERVER ERROR):_

```json
{ "message":"Internal Server Error" }
```