# Court Report API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-sign-in`
- `GET /reports`
- `POST /reports`
- `GET /reports/:id`
- `DELETE /reports/:id`
- `PUT /reports/:reportId`

&nbsp;


## 1. POST /register
Request:

-body:
```json
{
  "username": "STRING",
  "email": "STRING",
  "password": "STRING",
  "phoneNumber": "STRING"
}
```


_Response (201 - created)_

```json
{
  {
    "message": "user registered",
    "user": {
        "id": "INTEGER",
        "email": "STRING"
    }
}
}
```

_Response (400 - bad request)_

```json
{
  "message": "Username is required"
}
```
OR

```json
{
  "message": "Email format must be valid"
}
```

OR
```json
{
  "message": "Email already been used"
}
```

OR

```json
{
  "message": "Email is required"
}
```
OR

```json
{
  "message": "Password is required"
}
```
OR

```json
{
  "message": "Email address invalid"
}
```

OR

```json
{
  "message": "Domain or MX server does not exists"
}
```


&nbsp;


## 2. POST /login
Request:

-body:
```json
{
  "email": "STRING",
  "password": "STRING"
}
```


_Response (200 - OK)_

```json
{
  "access_token": "STRING"
}
```

_Response (401 - Unathorized)_

```json
{
  "message": "Email or Password invalid"
}
```
OR
```json
{
  "message": "invalid token"
}
```
OR
```json
{
  "message": "Unathorized"
}
```

&nbsp;


## 3. POST /google-sign-in
Request:

-body:
```json
{
  "Email": "STRING",
  "password": "STRING"
}
```


_Response (200 - OK)_

```json
{
  "access_token": "STRING"
}
```

_Response (401 - Unathorized)_

```json
{
  "message": "Email or Password invalid"
}
```


&nbsp;


## 4. GET /reports

Description:
- Get user Report from database

Request:

_header_
```json
{
  "acces_token": "STRING"
}
```

_Response (200 - OK)_

```json

 {
    "totalItems": "INTEGER",
    "Food": [
        {
            "id": "INTEGER",
            "imageUrl": "STRING",
            "name": "STRING",
            "CategoryId": "INTEGER",
            "UserId": "INTEGER",
            "createdAt": "DATE",
            "updatedAt": "DATE"
        },
       ...
    ],
    "totalPages": "INTEGER",
    "currentPage":  "INTEGER"
}
```

&nbsp;


## 5. POST /reports

Request:
_header_
```json
{
  "acces_token": "STRING"
}
```
_body_
```json
{
  "imageUrl":"STRING",
  "name":"STRING",
  "CategoryId":"INTEGER",
  "UserId":"INTEGER"
}
```

Response (201 - Create)_

```json
{
    "data": {
        "id": "INTEGER",
        "imageUrl": "STRING",
        "name": "STRING",
        "CategoryId": "INTEGER",
        "UserId": "INTEGER",
        "updatedAt": "DATE",
        "createdAt": "DATE"
    },
    "trans": {
        "token": "STRING",
        "redirect_url": "STRING"
    }
}
```


Response (400 - Bad Request)_

```json
{
  "message": "CategoryId is required"
}
```
OR
```json
{
  "message": "name is required"
}
```
OR
```json
{
  "message": "imageUrl is required"
}
```
&nbsp;


## 6. GET /reports/:id

Description:
- Get reports by id

Request:

_header_
```json
{
  "acces_token": "STRING"
}
```

- params:

```json
{
  "id": "INTEGER"
}
```

_Response (200 - OK)_

```json
{
    "id": "INTEGER",
    "imageUrl": "STRING",
    "name": "STRING",
    "CategoryId": "INTEGER",
    "UserId": "INTEGER",
    "createdAt": "DATE",
    "updatedAt": "DATE",
    "Category": {
        "id": "INTEGER",
        "name": "STRING",
        "createdAt": "DATE",
        "updatedAt": "DATE"
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

&nbsp;


## 7. DELETE /reports/:id

Description:
- Delete reports by id

Request:
_header_
```json
{
  "acces_token": "STRING"
}
```

- params:

```json
{
  "id": "INTEGER"
}
```

_Response (200 - OK)_

```json
{
    "message": "Success deleted id 2 "
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

&nbsp;


## 8. PUT /reports/:id

Description:
- PUT/EDIT reports by id

Request:

_body_
```json
{
  "imageUrl": "STRING",
  "name": "STRING",
  "CategoryId": "INTEGER"
}
```

_header_
```json
{
  "acces_token": "STRING"
}
```

- params:

```json
{
  "reportId": "INTEGER"
}
```

_Response (200 - OK)_

```json
{
    "message": "Success update Report"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

&nbsp;



## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```