## Endpoints

List of Available Endpoints:

- `GET /threads`
- `GET /threads/:threadId`
- `POST /threads`
- `GET /replies/:threadId`
- `POST /replies`

### GET /threads

#### Description

- Get all Threads

#### Response

_200 - OK_

- Body

  ```json
  [
    {
        "id": Integer,
        "title": String,
        "UserId": 1,
        "createdAt": String,
        "updatedAt": String,
        "User": {
            "id": Integer,
            "userName": String,
            "email": String,
            "imageUrl": String
        }
    },
    ...
  ]
  ```

### GET /threads/:threadId

#### Description

- Get thread by ID

#### Response

_200 - OK_

- Body

  ```json

  {
      "id": Integer,
      "title": String,
      "UserId": 1,
      "createdAt": String,
      "updatedAt": String,
      "User": {
          "id": Integer,
          "userName": String,
          "email": String,
          "imageUrl": String
      }
  },

  ```

### POST /threads

#### Description

- Create a new thread

#### Request

- headers:

  ```json
  {
    "access_token": String
  }
  ```

- Body:

  ```json
  {
    "title": String,
    "content": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "message": "Thread posted"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": ["Invalid token"]
  }
  ```

### GET /replies/:threadId

#### Description

- GET replies by thread ID

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
    "threadId": Integer,
  }
  ```

#### Response

_201 - OK_

- Body
  ```json
  [
    {
      "id": Integer,
      "content": String,
      "UserId": Integer,
      "ThreadTitleId": Integer,
      "createdAt": String,
      "updatedAt": String,
      "User": {
        "id": Integer,
        "userName": String,
        "email": String,
        "imageUrl": String
      }
    },
    ...
  ]
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": ["Invalid token"]
  }
  ```

### POST /replies

#### Description

- Create reply

#### Request

- headers:

  ```json
  {
    "access_token": String
  }
  ```

- Body:

  ```json
  {
    "content": String,
    "ThreadId": Integer,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "message": "Reply posted"
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
