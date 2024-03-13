# Node.js Express with Multer for AWS S3

This is a Node.js Express application that utilizes Multer for uploading files to AWS S3. It provides API endpoints for user management, document handling, and folder creation.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- AWS account with S3 bucket configured

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
Install dependencies:
npm install

Configure environment variables:
Create a .env file in the root directory and add the following environment variables:
dotenv

AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-s3-region
BUCKET_NAME=your-s3-bucket-name
DATABASE_URL=your-database-url
Usage

Start the server:
npm start
Use Postman or any other API testing tool to interact with the endpoints.
Endpoints
User Management
Sign Up User

Method: POST
Endpoint: /signup
Body: { "username": "example", "password": "password" }
Description: Creates a new user account.
Log In User

Method: POST
Endpoint: /login
Body: { "username": "example", "password": "password" }
Description: Logs in an existing user.
Get Users

Method: GET
Endpoint: /users
Description: Retrieves a list of all users.
Document Handling
Get Documents

Method: GET
Endpoint: /documents
Description: Retrieves documents associated with the logged-in user.
Upload Document

Method: POST
Endpoint: /upload
Description: Uploads a document to the S3 bucket.
Folder Creation
Create Folder
Method: POST
Endpoint: /create-folder
Body: { "folderName": "example-folder" }
Description: Creates a new folder in the S3 bucket.

Technologies Used:
Node.js
Express.js
Multer
AWS SDK
PostgreSQL (for user authentication and document metadata storage)




Make sure to replace placeholders like `<repository-url>`, `your-access-key-id`, `your-secret-access-key`, `your-s3-region`, `your-s3-bucket-name`, and `your-database-url` with actual values relevant to your project. This README provides an overview of the application, how to set it up, use it, and the available endpoints. You can expand upon it with more detailed explanations, examples, or any other information relevant to your project.
