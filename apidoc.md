# p2-cms-integration-server

CMS Integration - Server

## Endpoints

List of Available Endpoints:

- `POST /users/register`
- `POST /users/login`

- `GET /foods`

- `POST /health/bmi`
- `POST /health/fat-percentage`
- `POST /health/bmr`

- `GET /favourites`
- `POST /favourites/:foodId`
- `DELETE /favourites/:favouriteId`

### GET /foods

#### Description

- Get all the product data

#### Response

_200 - OK_
_500 - ERROR_

- Body
  ```json
  {
  	"totalItems": 40,
  	"food": [
  		{
  			"id": 1,
  			"title": "Chicken Brats & Root Beer BBQ Sauce",
  			"image": "https://spoonacular.com/recipeImages/637966-312x231.jpg",
  			"imageType": "jpg",
  			"calories": 513,
  			"protein": "20g",
  			"fat": "19g",
  			"carbs": "64g",
  			"createdAt": "2022-08-16T11:25:59.993Z",
  			"updatedAt": "2022-08-16T11:25:59.993Z"
  		}
  	],
  	"totalPages": 40,
  	"currentPage": 1
  }
  ```

### POST /health/bmi

#### Description

- Calculate BMI

#### Response

_200 - OK_
_404 - ERROR_

- Body
  ```json
  {
  	"bmi": 24.49,
  	"health": "Normal Weight",
  	"healthy_bmi_range": "18.5-24.9"
  }
  ```

### 404 Error

#### Response

404 - Internal Server Error\_

- Body
  ```json
  {
  	"statusCode": 404,
  	"error": {
  		"message": "Product not fond"
  	}
  }
  ```

### POST /health/bmr

#### Description

- Calculate BMR

#### Request

- Body
  ```json
  {
  	"bmr": 1806.902,
  	"gender": "male",
  	"carbs": 271.0353,
  	"protein": 67.758825,
  	"fat": 50.191722222222225
  }
  ```

#### Response

_201 - Created_
_500 - ERROR_

### POST /health/fat-percentage

#### Description

- Remove a product data based on given id

#### Response

_200 - OK_

- Body
  ```json
  {
  	"bfp": "14.24",
  	"fat_mass": "8.68",
  	"lean_mass": "52.32",
  	"description": "Fitness",
  	"gender": "male"
  }
  ```

### 404 Error

#### Response

404 - Internal Server Error\_

- Body

  ```json
  {
  	"statusCode": 404,
  	"error": {
  		"message": "Product not fond"
  	}
  }
  ```

  ```

  ```

### POST /user/register

#### Description

- Register user input username, email, password, phoneNumber, address

#### Response

_201 - OK_
_400 - Foreign key ERROR_

- Body
  `json { "statusCode": _201, "message": "Login success" } `
  _400 - Not Found_
- Body
  ```json
  {
  	"message": "Success register"
  }
  ```

### 400 Error

#### Response

_400 - input required_

- Body
  ```json
  {
  	"statusCode": 400,
  	"error": {
  		"message": [
  			"Email required",
  			"Password required",
  			"Phone Number required",
  			"Address required"
  		]
  	}
  }
  ```

### POST /user/login

#### Description

- Login with email and password

#### Response

_201 - OK_
_401 - Invalid email/password ERROR_

- Body
  `json({ access_token: createToken(payload) }) `
  _201 - OK_
- Body
  ```json
  {
  	"access_token": "<your_token>"
  }
  ```

### 401 Error

#### Response

_401 - input required_

- Body
  ```json
  {
  	"statusCode": 401,
  	"error": {
  		"message": "Email and Password Invalid"
  	}
  }
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
