import Head from 'next/head'
import { useCallback, useMemo, useState } from 'react'
import { apiClient } from '~/utils/apiClient'
import type { Issue, Repository } from '$prisma/client'
import Layout from '~/components/Layout'
import type { NextPage } from 'next'
import { styled } from '@mui/system'
import { Box, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { ExternalLink } from '~/components/ExternalLink'

export type ResRepository = Repository & {
  issues: Issue[]
}

export type GetRepositories = {
  first: number
  after: string
  query: string
}

const Title = styled('p')({
  lineHeight: 1.5,
  fontSize: '1.5rem'
})

const List = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
  width: '450px',
  height: '400px',
  padding: 0,
  margin: '40px',
  listStyleType: 'none',
  textAlign: 'left',
  overflowY: 'scroll',
  '& li': {
    cursor: 'pointer',
    paddingTop: '10px',
    borderBottom: '1px solid #eee',
    '& label': {
      '& span': {
        cursor: 'pointer'
      }
    }
  }
})

const Home: NextPage = () => {
  const [after, setAfter] = useState('')
  const [query, setQuery] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [moreLoading, setMoreLoading] = useState(false)
  const [repositoryId, setRepositoryId] = useState('')
  const [repositories, setRepositories] = useState<ResRepository[]>([])

  const searchRepositories = useCallback(async (query: GetRepositories) => {
    const result = await apiClient.repositories.$get({ query })
    return result
  }, [])

  const issues = useMemo(
    () =>
      repositories.find((repository) => repository.id === repositoryId)?.issues,
    [repositoryId]
  )

  return (
    <Layout>
      <Head>
        <title>GitHub Issue Viewer</title>
      </Head>
      <Title>GitHub Issue Viewer</Title>
      <>
        <Box
          component="form"
          sx={{
            display: 'flex',
            '& .MuiTextField-root': { mr: 2, width: '45ch' }
          }}
          noValidate
          autoComplete="off"
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            setSearchLoading(true)
            e.preventDefault()
            const result = await searchRepositories({
              first: 10,
              after: '',
              query
            })
            setAfter(result.next)
            setRepositories(result.repositories)
            setRepositoryId('')
            setSearchLoading(false)
          }}
        >
          <TextField
            type="search"
            name="query"
            size="small"
            variant="outlined"
            onInput={(e) =>
              e.target instanceof HTMLInputElement && setQuery(e.target.value)
            }
          />
          <LoadingButton
            loading={searchLoading}
            variant="outlined"
            type="submit"
          >
            検索
          </LoadingButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <List>
            {repositories &&
              repositories.map((repository) => (
                <li
                  key={repository.id}
                  onClick={() => {
                    setRepositoryId(repository.id)
                  }}
                >
                  <label>
                    <span>{repository.name}</span>
                  </label>
                </li>
              ))}
            {after && (
              <LoadingButton
                onClick={async () => {
                  setMoreLoading(true)
                  const result = await searchRepositories({
                    first: 10,
                    after,
                    query
                  })
                  setAfter(result.next)
                  setRepositories([...repositories, ...result.repositories])
                  setMoreLoading(false)
                }}
                loading={moreLoading}
              >
                次を読み込む
              </LoadingButton>
            )}
          </List>
          <List>
            {issues && issues.length !== 0
              ? issues.map((issue) => (
                  <li key={issue.id}>
                    <ExternalLink url={issue.url} title={issue.title} />
                  </li>
                ))
              : '表示するIssueがありません'}
          </List>
        </Box>
      </>
    </Layout>
  )
}

export default Home
