import { createTool } from '@mastra/core'
import z from 'zod'

import { assetOutput } from './getAssetsTool'

export const assetAgentTool = createTool({
  id: 'assetAgent',
  description: 'Fetch asset details and market data',
  inputSchema: z.object({ prompt: z.string() }),
  outputSchema: assetOutput,
  execute: async ({ context, mastra, writer }) => {
    const logger = mastra!.getLogger()
    const assetAgent = mastra!.getAgent('assetAgent')

    logger.info('assetAgentTool', { context })

    const result = await assetAgent.streamVNext(context.prompt, {
      output: assetOutput,
      format: 'aisdk',
    })

    await result.fullStream.pipeTo(writer!)

    const response = await result.object

    logger.info('assetAgentTool', { response })

    return response
  },
})
