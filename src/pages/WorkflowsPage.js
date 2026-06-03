import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import WorkflowList from '../components/Workflow/WorkflowList';
import WorkflowBuilder from '../components/Workflow/WorkflowBuilder';

const WorkflowsPage = () => {
  const [searchParams] = useSearchParams();
  const view = useMemo(() => {
    const mode = searchParams.get('mode');
    return mode === 'builder' ? 'builder' : 'list';
  }, [searchParams]);

  return <div>{view === 'builder' ? <WorkflowBuilder /> : <WorkflowList />}</div>;
};

export default WorkflowsPage;
