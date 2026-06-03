# FlowSync Backend API Documentation

## Overview

This document outlines the REST API for the FlowSync Workflow Management System.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Currently using placeholder authentication. In production, implement JWT or OAuth.

## Error Handling

All error responses follow this format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Endpoints

### Workflows

#### Get All Workflows
```
GET /workflows
Query Parameters:
  - status: draft, active, archived
  - limit: 10 (default)
  - offset: 0 (default)

Response:
  - Array of workflow objects
```

#### Get Workflow by ID
```
GET /workflows/:id

Response:
  - Workflow object with full details
```

#### Create Workflow
```
POST /workflows
Body:
  {
    "name": "string",
    "description": "string",
    "trigger": "manual|scheduled|event",
    "steps": []
  }

Response:
  - Created workflow object
```

#### Update Workflow
```
PUT /workflows/:id
Body:
  {
    "name": "string",
    "description": "string",
    "steps": []
  }

Response:
  - Updated workflow object
```

#### Publish Workflow
```
POST /workflows/:id/publish

Response:
  {
    "id": "string",
    "status": "published"
  }
```

#### Delete Workflow
```
DELETE /workflows/:id

Response:
  {
    "success": true
  }
```

### Tasks

#### Get All Tasks
```
GET /tasks
Query Parameters:
  - status: pending, in-progress, completed
  - assignee: string
  - workflowId: string
  - limit: 10 (default)

Response:
  - Array of task objects
```

#### Get Task by ID
```
GET /tasks/:id

Response:
  - Task object
```

#### Create Task
```
POST /tasks
Body:
  {
    "title": "string",
    "description": "string",
    "assignee": "string",
    "dueDate": "ISO date",
    "workflowId": "string",
    "priority": "low|medium|high"
  }

Response:
  - Created task object
```

#### Update Task
```
PUT /tasks/:id
Body:
  {
    "title": "string",
    "description": "string",
    "status": "pending|in-progress|completed"
  }

Response:
  - Updated task object
```

#### Complete Task
```
POST /tasks/:id/complete

Response:
  {
    "id": "string",
    "status": "completed",
    "completedAt": "ISO date"
  }
```

#### Assign Task
```
POST /tasks/:id/assign
Body:
  {
    "assigneeId": "string"
  }

Response:
  - Updated task object
```

### Approvals

#### Get All Approvals
```
GET /approvals
Query Parameters:
  - status: pending, approved, rejected

Response:
  - Array of approval objects
```

#### Create Approval
```
POST /approvals
Body:
  {
    "title": "string",
    "description": "string",
    "approverId": "string",
    "itemId": "string",
    "itemType": "task|workflow|document",
    "requestedBy": "string"
  }

Response:
  - Created approval object
```

#### Approve Request
```
POST /approvals/:id/approve
Body:
  {
    "approvedBy": "string"
  }

Response:
  - Updated approval object
```

#### Reject Request
```
POST /approvals/:id/reject
Body:
  {
    "rejectedBy": "string",
    "reason": "string"
  }

Response:
  - Updated approval object
```

### Automation

#### Get All Rules
```
GET /automation/rules

Response:
  - Array of automation rule objects
```

#### Create Rule
```
POST /automation/rules
Body:
  {
    "name": "string",
    "description": "string",
    "trigger": "string",
    "conditions": [],
    "actions": [],
    "enabled": true
  }

Response:
  - Created rule object
```

#### Update Rule
```
PUT /automation/rules/:id
Body:
  {
    "name": "string",
    "conditions": [],
    "actions": []
  }

Response:
  - Updated rule object
```

#### Toggle Rule
```
POST /automation/rules/:id/toggle
Body:
  {
    "enabled": true|false
  }

Response:
  - Updated rule object
```

#### Get Available Triggers
```
GET /automation/triggers

Response:
  - Array of trigger options
```

#### Get Available Actions
```
GET /automation/actions

Response:
  - Array of action options
```

#### Get Execution Logs
```
GET /automation/logs
Query Parameters:
  - limit: 100 (default)

Response:
  - Array of execution log objects
```

## Data Models

### Workflow
```json
{
  "id": "wf_xxx",
  "name": "string",
  "description": "string",
  "trigger": "manual|scheduled|event",
  "steps": [
    {
      "id": "step_xxx",
      "type": "task|approval|condition|action",
      "title": "string",
      "description": "string",
      "config": {}
    }
  ],
  "published": boolean,
  "archived": boolean,
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

### Task
```json
{
  "id": "task_xxx",
  "title": "string",
  "description": "string",
  "status": "pending|in-progress|completed",
  "assignee": "string",
  "dueDate": "ISO date",
  "workflowId": "string",
  "priority": "low|medium|high",
  "tags": [],
  "attachments": [],
  "comments": [],
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

### Approval
```json
{
  "id": "appr_xxx",
  "title": "string",
  "description": "string",
  "status": "pending|approved|rejected",
  "approverId": "string",
  "itemId": "string",
  "itemType": "task|workflow|document",
  "requestedBy": "string",
  "requestedAt": "ISO date",
  "approvedAt": "ISO date|null",
  "rejectedAt": "ISO date|null",
  "reason": "string",
  "comments": []
}
```

### Automation Rule
```json
{
  "id": "rule_xxx",
  "name": "string",
  "description": "string",
  "enabled": boolean,
  "trigger": "string",
  "conditions": [],
  "actions": [],
  "executedCount": number,
  "lastExecutedAt": "ISO date|null",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 10 requests per minute for unauthenticated users

## Response Pagination

Large lists use pagination:

```json
{
  "data": [],
  "pagination": {
    "limit": 10,
    "offset": 0,
    "total": 100,
    "hasMore": true
  }
}
```
