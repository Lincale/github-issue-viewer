import dotenv from 'dotenv'

dotenv.config()

const API_JWT_SECRET = process.env.API_JWT_SECRET ?? ''
const API_SERVER_PORT = +(process.env.API_SERVER_PORT ?? '8080')
const API_BASE_PATH = process.env.API_BASE_PATH ?? ''
const API_ORIGIN = process.env.API_ORIGIN ?? ''
const API_UPLOAD_DIR = process.env.API_UPLOAD_DIR ?? ''
const MYAPP_GITHUB_TOKEN = process.env.MYAPP_GITHUB_TOKEN ?? ''

export {
  API_JWT_SECRET,
  API_SERVER_PORT,
  API_BASE_PATH,
  API_ORIGIN,
  API_UPLOAD_DIR,
  MYAPP_GITHUB_TOKEN
}
