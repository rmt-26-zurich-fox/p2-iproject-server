## ENDPOINTS

List of Available Endpoints:

- `POST /users/register/admin`
- `POST /users/register`
- `POST /users/login`
- `POST /users/login-google`
- `GET /posts`
- `POST /posts/create`
- `PUT /posts/edit/:id`
- `GET /categories`
- `GET /api`

### 1. POST /users/register/admin

Description:
- Register new Admin

Request: 
- Headers:
``` json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body:
``` json
{
    "username": string,
    "email": string email,
    "password": string
}
```

_Response (201 - OK)_
``` json
{
    "message": "Success create new Admin",
    "id": integer,
    "email": string
}
```

_Response (400 - Bad Request)_
``` json
{
  "message": "Username is already used"
}
OR
{
 "message": "Username is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Please input valid Email!"
}
OR
{
  "message": "Email is already used"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Minimum password length is 5 character"
}
OR
{
  "message": "Role is required"
}
```

### 2. POST /users/register

Description:
- Register new Vistor

Request: 
- Headers:
``` json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body:
``` json
{
    "username": string,
    "email": string email,
    "password": string
}
```

_Response (201 - OK)_
``` json
{
    "message": "Success create new Visitor",
    "id": integer,
    "email": string
}
```

_Response (400 - Bad Request)_
``` json
{
  "message": "Username is already used"
}
OR
{
 "message": "Username is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Please input valid Email!"
}
OR
{
  "message": "Email is already used"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Minimum password length is 5 character"
}
OR
{
  "message": "Role is required"
}
```

### 3. POST /users/login

Description:
- Login Users

Request:
- Headers:
``` json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```
- Body:
``` json
{
    "email": string,
    "password": string
}
```

_Response (200 - OK)_
``` json
{
    "access_token": "access_token"
}
```

_Response (400 - Bad Request)_
``` json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}

```
404 - Not Found
``` json
{
    "statusCode": 404,
    "message": "Invalid Username/Password"
}
```

### 4. POST /users/login-google

Description:
- Login Visitor with google OAuth

Request:
- Headers
``` json
{
    google_token: string
}
```

_Response (200 - OK)_
``` json
{
    "access_token": string
}
```


### 5. GET /posts

Description:
- Get data all posts

Request:
- Query:
``` json
{
    "page": integer,
    "categoryId": integer,
    "id": integer,
    "search": string
}
```
- Headers:
``` json
  {
    "access_token": string
  }
```

_Response (200 - OK)_
``` json
{
    "page": integer,
    "totalPage": integer,
    "reviews": [
        {
            "id": Integer,
            "UserId": Integer,
            "CategoryId": Integer,
            "name": String,
            "imageUrl": String,
            "article": String,
            "status": String,
            "authorId": Integer,
            "createdAt": Date,
            "updatedAt": Date,
            "Category": {
                "id": Integer,
                "name": String,
                "createdAt": Date,
                "updatedAt": Date,
            },
        ...
        }
    ]
}
```

_Response (404 - Not Found)_
``` json
{
   "statusCode": 404,
    "error": {
        "message": "Data not Found"
    }
}
```

### 6. POST /posts/create

Description:
- Post new post

Request:
- Headers:
``` json
{
    "access_token": integer
}
```
- User:
``` json 
{
    "id": integer
}
```
- File:
``` json
{
    "image": file
}
```
- Body:
``` json
{
    "name": string,
    "article": string,
    "CategoryId": integer
}
```

_Response (201 - OK)_
``` json
{
    "message": "Success create Post",
    "data": [
        {
            "id": Integer,
            "UserId": Integer,
            "CategoryId": Integer,
            "name": String,
            "imageUrl": String,
            "article": String,
            "status": String,
            "createdAt": Date,
            "updatedAt": Date,
        },
                ...
    ]
}
```

_Response (400 - Bad Request)_
``` json
{
  "message": "UserId is required"
}
OR
{
  "message": "CategoryId is required"
}
OR
{
  "message": "Post name is required"
}
OR
{
  "message": "ImageURL is required"
}
OR
{
  "message": "Article is required"
}
OR
{
  "message": "Status is required"
}
```

### 7. PUT /posts/edit/:id

Description:
- Update data post

Request:
- Headers:
``` json
{
    "access_token": integer
}
```
- User:
``` json 
{
    "UserId": integer
}
```
- File:
``` json
{
    "image": file
}
```
- Body:
``` json
{
    "name": string,
    "article": string,
    "CategoryId": integer
}
```
- Params:
``` json
{
    "post id": integer
}
```

_Response (200 - OK)_
``` json
{
    "message": "Success update data",
}
```

_Response (400 - Bad Request)_
``` json
{
  "message": "UserId is required"
}
OR
{
  "message": "CategoryId is required"
}
OR
{
  "message": "Post name is required"
}
OR
{
  "message": "ImageURL is required"
}
OR
{
  "message": "Article is required"
}
OR
{
  "message": "Status is required"
}
```

_Response (404 - Not Found)_
``` json
{
   "statusCode": 404,
    "error": {
        "message": "Data not Found"
    }
}
```

### 6. GET /categories

Description:
- get all categories

Request:
- Query:
``` json
{
    "CategoryId": integer
}
```

_Response (200 - OK)_
``` json
{
    "categories": [{
        "id": integer,
        "name": string,
        "createdAt": date,
        "updatedAt": date
    }
        ...
    ],
}
```

_Response (404 - Not Found)_
``` json
{
   "statusCode": 404,
    "error": {
        "message": "Data not Found"
    }
}
```

### 7. GET /api

Description:
- get all songs data from API

Request:
- Headers:
``` json
{
    "api_key": string
}
```

_Response (200 - OK)_
``` json
{
        "highlights": [],
        "index": "song",
        "type": "song",
        "result": {
            "annotation_count": 0,
            "api_path": "/songs/300548",
            "artist_names": "Hi-Rez",
            "full_title": "Undefined by Hi-Rez",
            "header_image_thumbnail_url": "https://images.genius.com/a82d06c096a54594995dbcca731d170f.300x300x1.jpg",
            "header_image_url": "https://images.genius.com/a82d06c096a54594995dbcca731d170f.1000x1000x1.jpg",
            "id": 300548,
            "lyrics_owner_id": 351945,
            "lyrics_state": "complete",
            "path": "/Hi-rez-undefined-lyrics",
            "pyongs_count": null,
            "relationships_index_url": "https://genius.com/Hi-rez-undefined-sample",
            "release_date_components": {
                "year": 2012,
                "month": 8,
                "day": 5
            },
            "release_date_for_display": "August 5, 2012",
            "song_art_image_thumbnail_url": "https://images.genius.com/a82d06c096a54594995dbcca731d170f.300x300x1.jpg",
            "song_art_image_url": "https://images.genius.com/a82d06c096a54594995dbcca731d170f.1000x1000x1.jpg",
            "stats": {
                "unreviewed_annotations": 0,
                "hot": false,
                "pageviews": 26839
            },
            "title": "Undefined",
            "title_with_featured": "Undefined",
            "url": "https://genius.com/Hi-rez-undefined-lyrics",
            "featured_artists": [],
            "primary_artist": {
                "api_path": "/artists/13631",
                "header_image_url": "https://images.genius.com/00ef49d3e94281f166eb7685d4571f45.640x213x1.jpg",
                "id": 13631,
                "image_url": "https://images.genius.com/28b852778c839bfd6a5cf68eceb5c0c7.640x640x1.jpg",
                "is_meme_verified": false,
                "is_verified": true,
                "name": "Hi-Rez",
                "url": "https://genius.com/artists/Hi-rez",
                "iq": 100
            }
        }
    ...
}
```

Global Error:
- Response:
500 - Internal Server Error
``` json
Body
{
    "statusCode": 500,
    "error": {
        "message": "Internal Server Error"
    }
}
```


