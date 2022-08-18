## Endpoints

List of Available Endpoints:


-`POST /users/register`

-`POST /users/login`

-`GET /courses`

-`GET /course/:courseId`


> ### POST /users/register

#### Description

- Create a new user data

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
      "username": String,
      "email": String,
      "password": String,
      "phoneNumber": Integer,
      "address": String
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "message": "User has been registered",
    "id": Integer,
    "email": String
  }
  ```

_400 - Bad Request_
-Body

```json
{
"message":String
}
```

> ### POST /users/login

#### Description

- Login user

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
      "email": String,
      "password": String
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "access_token": String,
    "email":String
  }
  ```

_400 - Bad Request_
-Body

```json
{
  "message": "Invalid email/password"

}
```

  >### GET /courses

#### Description
- get data for news

#### Request

- Query
  ```json
  {
    "page": Integer,
    "search": String,
    "filter": Integer
  }
  ```
#### Response
_200 -OK

```json
{
        "response": {
        "totalItems": 8,
        "news": [
            {
                "id": 1,
                "title": String,
                "description": Text,
                "duration": Integer,
                "UserId": Integer,
                "price": Integer,
                "createdAt": Date,
                "updatedAt": Date
            },
            }...
        ],
        "totalPages": Integer,
        "currentPage": Integer
}
```
