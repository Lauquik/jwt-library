# Next.js JWT Authentication Example

This is a Next.js application demonstrating JWT authentication with TypeScript and TailwindCSS. It includes a simple signup form that generates a JWT token and a protected route that checks for a valid JWT token in the `Authorization` header.

## Features

- Signup form to generate JWT token
- Display and verify JWT token
- Protected route using middleware to check JWT token

## Technologies Used

- Next.js
- TypeScript
- TailwindCSS
- Custom JWT library (`jwt-library`)

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Lauquik/jwt-library
   cd jwt-library/demo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a .env.local file in the root of the project and add your JWT secret key:

   ```bash
   JWT_SECRET=your_secret_key
   ```

### Running the Application

Start the development server:

    npm run dev

## Routes

### /api/signup

- Method: POST
- Description: expects firstname and email in the request body
- usage
    ```
    {  
        "firstName": "string",
        "email": "string"
        }
    ```

### /api/validate

- Method: POST
- Description: expects token and email in the request body
- usage
    ```
    {  
        "token": "string",
        "email": "string"
        }
    ```
### /api/greet

- Method: POST
- Description: Protected API endpoint that requires a valid JWT token in the Authorization header.
- Request Header
    ```
    Authorization: Bearer YOUR_JWT_TOKEN
    ```
