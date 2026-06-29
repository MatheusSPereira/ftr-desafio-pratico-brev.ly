import fastify from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { env } from './lib/env'
import { linksRoutes } from './routes/links'

const app = fastify()

app.register(cors)

app.register(swagger, {
  openapi: {
    info: {
      title: 'Brev.ly API',
      description: 'API para gerenciamento de links encurtados',
      version: '1.0.0',
    },
  },
})

app.register(swaggerUi, {
  routePrefix: '/docs',
})

app.register(linksRoutes)

app.listen({ port: env.PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server running at ${address}`)
})
