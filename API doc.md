## Endpoints :

List of available endpoints:

- `POST /user/register`
- `POST /user/login`
- `POST /user/google-sign-in`
- `GET /cloth`
- `POST /cloth`
- `GET /cloth/users`
- `GET /cloth/package`
- `POST /cloth/payment`
- `PATCH /cloth/:id`

## 1. POST /user/register

Description:

- Register user to database

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "success create user",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "email cannot be empty"
    ]
}
OR
{
  "message": [
    "this email is not a valid email"
    ]
}
OR
{
  "message": [
   "password cannot be empty"
    ]
}
OR
{
  "message": [
    "phoneNumber cannot be empty"
    ]
}
OR
{
  "message": [
    "name cannot be empty"
    ]
}
OR
{
  "message": [
    "this email already registered"
    ]
}
```

&nbsp;

## 2. POST /user/login

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
  "access_token": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 3. POST /user/google-sign-in

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
  "role": "string",
  "phoneNumber": "string",
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "email": "string",
  "role": "string"
}
```

&nbsp;

&nbsp;

## 4. GET /cloth

Description:

- Get all cloth from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "UserId": "integer",
    "PackageId": "integer",
    "deadlineDate": "date",
    "weight": "integer",
    "totalPrice": "integer",
    "status": "string",
    "payment": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "Package": {
      "id": "integer",
      "name": "string",
      "price": "integer",
      "deadlineDay": "integer",
      "createdAt": "date",
      "updatedAt": "date",
    }
  },
  {
    "id": "integer",
    "UserId": "integer",
    "PackageId": "integer",
    "deadlineDate": "date",
    "weight": "integer",
    "totalPrice": "integer",
    "status": "string",
    "payment": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "Package": {
      "id": "integer",
      "name": "string",
      "price": "integer",
      "deadlineDay": "integer",
      "createdAt": "date",
      "updatedAt": "date",
    }
  },
  ...
]
```

&nbsp;

## 5. POST /cloth

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
  "UserId": "integer",
  "PackageId": "integer",
  "weight": "integer",
  "deadlineDate": "date",
  "totalPrice": "integer",
  "status": "string",
  "payment": "string"
}
```

_Response (201 - Created)_

```json
{
  "UserId": "integer",
  "PackageId": "integer",
  "weight": "integer",
  "deadlineDate": "date",
  "totalPrice": "integer",
  "status": "string",
  "payment": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "name cannot be empty"
    ]
}
OR
{
  "message": [
   "total price cannot be empty"
    ]
}
OR
{
  "message": "Foreign Key not found"
}
```

&nbsp;

## 6. GET /cloth/users

Description:

- Get all user from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
        "email": "string",
        "role": "string",
        "id": "integer",
    },
  {
        "email": "string",
        "role": "string",
        "id": "integer",
    },
  ...
]
```

&nbsp;

## 7. GET /cloth/package

Description:

- Get all package from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "name": "string",
        "price": "integer",
        "deadlineDay": "integer",
        "createdAt": "date",
        "updatedAt": "date",
    },
    {
        "id": "integer",
        "name": "string",
        "price": "integer",
        "deadlineDay": "integer",
        "createdAt": "date",
        "updatedAt": "date",
    },
  ...
]
```

&nbsp;

## 8. POST /cloth/payment

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
  "UserId": "integer",
  "id": "integer",
  "totalPrice": "integer"
}
```

_Response (201 - Created)_

```json
{
  "midtrans_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
   "total price cannot be empty"
    ]
}
OR
{
  "message": "Foreign Key not found"
}
```

&nbsp;

## 9. PATCH /cloth/:id

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
  "id": "integer"
}
```

- body:

```json
{
  "status": "string",
  "payment": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "string"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
