## Endpoints

List of Available Endpoints:
* `GET /agents`
* `GET /:map/:type/:site`

## GET /agents

Description

* Get data agents


Response :

* Respon 200 - (OK)

    ```js
   [
        {
            "name": "<name>",
            "description": <"description">
            "icon": "<icon>",
            "img": "<img>",
            "role": {
                "name": "<name>",
                "image": "<image>"
            },
            "abilities": {
                "ability1": {
                    "name": "<name>",
                    "description": <"description">
                },
                "ability2": {
                    "name": "<name>",
                    "description": <"description">
                },
                "ability3": {
                    "name": "<name>",
                    "description": <"description">
                },
                "ultimate": {
                    "name": "<name>",
                    "description": <"description">
                }
            }
        }, ...
    ]
    ```   

## GET /:map/:type/:site

Description

* Get strategy image


Response :

* Respon 200 - (OK)

    ```js
   [
        {
            "id": "<id>",
            "imageUrl": "<imageUrl>",
            "site": "<site>",
            "type": "<type>",
            "map": "<map>",
            "createdAt": "<createdAt>",
            "updatedAt": "<updatedAt>"
        },...
    ]
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
