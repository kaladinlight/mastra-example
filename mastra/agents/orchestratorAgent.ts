import { Agent } from '@mastra/core'
import { Memory } from '@mastra/memory'

import { openai } from '../models'
import { assetAgentTool } from '../tools/assetAgentTool'
import { searchWorkflow } from '../workflows/search'


export const orchestratorAgent = new Agent({
  name: 'Orchestrator Agent',
  instructions: `
    Asset Agent:
      - Fetches asset details and market data.
      - The prompt should explain that you are fetching asset details and market data for {ASSET} on {NETWORK}.

    Search Workflow:
      - Performs a search for a users search term
  `,
  model: openai('gpt-4o-mini'),
  tools: {
    assetAgentTool,
  },
  workflows: {
    searchWorkflow,
  },
  memory: new Memory({
    options: {
      workingMemory: {
        enabled: true,
      },
    },
  }),
})
