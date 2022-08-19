# MET Digital API Documentation

MET Digital is a digital tour of The Metropolitan Museum of Art, New York. This website allows you to generate a random collection alongside it's picture from MET API. From there, you can save it into your favorite items where you could put your own notes and impression on it.   

## Endpoints:
List of available endpoints:
* GET /art
* post /users/login
* POST /users/register

# 1. GET /art

Request:
* body: 
```javascript
//click a button to generate a random collection from MET API
```

# 2. POST /users/register

request: 
* body:
```javascript
[
    {
        "email": "string"
        "password": "string"
    }
]

```
***Response (201 - success)***
```js
    `successfully create user with email ${email}`
```

# 3. POST /users/login

request: 
* body:
```javascript
[
    {
        "email": "string"
        "password": "string"
    }
]

```
***Response (200 - success)***
```js
    `access_token`
```