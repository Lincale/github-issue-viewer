import { GetRepositoriesQuery, ResRepository } from '$/types'

export type Methods = {
  get: {
    query: GetRepositoriesQuery
    resBody: {
      next: string
      repositories: ResRepository[]
    }
  }
}
