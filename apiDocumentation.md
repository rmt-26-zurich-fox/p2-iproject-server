## Endpoints

List of Available Endpoints:

- `POST /users/userRegister`
- `POST /users/userLogin`
- `POST /doctors/doctorRegister`
- `POST /doctors/doctorSpecializations`
- `GET /doctors`
- `GET /doctors/favouriteDoctors`
- `PATCH /doctors/favouriteDoctors/:doctorId`
- `GET /symptom`
- `GET /diseases`
- `GET /profiles`
- `PUT /profiles/:id`
- `GET /midtrans/payment`

### 1. POST /users/userRegister

Request:

- body:

```json
{


        "email": String,
        "password": String,
        "role": String,

}
```

_Response (201 - Created)_

```json
{
        "email": String,
        "password": String,
        "role": String,
        "createdAt": Date,
        "updatedAt": Date,

}
```

_Response (400 - Bad Request)_

```json

{
  "message": "Invalid email format"
}
OR
{
  "message": "Email has been used"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Role is required"
}
```

&nbsp;

## 2. POST /users/userLogin

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

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}

```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

### 3. POST /doctors/doctorRegister

Request:

- body:

```json
{


        "email": String,
        "password": String,
        "role": String,

}
```

_Response (201 - Created)_

```json
{
        "email": String,
        "password": String,
        "role": String,
        "createdAt": Date,
        "updatedAt": Date,

}
```

_Response (400 - Bad Request)_

```json

{
  "message": "Invalid email format"
}
OR
{
  "message": "Email has been used"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Role is required"
}
```

### 4. POST /doctors/doctorSpecializations

Request:

- body:

```json
{


        "specialization_one": String,
        "specialization_two": String,
        "specialization_three": String,
        "specialization_four": String,
        "userId": INTEGER,


}
```

_Response (201 - Created)_

```json
{
        "specialization_one": String,
        "specialization_two": String,
        "specialization_three": String,
        "specialization_four": String,
        "userId": INTEGER,
        "createdAt": Date,
        "updatedAt": Date,

}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Specialization is required"
}
```

### 5. GET /doctors

Description:

- Get all doctors from database

#### Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
"getDoctors": [
        {
            "userId" :INTEGER,
            "createdAt": DATE,
            "updatedAt": DATE,
            "User": {
                "id": INTEGER,
                "email": STRING,
                "password": STRING,
                "role": STRING,
                "createdAt": DATE,
                "updatedAt": DATE
            },

        }
]
```

### 6. GET /doctors/favouriteDoctors

Description:

- Get all getFavourites from database

#### Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
"getFavourites": [
        {
            "userId" :INTEGER,
            "createdAt": DATE,
            "updatedAt": DATE,
            "User": {
                "id": INTEGER,
                "email": STRING,
                "password": STRING,
                "role": STRING,
                "createdAt": DATE,
                "updatedAt": DATE
            },

        }
]
```

### 7. POST /users/userRegister

Request:

- body:

```json
{


        "status": String,

}
```

_Response (200 - Updated)_

```json
{

        "status": String,
        "createdAt": Date,
        "updatedAt": Date,

}
```

### 8. GET /symptom

Description:

- Get all symptom from database

#### Request:

_Response (200 - OK)_

```json
"symptom": [
        {
            "name" :STRING,
            "createdAt": DATE,
            "updatedAt": DATE,
        }
]
```

### 9. GET /disease

Description:

- Get all disease from database

#### Request:

_Response (200 - OK)_

```json
"symptom": [
        {
            "diseaseId" :INTEGER,
            "symptomId" :INTEGER,
            "createdAt": DATE,
            "updatedAt": DATE,
        }
]
```

### 10. GET /profiles

Description:

- Get profiles from database by req.user.id

#### Request:

_Response (200 - OK)_

```json
"symptom": [
        {
            "userId" :INTEGER,
            "createdAt": DATE,
            "updatedAt": DATE,
        }
]
```

## 11. PUT /profiles/:id

Request:

- body:

```json
{

        "firstName": String,
        "lastName": String,
        "dateOfBirth": DATE,
        "gender": String,
        "height": String,
        "imageUrl": String,
        "phoneNumber":STRING,
        "location":STRING

}
```

_Response (200 - Updated)_

```json
{
        "firstName": String,
        "lastName": String,
        "dateOfBirth": DATE,
        "gender": String,
        "height": String,
        "imageUrl": String,
        "phoneNumber":STRING,
        "location":STRING,
        "updatedAt": Date,
        "status" : STRING,

}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is required"
}
OR
{
  "message": "Content is required"
}
OR
{
  "message": "image url is required"
}
OR
{
  "message": "author is required"
}
OR
{
  "message": "Category is required"
}

```

### Global Error

#### Response

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
