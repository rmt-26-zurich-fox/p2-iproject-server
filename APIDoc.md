## Endpoints

List of Available Endpoints:


-`POST /users/register`

-`POST /users/login`

-`GET /courses`

-`GET /course/:courseId`

-`GET /students/shopping-cart`

-`GET /students/courselist`

-`POST /students/courselist/:courseId/add`

-`POST /students/shopping-cart/:courseId`

-`DELETE /students/shopping-cart/delete`


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
- get data for course

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

  >### GET /courses/:courseId

#### Description
- get data for course

#### Request


#### Response
_200 -OK

```json
"data": {
        "id": Integer,
        "title": String,
        "description": Text,
        "duration": Integer,
        "UserId": Integer,
        "price": Integer,
        "createdAt": Date,
        "updatedAt": Date
    }
```

  >### GET /students/shopping-cart

#### Description
- get data for shopping cart

- Headers
  ```json
  {
    "access_token": String
  }
  ```

  #### Response
_200 -OK

```json
 {
        "id": Integer,
            "UserId": Integer,
            "CourseId": Integer,
            "createdAt": Date,
            "updatedAt": Date,
            "Course": {
                "id": Integer,
                "title": String,
                "description": Text,
                "duration": Integer,
                "UserId": Integer,
                "price": Integer,
                "createdAt": Date,
                "updatedAt": Date
    }}
```

>### GET /students/courselist

#### Description
- get data for course owned by student

- Headers
  ```json
  {
    "access_token": String
  }
  ```

  #### Response
_200 -OK

```json
 {
        "id": Integer,
            "UserId": Integer,
            "CourseId": Integer,
            "createdAt": Date,
            "updatedAt": Date,
            "Course": {
                "id": Integer,
                "title": String,
                "description": Text,
                "duration": Integer,
                "UserId": Integer,
                "price": Integer,
                "createdAt": Date,
                "updatedAt": Date
    }}
```

>### GET /students/courselist

#### Description
- Add course to courselist

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response 
```json
{"message": "Course added to course list",}
```
>### POST /shopping-cart/:courseId

#### Description
- Add course to shopping cart

#### Response 
```json
{"message": "Course added to shopping cart",}
```


>### DELETE /shopping-cart/delete

#### Description
- Delete shopping cart

#### Response 
```json
{"message": "Shopping cart is deleted",}
```


> ### Global Error

#### Response

_500 - Internal Server Error_

- Body

  ```json
  {
    "message": "Internal Server Error"
  }
  ```


