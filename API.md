## ENDPOINTS

List of endpoints:
- `POST /user/register`
- `POST /user/login`
- `POST /user/googleLogin`
- `GET /animes/top`
- `GET /animes/:season`
- `GET /animes/details/:animeId`
- `GET /arts`
- `GET /comments/:id`
- `POST /comments/:id`
- `GET /plannings`
- `POST /plannings/:id`
- `DELETE /plannings/:id`

&nbsp;

## 1. POST /user/register
Description:
- Register new user

Request:
- body:
```json
{
    "username": string,
    "email": string,
    "password": string,
    "age": integer
}
```

Response:
```json
{
    "msg": string
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email must be type email"
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
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /user/login
Description:
- User login

Request:
- body:
```json
{
    "email": string,
    "password": string
}
```

Response:
```json
{
    "msg": string,
    "access_token": string,
    "age": integer
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 3. POST /user/googleLogin
Description:
- User Google login

Request:
- headers:
```json
{
    "access_token": string
}
```

Response:
```json
{
    "access_token": string,
    "user": object
}
```

&nbsp;

## 4. GET /animes/top
Description:
- Fetch top anime from third party api

Response:
```json
[
    {
        "mal_id": 44511,
        "rank": 1,
        "title": "Chainsaw Man",
        "url": "https://myanimelist.net/anime/44511/Chainsaw_Man",
        "image_url": "https://cdn.myanimelist.net/images/anime/1806/126216.jpg?s=8e4d9184579f166e9adff4987b274192",
        "type": "TV",
        "episodes": null,
        "start_date": "Oct 2022",
        "end_date": null,
        "members": 465978,
        "score": 0
    },
    ....,
]
```

&nbsp;

## 5. GET /animes/:season
Description: 
- Fetch anime with season from params season

Request:
- params:
```json
:season = String
```

Response:
```json
[
    {
        "mal_id": 44511,
        "rank": 1,
        "title": "Chainsaw Man",
        "url": "https://myanimelist.net/anime/44511/Chainsaw_Man",
        "image_url": "https://cdn.myanimelist.net/images/anime/1806/126216.jpg?s=8e4d9184579f166e9adff4987b274192",
        "type": "TV",
        "episodes": null,
        "start_date": "Oct 2022",
        "end_date": null,
        "members": 465978,
        "score": 0
    },
    ....,
]
```

&nbsp;

## 6. GET /animes/details/:animeId
Description:
- Fetch data anime

Request:
- params:
```json
:animeId = Integer
```

Response:
```json
[
    {
        "mal_id": 44511,
        "rank": 1,
        "title": "Chainsaw Man",
        "url": "https://myanimelist.net/anime/44511/Chainsaw_Man",
        "image_url": "https://cdn.myanimelist.net/images/anime/1806/126216.jpg?s=8e4d9184579f166e9adff4987b274192",
        "type": "TV",
        "episodes": null,
        "start_date": "Oct 2022",
        "end_date": null,
        "members": 465978,
        "score": 0
    }
]
```

&nbsp;

## 7. GET /arts
Description:
- Get all arts data

Request:
- headers: 
```json
{
  "access_token": "string"
}
```

Response:
```json
[
    {
        "imageUrl": "https://cdn.donmai.us/original/82/f3/82f350b1604cd4d69447ef1538af6932.png",
        "createdAt": "2022-08-18T03:17:59.127Z",
        "updatedAt": "2022-08-18T03:17:59.127Z"
    },
    ...,
]
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please login first"
}
OR
{
  "message": "You are not older Enough"
}
```

&nbsp;

## 8. GET /comments/:id?page=${this.page}
Description:
- Get all comments with animeId from params

Request:
- params:
```json
:id = Integer
```
Response:
```json
[
{
    "totalItems": 15,
    "rows": [
        {
            "id": 32,
            "UserId": 1,
            "AnimeId": 1,
            "thread": "lol",
            "gif": "https://c.tenor.com/aF0ipAtOk9cAAAAM/spy-x-family-anya.gif",
            "createdAt": "2022-08-17T11:51:54.079Z",
            "updatedAt": "2022-08-17T11:51:54.079Z",
            "User": {
                "id": 1,
                "username": "Brisket",
                "email": "iwan1@gmail.com",
                "password": "$2a$10$bdh9CNr9V2ZCPolhZQEWqOhBE3DNoegeNib2Wun.M8U7GldZxG0ie",
                "age": 18,
                "createdAt": "2022-08-16T11:53:34.040Z",
                "updatedAt": "2022-08-16T11:53:34.040Z"
            }
        },
        {
            "id": 31,
            "UserId": 1,
            "AnimeId": 1,
            "thread": "",
            "gif": "https://c.tenor.com/aF0ipAtOk9cAAAAM/spy-x-family-anya.gif",
            "createdAt": "2022-08-17T11:51:15.038Z",
            "updatedAt": "2022-08-17T11:51:15.038Z",
            "User": {
                "id": 1,
                "username": "Brisket",
                "email": "iwan1@gmail.com",
                "password": "$2a$10$bdh9CNr9V2ZCPolhZQEWqOhBE3DNoegeNib2Wun.M8U7GldZxG0ie",
                "age": 18,
                "createdAt": "2022-08-16T11:53:34.040Z",
                "updatedAt": "2022-08-16T11:53:34.040Z"
            }
        },
        {
            "id": 30,
            "UserId": 1,
            "AnimeId": 1,
            "thread": "",
            "gif": "https://c.tenor.com/aF0ipAtOk9cAAAAM/spy-x-family-anya.gif",
            "createdAt": "2022-08-17T11:51:05.593Z",
            "updatedAt": "2022-08-17T11:51:05.593Z",
            "User": {
                "id": 1,
                "username": "Brisket",
                "email": "iwan1@gmail.com",
                "password": "$2a$10$bdh9CNr9V2ZCPolhZQEWqOhBE3DNoegeNib2Wun.M8U7GldZxG0ie",
                "age": 18,
                "createdAt": "2022-08-16T11:53:34.040Z",
                "updatedAt": "2022-08-16T11:53:34.040Z"
            }
        },
        {
            "id": 29,
            "UserId": 1,
            "AnimeId": 1,
            "thread": "",
            "gif": "https://c.tenor.com/aF0ipAtOk9cAAAAM/spy-x-family-anya.gif",
            "createdAt": "2022-08-17T11:50:42.601Z",
            "updatedAt": "2022-08-17T11:50:42.601Z",
            "User": {
                "id": 1,
                "username": "Brisket",
                "email": "iwan1@gmail.com",
                "password": "$2a$10$bdh9CNr9V2ZCPolhZQEWqOhBE3DNoegeNib2Wun.M8U7GldZxG0ie",
                "age": 18,
                "createdAt": "2022-08-16T11:53:34.040Z",
                "updatedAt": "2022-08-16T11:53:34.040Z"
            }
        },
        {
            "id": 28,
            "UserId": 1,
            "AnimeId": 1,
            "thread": "",
            "gif": "https://c.tenor.com/aF0ipAtOk9cAAAAM/spy-x-family-anya.gif",
            "createdAt": "2022-08-17T11:50:20.552Z",
            "updatedAt": "2022-08-17T11:50:20.552Z",
            "User": {
                "id": 1,
                "username": "Brisket",
                "email": "iwan1@gmail.com",
                "password": "$2a$10$bdh9CNr9V2ZCPolhZQEWqOhBE3DNoegeNib2Wun.M8U7GldZxG0ie",
                "age": 18,
                "createdAt": "2022-08-16T11:53:34.040Z",
                "updatedAt": "2022-08-16T11:53:34.040Z"
            }
        }
    ],
    "currentPage": 1,
    "totalPages": 3
}]
```

&nbsp;

## 9. POST /comments/:id
Description: 
-  Create new comment to anime

Request:
- params:
```json
:id = Integer
```
- body: 
```json
{
  "thread": String,
  "gif": String
}
```

Response:
```json
{"msg": `Hooraaay... your comment has been added`}
```

&nbsp;

## 10. GET /plannings
Description:
- Get all plannings

- headers: 
```json
{
  "access_token": "string"
}
```

- body: 
```json
[
  {
        "id": 3,
        "UserId": 1,
        "AnimeId": 451,
        "createdAt": "2022-08-17T11:00:39.610Z",
        "updatedAt": "2022-08-17T11:00:39.610Z",
        "Anime":...
  }
]
```

&nbsp;

## 10. POST /plannings/:id
Description:
- Create planning

Request:
- headers: 
```json
{
  "access_token": "string"
}
```
- params:
```json
:id = Integer
```

- body: 
```json
{
     "msg": `Dont forget to watch your planning anime`
}

```

&nbsp;

## 10. DELETE /plannings/:id
Description:
- delete planning

Request:
- headers: 
```json
{
  "access_token": "string"
}
```
- params:
```json
:id = Integer
```

- body: 
```json
{
     "msg": `Unfortunate`
}

```

&nbsp;
## Global Error
_Response (403 - Internal Server Error)_
```json
{
  "message": "Unauthorized"
}
```
_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```