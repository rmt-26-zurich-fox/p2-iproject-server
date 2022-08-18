# News App API Documentation

## List of Available Endpoints:

- `GET /profiles`
- `POST /profiles/create`
- `PUT /profiles/edit/:profileId`
- `POST /users/register`
- `POST /users/login`
- `POST /users/google-signin`
- `GET /teams/:teamId`
- `GET /teams/users/:profileId`
- `GET /teams/:teamId/players`
- `GET /teams`
- `GET /teams/:teamId/news`
- `POST /teams/:teamId/like`
- `DELETE /teams/:teamId/like`
- `GET /threads`
- `GET /threads/:threadId`
- `GET /threads/user/:profileId`
- `POST /threads/:threadId/comment`
- `PUT /threads/:threadId/comment/:commentId`
- `DELETE /threads/:threadId/comment/:commentId`
- `POST /threads/create`
- `DELETE /threads/delete/:threadId`

&nbsp;

## `GET /profiles`

#### Description

- Find One Profile

Request :

- Header :

```json
{
  "access_token": "string"
}
```

Response _(200 - OK)_ :

```json
{
  "id": 2,
  "firstName": "Blake",
  "lastName": "The Black Cat",
  "selfDescription": "A baby cat who loves to SLEEP.",
  "address": "Kedung Badak",
  "phoneNumber": "0812345",
  "profilePicture": "https://picsum.photos/200/300",
  "birthdate": "2001-01-26T17:00:00.000Z",
  "UserId": 2
}
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

Response _(403 - Forbidden)_ :

```json
{
  "message": "You are not authorized"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Profile not found"
}
```

&nbsp;

## `POST /profiles/create`

#### Description

- Create a Profile

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- Body :

```json
{
  "firstName": "string (required)",
  "lasttName": "string (required)",
  "selfDescription": "text (required)",
  "address": "string (required)",
  "phoneNumber": "string (required)",
  "profilePicture": "string (required)",
  "birthdate": "string (required)"
}
```

Response _(201 - OK)_ :

```json
{
  "message": "Profile with ID <createdProfile.id> created"
}
```

Response _(400 - Bad Request)_ :

```json
{
  "message": "First name cannot be empty"
}
OR
{
  "message": "Last name cannot be empty"
}
OR
{
  "message": "Self description cannot be empty"
}
OR
{
  "message": "Address cannot be empty"
}
OR
{
  "message": "Phone Number is required"
}
OR
{
  "message": "Profile picture is required"
}
OR
{
  "message": "Birthdate is required"
}
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

&nbsp;

## `PUT /profiles/edit/:profileId`

#### Description

- Edit a Profile

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- Body :

```json
{
  "firstName": "string (required)",
  "lasttName": "string (required)",
  "selfDescription": "text (required)",
  "address": "string (required)",
  "phoneNumber": "string (required)",
  "profilePicture": "string (required)",
  "birthdate": "string (required)"
}
```

- Params :

```json
{
  ":profileId": "integer (required)"
}
```

Response _(200 - OK)_ :

```json
{
  "message": "Profile has been updated"
}
```

Response _(400 - Bad Request)_ :

```json
{
  "message": "First name cannot be empty"
}
OR
{
  "message": "Last name cannot be empty"
}
OR
{
  "message": "Self description cannot be empty"
}
OR
{
  "message": "Address cannot be empty"
}
OR
{
  "message": "Phone Number is required"
}
OR
{
  "message": "Profile picture is required"
}
OR
{
  "message": "Birthdate is required"
}
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Profile not found"
}
```

&nbsp;

## `POST /users/register`

Description:

- Register a new admin account

Request:

- Body :

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

Response _(201 - Created)_

```json
{
  "message": "Succesfully created new user with username <username>",
  "id": "integer",
  "email": "string"
}
```

Response _(400 - Bad Request)_ :

```json
{
  "message": "Password cannot be empty"
}
OR
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Email already registered"
}
OR
{
  "message": "Email format is required"
}
OR
{
  "message": "Password cannot be empty!"
}
```

&nbsp;

## `POST /users/login`

Description:

- Login to existing account

Request:

- Body :

```json
{
  "email": "string",
  "password": "string"
}
```

Response _(200 - OK)_

```json
{
  "access_token": "<access_token>"
}
```

Response _(400 - Bad Request)_ :

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## `POST /users/google-signin`

Description:

- Login using google account

Request:

- Body :

```json
{
  "email": "string",
  "password": "string"
}
```

Response _(200 - OK)_

```json
{
  "access_token": "<access_token>",
  "user": {
    address: "Your address"
    createdAt: "2022-07-27T10:13:25.539Z"
    email: "erlanggakencana3@gmail.com"
    id: 17
    password: "Your password"
    phoneNumber: "Your Phone Number"
    role: "Staff"
    updatedAt: "2022-07-27T10:13:25.539Z"
    username: "Erlangga Kencana"
  }
}
```

&nbsp;

## `GET /teams/:teamId`

#### Description

- Get specific team

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- Params :

```json
{
  "teamId": "integer"
}
```

Response _(200 - OK)_ :

```json
{
  "id": 3,
  "name": "Nets",
  "full_name": "Brooklyn Nets",
  "abbreviation": "BKN",
  "conference": "Eastern",
  "city": "Brooklyn",
  "division": "Atlantic",
  "TeamImage": {
    "imageUrl": "https://logos-download.com/wp-content/uploads/2016/04/Brooklyn_Nets_logo_logotype.png"
  },
  "location": "Brooklyn, New York",
  "arena": "Barclays Center",
  "team_colors": "Black, white, dark gray",
  "main_sponsor": "Infor",
  "head_coach": "Steve Nash",
  "general_manager": "Sean Marks",
  "ownership": "Joseph Tsai",
  "championships": "2ABA: 2 (1974, 1976)NBA: 0",
  "conference_titles": "5ABA: 3 (1972, 1974, 1976)NBA: 2 (2002, 2003)",
  "division_titles": "5ABA: 1 (1974)NBA: 4 (2002, 2003, 2004, 2006)",
  "retired_numbers": "6 (3, 5, 23, 25, 32, 52)",
  "website": "www.nba.com/nets"
}
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Team not found"
}
```

&nbsp;

## `GET /teams/users/:profileId`

#### Description

- Get teams liked by sPEcific profile

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- Params :

```json
{
  "profileId": "integer"
}
```

Response _(200 - OK)_ :

```json
[
  {
    "id": 1,
    "ProfileId": 2,
    "TeamId": 1,
    "createdAt": "2022-08-16T18:45:03.775Z",
    "updatedAt": "2022-08-16T18:45:03.775Z",
    "Team": {
      "id": 1,
      "name": "Hawks",
      "full_name": "Atlanta Hawks",
      "abbreviation": "ATL",
      "conference": "East",
      "city": "Atlanta",
      "division": "Southeast",
      "createdAt": "2022-08-16T17:52:37.142Z",
      "updatedAt": "2022-08-16T17:52:37.142Z",
      "TeamImage": {
        "imageUrl": "http://logos-download.com/wp-content/uploads/2016/04/Atlanta_Hawks_logo_transparent.png"
      }
    }
  },
  {
    "id": 2,
    "ProfileId": 2,
    "TeamId": 2,
    "createdAt": "2022-08-16T18:45:14.764Z",
    "updatedAt": "2022-08-16T18:45:14.764Z",
    "Team": {
      "id": 2,
      "name": "Celtics",
      "full_name": "Boston Celtics",
      "abbreviation": "BOS",
      "conference": "East",
      "city": "Boston",
      "division": "Atlantic",
      "createdAt": "2022-08-16T17:52:37.142Z",
      "updatedAt": "2022-08-16T17:52:37.142Z",
      "TeamImage": {
        "imageUrl": "http://logos-download.com/wp-content/uploads/2016/04/Boston_Celtics_logo_logotype_emblem.png"
      }
    }
  }
]
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
OR
{
  "message": "Invalid email/password"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Profile not found"
}
```

&nbsp;

## `GET /teams/:teamId/players`

#### Description

- Get players from specific team

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- Params :

```json
{
  "teamId": "integer"
}
```

Response _(200 - OK)_ :

```json
[
    {
        "id": 2605,
        "first_name": "Alex",
        "last_name": "Poythress",
        "position": "F",
        "height_feet": 6,
        "height_inches": 9,
        "weight_pounds": "235",
        "TeamId": 1,
        "createdAt": "2022-08-16T17:52:37.255Z",
        "updatedAt": "2022-08-16T17:52:37.255Z"
    },
    {
        "id": 2701,
        "first_name": "Chandler",
        "last_name": "Parsons",
        "position": "F",
        "height_feet": 6,
        "height_inches": 10,
        "weight_pounds": "230",
        "TeamId": 1,
        "createdAt": "2022-08-16T17:52:37.255Z",
        "updatedAt": "2022-08-16T17:52:37.255Z"
    },
    {
        "id": 2714,
        "first_name": "Nene",
        "last_name": "",
        "position": "C-F",
        "height_feet": 6,
        "height_inches": 11,
        "weight_pounds": "250",
        "TeamId": 1,
        "createdAt": "2022-08-16T17:52:37.255Z",
        "updatedAt": "2022-08-16T17:52:37.255Z"
    },
    ...
]
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Profile not found"
}
OR
{
  "message": "Team not found"
}
```

&nbsp;

## `GET /teams`

#### Description

- Get All Team List

Request :

- Header :

```json
{
  "access_token": "string"
}
```

Response _(200 - OK)_ :

```json
[
  {
    "id": 1,
    "name": "Hawks",
    "full_name": "Atlanta Hawks",
    "abbreviation": "ATL",
    "conference": "East",
    "city": "Atlanta",
    "division": "Southeast",
    "createdAt": "2022-08-16T17:52:37.142Z",
    "updatedAt": "2022-08-16T17:52:37.142Z",
    "TeamImage": {
      "imageUrl": "http://logos-download.com/wp-content/uploads/2016/04/Atlanta_Hawks_logo_transparent.png"
    }
  },
  {
    "id": 2,
    "name": "Celtics",
    "full_name": "Boston Celtics",
    "abbreviation": "BOS",
    "conference": "East",
    "city": "Boston",
    "division": "Atlantic",
    "createdAt": "2022-08-16T17:52:37.142Z",
    "updatedAt": "2022-08-16T17:52:37.142Z",
    "TeamImage": {
      "imageUrl": "http://logos-download.com/wp-content/uploads/2016/04/Boston_Celtics_logo_logotype_emblem.png"
    }
  },
  {
    "id": 3,
    "name": "Nets",
    "full_name": "Brooklyn Nets",
    "abbreviation": "BKN",
    "conference": "East",
    "city": "Brooklyn",
    "division": "Atlantic",
    "createdAt": "2022-08-16T17:52:37.142Z",
    "updatedAt": "2022-08-16T17:52:37.142Z",
    "TeamImage": {
      "imageUrl": "https://logos-download.com/wp-content/uploads/2016/04/Brooklyn_Nets_logo_logotype.png"
    }
  },
  {
    "id": 4,
    "name": "Hornets",
    "full_name": "Charlotte Hornets",
    "abbreviation": "CHA",
    "conference": "East",
    "city": "Charlotte",
    "division": "Southeast",
    "createdAt": "2022-08-16T17:52:37.142Z",
    "updatedAt": "2022-08-16T17:52:37.142Z",
    "TeamImage": {
      "imageUrl": "https://logos-download.com/wp-content/uploads/2018/01/Charlotte_Hornets_logo_blue.png"
    }
  },
  {
    "id": 5,
    "name": "Bulls",
    "full_name": "Chicago Bulls",
    "abbreviation": "CHI",
    "conference": "East",
    "city": "Chicago",
    "division": "Central",
    "createdAt": "2022-08-16T17:52:37.142Z",
    "updatedAt": "2022-08-16T17:52:37.142Z",
    "TeamImage": {
      "imageUrl": "https://logos-download.com/wp-content/uploads/2016/04/Chicago_Bulls_logo_logotype_emblem.png"
    }
  }
]
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

&nbsp;

## `GET /teams/:teamId/news`

#### Description

- Get news related to specific team

Request :

- Header :

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

Response _(200 - OK)_ :

```json
[
    {
        "id": "d50b76a3-b554-49d8-b99f-3f153bfccb03",
        "title": "Dejounte Murray blasts Paolo Banchero on Instagram after pro-am embarrassment",
        "description": "Things got chippy between Atlanta Hawks guard Dejounte Murray and Orlando Magic rookie Paolo Banchero after the pair played in Isaiah Thomas’ Zeke-End basketball tournament on Sunday.",
        "url": "https://nypost.com/2022/08/08/why-are-dejounte-murray-and-paolo-banchero-feuding-on-instagram/",
        "author": "Jenna Lemoncelli",
        "image": "https://nypost.com/wp-content/uploads/sites/2/2022/08/newspress-collage-23368429-1659973007111.jpg?quality=75&strip=all&1659958826&w=1024",
        "language": "en",
        "category": [
            "general"
        ],
        "published": "2022-08-08 15:44:30 +0000"
    },
    {
        "id": "ea90f35f-dda4-456a-a417-0548622ed5b2",
        "title": "Hawks' Murray dunks on Magic's Banchero, fuels social media feud",
        "description": "Atlanta Hawks guard Dejounte Murray took flight for an impressive dunk on Orlando Magic rookie Palo Banchero at a recent pro-am game, sparking a social media scuffle between the basketball stars.",
        "url": "https://www.upi.com/Sports_News/NBA/2022/08/08/Hawks-Murray-Magic-Banchero-dunk-feud/9701659965190/",
        "author": "upi",
        "image": "https://cdnph.upi.com/sv/ph/og/upi/9701659965190/2022/1/81876a171e29f66bad0da83c33a5f97d/v1.5/Hawks-Murray-dunks-on-Magics-Banchero-fuels-social-media-feud.jpg?lg=5",
        "language": "en",
        "category": [
            "sports"
        ],
        "published": "2022-08-08 14:16:07 +0000"
    },
    {
        "id": "93584f75-d430-4923-8f49-d03886040c00",
        "title": "Dejounte Murray, Paolo Banchero rev up rivalry after pro-am summer game",
        "description": "NEW You can now listen to Fox News articles!\n\nAtlanta Hawks star Dejounte Murray and Orlando Magic rookie Paolo Banchero appeared to be frustrated with each other following a pro-am summer league game...",
        "url": "https://www.foxnews.com/sports/dejounte-murray-paolo-banchero-rev-up-rivalry-pro-am-summer-game",
        "author": "Ryan Gaydos",
        "image": "https://static.foxnews.com/foxnews.com/content/uploads/2022/08/Dejounte-Murray2.jpg",
        "language": "en",
        "category": [
            "sports"
        ],
        "published": "2022-08-08 12:08:25 +0000"
    },
    ...
]
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Profile not found"
}
```

&nbsp;

## `POST /teams/:teamId/like`

#### Description

- Like specific team

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "teamId": "integer (required)"
}
```

Response _(200 - OK)_ :

```json
{
  "message": "`Succesfully like a team with <teamId>"
}
```

Response _(400 - Unauthorized)_ :

```json
{
  "message": "Team already liked"
}
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Team not found"
}
```

&nbsp;

## `DELETE /teams/:teamId/like`

#### Description

- Dislike specific team

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "teamId": "integer (required)"
}
```

Response _(200 - OK)_ :

```json
{
  "message": "Disliked the team"
}
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

Response _(403 - Forbidden)_ :

```json
{
  "message": "You are not authorized"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Team not found"
}
```

&nbsp;

## `GET /threads`

#### Description

- Get all the threads

Request :

- Header :

```json
{
  "access_token": "string"
}
```

Response _(200 - OK)_ :

```json
[
    {
        "id": 1,
        "title": "Ini Test Create Thread",
        "description": "Dummy1",
        "explicit": false,
        "ProfileId": 2,
        "closed": false,
        "CategoryId": 1,
        "Category": {
            "name": "NBA Teams"
        },
        "Profile": {
            "firstName": "Blake",
            "lastName": "The Black Cat"
        }
    },
    {
        "id": 2,
        "title": "Ini Test Create Thread 2 - explicit",
        "description": "Dummy2",
        "explicit": true,
        "ProfileId": 1,
        "closed": false,
        "CategoryId": 2,
        "Category": {
            "name": "NBA Players"
        },
        "Profile": {
            "firstName": "Cireng",
            "lastName": "The Black Cat"
        }
    },
    ....
]
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

Response _(403 - Forbidden)_ :

```json
{
  "message": "You are not authorized to access explicit thread`"
}
OR
{
  "message": "You are not authorized"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Profile not found"
}
```

&nbsp;

## `GET /threads/:threadId`

#### Description

- Get specific by thread ID

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "threadId": "integer (required)"
}
```

Response _(200 - OK)_ :

```json
{
  "id": 1,
  "title": "Ini Test Create Thread",
  "description": "Dummy1",
  "explicit": false,
  "ProfileId": 2,
  "closed": false,
  "CategoryId": 1,
  "createdAt": "2022-08-16T18:18:02.233Z",
  "updatedAt": "2022-08-16T18:18:02.233Z",
  "Category": {
    "name": "NBA Teams"
  },
  "Profile": {
    "firstName": "Blake",
    "lastName": "The Black Cat"
  },
  "Comments": [
    {
      "id": 1,
      "comment": "kocak geming",
      "explicit": true,
      "ProfileId": 1,
      "ThreadId": 1,
      "createdAt": "2022-08-17T10:01:27.278Z",
      "updatedAt": "2022-08-17T10:01:27.278Z",
      "Profile": {
        "firstName": "Cireng",
        "lastName": "The Black Cat"
      }
    },
    {
      "id": 2,
      "comment": "Ini mau ngomongin apaan ya?",
      "explicit": true,
      "ProfileId": 1,
      "ThreadId": 1,
      "createdAt": "2022-08-17T10:44:47.663Z",
      "updatedAt": "2022-08-17T10:44:47.663Z",
      "Profile": {
        "firstName": "Cireng",
        "lastName": "The Black Cat"
      }
    }
  ]
}
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

Response _(403 - Forbidden)_ :

```json
{
  "message": "You are not authorized to access explicit thread`"
}
OR
{
  "message": "You are not authorized"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Thread not found"
}
```

&nbsp;

## `GET /threads/user/:profileId`

#### Description

- Get all created threads by user

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "profileId": "integer (required)"
}
```

Response _(200 - OK)_ :

```json
[
  {
    "id": 1,
    "title": "Ini Test Create Thread",
    "description": "Dummy1",
    "explicit": false,
    "ProfileId": 2,
    "closed": false,
    "CategoryId": 1,
    "Category": {
      "name": "NBA Teams"
    },
    "Profile": {
      "firstName": "Blake",
      "lastName": "The Black Cat"
    }
  },
  {
    "id": 2,
    "title": "Ini Test Create Thread 2 - explicit",
    "description": "Dummy2",
    "explicit": true,
    "ProfileId": 1,
    "closed": false,
    "CategoryId": 2,
    "Category": {
      "name": "NBA Players"
    },
    "Profile": {
      "firstName": "Cireng",
      "lastName": "The Black Cat"
    }
  },
  {
    "id": 7,
    "title": "aaa",
    "description": "aaa",
    "explicit": false,
    "ProfileId": 1,
    "closed": false,
    "CategoryId": 2,
    "Category": {
      "name": "NBA Players"
    },
    "Profile": {
      "firstName": "Cireng",
      "lastName": "The Black Cat"
    }
  }
]
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

Response _(403 - Forbidden)_ :

```json
{
  "message": "You are not authorized"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Profile not found"
}
```

## `POST /threads/:threadId/comment`

#### Description

-Create a comment on specific thread

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "threadId": "integer (required)"
}
```

Response _(200 - OK)_ :

```json
{
  "message": "Successfully commented on thread with ID <threadId>"
}
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

Response _(403 - Forbidden)_ :

```json
{
  "message": "You are not authorized to access explicit thread`"
}
OR
{
  "message": "You are not authorized"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Thread not found"
}
```

&nbsp;

## `PUT /threads/:threadId/comment/:commentId`

#### Description

-Edit a comment on specific thread

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "threadId": "integer (required)",
  "commentId": "integer (required)"
}
```

Response _(200 - OK)_ :

```json
{
  "message": "Successfully edited comment"
}
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

Response _(403 - Forbidden)_ :

```json
{
  "message": "You are not authorized"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Thread not found"
}
OR
{
  "message": "Comment not found"
}
```

&nbsp;

## `DELETE /threads/:threadId/comment/:commentId`

#### Description

-Delete a comment on specific thread

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "threadId": "integer (required)",
  "commentId": "integer (required)"
}
```

Response _(200 - OK)_ :

```json
{
  "message": "Successfully deleted comment"
}
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

Response _(403 - Forbidden)_ :

```json
{
  "message": "You are not authorized"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Thread not found"
}
OR
{
  "message": "Comment not found"
}
```

&nbsp;

## `POST /threads/create`

#### Description

-Create a thread

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- Body :

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "title": "string (required)",
  "description": "text (required)",
  "explicit": "boolean (required)",
  "CategoryId": "integer (required)"
}
```

Response _(201 - Created)_ :

```json
{
  "message": "Created new thread with ID <createdThread.id>"
}
```

Response _(400 - Bad Request)_ :

```json
{
  "message": "Thread's title cannot be empty"
}
OR
{
  "message": "Thread's description cannot be empty"
}
OR
{
  "message": "Thread's explicit information cannot be empty"
}
OR
{
  "message": "Thread's category cannot be empty"
}
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Profile not found"
}
```

&nbsp;

## `PUT /threads/edit/:threadId`

#### Description

-Edit a specific thread

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "threadId": "integer (required)"
}
```

Response _(200 - OK)_ :

```json
{
  "message": "Edited thread"
}
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

Response _(403 - Forbidden)_ :

```json
{
  "message": "You are not authorized"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Thread not found"
}
OR
{
  "message": "Profile not found"
}
```

&nbsp;

## `DELETE /threads/delete/:threadId`

#### Description

-Delete a specific thread

Request :

- Header :

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "threadId": "integer (required)"
}
```

Response _(200 - OK)_ :

```json
{
  "message": "Deleted thread"
}
```

Response _(401 - Unauthorized)_ :

```json
{
  "message": "Please login to access app features`"
}
```

Response _(403 - Forbidden)_ :

```json
{
  "message": "You are not authorized"
}
```

Response _(404 - Not Found)_ :

```json
{
  "message": "Thread not found"
}
OR
{
  "message": "Profile not found"
}
```

&nbsp;

## Global Error:

Response _(500 - Bad Request)_ :

```json
{
  "message": "Internal server error"
}
```
