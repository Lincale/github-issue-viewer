import { getRepositories } from '$/service/repositories'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ query }) => {
    const result = await getRepositories(query)
    return {
      status: 200,
      body: result
    }
  }
}))
