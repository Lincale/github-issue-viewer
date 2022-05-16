import { graphql } from '@octokit/graphql'
import * as dotenv from 'dotenv'

dotenv.config()

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.MYAPP_GITHUB_TOKEN}`
  }
})

export { graphqlWithAuth as graphql }
