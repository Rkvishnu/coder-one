# Coding Platform - Backend

This is the backend for a coding platform where participants can solve questions and admins can manage the questions. It provides a RESTful API for user authentication, question management, and solution checking.

## Features

- User authentication with role-based access (admin/participant)
- User signup and login with JWT-based access tokens
- Admin APIs for adding, editing, and deleting questions
- API for adding test cases to a question
- API for checking the correctness of a user's solution
- Integration with the Sphere Engine API for problem creation

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens) for authentication
- Sphere Engine API for problem creation and solution checking

## Installation

1. Clone the repository:

```shell
git clone https://github.com/Rkvishnu/commet-labs-.git
```

2. move to backend directory:

```sh
cd backend
```

3. install required ddependencies:

```sh
npm install
```

4.Configure environment variables:

Create a .env file in the root directory of the project.
Set the following environment variables in the .env file:

- MONGO_URL:  'your_mongo_url'
- JWT_SECRET:  'your_jwtsecret_token'
- SPHERE_ENGINE_API_KEY: 'you_api_key here'
- SPHERE_ENGINE_ENDPOINT: 'your_endpoint'

5.start the server:

` node server.js`

## Future works :

- the frontend part of the application is yet to be completed ..
