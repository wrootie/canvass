
# Canvassing App

A modern web application for political and community canvassers to track conversations and manage contact information.

## Technology Stack

- **Frontend**: React 18 with TypeScript
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

### Installation

1. Clone the repository:
```bash
git clone https://github.com/wrootie/canvass
cd canvass
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Getting Started
1. **Register**: Create a new account with your name, email, and password
2. **Login**: Sign in with your credentials
3. **Add Records**: Use the main form to record conversations with contacts
4. **View Records**: Navigate to the records page to see all your data
5. **Search**: Use the search bar to find specific contacts or notes
6. **Export**: Download your data as CSV for external analysis

### Data Management
- **Add New Contacts**: Fill out the form with contact name, email, and conversation notes
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

### Production Deployment Steps

// TODO
## License

This project is licensed under the MIT License.
