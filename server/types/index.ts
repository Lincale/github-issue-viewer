import { Issue, Repository } from '@prisma/client'

export type UserInfo = {
  id: string
  name: string
  icon: string
}

export type AuthHeader = {
  authorization: string
}

export type GetRepositoriesQuery = {
  first: number
  after: string
  query: string
}

export type ResRepository = Repository & {
  issues: Issue[]
}
