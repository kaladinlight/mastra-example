import { chatRoute } from '@mastra/ai-sdk'
import { Mastra } from '@mastra/core'
import { LibSQLStore } from '@mastra/libsql'
import { PinoLogger } from '@mastra/loggers'

import { assetAgent, orchestratorAgent } from './agents'
import { searchWorkflow } from './workflows/search'

export const mastra = new Mastra({
  server: {
    apiRoutes: [
      chatRoute({
        path: '/chat/:agentId',
      }),
    ],
  },
  agents: {
    assetAgent,
    orchestratorAgent,
  },
  workflows: {
    searchWorkflow,
  },
  storage: new LibSQLStore({
    url: 'file:./mastra.db',
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
})
