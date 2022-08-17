## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `POST /google-sign-in`

### POST /register

#### Description

- Create new account

#### Request

- Body
  ```json
  {
    "userName": String,
    "email": String,
    "password": String,
    "phoneNumber": Integer,
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    "message": "User successfully created",
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
    "message": [
      "E-mail already registered",
      "E-mail required",
      "Please input valid e-mail",
      "Password required",
      "Password must contain at least 5 characters"
    ]
  }
  ```

### POST /login

#### Description

- User login

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
    "access_token": String
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "message": ["Invalid email or password"]
  }
  ```

### POST /google-sign-in

#### Description

- User login with google account

#### Request

- headers:

  ```json
  {
    "google_token": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "access_token": String
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
