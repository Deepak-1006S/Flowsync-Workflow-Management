# FlowSync - Quick Start Guide

## Project Overview

FlowSync is a comprehensive **Workflow Management System** built with React and Context API. It provides:

✅ **Workflow Management** - Create, manage, and execute workflows  
✅ **Task Management** - Kanban board with task tracking  
✅ **Approval Workflows** - Multi-step approval chains  
✅ **Automation** - Rule-based workflow automation  
✅ **Dashboard** - Real-time insights and analytics  

## Getting Started in 5 Minutes

### 1. Install Dependencies

```bash
cd d:\FlowSync
npm install
```

### 2. Create Environment File

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

Or copy from template:
```bash
cp .env.example .env
```

### 3. Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

### 4. Navigate the Application

- **Dashboard** - Overview of all workflows, tasks, and approvals
- **Workflows** - Create and manage workflow definitions
- **Tasks** - Kanban board for task management
- **Approvals** - Review and approve pending requests
- **Automation** - Configure automation rules and triggers

## Project Structure

```
FlowSync/
├── src/
│   ├── components/           # React components
│   │   ├── Common/          # Reusable UI components
│   │   ├── Dashboard/       # Dashboard components
│   │   ├── Kanban/          # Task board components
│   │   ├── Layout/          # Main layout wrapper
│   │   └── Workflow/        # Workflow components
│   ├── context/              # Context API state management
│   │   ├── WorkflowContext.js
│   │   ├── TaskContext.js
│   │   ├── ApprovalContext.js
│   │   └── AutomationContext.js
│   ├── hooks/                # Custom React hooks
│   │   ├── useWorkflow.js
│   │   ├── useTask.js
│   │   ├── useApproval.js
│   │   └── useAutomation.js
│   ├── pages/                # Page components
│   │   ├── DashboardPage.js
│   │   ├── WorkflowsPage.js
│   │   ├── TasksPage.js
│   │   ├── ApprovalsPage.js
│   │   └── AutomationPage.js
│   ├── utils/                # Utility functions
│   │   ├── api.js           # API service calls
│   │   ├── workflowUtils.js # Helper functions
│   │   ├── WorkflowEngine.js # Workflow execution engine
│   │   └── AutomationEngine.js # Automation execution engine
│   ├── styles/               # CSS styles
│   │   └── index.css
│   ├── App.js               # Main app component
│   └── index.js             # React entry point
├── Public/
│   └── index.html           # HTML template
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.js        # PostCSS config
├── .env.example             # Environment template
├── .gitignore              # Git ignore rules
├── README.md               # Project documentation
├── API_DOCUMENTATION.md    # API reference
├── BACKEND_SETUP.md        # Backend setup guide
└── QUICK_START.md          # This file
```

## Key Features

### 1. Workflow Management

- **Visual Builder**: Create workflows with visual steps
- **Multiple Step Types**: Task, Approval, Condition, Action
- **Publish/Archive**: Control workflow lifecycle
- **Templates**: Reusable workflow templates

### 2. Task Management

- **Kanban Board**: Drag-and-drop task management
- **Status Tracking**: Pending, In-Progress, Completed
- **Priority Levels**: Low, Medium, High
- **Due Dates**: Track task deadlines
- **Assignees**: Assign tasks to team members

### 3. Approval Workflows

- **Approval Chains**: Multi-step approval processes
- **Request Tracking**: Full approval history
- **Approval/Rejection**: Accept or reject with comments
- **Audit Trail**: Complete approval log

### 4. Automation

- **Rule Engine**: Create trigger-action rules
- **Conditional Logic**: Complex workflow automation
- **Multiple Triggers**: Event-based, scheduled, manual
- **Execution Logs**: Monitor rule execution

## State Management

The application uses **React Context API** for state management with four main contexts:

### WorkflowContext
- Manages workflow definitions
- Stores templates and current workflow
- Handles workflow CRUD operations

### TaskContext
- Manages task collection
- Tracks task status and filters
- Handles task assignments

### ApprovalContext
- Manages approval requests
- Tracks approval status
- Maintains approval history

### AutomationContext
- Manages automation rules
- Stores triggers and actions
- Logs rule executions

## API Integration

The application expects a REST API backend. Configure the API URL in `.env`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API endpoints.

## Available Scripts

```bash
npm start       # Start development server
npm build       # Build for production
npm test        # Run tests
npm eject       # Eject create-react-app (not reversible)
```

## Technologies Used

- **React** 18.2.0 - UI framework
- **React Router** 6.8.0 - Client-side routing
- **Tailwind CSS** 3.2.0 - Styling
- **Context API** - State management
- **Fetch API** - HTTP requests

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Styling

The project uses **Tailwind CSS** with custom configuration. Key features:

- Responsive design
- Dark mode support (extensible)
- Custom color scheme
- Pre-configured components

## Extending the Application

### Add a New Feature

1. Create context if needed: `src/context/NewFeatureContext.js`
2. Create components: `src/components/Feature/`
3. Create page: `src/pages/FeaturePage.js`
4. Add route in `App.js`
5. Add navigation link in `Layout.js`

### Add Custom Hooks

Create in `src/hooks/useNewHook.js`:

```javascript
import { useContext } from 'react';
import { NewContext } from '../context/NewContext';

export const useNewHook = () => {
  const context = useContext(NewContext);
  if (!context) {
    throw new Error('useNewHook must be used within provider');
  }
  return context;
};
```

### Add API Methods

Add to `src/utils/api.js`:

```javascript
export const newAPI = {
  getAll: async () => {
    // Implementation
  },
  // ... other methods
};
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### API Connection Issues

1. Check `.env` has correct `REACT_APP_API_URL`
2. Verify backend is running on configured port
3. Check CORS settings on backend
4. Verify network connectivity

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm build
```

## Performance Tips

1. Use React DevTools to monitor re-renders
2. Implement lazy loading for large lists
3. Memoize expensive computations
4. Use useCallback for event handlers
5. Optimize images and assets

## Security Considerations

1. Implement authentication (JWT recommended)
2. Validate all user inputs
3. Use HTTPS in production
4. Protect sensitive data
5. Implement proper CORS
6. Add rate limiting

## Next Steps

1. **Set up Backend**: See [BACKEND_SETUP.md](./BACKEND_SETUP.md)
2. **Implement Authentication**: Add user login/logout
3. **Add Database**: Connect to MongoDB or PostgreSQL
4. **Deploy Frontend**: Deploy to Vercel, Netlify, or GitHub Pages
5. **Deploy Backend**: Deploy to Heroku, AWS, or DigitalOcean
6. **Add Tests**: Implement unit and integration tests

## Documentation

- 📚 [README.md](./README.md) - Full project documentation
- 📖 [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - REST API reference
- 🔧 [BACKEND_SETUP.md](./BACKEND_SETUP.md) - Backend setup guide

## Support

For issues and questions:

1. Check documentation first
2. Review code comments
3. Check browser console for errors
4. Create an issue with detailed information

## License

MIT License - Feel free to use this project for personal or commercial purposes.

---

**Happy Coding! 🚀**

For questions or updates, refer to the main [README.md](./README.md)
