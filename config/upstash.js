import {Client as WorkflowClient} from '@upstash/workflow';
import { QSTASH_TOKEN, QSTASH_URL } from './env.js';

// Only create workflow client if credentials are properly configured
export const workflowClient = (QSTASH_TOKEN && QSTASH_URL) 
  ? new WorkflowClient({
      baseURL: QSTASH_URL,
      token: QSTASH_TOKEN,
    })
  : null;