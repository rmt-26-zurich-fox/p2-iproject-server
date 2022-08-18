# Food Restaurant API Documentation

## Endpoints :

List of available endpoints:

- `GET /news`
- `GET /time`
- `GET /weather`
- `GET /items/filter`
- `POST /users/register`
- `POST /users/login`
- `POST /users/google-login`
- `GET /items`
- `GET /items/:id`
- `GET /items/page`
- `POST /items/add`
- `PUT /items/:id`
- `DELETE /items/delete/:id`
- `GET /cart`
- `POST /cart/:id`
- `DELETE /cart/:id`
- `GET /history/list`

&nbsp;

## 1. POST /users/register

Description:

- Register user as customer to database

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string" default "customer",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "User with username <username> email <email> has been created"
}
```

_Response (400 - Bad request)_

```json
{
  "message": "Bad request",
  "error": "string"
}
```

&nbsp;

## 2. POST /users/login

Description:

- Login Customer to database

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
  "data": {
    "token": "string",
    "userName": "string",
    "role": "string"
  }
}
```

&nbsp;

## 3. POST /users/google-login

Description:

- Login customer through google account

Request:

- headers:

```json
{
  "token_google": "string"
}
```

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (200 - OK)_

```json
{
  "token": "string",
  "userName": "string",
  "role": "string",
  "userId": "integer"
}
```

&nbsp;

## 4. GET /items

Description:

- Get all food and related table from database

_Response (200 - OK)_

```json
{
    "message": "Item List",
    "items": [
        {
            "id": "integer",
            "name": "string",
            "description": "string",
            "buyPrice": "integer",
            "sellPrice": "integer",
            "stock": "integer",
            "imageUrl": "string",
            "status": "string",
            "UserId": "integer",
            "SupplierId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "User": {
                "id": "integer",
                "username": "string",
                "email": "string",
                "password": "string",
                "role": "string",
                "phoneNumber": "string",
                "address": "string",
                "createdAt": "date",
                "updatedAt": "date",
            },
            "Supplier": {
                "id": "integer",
                "name": "string",
                "createdAt": "date",
                "updatedAt": "date"
            }
        },
        {
            "id": "integer",
            "name": "string",
            "description": "string",
            "buyPrice": "integer",
            "sellPrice": "integer",
            "stock": "integer",
            "imageUrl": "string",
            "status": "string",
            "UserId": "integer",
            "SupplierId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "User": {
                "id": "integer",
                "username": "string",
                "email": "string",
                "password": "string",
                "role": "string",
                "phoneNumber": "string",
                "address": "string",
                "createdAt": "date",
                "updatedAt": "date",
            },
            "Supplier": {
                "id": "integer",
                "name": "string",
                "createdAt": "date",
                "updatedAt": "date"
            }
        },
        ...
    ]
}
```

&nbsp;

## 5. GET /items/:id

Description:

- Get specific item detail by params

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "This is the item",
  "item": {
            "id": "integer",
            "name": "string",
            "description": "string",
            "buyPrice": "integer",
            "sellPrice": "integer",
            "stock": "integer",
            "imageUrl": "string",
            "status": "string",
            "UserId": "integer",
            "SupplierId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "User": {
                "id": "integer",
                "username": "string",
                "email": "string",
                "password": "string",
                "role": "string",
                "phoneNumber": "string",
                "address": "string",
                "createdAt": "date",
                "updatedAt": "date",
            },
            "Supplier": {
                "id": "integer",
                "name": "string",
                "createdAt": "date",
                "updatedAt": "date"
            }
        }
}
```

&nbsp;

## 6. POST /items/add

Description:

- Add items to database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "buyPrice": "integer",
  "sellPrice": "integer",
  "stock": "integer",
  "imageUrl": "string",
  "status": "string",
  "SupplierId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "message": "Success Add item",
  "item": {
    "name": "string",
    "description": "string",
    "buyPrice": "integer",
    "sellPrice": "integer",
    "stock": "integer",
    "imageUrl": "string",
    "status": "string",
    "SupplierId": "integer"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Bad Request",
  "error" : [
    "string",
    ...
  ]
}
```

&nbsp;

## 7. PUT /items/:id

Description:

- Update item in database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "buyPrice": "integer",
  "sellPrice": "integer",
  "stock": "integer",
  "imageUrl": "string",
  "status": "string",
  "SupplierId": "integer"
}
```

_Response (200 - OK)_

```json
{
    "message": "Success update item <name>"
}
```

&nbsp;

## 8. DELETE /items/delete/:id

Description:

- Delete item from database by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Item with id <id> has been deleted",
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not found",
  "error" : "Not found"
}
```

&nbsp;

## 9. GET /items/filter?page=""&size=""&name=""

Description:

- Get all item and related table filtered by name

Request:

- querry:

```json
{
  "page": "integer",
  "size": "integer",
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Success",
    "items": {
        "totalItems": "integer",
        "tutorials": [
            {
                "id": "integer",
                "name": "string",
                "description": "string",
                "buyPrice": "integer",
                "sellPrice": "integer",
                "stock": "integer",
                "imageUrl": "string",
                "status": "string",
                "UserId": "integer",
                "SupplierId": "integer",
                "createdAt": "date",
                "updatedAt": "date",
            },
            {
                "id": "integer",
                "name": "string",
                "description": "string",
                "buyPrice": "integer",
                "sellPrice": "integer",
                "stock": "integer",
                "imageUrl": "string",
                "status": "string",
                "UserId": "integer",
                "SupplierId": "integer",
                "createdAt": "date",
                "updatedAt": "date",
            }
        ],
        "totalPages": "integer",
        "currentPage": "integer"
    }
}
```

&nbsp;

## 10. GET /cart

Description:

- Get user cart item list from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
      "id": "integer",
      "UserId": "integer",
      "ItemId": "integer",
      "quantity": "integer",
      "createdAt": "date",
      "updatedAt": "date",
      "Item": {
        "id": "integer",
        "name": "string",
        "description": "string",
        "buyPrice": "integer",
        "sellPrice": "integer",
        "stock": "integer",
        "imgUrl": "string",
        "status": "string",
        "UserId": "integer",
        "SupplierId": "integer",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
]

```

&nbsp;

## 11. POST /cart/:id

Description:

- Add user item into cart

Request:

- headers:

```json
{
  "token": "string"
}
```
- params:

```json
{
  "foodId": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
  "message": "Success",
  "carts": {
    "id": "integer",
    "UserId": "integer",
    "ItemId": "integer",
    "quantity": "integer",
    "updatedAt": "date",
    "createdAt": "date"
  }
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden",
  "error": "do not have permission"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not found",
  "error": "Data not found"
}
```

&nbsp;

## 12. DELETE /cart/:id

Description:

- Delete item from user cart

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "orderStatus": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "<name> has been deleted from your shopping cart"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Bad Request",
  "error" : [
    "string",
    ...
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not found",
  "error": "Data not found"
}
```

&nbsp;

## 13. GET /history/list

Description:

- Get add, update, delete items history from database

Request:

- headers:

```json
{
  "token": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Success",
    "history": [
        {
            "id": "integer",
            "name": "string",
            "description": "string",
            "updatedBy": "string",
            "itemId": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        },
       {
            "id": "integer",
            "name": "string",
            "description": "string",
            "updatedBy": "string",
            "itemId": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
}
```

&nbsp;

## 14. GET /news

Description:

- Get current health news from mediastack.api

_Response (200 - OK)_

```json
{
    "pagination": {
        "limit": "integer",
        "offset": "integer",
        "count": "integer",
        "total": "integer"
    },
    "data": [
        {
            "author": "string",
            "title": "string",
            "description": "string",
            "url": "string",
            "source": "The New York Times",
            "image": "string",
            "category": "string",
            "language": "string",
            "country": "string",
            "published_at": "date"
        },
        {
            "author": "string",
            "title": "string",
            "description": "string",
            "url": "string",
            "source": "The New York Times",
            "image": "string",
            "category": "string",
            "language": "string",
            "country": "string",
            "published_at": "date"
        },
    ]
}
```

&nbsp;

## 15. GET /time

Description:

- Get current time from timeapi.io

_Response (200 - OK)_

```json
{
    "year": "integer",
    "month": "integer",
    "day": "integer",
    "hour": "integer",
    "minute": "integer",
    "seconds": "integer",
    "milliSeconds": "integer",
    "dateTime": "string",
    "date": "string",
    "time": "string",
    "timeZone": "string",
    "dayOfWeek": "string",
    "dstActive": "boolean"
}
```

&nbsp;

## 15. GET /weather

Description:

- Get current weather from weatherbit rapidapi

_Response (200 - OK)_

```json
{
    "data": [
        {
            "wind_cdir": "string",
            "rh": "integer",
            "pod": "string",
            "lon": "integer",
            "pres": "integer",
            "timezone": "string",
            "ob_time": "string",
            "country_code": "string",
            "clouds": "integer",
            "ts": "integer",
            "solar_rad": "integer",
            "state_code": "string",
            "city_name": "string",
            "wind_spd": "integer",
            "slp": "integer",
            "wind_cdir_full": "string",
            "sunrise": "string",
            "app_temp": "integer",
            "dni": "integer",
            "vis": "integer",
            "sources": [
                "string"
            ],
            "h_angle": "integer",
            "dewpt": "integer",
            "snow": "integer",
            "aqi": "integer",
            "dhi": "integer",
            "wind_dir": "integer",
            "elev_angle": "integer",
            "ghi": "integer",
            "precip": "integer",
            "sunset": "string",
            "lat": "integer",
            "uv": "integer",
            "datetime": "string",
            "temp": "integer",
            "weather": {
                "icon": "string",
                "code": "integer",
                "description": "string"
            },
            "station": "string"
        }
    ],
    "count": "integer"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized",
  "error": "string"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error",
  "error": "<error>"
}
```