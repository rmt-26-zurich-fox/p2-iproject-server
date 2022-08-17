## Endpoints

List of Available Endpoints:

- `GET /recipes`
- `GET /recipes/:recipeId`

### GET /recipes

#### Description

- Get all recipes

#### Response

_200 - OK_

- Body
  ```json
  [
    {
      "id": Integer,
      "name": String,
      "description": String,
      "instructions": [
        {
          "id": Integer,
          "position": Integer,
          "display_text": String,
        },
        ...
      ],
      "image": String,
      "ingredients": [
        {
          "id": Integer,
          "ingredient": String
        },
        ...
      ]
    },
    ...
  ]
  ```

### GET /recipes/:recipeId

#### Description

- Get recipe by ID

#### Response

_200 - OK_

- Body

  ```json

    {
      "id": Integer,
      "name": String,
      "description": String,
      "instructions": [
        {
          "id": Integer,
          "position": Integer,
          "display_text": String,
        },
        ...
      ],
      "image": String,
      "ingredients": [
        {
          "id": Integer,
          "ingredient": String
        },
        ...
      ]
    },
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "message": ["Internal server error"]
  }
  ```
