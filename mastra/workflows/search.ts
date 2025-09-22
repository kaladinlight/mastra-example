import { createStep, createWorkflow } from '@mastra/core'
import z from 'zod'

const searchWorkflowInput = z.object({
	searchTerm: z.string(),
})

export const searchWorkflowOutput = z.object({
	result: z.string(),
})

export const searchWorkflow = createWorkflow({
	id: 'searchWorkflow',
	description: 'Perform a search for a users search term',
	inputSchema: searchWorkflowInput,
	outputSchema: searchWorkflowOutput,
})
	.then(createStep({
		id: 'step1',
		inputSchema: searchWorkflowInput,
		outputSchema: z.object({ searchResult: z.string() }),
		execute: ({ inputData, mastra }) => {
			const logger = mastra.getLogger()

    		logger.info('search step1', { inputData })

			return Promise.resolve({
				searchResult: `Search result for ${inputData.searchTerm}: success`,
			})
		},
	}))
	.then(createStep({
		id: 'step2',
		inputSchema: z.object({ searchResult: z.string() }),
		outputSchema: searchWorkflowOutput,
		execute: ({ inputData, mastra }) => {
			const logger = mastra.getLogger()

    		logger.info('search step2', { inputData })

			return Promise.resolve({
				result: `Result for ${inputData.searchResult}: success`,
			})
		},
	}))
	.commit()