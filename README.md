# p2-cms-integration-server
## **List Endpoints**

List of Available Endpoints:
### **- Users**
- `POST /users/register`
- `POST /users/login`
- `POST /users/googleSignIn`

### **- Ip Location** 
- `GET /ip`

### **- Search Location** 
- `POST /search`

### **- Popular Location** 
- `GET /popular`
- `GET /popular/:popularId`

### **- Popular Location** 
- `POST /saved`
- `GET /saved`
- `GET /saved/:savedId`
- `DELETE /saved/:savedId`


## **Endpoints Result**
### **POST /users/register**
#### Description
- Create new user data

#### Request
- Headers
    ```json
    {
      "Content-Type": "postman/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "email": String,
      "password": String,
      "phoneNumber": String,
      "location": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "message": "Success create new user",
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

### **POST /users/login**
#### Description
- Login based on user data

#### Request
- Headers
    ```json
    {
      "Content-Type": "postman/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "email": String,
      "password": String,
    }
    ```
#### Response
_201 - OK_
- Body
    ```json
    {
      "access_token": String,
      "id": Integer,
      "email": String,
      "location": String
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "statusCode": 400,
      "error": {
        "message": "Email or password cannot be empty"
      }
    }
    ```

_401 - Not Authorized_
- Body
    ```json
    {
      "statusCode": 401,
      "error": {
        "message": "Error invalid email or password"
      }
    }
    ```


### **POST /users/googleSignIn**
#### Description
- Login using google account

#### Request
- Headers
    ```json
    {
      "Content-Type": "postman/x-www-form-urlencoded"
    }

#### Response
_201 - OK_
- Body
    ```json
    {
      "access_token": String,
      "id": Integer,
      "email": String,
      "role": String
    }
    ```

_403 - Forbidden_
- Body
    ```json
    {
      "statusCode": 403,
      "error": {
        "message": "Forbidden"
      }
    }
    ```

### **GET /ip**
#### Description
- Get Weather forecasting data based on ip address location

#### Response
_200 - OK_

- Body
    ```json
    {
      "location": {Object},
      "current": {Object},
      "forecast": {
          "forecastday": [Array]
      },
    }
    ```

_404 - NotFound_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "No matching location found"
      }
    }
    ```

### **GET /search**
#### Description
- Get Weather forecasting data based on searched location

#### Request
- Body
    ```json
    {
      "name": String
    }
    ```
#### Response
_200 - OK_

- Body
    ```json
    {
      "location": {Object},
      "current": {Object},
      "forecast": {
          "forecastday": [Array]
      },
    }
    ```

_404 - NotFound_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "No matching location found"
      }
    }
    ```

### **GET /popular**
#### Description
- Get all popular location data 

#### Response
_200 - OK_

- Body
    ```json
    {
    "locations": [
        {
            "id": Integer,
            "name": String,
            "country": String,
            "latitude": Integer,
            "longtitude": Integer,
            "imgUrl": String,
            "createdAt": Date,
            "updatedAt": Date
        }
      ]
    } 
    ```

### **GET /popular/:popularId**
#### Description
- Get Weather forecasting data based on popular location

#### Response
_200 - OK_

- Body
    ```json
    {
      "location": {Object},
      "current": {Object},
      "forecast": {
          "forecastday": [Array]
      },
    }
    ```
    
_404 - NotFound_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Data not found"
      }
    }
    
    OR

     {
      "statusCode": 404,
      "error": {
        "message": "No matching location found"
      }
    }
    ```

### **POST /saved**
#### Description
- Adding new location data to saved location data

#### Request
- Headers
    ```json
    {
      "access_token": String
    }

#### Response
_201 - Created_
- Body
    ```json
    {
      "message": "Success saved new location",
      "saved": {
        "id": Integer,
        "name": String,
        "UserId": Integer,
        "updatedAt": Date,
        "createdAt": Date
    }
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

    OR

    {
      "statusCode": 400,
      "error": {
        "message": "This location already saved"
      }
    }

    ```
_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Data not found"
      }
    }
    ```

### **GET /saved**
#### Description
- Get all saved location data 

#### Request
- Headers
    ```json
    {
      "access_token": String
    }
#### Response
_200 - OK_

- Body
    ```json
    {
    "locations": [
        {
            "id": Integer,
            "name": String,
            "country": String,
            "latitude": Integer,
            "longtitude": Integer,
            "imgUrl": String,
            "createdAt": Date,
            "updatedAt": Date
        }
      ]
    } 
    ```

### **GET /saved/:savedId**
#### Description
- Get Weather forecasting data based on saved location

#### Request
- Headers
    ```json
    {
      "access_token": String
    }

#### Response
_200 - OK_

- Body
    ```json
    {
      "location": {Object},
      "current": {Object},
      "forecast": {
          "forecastday": [Array]
      },
    }
    ```
    
_404 - NotFound_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Data not found"
      }
    }
    
    OR

     {
      "statusCode": 404,
      "error": {
        "message": "No matching location found"
      }
    }
    ```

### **DELETE /saved/:savedId**
#### Description
- Remove a saved location data based on given id

#### Request
- Headers
    ```json
    {
      "access_token": String
    }

#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "Saved Location with id {id} success to delete"
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Data not found"
      }
    }
    ```

### **Global Error**
#### Response
_401 - Unauthorized_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": "Please login first"
      }
    }
    ```

_401 - Unauthorized_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": "Invalid token"
      }
    }
    ```

_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": "Internal Server Error"
      }
    }
    ```
