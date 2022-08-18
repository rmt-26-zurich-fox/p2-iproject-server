## Endpoints

List of Available Endpoints:

- `POST /register/`
- `POST /login/`
- `POST /google-sign-in/`
- `GET /post`
- `POST /post`
- `DELETE /post/:id`
- `GET /post/:id` 
- `GET profile/:id`
- `GET profile/:id/like`
- `POST /comment/:id`
- `POST /like/:id`
- `DELETE /like/:id`
- `DELETE /comment/:id/:commentId`

### POST /register/

#### Description

- register new user

#### Request
- Body
  ```json
  {
  "username": String,
   "email": String,
   "password": String,
  }
  ```
#### Response

_201 - Created_
```json
{
    "message": String,
    "email": String,
}
```
_400 - Bad Request_
```json
{
    "message": [
        "Invalid email input"
    ]

}
```
OR
```json
{
    "message": [
        "Password required"
    ]

}
```
OR 
```json
{
    "message": [
        "username required"
    ]
}
```
OR 
```json
{
    "message": [
        "Invalid email input",
        "Email required",
        "username required",
        "Password required"
    ]
}
```
OR
```json
{
    "message": "email already exists"
}
```


### POST /login/
#### Description

- login to app
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
```json
{
    "access_token": String,
    "email": String,
    "id": Integer
}
```
_400 - Bad Request_
```json
{
    "message": "Please input your email and password"
}
OR
{
    "message": "Invalid email or password"
}
```


### POST /google-sign-in/
#### Description

- Login to app with google account
#### Response

_200 - OK_
```json
{
    "access_token": String,
    "email": String,
    "id": Integer
}
```


### GET /post

#### Description
- read all post
#### Response
_200 - OK_
```json
[
    {
        "id": Integer,
        "content": String,
        "caption": String,
        "UserId": Integer,
        "imgUrl": String,
        "createdAt": DATE,
        "updatedAt": DATE,
        "User": {
            "id": Integer,
            "email": String,
            "username": String
        },
        "Likes": [
            {
                "id": Integer
            }
        ]
    },
    ...
]
```
### POST /post
- upload new post

#### Request
- Headers
  ```json
  {
    "access_token": String
  }
  ```
- Body
  ```json
  {
    "captio": String,
    "content": String,
    "imgUrl": File,
  }
  ```

#### Response
_201 - Created_
```json
{
    "message": String,
}
```

### DELETE /post/:id
#### Description

- Delete post by Request params id

#### Request
- Headers
  ```json
  {
    "access_token": String
  }
  ```
#### Response
_200_
```json
{
    "message": String,
}
```

### GET /post/:id
#### Description

- read post by params id
#### Request
- Headers
  ```json
  {
    "access_token": String
  }
  ```
#### Response
_200_
```json
{
    "post": {
        "id": Integer,
        "content": String,
        "caption": String,
        "UserId": Integer,
        "imgUrl": String,
        "createdAt": DATE,
        "updatedAt": DATE,
        "User": {
            "id": Integer,
            "email": String,
            "username": String
        },
        "Likes": ARRAY OF INSTANCE,
        "Comments": ARRAY OF INSTANCE
    }
}
```

### GET profile/:id

#### Description
- read post by params id
#### Request
- Headers
  ```json
  {
    "access_token": String
  }
  ```
#### Response
_200 - OK_
```json
{
     "user": {
        "id": 1,
        "email": String,
        "username": String
    },
     "post": [
        {
            "id": Integer,
            "content": String,
            "caption":String,
            "UserId": Integer,
            "imgUrl": String,
            "createdAt": DATE,
            "updatedAt": DATE,
            "User": {
                "id": Integer,
                "email": String,
                "username": String
            },
            "Likes": []
        },
        ...
     ]
}
```

### GET profile/:id/like
#### Description

- read user's favorite post data
#### Request
- Headers
```json
{
    "access_token": String
}
```
#### Response
_200 - OK_
```json
[{
        "id": Integer,
        "content": String,
        "caption":String,
        "UserId": Integer,
        "imgUrl": String,
        "createdAt": DATE,
        "updatedAt": DATE,
        "User": {
            "id": Integer,
            "email": String,
            "username": String
        },
        "Likes": []
        },
        ...
]

```
### POST /comment/:id
#### Description
- Add new comment to post with params id

#### Request
- Headers
```json
{
    "access_token": String
}
```
- Body
```json
{
    "comment" : String
}
```
#### Response
_201 - Created_

- Body
```json
{
    "message": "succes add comment"
}
```

### POST /like/:id
#### Description
- Add Like the post with params id
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
    "message": "succes like this post"
}
```
_400_
- Body
```json
{
    "message":"You Already Like this post" 
}
```

### DELETE /like/:id
#### Description
- Unlike the post with given params id
#### Request
- Headers
```json
{
    "access_token": String
}
```
#### Response
_200 - OK_
```json
{
    "message": "success unlike this post"
}
```
_400_
```json
{
    "message": "success unlike this post"
}
```


### DELETE /comment/:id/:commentId
#### Description

- DELETE comment in the post 
#### Request
- Headers
```json
{
    "access_token": String
}
```
_200 - OK_
```json
{
    "message": "success delete comment"
}
```

_404 - Not Found_
```json
{
    "message": "Comment Not Found"
}
```
### Global Error

#### Response
 _401 - unauthorize_
 - Body
 ```json
{
    "message": "Please login"
}
```
OR
```json
{
    "message": "Invalid token"
}
```

_403 - Forbidden_

- Body

 ```json
{
    "message": "Forbidden"
}
```

_404 - Not Found_
- Body

 ```json
{
    "message": "Data not found"
}
```
OR
 ```json
{
    "message": "Comment Not Found"
}
```
OR
 ```json
{
    "message": "Post Not Found"
}






_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": ["Internal Server Error"]
    }
  }
  ```






























