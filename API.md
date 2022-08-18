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
