
# Canvassing App

A modern web application for political and community canvassers to track conversations and manage contact information.

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: NodeJS JWT auth and with MYSQL
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite
- **State Management**: React Context API with custom hooks
- **Data Storage**: Local Storage (simulating backend API)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: Toast notifications for user feedback

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Setup

Refer to the README.md pages within /app and /api for installation and setup.

You will need to run the app and the api server in parallel.

The built files will be in the `dist` directory for each of these folders.

## Usage

### Getting Started
1. **Register**: Create a new account with your first name, last name, email, and password
2. **Login**: Sign in with your credentials
3. **Add Records**: Use the main form to record conversations with contacts
4. **View Records**: Navigate to the records page to see all your data
5. **Search**: Use the search bar to find specific contacts or notes
6. **Export**: Download your data as CSV for external analysis

### Data Management
- **Add New Contacts**: Fill out the form with first name, last name, email, and conversation notes
- **Edit Records**: Click the edit button on any record to modify information
- **Delete Records**: Remove records you no longer need
- **Search Functionality**: Search across all fields to quickly find information
- **CSV Export**: Export filtered results for use in spreadsheets or other tools

## Architecture

### Frontend Structure
```
src/
├── components/          # Reusable UI components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx            # Main application component
```

### Key Components
- **AuthContext**: Manages user authentication state
- **useCanvassingRecords**: Custom hook for record management
- **Layout**: Provides consistent navigation and header
- **AddRecordForm**: Form component for creating/editing records
- **RecordsList**: Displays and manages all records

### Data Flow
1. User authentication is managed through AuthContext
2. Canvassing records are managed through the useCanvassingRecords hook
3. Data persistence uses localStorage (simulating a backend API) // TODO: Replace with actual API calls!
4. All state changes trigger UI updates through React's state management

## API Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `GET /records` - Fetch user's records
- `POST /records` - Create new record
- `PUT /records/:id` - Update existing record
- `DELETE /records/:id` - Delete record

### Production Deployment Steps / Getting this production ready
// TODO
- Add gating based on env variable (NODE_ENV='development' vs NODE_ENV='production')
- Split out env variables for prod versus development (.env.production vs .env.development)
- Deploy API to Heroku/Railway/Render
- Production env variables (AKA JWT secrets etc) can be updated within something like AWS Secret manager or within Heroku.
- Create a production MySQL setup (AWS RDS / Railway)

### TODOs
- Aggregate types between /app and api! Can be a standalone package
^ We can use [Typedoc] (https://typedoc.org/) to make these types more available for quick browsing
- Split out common utilities (AKA password validation or email validation into a standalone package)
^ This would be beneficial for ensuring we validate information in the same way between the backend and front-end
- Add a testing harness for /app (playwright or cypress)
- Add React storybook within the app/src/components folder
^ This can be deployed to a static website that gets re-deployed when this folder gets updated + split to a separate package
- Add a testing harness for /api (mocha + jest)

### Assumptions made
- Tailwind CSS is a technology that would be easy to adopt! It certainly has a learning curve, but it increases velocity when it comes to building UI, adds consistency, decreases bundle size (Purges unused styles), responsive, etc. But it is more verbose than using a standalone CSS file with BEM naming.
- Email is not a required field when gathering notes
- People who we canvass won't eventually become users themselves

## License
This project is licensed under the MIT License.
