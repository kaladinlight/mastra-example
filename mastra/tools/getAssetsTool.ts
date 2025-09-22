import { createTool } from '@mastra/core'
import z from 'zod'

export const asset = z.object({
  address: z.string().describe('The asset address'),
  symbol: z.string().describe('The asset symbol'),
  name: z.string().describe('The asset name'),
  network: z.string().describe('The asset network'),
  precision: z.number().describe('The asset decimal precision'),
})

export const assetOutput = z.object({
  assets: z.array(asset)
})

export const getAssetsTool = createTool({
  id: 'getAssets',
  description: 'Fetch asset details',
  inputSchema: z.object({ symbol: z.string() }),
  outputSchema: assetOutput,
  execute: async ({ context, mastra }) => {
    const logger = mastra!.getLogger()

    logger.info('getAssetsTool', { context })

    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 5000) + 5000))

    return Promise.resolve({
      assets: [{
        "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "symbol": "USDC",
        "name": "USDC",
        "network": "ethereum",
        "precision": 6,
      },
      {
        "address": "",
        "symbol": "ETH",
        "name": "Ethereum",
        "network": "ethereum",
        "precision": 18,
      }]
    })
  }
})