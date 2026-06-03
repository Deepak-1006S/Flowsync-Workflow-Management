# Backend Setup Guide for FlowSync

This guide helps you set up the Node.js/Express backend for FlowSync.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB or other database (optional)

## Installation

### 1. Create Backend Directory

```bash
mkdir flowsync-backend
cd flowsync-backend
```

### 2. Initialize Node Project

```bash
npm init -y
```

### 3. Install Dependencies

```bash
npm install express cors dotenv mongoose axios
npm install -D nodemon
```

### 4. Create Basic Structure

```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
├── .env
├── server.js
└── package.json
```

### 5. Setup .env File

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/flowsync
```

### 6. Create Server File (server.js)

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Workflow routes
app.get('/api/workflows', (req, res) => {
  // TODO: Implement workflow retrieval
  res.json([]);
});

// Task routes
app.get('/api/tasks', (req, res) => {
  // TODO: Implement task retrieval
  res.json([]);
});

// Approval routes
app.get('/api/approvals', (req, res) => {
  // TODO: Implement approval retrieval
  res.json([]);
});

// Automation routes
app.get('/api/automation/rules', (req, res) => {
  // TODO: Implement rule retrieval
  res.json([]);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 7. Update package.json Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 8. Run Backend

```bash
npm run dev
```

## Database Models

### Workflow Model

```javascript
const workflowSchema = {
  name: String,
  description: String,
  trigger: String,
  steps: Array,
  published: Boolean,
  archived: Boolean,
  createdAt: Date,
  updatedAt: Date
};
```

### Task Model

```javascript
const taskSchema = {
  title: String,
  description: String,
  status: String,
  assignee: String,
  dueDate: Date,
  workflowId: String,
  priority: String,
  createdAt: Date,
  updatedAt: Date
};
```

### Approval Model

```javascript
const approvalSchema = {
  title: String,
  description: String,
  status: String,
  approverId: String,
  itemId: String,
  itemType: String,
  requestedBy: String,
  requestedAt: Date,
  approvedAt: Date,
  rejectedAt: Date
};
```

### Automation Rule Model

```javascript
const ruleSchema = {
  name: String,
  description: String,
  enabled: Boolean,
  trigger: String,
  conditions: Array,
  actions: Array,
  executedCount: Number,
  lastExecutedAt: Date,
  createdAt: Date,
  updatedAt: Date
};
```

## API Implementation Tips

1. **Error Handling**: Use middleware for consistent error handling
2. **Validation**: Validate all inputs before processing
3. **Authentication**: Implement JWT authentication
4. **Rate Limiting**: Add rate limiting to prevent abuse
5. **Logging**: Log all API requests and errors
6. **Testing**: Write unit and integration tests

## Next Steps

1. Implement database models with MongoDB/Mongoose
2. Create CRUD endpoints for each resource
3. Add authentication and authorization
4. Implement business logic for workflow execution
5. Add WebSocket support for real-time updates
6. Deploy backend to production

## Useful Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [REST API Best Practices](https://restfulapi.net/)
