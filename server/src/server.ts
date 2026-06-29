import fastify from 'fastify'
import cors from '@fastify/cors'
import { env } from './lib/env'
import { linksRoutes } from './routes/links'

const app = fastify()

app.register(cors)
app.register(linksRoutes)

app.listen({ port: env.PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server running at ${address}`)
})
