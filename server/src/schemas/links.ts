const linkSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    originalUrl: { type: 'string', format: 'uri' },
    slug: { type: 'string' },
    accessCount: { type: 'integer' },
    createdAt: { type: 'string', format: 'date-time' },
  },
} as const

const slugParam = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
  },
} as const

const notFoundResponse = {
  type: 'object',
  properties: {
    error: { type: 'string' },
  },
} as const

export const createLinkSchema = {
  tags: ['Links'],
  summary: 'Criar um novo link',
  body: {
    type: 'object',
    required: ['originalUrl', 'slug'],
    properties: {
      originalUrl: { type: 'string', format: 'uri', description: 'URL original a ser encurtada' },
      slug: {
        type: 'string',
        pattern: '^[a-zA-Z0-9-]{3,50}$',
        description: 'Identificador único do link (letras, números e hífens, 3–50 chars)',
      },
    },
  },
  response: {
    201: { ...linkSchema, description: 'Link criado com sucesso' },
    400: { ...notFoundResponse, description: 'Dados inválidos' },
    409: { ...notFoundResponse, description: 'Slug já existe' },
  },
}

export const listLinksSchema = {
  tags: ['Links'],
  summary: 'Listar todos os links',
  response: {
    200: {
      type: 'array',
      items: linkSchema,
      description: 'Lista de links ordenada por data de criação (mais recente primeiro)',
    },
  },
}

export const exportLinksSchema = {
  tags: ['Links'],
  summary: 'Exportar links para CSV',
  description: 'Gera um arquivo CSV com todos os links e faz upload na CDN. Retorna a URL pública do arquivo.',
  response: {
    200: {
      type: 'object',
      properties: {
        url: { type: 'string', format: 'uri', description: 'URL pública do CSV gerado' },
      },
      description: 'URL do CSV gerado',
    },
    500: { ...notFoundResponse, description: 'Falha no upload para o storage' },
  },
}

export const getLinkSchema = {
  tags: ['Links'],
  summary: 'Obter URL original pelo slug',
  params: slugParam,
  response: {
    200: {
      type: 'object',
      properties: {
        originalUrl: { type: 'string', format: 'uri' },
      },
      description: 'URL original do link',
    },
    404: { ...notFoundResponse, description: 'Link não encontrado' },
  },
}

export const deleteLinkSchema = {
  tags: ['Links'],
  summary: 'Deletar um link',
  params: slugParam,
  response: {
    204: { type: 'null', description: 'Link deletado com sucesso' },
    404: { ...notFoundResponse, description: 'Link não encontrado' },
  },
}

export const incrementAccessSchema = {
  tags: ['Links'],
  summary: 'Incrementar contagem de acessos',
  params: slugParam,
  response: {
    200: { ...linkSchema, description: 'Link atualizado com novo accessCount' },
    404: { ...notFoundResponse, description: 'Link não encontrado' },
  },
}
