# JobSeek App - Project Structure

## 📁 File Organization

```
src/
├── main.jsx                    # Entry point with Context Provider
├── App.jsx                     # Main App component with layout
├── contexts/
│   └── JobsContext.jsx         # Context API for state management
├── services/
│   └── api.js                  # API functions and data fetching
├── constants/
│   └── filterOptions.js        # Filter options and configurations
└── components/
    ├── hello.jsx               # Main Jobs & Internships module
    ├── JobCard.jsx             # Individual job card component
    ├── FilterDropdown.jsx      # Reusable dropdown filter component
    ├── SearchBar.jsx           # Search input component
    ├── MobileFilters.jsx       # Mobile-specific filter panel
    ├── DesktopFilters.jsx      # Desktop filter controls
    ├── LoadingState.jsx        # Loading spinner component
    ├── ErrorState.jsx          # Error display component
    ├── EmptyState.jsx          # No results state component
    └── index.js                # Component exports
```

## 🏗️ Architecture Overview

### Context API Setup
- **Location**: `src/contexts/JobsContext.jsx`
- **Provider**: Wrapped around the entire app in `main.jsx`
- **Hook**: `useJobs()` provides access to state and actions

### State Management
- Uses `useReducer` for complex state logic
- Centralized state for:
  - Opportunities data
  - Loading states
  - Error handling
  - Search and filter states
  - Mobile UI states

### Component Hierarchy
```
App
├── Header
├── Main
│   └── JobsInternshipsModule
│       ├── SearchBar
│       ├── DesktopFilters
│       ├── MobileFilters
│       ├── JobCard (multiple)
│       ├── LoadingState
│       ├── ErrorState
│       └── EmptyState
└── Footer
```

## 🔧 Key Features

### Context API Benefits
- **Centralized State**: All job-related state in one place
- **Predictable Updates**: useReducer ensures consistent state changes
- **Easy Testing**: Components can be tested with mock context
- **Performance**: Optimized re-renders with useCallback

### Component Benefits
- **Reusability**: Components can be used across the app
- **Maintainability**: Single responsibility principle
- **Testability**: Each component can be tested in isolation
- **Scalability**: Easy to add new features

## 🚀 Usage Examples

### Using the Context
```jsx
import { useJobs } from '../contexts/JobsContext';

function MyComponent() {
  const { opportunities, loading, setSearchTerm } = useJobs();
  // Use context data and actions
}
```

### Importing Components
```jsx
import { JobCard, SearchBar, FilterDropdown } from './components';
```

## 📝 Next Steps

1. **Add Routing**: Implement React Router for multiple pages
2. **Add Authentication**: User login/logout functionality
3. **Add Favorites**: Save favorite jobs
4. **Add Notifications**: Job alerts and updates
5. **Add User Profile**: User preferences and settings
6. **Add Real API**: Replace mock data with real API calls
7. **Add Testing**: Unit and integration tests
8. **Add PWA Features**: Offline support and app-like experience
