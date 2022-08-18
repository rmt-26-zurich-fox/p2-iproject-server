## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `GET /quotes`
- `POST /quotes`
- `GET /quotes/qotd`
- `GET /quotes/word`
- `GET /favorites`
- `GET /favorites/:PostId`
- `DELETE /favorites/:id`



&nbsp;


## 1. POST /users/register

Description:

- Add new User

Request:

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

_Response (201 - Created)_

```json
{
  "message": "Success create new user",
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "phoneNumber": "string",
    "address": "string"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "Username is required"
    ]
}
OR
{
  "message": [
    "User is required"
    ]
}
OR
{
  "message": [
   "Email already Registered"
    ]
}
OR
{
  "message": [
    "Phone Number is Required"
    ]
}
OR
{
  "message": [
    "Address is Required"
    ]
}
```

## 2. POST /users/login

Description:

- Get in to Existing Account

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
    "username": "string",
    "role": "string",
    "email": "string"
}
```


_Response (401 - No Token)_

```json
{
  "message": "Please Login"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "Invalid User/Email"
    ]
}
OR
{
  "message": [
   "Email already Registered"
    ]
}
OR
{
  "message": [
    "Password is required"
    ]
}
```


## 3. GET /quotes

Description:

- Get all quotes in database

Request:

- headers:

```json
{
  "access_token": "string (required)"
}

_Response (200 - OK)_


```json
{
    "totalItems": "integer",
    "quote": [
        {
            "id": 3,
            "desc": "It takes a great man to be a good listener.",
            "UserId": 3,
            "CategoryId": 1,
            "createdAt": "2022-08-13T18:40:44.328Z",
            "updatedAt": "2022-08-13T18:40:44.328Z",
            "User": {
                "username": "isStaff"
            },
            "Category": {
                "id": 1,
                "name": "Motivation"
            }
        }
    ],
    "totalPages": "integer",
    "currentPage": "integer"
}
```


## 4. POST /quotes

Description:

- Add new Quotes

Request:

- headers:

```json
{
  "access_token": "string (required)"
}

- body:

```json
{
  "desc": "string",
  "CategoryId": "integer",

}
```

_Response (201 - Created)_

```json
{
    "id": 15,
    "desc": "failure is a....\nnothing",
    "UserId": 8,
    "CategoryId": 1,
    "updatedAt": "2022-08-18T05:32:07.071Z",
    "createdAt": "2022-08-18T05:32:07.071Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "desc is required"
    ]
}
OR
{
  "message": [
    "CategoryId is required"
    ]
}

```


## 5. GET /quotes/qotd

Description:

- Get random qoute of the day when login success

Request:

- headers:

```json
{
    "access_token": "status (required)"
}
```

_Response (200 - OK)_

```json
{
    "qotd_date": "2022-08-19T00:00:00.000+00:00",
    "quote": {
        "id": 8743,
        "dialogue": false,
        "private": false,
        "tags": [
            "business"
        ],
        "url": "https://favqs.com/quotes/jeff-bezos/8743-if-you-don-t-u-",
        "favorites_count": 2,
        "upvotes_count": 0,
        "downvotes_count": 0,
        "author": "Jeff Bezos",
        "author_permalink": "jeff-bezos",
        "body": "If you don't understand the details of your business you are going to fail."
    }
}
```



## 6. GET /quotes/word

Description:

- Definition of word from request body

Request: 

- headers: 

```json

{
    "app_id": "string",
    "app_key": "string"
}

```json

_Response (200 - OK)_

```json
{
    "id": "belief",
    "metadata": {
        "operation": "retrieve",
        "provider": "Oxford University Press",
        "schema": "RetrieveEntry"
    },
    "results": [
        {
            "id": "belief",
            "language": "en-gb",
            "lexicalEntries": [
                {
                    "entries": [
                        {
                            "etymologies": [
                                "Middle English: alteration of Old English gelēafa; compare with believe"
                            ],
                            "pronunciations": [
                                {
                                    "audioFile": "https://audio.oxforddictionaries.com/en/mp3/belief__gb_1.mp3",
                                    "dialects": [
                                        "British English"
                                    ],
                                    "phoneticNotation": "IPA",
                                    "phoneticSpelling": "bɪˈliːf"
                                }
                            ],
                            "senses": [
                                {
                                    "constructions": [
                                        {
                                            "text": "belief in"
                                        }
                                    ],
                                    "definitions": [
                                        "an acceptance that something exists or is true, especially one without proof"
                                    ],
                                    "examples": [
                                        {
                                            "text": "his belief in extraterrestrial life"
                                        },
                                        {
                                            "notes": [
                                                {
                                                    "text": "with clause",
                                                    "type": "grammaticalNote"
                                                }
                                            ],
                                            "text": "a belief that climate can be modified beneficially"
                                        }
                                    ],
                                    "id": "m_en_gbus0085250.006",
                                    "semanticClasses": [
                                        {
                                            "id": "belief",
                                            "text": "Belief"
                                        }
                                    ],
                                    "shortDefinitions": [
                                        "acceptance that something exists or is true"
                                    ],
                                    "subsenses": [
                                        {
                                            "definitions": [
                                                "something one accepts as true or real; a firmly held opinion"
                                            ],
                                            "examples": [
                                                {
                                                    "text": "we're prepared to fight for our beliefs"
                                                },
                                                {
                                                    "notes": [
                                                        {
                                                            "text": "mass noun",
                                                            "type": "grammaticalNote"
                                                        }
                                                    ],
                                                    "text": "contrary to popular belief existing safety regulations were adequate"
                                                }
                                            ],
                                            "id": "m_en_gbus0085250.009",
                                            "semanticClasses": [
                                                {
                                                    "id": "opinion",
                                                    "text": "Opinion"
                                                }
                                            ],
                                            "shortDefinitions": [
                                                "firmly held opinion"
                                            ],
                                            "synonyms": [
                                                {
                                                    "language": "en",
                                                    "text": "opinion"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "view"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "viewpoint"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "point of view"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "attitude"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "stance"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "stand"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "standpoint"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "position"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "perspective"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "contention"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "conviction"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "judgement"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "thinking"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "way of thinking"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "thought"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "idea"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "theory"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "hypothesis"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "thesis"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "interpretation"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "assumption"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "presumption"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "supposition"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "surmise"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "postulation"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "conclusion"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "deduction"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "inference"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "notion"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "impression"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "sense"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "feeling"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "fancy"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "hunch"
                                                }
                                            ],
                                            "thesaurusLinks": [
                                                {
                                                    "entry_id": "belief",
                                                    "sense_id": "t_en_gb0001317.001"
                                                }
                                            ]
                                        },
                                        {
                                            "definitions": [
                                                "a religious conviction"
                                            ],
                                            "domainClasses": [
                                                {
                                                    "id": "religion",
                                                    "text": "Religion"
                                                }
                                            ],
                                            "examples": [
                                                {
                                                    "text": "Christian beliefs"
                                                },
                                                {
                                                    "notes": [
                                                        {
                                                            "text": "mass noun",
                                                            "type": "grammaticalNote"
                                                        }
                                                    ],
                                                    "text": "the medieval system of fervent religious belief"
                                                }
                                            ],
                                            "id": "m_en_gbus0085250.010",
                                            "semanticClasses": [
                                                {
                                                    "id": "belief",
                                                    "text": "Belief"
                                                }
                                            ],
                                            "shortDefinitions": [
                                                "religious conviction"
                                            ],
                                            "synonyms": [
                                                {
                                                    "language": "en",
                                                    "text": "ideology"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "principle"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "ideal"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "ethic"
                                                },
                                                {
                                                    "language": "en",
                                                    "text": "conviction"
                                                }
                                            ],
                                            "thesaurusLinks": [
                                                {
                                                    "entry_id": "belief",
                                                    "sense_id": "t_en_gb0001317.003"
                                                }
                                            ]
                                        }
                                    ],
                                    "synonyms": [
                                        {
                                            "language": "en",
                                            "text": "guess"
                                        },
                                        {
                                            "language": "en",
                                            "text": "speculation"
                                        },
                                        {
                                            "language": "en",
                                            "text": "surmise"
                                        },
                                        {
                                            "language": "en",
                                            "text": "fancy"
                                        },
                                        {
                                            "language": "en",
                                            "text": "notion"
                                        },
                                        {
                                            "language": "en",
                                            "text": "belief"
                                        },
                                        {
                                            "language": "en",
                                            "text": "suspicion"
                                        },
                                        {
                                            "language": "en",
                                            "text": "presumption"
                                        },
                                        {
                                            "language": "en",
                                            "text": "assumption"
                                        },
                                        {
                                            "language": "en",
                                            "text": "theory"
                                        },
                                        {
                                            "language": "en",
                                            "text": "hypothesis"
                                        },
                                        {
                                            "language": "en",
                                            "text": "postulation"
                                        },
                                        {
                                            "language": "en",
                                            "text": "supposition"
                                        }
                                    ],
                                    "thesaurusLinks": [
                                        {
                                            "entry_id": "conjecture",
                                            "sense_id": "t_en_gb0002827.001"
                                        }
                                    ]
                                },
                                {
                                    "constructions": [
                                        {
                                            "text": "belief in"
                                        }
                                    ],
                                    "definitions": [
                                        "trust, faith, or confidence in (someone or something)"
                                    ],
                                    "examples": [
                                        {
                                            "text": "a belief in democratic politics"
                                        }
                                    ],
                                    "id": "m_en_gbus0085250.012",
                                    "notes": [
                                        {
                                            "text": "\"belief in\"",
                                            "type": "wordFormNote"
                                        }
                                    ],
                                    "semanticClasses": [
                                        {
                                            "id": "feeling",
                                            "text": "Feeling"
                                        }
                                    ],
                                    "shortDefinitions": [
                                        "trust or confidence in someone or something"
                                    ],
                                    "synonyms": [
                                        {
                                            "language": "en",
                                            "text": "faith"
                                        },
                                        {
                                            "language": "en",
                                            "text": "trust"
                                        },
                                        {
                                            "language": "en",
                                            "text": "reliance"
                                        },
                                        {
                                            "language": "en",
                                            "text": "confidence"
                                        },
                                        {
                                            "language": "en",
                                            "text": "credence"
                                        },
                                        {
                                            "language": "en",
                                            "text": "freedom from doubt"
                                        }
                                    ],
                                    "thesaurusLinks": [
                                        {
                                            "entry_id": "belief",
                                            "sense_id": "t_en_gb0001317.002"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "language": "en-gb",
                    "lexicalCategory": {
                        "id": "noun",
                        "text": "Noun"
                    },
                    "phrases": [
                        {
                            "id": "be_of_the_belief_that",
                            "text": "be of the belief that"
                        },
                        {
                            "id": "beyond_belief",
                            "text": "beyond belief"
                        },
                        {
                            "id": "in_the_belief_that",
                            "text": "in the belief that"
                        },
                        {
                            "id": "to_the_best_of_my_belief",
                            "text": "to the best of my belief"
                        }
                    ],
                    "text": "belief"
                }
            ],
            "type": "headword",
            "word": "belief"
        }
    ],
    "word": "belief"
}
```

## 7. GET /favorites

Description:

- Get all favorites from database

Request:

- headers:

```json
{
     "access_token": "string (required)"
}


_Response (200 - OK)_


```json
[
    {
        "id": 13,
        "UserId": 8,
        "PostId": 3,
        "createdAt": "2022-08-16T15:41:25.282Z",
        "updatedAt": "2022-08-16T15:41:25.282Z",
        "Post": {
            "id": 3,
            "desc": "It takes a great man to be a good listener.",
            "CategoryId": 1,
            "UserId": 3,
            "User": {
                "id": 3,
                "username": "isStaff",
                "email": "staff@gmail.com"
            }
        }
    },
    {
        "id": 1,
        "UserId": 8,
        "PostId": 4,
        "createdAt": "2022-08-13T18:40:44.328Z",
        "updatedAt": "2022-08-13T18:40:44.328Z",
        "Post": {
            "id": 4,
            "desc": "ini adalah quote yang saya buat hahaa",
            "CategoryId": 2,
            "UserId": 8,
            "User": {
                "id": 8,
                "username": "aku",
                "email": "aku@gmail.com"
            }
        }
    },
    {
        "id": 2,
        "UserId": 8,
        "PostId": 1,
        "createdAt": "2022-08-16T07:23:04.531Z",
        "updatedAt": "2022-08-16T07:23:04.531Z",
        "Post": {
            "id": 1,
            "desc": "How many people you killed",
            "CategoryId": 3,
            "UserId": 1,
            "User": {
                "id": 1,
                "username": "isAdmin",
                "email": "admin@gmail.com"
            }
        }
    },
    {
        "id": 29,
        "UserId": 8,
        "PostId": 7,
        "createdAt": "2022-08-17T13:06:14.914Z",
        "updatedAt": "2022-08-17T13:06:14.914Z",
        "Post": {
            "id": 7,
            "desc": "aku benar-benar cape broo......\n\n\n\n\n\n#tapiBoong",
            "CategoryId": 4,
            "UserId": 1,
            "User": {
                "id": 1,
                "username": "isAdmin",
                "email": "admin@gmail.com"
            }
        }
    }
]

```


## 8. POST /favorites/:PostId

Request:

- body:


```json
{
  "UserId": "integer",
  "PostId": "integer",
}

- headers:

```json

{
  "access_token": "string (required)"
}

- params: 

```json
{

  "PostId": "integer"

}

```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "UserId": "integer",
  "PostId": "integer",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "FoodId is Required"
    ]
}
OR
{
  "message": [
    "UserId is Required"
    ]
}
```




## 9. DELETE /favorites/:id

Description:

- Delete current user favorite quote by id

Request:

- params:

```json
{
  "id": "integer (required)"
}

- headers:

```json

{
  "access_token": "string (required)"
}


```

_Response (200 - OK)_

```json
{
  "message": "success delete favorite"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "favorite is not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```