# Form Builder Frontend

React-based frontend for the Form Builder application with Tailwind CSS styling and Vite build tool.

## Project Structure

```
frontend/
├── index.html                   # Vite entry point (root level)
├── src/
│   ├── components/
│   │   ├── FormBuilder.jsx      # Main form builder component
│   │   ├── InputTypeSelector.jsx # Input type selection interface
│   │   ├── FormInputsList.jsx    # Display list of form inputs
│   │   ├── Header.jsx            # Navigation header
│   │   └── Footer.jsx           # Footer with company branding
│   ├── pages/
│   │   ├── HomePage.jsx          # List all forms
│   │   ├── CreateFormPage.jsx    # Create new form
│   │   ├── EditFormPage.jsx      # Edit existing form
│   │   └── ViewFormPage.jsx      # View and submit form
│   ├── services/
│   │   └── apiClient.js         # API integration
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                   # Main app with routing
│   └── index.css                # Tailwind CSS imports
├── public/                      # Static assets (images, fonts, etc.)
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies
├── .env                         # Environment variables
└── README.md                    # This file
```

## Setup & Installation

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (if not already exists):
```bash
VITE_API_URL=http://localhost:5000/api
```

4. Make sure the backend is running on `http://localhost:5000`

5. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Pages & Features

### Home Page (`/`)
- Displays all forms in a grid layout
- Create, Edit, View, Delete forms
- Form cards show title and input count

### Create Form Page (`/form/create`)
- Edit form title
- Add inputs (max 20)
- Select input type (text, email, password, number, date)
- Add label/title and placeholder for each input
- Display inputs in 2-column grid
- Save form to database

### Edit Form Page (`/form/:id/edit`)
- Edit existing form
- Modify form title
- Edit, delete, or reorder inputs with drag-and-drop
- Save changes

### View Form Page (`/form/:id`)
- Display form in read-only mode
- View all inputs in 2-column grid
- Input validation (email, number, date)
- Submit form responses
- Success notification

## Technologies Used

- **React 18** - UI framework
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server
- **Fetch API** - HTTP requests

## Component Details

### FormBuilder Component
- Main component for creating/editing forms
- Manages form state and title
- Handles input add/delete/update/reorder
- Calls API for persistence

### InputTypeSelector Component
- Interface for adding new inputs
- Type selection dropdown
- Title and placeholder input
- Form validation

### FormInputsList Component
- Display form inputs in 2-column grid
- Edit/Delete functionality
- Read-only preview of inputs
- Inline editing
- Drag-and-drop reordering with native HTML5 API

## Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
Creates optimized `dist/` folder for deployment.

### Preview Production Build
```bash
npm run preview
```

## Environment Variables

Create `.env.development` and `.env.production` files:

**Development:**
```
VITE_API_URL=http://localhost:5000/api
```

**Production:**
```
VITE_API_URL=https://your-backend-url.com/api
```

## API Integration

All API calls are abstracted in `src/services/apiClient.js`:
- `getAllForms()` - Fetch all forms
- `createForm(title)` - Create new form
- `getFormById(id)` - Get form by ID
- `updateFormTitle(id, title)` - Update form title
- `addInput(formId, data)` - Add input to form
- `deleteInput(formId, inputId)` - Delete input
- `updateInput(formId, inputId, data)` - Update input
- `reorderInputs(formId, newOrder)` - Reorder inputs
- `deleteForm(id)` - Delete entire form
- `submitForm(formId, responses)` - Submit form response
- `getFormResponses(formId)` - Get all responses

## Error Handling

- API errors are caught and displayed to user
- Form validation errors shown in real-time
- Network errors handled gracefully
- Success messages for form submissions

## Performance

With Vite:
- **Dev startup**: ~500ms (vs 3-5s with CRA)
- **Build time**: ~5-10s (vs 30-60s with CRA)
- **HMR (Hot Reload)**: < 100ms

## Notes

- Forms display inputs in 2 columns (responsive: 1 column on mobile)
- Maximum 20 inputs per form
- All input types have validation
- Minimal, clean design with Tailwind CSS
- No heavy third-party UI libraries used
- Drag-and-drop reordering with native HTML5 Drag API
- Professional header and footer with company branding (hitexa)

