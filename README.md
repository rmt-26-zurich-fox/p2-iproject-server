# p2-iproject-server
Individual Project - Server

# Weather API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `get /bookmarks`
- `POST /bookmarks`
- `DELETE /bookmarks/:id`


&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "message": "Success create <email>",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "email must example@example.com"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "password must 5 or more"
}

```

&nbsp;

## 2. POST /login

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
  "access_token": "string",
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
_Response (401 - invalidInput)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;
## 3. get /bookmarks

Request:
- headers:

```json
{
  "access_token": "string"
}
```
Description:
- Get all bookmarks from database

_Response (200)_

```json
{
    "message": "Success read data",
    "data": [
        {
            "city": "Jakarta",
            "state": "Jakarta",
            "country": "Indonesia",
            "location": {
                "type": "Point",
                "coordinates": [
                    106.79324,
                    -6.236704
                ]
            },
            "current": {
                "pollution": {
                    "ts": "2022-08-16T14:00:00.000Z",
                    "aqius": 104,
                    "mainus": "p2",
                    "aqicn": 52,
                    "maincn": "p2"
                },
                "weather": {
                    "ts": "2022-08-16T14:00:00.000Z",
                    "tp": 26,
                    "pr": 1011,
                    "hu": 74,
                    "ws": 2.06,
                    "wd": 0,
                    "ic": "03n"
                }
            },
            "bookmarkId": 2
        }
    ]
}
```

&nbsp;
## 4. POST /bookmarks

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
  "CityName": "string",
  "StateName": "string",
  "CountryName": "string",
}
```

_Response (200)_
```json
{
    "message": "Success Create New Data"
}
```


_Response (400 - Bad Request)_

```json
{
  "message": "City name is required"
}
OR
{
  "message": "State name is required"
}
OR
{
  "message": "Country name is required"
}
```
&nbsp;

## 5. DELETE /bookmarks/:id

Description:
- Delete movie by id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```
- headers:

```json
{
  "access_token": "string"
}
```

_Response (200)_

```json
{
  "message": "Data already delete"
}
```

_Response (404 - NotFound)_

```json
{
  "message": "Data not found"
}
```