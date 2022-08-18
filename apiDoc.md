## Endpoints

List of Available Endpoints:

Users
- `POST /register`
- `POST /login`
- `POST /google-sign-in`

Houses
- `GET /houses`
- `GET /houses/categories`
- `GET /houses/facilities`
- `GET /houses/details/:houseId`
- `POST /houses`
- `POST /houses/midtrans`

### POST /register

#### Description

- Create a new Customer account

#### Request

- Body
  ```json
  {
    "username": String,
    "email": String,
    "password": String,
    "firstName": String,
    "lastName": String,
    "phone": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "message": "Your account successfully created"
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


### POST /login

#### Description

- login to existing account

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
    "access_token": String,
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "Invalid email/password"
    }
  }
  ```

### POST /google-sign-in

#### Description

- login with 3rd party api google

#### Response

_200 - OK_

- Body
  ```json
  {
    "access_token": String,
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "Invalid email/password"
    }
  }
  ```

### GET /houses

#### Description

- get all houses available

#### Response

_200 - OK_

- Body
  ```json
  [
    {
      "id": Integer,
      "name": String,
      "location": String,
      "price": Integer,
      "review": String,
      "CategoryId": Integer,
      "UserId": Integer,
      "Images": [
        {
        "id": 1,
        "imageUrl": String
        },
        ....
      ],
      "Category": {
        "id": Integer,
        "name": String
      }
    },
    ....
  ]
  ```

### GET /houses/categories

#### Description

- get all house categories available

#### Response

_200 - OK_

- Body
  ```json
  [
    {
      "id": Integer,
      "name": String,
    },
    ....
  ]
  ```

### GET /houses/facilities

#### Description

- get all house facilities available

#### Response

_200 - OK_

- Body
  ```json
  [
    {
      "id": Integer,
      "name": String,
    },
    ....
  ]
  ```

### GET /houses/details/:houseId

#### Description

- find one house by id

#### Response

_200 - OK_

- Body
  ```json
  {
    "id": Integer,
    "name": String,
    "location": String,
    "price": Integer,
    "review": String,
    "CategoryId": Integer,
    "UserId": Integer,
    "User": {
      "id": Integer,
      "username": String
    },
    "Images": [
      {
        "id": Integer,
        "imageUrl": String
      },
      ....
    ],
    "Category": {
      "id": Integer,
      "name": String
    },
    "HouseFacilities": [
      {
        "id": Integer,
        "Facility": {
          "name": String
        }
      },
      ....
    ]
  }
  ```

### POST /houses

#### Description

- open a new house to hosting with 3rd-Party-API Imagekit


#### Request

- Body
  ```json
  {
    "name": String,
    "location": String,
    "price": Integer,
    "imageUrl": String,
    "CategoryId": Integer,
    "Facilities": [String],
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "message": "New house successfully created"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": [String]
    }
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": "Please login first"
    }
  }
  ```


### POST /midtrans

#### Description

- create transaction token from 3rd-Party-API Midtrans

#### Request

- Body
  ```json
  {
    "price": Integer
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    String
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": "Please login first"
    }
  }
  ```