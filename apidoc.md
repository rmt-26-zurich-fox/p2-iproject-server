## Endpoints

List of Available Endpoints:
- `POST /register`
- `POST /login`
- `POST /google-sign-in`
- `GET /location`
- `GET /location/:id`
- `POST /favorite/:id`
- `GET /favorite`
- `DELETE /favorite`

### POST /register
#### Description
- Create a new user

#### Request
- Body
    ```json
    {
     "username": string,
     "email": string,
     "password": string
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
    "data": {
        "id": integer,
        "username": string,
        "email": string,
        "password": string,
        "updatedAt": date,
        "createdAt": date
    }
   }
   ```


### POST /login
#### Description
- Create a new user

#### Request
- Body
    ```json
    {
     "email": string,
     "password": string
    }
    ```
#### Response
_200 - Created_
- Body
    ```json
    {
    "access_token": string
    }
    ```

### GET /location
### Description
- get all data location
### Response
_200 - OK_
- Body
  ```json
    {
  "data": [
    {
      "id": 1,
      "nama": string,
      "gambar_url": string,
      "kategori": string
    }
    ......
  ],
  "page": integer
  }
  ```

### GET /location/:id
### Description
- get data location by id
### Response
_200 - OK_
- Body
  ```json
   {
    "id": integer,
    "nama": integer,
    "gambar_url": integer,
    "kategori": integer,
    "deskripsi": integer,
    "photo_by": integer,
    "latitude": integer,
    "longitude": integer
   }
  ```

### POST /favourite/:id
### Description
- create favorite 
### Request 
- headers
  ```json
  {
    "access_token": string,
    "id": string
  }
  ```
### Response
_201 - Created_
- Body
  ```json
   {
    "favourite": {
        "id": integer,
        "name": string,
        "gambarUrl": string,
        "kategori": string,
        "latitude": string,
        "longitude": string,
        "userId": integer,
        "locationId": integer,
        "updatedAt": date,
        "createdAt": date
    }
  }
  ```
_401 - Unauthorized_
- Body 
  ```json
    {
    "message": "Food Already Exist in favorite"
    }
  ```

### GET /favourite
### Description
- get favourite data by userId
### Request 
- headers
  ```json
  {
    "access_token": string
  }
  ```
### Response
_200 - OK_
- Body
  ```json
   [ "Favorite" {
        "dataValues": {
        "id": 31,
        "name": 'Leuwi Cidomas',
        "gambarUrl": string,
        "kategori": 'Alam',
        "latitude": string,
        "longitude": string,
        "userId": integer,
        "locationId": integer,
        "createdAt": date,
        "updatedAt": date 
       }
    }
  ]
  ```
### DELETE /favourite/:id
### Description
- delete favorite 
### Request 
- headers
  ```json
  {
    "access_token": string,
    "id": string
  }
  ```
### Response
_201 - Created_
- Body
  ```json
   {
    "message": string
   }
  ```

### Global Error
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      {
        "message": string
      }
    }
    ```
_400 - Bad Request_
- Body
    ```json
    {
      "statusCode": 400,
      {
        "message": string
      }
    }
    ```
_404 - Bad Request_
- Body
    ```json
    {
      "statusCode": 404,
      {
        "message": string
      }
    }
    ```
_401 - Unauthorized_
- Body
    ```json
    {
      "statusCode": 401,
      {
        "message": string
      }
    }
    ```