
# GitHub Issue Viewer

## About

- GitHubのGraphQL APIを用いた、Repository, Issue検索Webアプリケーションです。

## Getting Started

1. `cp server/.env.sample server/.env`
   1. `server/.env`の`MYAPP_GITHUB_TOKEN`に、GitHubで取得したアクセストークンを設定
       1. アクセストークンの権限はpublic_repoのみで大丈夫です。
2. `cp server/prisma/.env.sample server/prisma/.env`
   1. `server/prisma/.env`の`API_DATABASE_URL`を`file:./dev.db`に設定
3. DEVの場合
   1. rootディレクトリ直下で`yarn && yarn dev`
4. PRODの場合
   1. rootディレクトリ直下で`yarn && yarn build && yarn start`
