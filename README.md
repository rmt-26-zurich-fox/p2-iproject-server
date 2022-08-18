# p2-iproject-server
Individual Project - Server


## Endpoints

List of Available Endpoints:
- `GET /quran`
- `GET /quran/:surahId`
- `GET /quran/:surahId/:ayah`

### GET /quran
#### Description
- Get all Qur'an data

#### Response 
_200 - OK_

- Body 
  ```json
  {
    "status": integer,
    "message": string,
    "data": array of object
  }
  ```

### GET /quran/:surahId
#### Description
- Get surah data based on it's id

#### Response
_200 - OK_

- Body
  ```json
  {
    "status": integer,
    "message": string,
    "data": object
  }
  ```

### GET /quran/:surahId/:ayah
#### Description
- Get a specific ayah in a certain surah

#### Response
_200 - OK_

- Body
  ```json
  {
    "status": integer,
    "message": string,
    "data": {
      "surah": {object},
      "ayah": {object}
    }
  }
  ```

### Global Error
#### Response
_404 - Data not Found_
- Body
  ```json
  {
    "message": "Data not found"
  }
  ```

_500 - Internal server error_
- Body
  ```json
  {
    "message": "Internal server error"
  }