# 🚀 FlowSync - Professional Developer Quick Reference

## 🎯 Project Overview

**FlowSync** is an enterprise-grade workflow management system built with React, featuring:
- 📊 Dashboard with analytics
- 🔄 Workflow builder and execution
- 📋 Task management (Kanban board)
- ✓ Approval workflows
- ⚙️ Automation rules engine

## 🏃 Quick Start (5 minutes)

```bash
# Install dependencies
npm install

# Format code to standards
npm run format

# Start development server
npm start

# Open browser: http://localhost:3000
```

## 🛠️ Essential Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Start dev server (hot reload) |
| `npm run build` | Production build |
| `npm test` | Run tests |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Fix auto-fixable issues |
| `npm run format` | Format all code |
| `npm run analyze` | Analyze bundle size |

## 📁 Key Files Location

```
Core Business Logic:
├── src/context/        → State management (4 providers)
├── src/utils/api.js    → 100+ API endpoints
└── src/utils/*Engine.js → Workflow & Automation engines

Professional Infrastructure:
├── src/utils/Logger.js       → Logging (info/warn/error/debug)
├── src/utils/APIClient.js    → HTTP client with interceptors
├── src/utils/validation.js   → Input validation
├── src/utils/performance.js  → Optimization tools
└── src/config/index.js       → Configuration management

UI Components:
├── src/pages/          → Page components (5 pages)
├── src/components/     → Feature & common components
└── src/components/Common/ → Reusable: ErrorBoundary, Alert, Spinner

Custom Hooks:
├── src/hooks/useWorkflow.js  → Workflow state
├── src/hooks/useTask.js      → Task state
├── src/hooks/useFetch.js     → Data fetching with cache
└── src/hooks/useAsync.js     → Async operations

Configuration:
├── .eslintrc.json      → Code quality rules
├── .prettierrc          → Code formatting rules
├── src/constants/index.js → Enums and constants
└── src/config/index.js    → App configuration
```

## 💻 Component Example

```javascript
import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { getLogger } from '../utils/Logger';

const logger = getLogger('WorkflowList');

function WorkflowList() {
  const { data: workflows, loading, error } = useFetch('/workflows');

  useEffect(() => {
    if (workflows) {
      logger.info('Workflows loaded', { count: workflows.length });
    }
  }, [workflows]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert type="error" message={error.message} />;

  return (
    <div>
      {workflows.map(w => (
        <div key={w.id} className="p-4 border rounded">
          <h3 className="font-bold">{w.name}</h3>
          <p className="text-sm text-gray-500">{w.description}</p>
        </div>
      ))}
    </div>
  );
}

export default WorkflowList;
```

## 🔗 API Usage Example

```javascript
import apiClient from '../utils/APIClient';
import { getLogger } from '../utils/Logger';

const logger = getLogger('WorkflowService');

async function fetchWorkflows() {
  try {
    const workflows = await apiClient.get('/workflows');
    logger.info('Workflows fetched', { count: workflows.length });
    return workflows;
  } catch (error) {
    logger.error('Failed to fetch workflows', error);
    throw error;
  }
}

async function createWorkflow(data) {
  const created = await apiClient.post('/workflows', data);
  logger.info('Workflow created', { id: created.id });
  return created;
}
```

## ✅ Pre-Commit Checklist

```bash
# Before pushing code:
npm run format        # Format all code ✓
npm run lint:fix      # Fix linting issues ✓
npm run build         # Ensure build works ✓
npm test              # Run tests ✓
```

## 🎯 Common Tasks

### Add a New Component
```javascript
// src/components/Features/MyComponent.js
const MyComponent = () => {
  return <div>My Component</div>;
};
export default MyComponent;
```

### Add a New Hook
```javascript
// src/hooks/useMyHook.js
import { useState } from 'react';

export const useMyHook = () => {
  const [state, setState] = useState();
  return { state, setState };
};
```

### Add a New API Endpoint
```javascript
// src/utils/api.js - Add to module.exports
createTask: (data) => apiClient.post('/tasks', data),
getTaskById: (id) => apiClient.get(`/tasks/${id}`),
```

### Add Validation
```javascript
// src/utils/validation.js - Add new function
export const isValidPhoneNumber = (phone) => {
  return /^\+?[1-9]\d{1,14}$/.test(phone);
};
```

## 📊 Code Quality

### Lint Rules
- No unused variables
- Prefer const over let/var
- Use === (not ==)
- Error logging required
- No console.log in production

### Prettier Settings
- 100 character line width
- Single quotes
- 2-space indentation
- Trailing commas

## 🐛 Debugging

### Enable Debug Logs
```javascript
// In localStorage (browser console):
localStorage.setItem('DEBUG', '*');
// Then reload page to see all logs
```

### Component Debugging
```javascript
// React DevTools: Inspect components
// Network Tab: Monitor API calls
// Console: Check logger output
```

### Error Handling
- ErrorBoundary catches component errors
- APIClient handles 401/500 responses
- Logger provides error context

## 📚 Documentation References

- [Development Guidelines](./DEVELOPMENT_GUIDELINES.md) - Code standards
- [Architecture Guide](./ARCHITECTURE.md) - System design
- [API Documentation](./API_DOCUMENTATION.md) - All endpoints
- [Professional Upgrade](./PROFESSIONAL_UPGRADE.md) - New features

## 🔐 Environment Variables

```bash
# .env.example content:
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=10000
REACT_APP_ENV=development
REACT_APP_LOG_LEVEL=debug
REACT_APP_FEATURE_ANALYTICS=true
```

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 💡 Pro Tips

1. **Reuse hooks** - Don't duplicate data fetching logic
2. **Use memoization** - Wrap expensive components with React.memo
3. **Debounce searches** - Optimize API calls
4. **Error boundaries** - Wrap feature sections
5. **Logger always** - Never use console.log in production code

## 🚀 Production Deployment

```bash
# Build for production
npm run build

# This creates optimized build in /build folder
# Deploy to Vercel: git push to deploy automatically
```

## ❓ Getting Help

1. Check [DEVELOPMENT_GUIDELINES.md](./DEVELOPMENT_GUIDELINES.md)
2. Review similar component implementations
3. Check Logger output for errors
4. Use React DevTools for debugging
5. Read inline code comments and JSDoc

## 📞 Common Issues

**"Module not found" error?**
- Check import path relative to file
- Verify file exists
- Check file name casing

**API 401 Unauthorized?**
- Check auth token in APIClient
- Verify CORS settings
- Check .env configuration

**Tests failing?**
- Run `npm run lint:fix` first
- Check test file location: `src/__tests__/`
- Use `npm test -- --watch` for TDD

**Build fails?**
- Run `npm run lint:fix`
- Check for console.log statements
- Verify all imports are correct

---

**Questions?** Check the documentation files or review the inline code comments. This project follows professional enterprise standards. 🎓✨
