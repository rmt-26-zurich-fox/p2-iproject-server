# Food Restaurant API Documentation

## Endpoints :

List of available endpoints:

- `POST /register/admin`
- `POST /register/customer`
- `POST /login/login`
- `POST /login/login-google`
- `GET /profiles/current`
- `PUT /profiles/edit`
- `GET /admins/products/list`
- `POST /admins/products/add`
- `PUT /admins/products/edit/:id`
- `PATCH /admins/products/status/:id`
- `GET /admins/orders/list`
- `PATCH /admins/orders/status/:id`
- `GET /customers/products/list-active`
- `GET /customers/products/list-active-pagination`
- `GET /customers/products/detail/:id`
- `POST /customers/orders/add/:id`
- `GET /customers/orders/cart`
- `DELETE /customers/orders/delete/:id`
- `GET /customers/orders/list`
- `POST /midtrans/snap-token`
- `PATCH /midtrans/change-cart-to-payed`

&nbsp;

## 1. POST /register/admin

Description:

- Register user as Admin to database

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Success Register Admin",
  "data": {
    "id": "integer",
    "email": "string",
    "role": "string"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Bad Request",
  "error" : [
    "string",
    ...
  ]
}
```

&nbsp;

## 2. POST /register/customer

Description:

- Register user as Customer to database

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Success Register Customer",
  "data": {
    "id": "integer",
    "email": "string",
    "role": "string"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Bad Request",
  "error" : [
    "string",
    ...
  ]
}
```

&nbsp;

## 3. POST /login/login

Description:

- Login user check to database

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "email": "string",
  "role": "string",
  "user_id": "integer",
  "profile_id": "integer",
  "profile_first_name": "string"
}
```

&nbsp;

## 4. POST /login/login-google

Description:

- Login user through google

Request:

- headers:

```json
{
  "token_google": "string"
}
```

- body:

```json
{
  "email": "string",
  "password": "string",
  "role": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "email": "string",
  "role": "string",
  "user_id": "integer",
  "profile_id": "integer",
  "profile_first_name": "string"
}
```

&nbsp;

## 5. GET /profiles/current

Description:

- Get current profile based on access_token

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success get profile",
  "data": {
    "id": "integer",
    "firstName": "string",
    "lastName": "string",
    "address": "string",
    "phoneNumber": "string",
    "editStatus": "string",
    "UserId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

&nbsp;

## 6. PUT /profiles/edit

Description:

- Edit profile based on access_token

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success edit profile"
}
```

_Response (404 - Bad Request)_

```json
{
  "message": "Data not found",
  "error": "Profile not found!"
}
```

&nbsp;

## 7. GET /admins/products/list

Description:

- Get product list from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Success GET Product List",
    "data": [
        {
            "id": "integer",
            "name": "string",
            "price": "integer",
            "stock": "integer",
            "weight": "integer",
            "imageUrl": "string",
            "productStatus": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        ...
    ]
}
```

&nbsp;

## 8. POST /admins/products/add

Description:

- Add new product to database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "price": "integer",
  "stock": "integer",
  "weight": "integer",
  "imageUrl": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Success Add New Product",
  "data": {
    "productStatus": "string",
    "id": "integer",
    "name": "string",
    "price": "integer",
    "stock": "integer",
    "weight": "integer",
    "imageUrl": "string",
    "updatedAt": "date",
    "createdAt": "date"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Bad Request",
  "error" : [
    "string",
    ...
  ]
}
```

&nbsp;

## 9. PUT /admins/products/edit/:id

Description:

- Edit product to database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "string",
  "price": "integer",
  "stock": "integer",
  "weight": "integer",
  "imgUrl": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success Edit Product with id <id>"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Bad Request",
  "error" : [
    "string",
    ...
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found",
  "error": "Product with id <id> is not found!"
}
```

&nbsp;

## 10. PATCH /admins/products/status/:id

Description:

- Change / update status product

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "productStatus": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success Edit Product with id <id>"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Bad Request",
  "error" : [
    "string",
    ...
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found",
  "error": "Product with id <id> is not found!"
}
```

&nbsp;

## 11. GET /admins/orders/list

Description:

- Get admin order list from db

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Success GET Order List",
    "data": [
        {
            "id": "integer",
            "orderStatus": "string",
            "stock": "integer",
            "totalCost": "integer",
            "ProfileId": "integer",
            "ProductId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "Profile": {
                "id": "integer",
                "firstName": "string",
                "lastName": "string",
                "address": "string",
                "phoneNumber": "string",
                "editStatus": "string",
                "UserId": "integer",
                "createdAt": "date",
                "updatedAt": "date"
            },
            "Product": {
                "id": "integer",
                "name": "string",
                "price": "integer",
                "stock": "integer",
                "weight": "integer",
                "imageUrl": "string",
                "productStatus": "string",
                "createdAt": "date",
                "updatedAt": "date"
            }
        },
        ...
    ]
}
```

&nbsp;

## 12. PATCH /admins/orders/status/:id

Description:

- Change / update status order

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "orderStatus": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success Edit Order with id <id>"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Bad Request",
  "error" : [
    "string",
    ...
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found",
  "error": "Order with id <id> is not found!"
}
```

&nbsp;

## 13. GET /customers/products/list-active

Description:

- Get customer order list active status from db

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Success GET Product List",
    "data": [
        {
            "id": "integer",
            "name": "string",
            "price": "integer",
            "stock": "integer",
            "weight": "integer",
            "imageUrl": "string",
            "productStatus": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        ...
    ]
}
```

&nbsp;

## 14. GET /customers/products/list-active-pagination

Description:

- Get customer order list active status from db for pagination

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- query:

```json
{
  "page": "integer",
  "size": "integer",
  "name": "string",
  "min": "integer",
  "max": "integer"
}
```

_Response (200 - OK)_

```json
{
    "message": "Succes read Product Pagination Filter",
    "data": {
        "totalItems": "integer",
        "products": [
            {
                "id": "integer",
                "name": "string",
                "price": "integer",
                "stock": "integer",
                "weight": "integer",
                "imageUrl": "string",
                "productStatus": "string",
                "createdAt": "date",
                "updatedAt": "date"
            },
            ...
        ],
        "totalPages": "integer",
        "currentPage": "integer"
    }
}
```

&nbsp;

## 15. GET /customers/products/detail/:id

Description:

- Get customer product detail from db

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success GET Detail Product",
  "data": {
    "id": "integer",
    "name": "string",
    "price": "integer",
    "stock": "integer",
    "weight": "integer",
    "imageUrl": "string",
    "productStatus": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "qrcode": "string"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found",
  "error": "Failed to read Food with id <id>"
}
```

&nbsp;

## 16. POST /customers/orders/add/:id

Description:

- Add customer order by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success Add New Order to Cart",
  "data": {
    "orderStatus": "string",
    "id": "integer",
    "stock": "integer",
    "totalCost": "integer",
    "ProfileId": "integer",
    "ProductId": "integer",
    "updatedAt": "date",
    "createdAt": "date"
  }
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden",
  "error": "string"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found",
  "error": "Product with id <id> is not found!"
}
```

&nbsp;

## 17. GET /customers/orders/cart

Description:

- Get customer cart order from db

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success GET Cart List",
  "data": [
    {
      "id": "integer",
      "orderStatus": "string",
      "stock": "integer",
      "totalCost": "integer",
      "ProfileId": "integer",
      "ProductId": "integer",
      "createdAt": "date",
      "updatedAt": "date",
      "Product": {
        "id": "integer",
        "name": "string",
        "price": "integer",
        "stock": "integer",
        "weight": "integer",
        "imageUrl": "string",
        "productStatus": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    },
    ...
  ]
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden",
  "error": "string"
}
```

&nbsp;

## 18. DELETE /customers/orders/delete/:id

Description:

- Delete customer order by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success Cancell Order from Cart"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden",
  "error": "string"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found",
  "error": "Order with id <id> is not found!"
}
OR
{
  "message": "Data not found",
  "error": "Product with id <id> is not found!"
}
```

&nbsp;

## 19. GET /customers/orders/list

Description:

- Get customer order list from db

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Success GET Order List",
    "data": [
        {
            "id": "integer",
            "orderStatus": "string",
            "stock": "integer",
            "totalCost": "integer",
            "ProfileId": "integer",
            "ProductId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "Product": {
                "id": "integer",
                "name": "string",
                "price": "integer",
                "stock": "integer",
                "weight": "integer",
                "imageUrl": "string",
                "productStatus": "string",
                "createdAt": "date",
                "updatedAt": "date"
            }
        },
        ...
    ]
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden",
  "error": "string"
}
```

&nbsp;

## 20. POST /midtrans/snap-token

Description:

- Make midtrans token using cost

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "totalCostNeedToPay": "integer"
}
```

_Response (201 - Created)_

```json
{
  "message": "Success Create Token Transaction Midtrans",
  "transaction": {
    "token": "string",
    "redirect_url": "string"
  }
}
```

&nbsp;

## 21. PATCH /midtrans/change-cart-to-payed

Description:

- Change status order from cart to payed

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Paying successful!"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Bad Request",
  "error" : [
    "string",
    ...
  ]
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized",
  "error": "string"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error",
  "error": "<error>"
}
```
