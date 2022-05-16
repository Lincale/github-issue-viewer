import { GetRepositoriesQuery, ResRepository } from '$/types'
import { graphql } from '$/utils/graphql'
import { Issue } from '@prisma/client'

const QUERY = `
  query ($first: Int, $after: String, $searchString: String!) {
    search(first: $first, after: $after, query: $searchString, type: REPOSITORY){
      pageInfo {
        endCursor
      }
      nodes {
        ... on Repository {
          id
          nameWithOwner
          url
          issues(orderBy: {field: UPDATED_AT, direction: DESC}, first: 10) {
            nodes {
              id
              url
              title
            }
          }
        }
      }
    }
  }
`

export const getRepositories = async (
  query: GetRepositoriesQuery
): Promise<{
  next: string
  repositories: ResRepository[]
}> => {
  const { search } = await graphql(
    QUERY,
    query.after
      ? {
          first: query.first,
          after: query.after,
          searchString: query.query
        }
      : {
          first: query.first,
          searchString: query.query
        }
  )
  const { pageInfo, nodes: repositories } = search
  return {
    next: pageInfo.endCursor,
    repositories: repositories.map(
      (repository: {
        id: string
        nameWithOwner: string
        url: string
        issues: {
          nodes: Pick<Issue, 'id' | 'title' | 'url' | 'repositoryId'>[]
        }
      }) => ({
        id: repository.id,
        name: repository.nameWithOwner,
        url: repository.url,
        issues: repository.issues.nodes
      })
    )
  }
}
