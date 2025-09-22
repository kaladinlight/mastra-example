import { Agent } from '@mastra/core'
import { Memory } from '@mastra/memory'

import { openai } from '../models'
import { getAssetsTool } from '../tools/getAssetsTool'

export const assetAgent = new Agent({
  name: 'Asset Agent',
  instructions: `You are responsible for fetching asset and market data`,
  model: openai('gpt-4o-mini'),
  tools: {
    getAssetsTool,
  },
  memory: new Memory({
    options: {
      workingMemory: {
        enabled: true,
      },
    },
  }),
})
