# Form Builder Backend

Backend API for the Form Builder application built with Express.js and MongoDB.

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   ├── Form.js              # Form schema and model
│   └── FormResponse.js       # Form response schema and model
├── controllers/
│   ├── FormController.js           # Form request handlers
│   └── FormResponseController.js   # Form response request handlers
├── services/
│   ├── FormService.js              # Form business logic
│   └── FormResponseService.js      # Form response business logic
├── routes/
│   └── formRoutes.js        # API routes
├── server.js                # Main server file
├── package.json             # Project dependencies
├── .env.example             # Environment variables example
└── .gitignore              # Git ignore file
```

## Setup & Installation

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Make sure MongoDB is running locally or update the `MONGO_URI` in `.env`

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Get all forms
- **GET** `/api/forms`

### Create a new form
- **POST** `/api/forms`
- Body: `{ "title": "Form Title" }`

### Get form by ID
- **GET** `/api/forms/:id`

### Update form title
- **PUT** `/api/forms/:id/title`
- Body: `{ "title": "New Title" }`

### Add input to form
- **POST** `/api/forms/:id/input`
- Body: `{ "type": "text", "title": "Input Title", "placeholder": "Enter text" }`

### Delete input from form
- **DELETE** `/api/forms/:id/input/:inputId`

### Update input
- **PUT** `/api/forms/:id/input/:inputId`
- Body: `{ "type": "email", "title": "New Title", "placeholder": "New placeholder" }`

### Reorder inputs
- **PUT** `/api/forms/:id/reorder`
- Body: `{ "newOrder": ["id1", "id2", "id3"] }`

### Delete form
- **DELETE** `/api/forms/:id`

### Submit form response
- **POST** `/api/forms/:id/submit`
- Body: `{ "responses": { "inputId": "value", ... } }`

### Get form responses
- **GET** `/api/forms/:id/responses`

## Database Schema

### Form
- title: String
- inputs: Array of Input objects
- createdAt: Date
- updatedAt: Date

### Input (nested in Form)
- id: String (unique identifier)
- type: String (text, email, password, number, date)
- title: String
- placeholder: String
- position: Number

### FormResponse
- formId: ObjectId (reference to Form)
- responses: Object (key-value pairs of input responses)
- submittedAt: Date
