# Express backend

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mihaipricop/express.git
    cd express
    ```

2. Install dependencies for the project:

    ```bash
    npm install
    ```

## Building the Project

To build the project for production, run:

```bash
npm run build
```

## Running the Project

Start the backend service:

  ```bash
  npm start
  ```

## Project Details

### Backend Service

The backend service is an Express.js application that serves as a backend service. It is accessible at `http://localhost:5001`.

## API Endpoints

### Backend

- `GET /`: Returns a "Backend catch-all" message.
- `POST /register`: Registers a username and password for a user
- `POST /login`: Authenticates the user
- `GET /logout`: Ends the current logged in user session
- `GET /data`: Returns all data owned by a user
- `GET /data/:id`: Returns a record by ID if the current authenticated user is the owner
- `PUT /data/:id`: Updated a record
- `DEL /data/:id`: Deletes a record

## Jest Testing

Jest has different testing modes:

- **test**:
  - Runs all tests once using Jest.
  - Useful for a quick check to see if everything is working as expected.

- **test:watch**:
  - Runs Jest in watch mode.
  - Automatically re-runs tests when files change, making it easier to develop and test simultaneously.

- **test:ci**:
  - Runs tests in continuous integration (CI) mode.
  - Typically used in CI/CD pipelines to ensure tests run in a consistent environment without interactive prompts.

- **test:coverage**:
  - Runs tests and generates a code coverage report.
  - Helps you understand how much of your code is covered by tests.

    ```bash
    npm run test
    npm run test:watch
    npm run test:ci
    npm run test:coverage
    ```
