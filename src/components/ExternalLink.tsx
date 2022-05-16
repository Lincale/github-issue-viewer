import { FC } from 'react'
import LaunchIcon from '@mui/material/Icon'
import { Link as MuiLink } from '@mui/material'

type Props = {
  url: string
  title: string
}

export const ExternalLink: FC<Props> = ({ url, title }: Props) => {
  return (
    <MuiLink
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      {title}
      <LaunchIcon fontSize="inherit" />
    </MuiLink>
  )
}
