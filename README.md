
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
3. Data persistence uses localStorage (simulating a backend API)
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
- Deploy API code to Heroku/Railway/Render
- Production env variables (AKA JWT secrets etc) can be updated within something like AWS Secret manager or within Heroku.
- Create a production MySQL setup (AWS RDS / Railway)


### For expansion + sustainability (TODOs)
- SSL certificates
- CI/CD for automated deployments
- Domain setup and DNS configuration
- Logging and monitoring
^ Console logs might be enough for now, but we can also use tools like [Winston](https://github.com/winstonjs/winston) or [Sentry](https://sentry.io/)
- Add an on-call schedule
- Create a runbook for rollbacks, deployments, QA, and how to monitor

### TODOs
- Re-think the type of id used for user ids and record ids. [Nanoid](https://www.npmjs.com/package/nanoid)s would be a nice way to keep them unique but succinct.
- Aggregate types between /app and api! Can be a standalone package
^ We can use [Typedoc] (https://typedoc.org/) to make these types more available for quick browsing
- Split out common utilities (AKA password validation or email validation into a standalone package)
^ This would be beneficial for ensuring we validate information in the same way between the backend and front-end
- Add a testing harness for /app (Playwright or Cypress)
- Add React storybook within the app/src/components folder
^ This can be deployed to a static website that gets re-deployed when this folder gets updated + split to a separate package
- Add a testing harness for /api (mocha + jest)

### Assumptions made
- JWT auth is enough for authentication (i.e If this app were to be merged with an existing platform, this would need to get reworked.)
- Tailwind CSS is a technology that would be easy to adopt! It certainly has a learning curve, but it increases velocity when it comes to building UI, adds consistency, decreases bundle size (Purges unused styles), responsive, etc. But it is more verbose than using a standalone CSS file with BEM naming.
- Email is not a required field when gathering notes
- People who we canvass won't eventually become users themselves

### What it looks like
<img width="1032" alt="Image" src="https://github.com/user-attachments/assets/fc83c3b8-627e-4fe6-b2d9-6e56f0e45844" />
<img width="1043" alt="Image" src="https://github.com/user-attachments/assets/8d7267d5-d7f3-4ccd-8094-304edcbac1c6" />
<img width="1124" alt="Image" src="https://github.com/user-attachments/assets/7e9b9cbe-87ad-4a1f-a8bf-abe725540dd0" />
<img width="1228" alt="Image" src="https://github.com/user-attachments/assets/66d2d24a-9e12-42be-a208-f0632020832c" />
<img width="1096" alt="Image" src="https://github.com/user-attachments/assets/c4f1e231-937b-4b4f-a89d-8253ef3464b0" />
<img width="684" alt="Image" src="https://github.com/user-attachments/assets/8708a161-35d1-4cce-8e2f-7f392493a4a3" />
<img width="419" alt="Image" src="https://github.com/user-attachments/assets/7320eb8f-bf2d-41c1-aa8f-e922d444c96e" />
<img width="408" alt="Image" src="https://github.com/user-attachments/assets/5a7a1b1c-d99d-430e-a99c-391791865283" />
<img width="1061" alt="Image" src="https://github.com/user-attachments/assets/96fd6c57-ddb0-4988-8a28-31cc1556dcb5" />

## License
This project is licensed under the MIT License.
