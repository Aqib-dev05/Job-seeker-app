# 🎯 JobSeek App

A modern, responsive web application for discovering job opportunities and internships. Built with React 19 and Context API for efficient state management.

## ✨ Features

- **🔍 Smart Search** - Search by job title, company, or keywords
- **🎛️ Advanced Filters** - Filter by location, job type, and field
- **📱 Responsive Design** - Works perfectly on desktop and mobile
- **⚡ Real-time Updates** - Instant search and filter results
- **🎨 Modern UI** - Clean, professional interface with smooth animations
- **🔄 State Management** - Centralized state with Context API
- **⚡ Fast Performance** - Built with Vite for lightning-fast development

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Context API + useReducer
- **Architecture**: Component-based modular structure

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone "https://github.com/Aqib-dev05/Job-seeker-app"
   cd AQIB-ALI___JobSeek_App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173/`

## 📁 Project Structure

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

## 🎯 Usage

### Search Jobs
- Use the search bar to find jobs by title, company, or keywords
- Search is case-insensitive and searches across multiple fields

### Filter Results
- **Location**: Filter by specific cities or remote work
- **Type**: Filter by Internship, Full-time, Part-time, or Contract
- **Field**: Filter by Technology, Marketing, Design, etc.

### Responsive Design
- **Desktop**: Full filter controls in the header
- **Mobile**: Collapsible filter panel with touch-friendly controls

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 UI Components

### Job Card
- Company logo and information
- Job title and description
- Location, field, and deadline
- Apply button with external link

### Filter System
- Dropdown filters with search
- Active filter count
- Clear all filters option
- Mobile-responsive design

### States
- **Loading**: Animated spinner during data fetch
- **Error**: User-friendly error messages with retry option
- **Empty**: Helpful message when no results found


## 👨‍💻 Author

**Aqib Ali**
- Project: JobSeek App
- Built with ❤️ using React and modern web technologies

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons
- Vite team for the fast build tool

---

**Happy Job Hunting! 🎯**