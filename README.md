# FlowSync - Workflow Management System

A comprehensive workflow management system built with React and Context API for managing tasks, approvals, and automation.

## Features

### 1. **Workflow Management**
- Create and manage workflows
- Visual workflow builder with drag-and-drop
- Workflow templates for quick setup
- Publish/archive workflows
- Step-by-step workflow execution

### 2. **Task Management**
- Create and assign tasks
- Kanban board view (pending, in-progress, completed)
- Task priority levels (low, medium, high)
- Due date tracking and overdue alerts
- Task comments and attachments
- Task filtering and searching

### 3. **Approval Workflows**
- Multi-step approval chains
- Approval request creation and tracking
- Approve or reject with comments
- Approval history and audit trail
- Escalation management

### 4. **Automation**
- Create automation rules with triggers and actions
- Conditional logic for complex workflows
- Execution logs and monitoring
- Enable/disable rules on the fly
- Pre-built triggers and actions

## Project Structure

```
src/
├── components/
│   ├── Common/              # Reusable UI components
│   ├── Dashboard/           # Dashboard components
│   ├── Kanban/              # Task board components
│   ├── Layout/              # Layout wrapper
│   └── Workflow/            # Workflow components
├── context/
│   ├── WorkflowContext.js   # Workflow state management
│   ├── TaskContext.js       # Task state management
│   ├── ApprovalContext.js   # Approval state management
│   └── AutomationContext.js # Automation state management
├── hooks/
│   ├── useWorkflow.js       # Workflow hook
│   ├── useTask.js           # Task hook
│   ├── useApproval.js       # Approval hook
│   └── useAutomation.js     # Automation hook
├── pages/
│   ├── DashboardPage.js     # Dashboard page
│   ├── WorkflowsPage.js     # Workflows page
│   ├── TasksPage.js         # Tasks page
│   ├── ApprovalsPage.js     # Approvals page
│   └── AutomationPage.js    # Automation page
├── utils/
│   ├── api.js               # API service calls
│   └── workflowUtils.js     # Utility functions
├── styles/
│   └── index.css            # Global styles
├── App.js                   # Main app component
└── index.js                 # React entry point
```

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd flowsync
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Getting Started

### Development
```bash
npm start
```

The app will open at `http://localhost:3000`

### Build
```bash
npm build
```

### Testing
```bash
npm test
```

## API Integration

The application expects the following REST API endpoints:

### Workflows
- `GET /api/workflows` - Get all workflows
- `GET /api/workflows/:id` - Get workflow details
- `POST /api/workflows` - Create workflow
- `PUT /api/workflows/:id` - Update workflow
- `DELETE /api/workflows/:id` - Delete workflow
- `POST /api/workflows/:id/publish` - Publish workflow
- `GET /api/workflows/templates` - Get workflow templates

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task details
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/complete` - Complete task
- `POST /api/tasks/:id/assign` - Assign task

### Approvals
- `GET /api/approvals` - Get all approvals
- `GET /api/approvals?status=pending` - Get pending approvals
- `POST /api/approvals` - Create approval
- `POST /api/approvals/:id/approve` - Approve request
- `POST /api/approvals/:id/reject` - Reject request

### Automation
- `GET /api/automation/rules` - Get automation rules
- `POST /api/automation/rules` - Create rule
- `PUT /api/automation/rules/:id` - Update rule
- `DELETE /api/automation/rules/:id` - Delete rule
- `POST /api/automation/rules/:id/toggle` - Toggle rule
- `GET /api/automation/triggers` - Get available triggers
- `GET /api/automation/actions` - Get available actions
- `GET /api/automation/logs` - Get execution logs

## State Management

### Context API Structure

1. **WorkflowContext** - Manages workflow state
   - workflows array
   - currentWorkflow
   - templates
   - loading/error states

2. **TaskContext** - Manages task state
   - tasks array
   - currentTask
   - taskFilter
   - loading/error states

3. **ApprovalContext** - Manages approval state
   - approvals array
   - pendingApprovals
   - approvalHistory
   - loading/error states

4. **AutomationContext** - Manages automation state
   - rules array
   - triggers/actions
   - executionLogs
   - loading/error states

## Styling

The project uses Tailwind CSS for styling with a custom configuration. Key color schemes:

- **Primary**: #3b82f6 (Blue)
- **Success**: #10b981 (Green)
- **Danger**: #ef4444 (Red)
- **Warning**: #f59e0b (Orange)
- **Info**: #06b6d4 (Cyan)

## Usage Examples

### Creating a Workflow
1. Navigate to Workflows page
2. Click "New Workflow"
3. Configure workflow details (name, trigger, etc.)
4. Add workflow steps
5. Publish workflow

### Managing Tasks
1. Navigate to Tasks page
2. View tasks in Kanban board
3. Drag tasks between columns to change status
4. Click task to view/edit details

### Managing Approvals
1. Navigate to Approvals page
2. View pending approvals
3. Select an approval to review
4. Approve or reject with optional comments

### Setting Up Automation
1. Navigate to Automation page
2. Click "New Rule"
3. Configure trigger and conditions
4. Select actions to perform
5. Save and enable rule

## Performance Considerations

- Uses React Context API for state management (efficient for medium-sized apps)
- Implements lazy loading for large lists
- Optimized re-renders with useCallback hooks
- API calls are memoized where appropriate

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository.
>>>>>>> 9a4ace4 (Initial commit)
