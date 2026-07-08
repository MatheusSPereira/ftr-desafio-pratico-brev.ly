import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createLinkSchema, type CreateLinkInput } from '../../lib/schemas'
import { useCreateLink } from '../../hooks/use-links'
import { ApiError } from '../../api/client'

export function LinkForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateLinkInput>({
    resolver: zodResolver(createLinkSchema),
  })
  const createLink = useCreateLink()
  const [submitError, setSubmitError] = useState<string | null>(null)

  function onSubmit(input: CreateLinkInput) {
    setSubmitError(null)
    createLink.mutate(input, {
      onSuccess: () => {
        setSubmitError(null)
        reset()
      },
      onError: error => {
        if (error instanceof ApiError && error.status === 409) {
          setError('slug', { message: 'Essa URL encurtada já existe' })
          return
        }
        if (error instanceof ApiError && error.status === 400) {
          setError('slug', { message: 'URL encurtada mal formatada' })
          return
        }
        setSubmitError('Não foi possível salvar o link. Tente novamente.')
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="originalUrl">Link original</label>
        <input id="originalUrl" type="text" className="border p-2" {...register('originalUrl')} />
        {errors.originalUrl && <span className="text-sm text-red-600">{errors.originalUrl.message}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="slug">Link encurtado</label>
        <input id="slug" type="text" className="border p-2" {...register('slug')} />
        {errors.slug && <span className="text-sm text-red-600">{errors.slug.message}</span>}
      </div>
      <button
        type="submit"
        disabled={createLink.isPending}
        className="border p-2 disabled:opacity-50"
      >
        {createLink.isPending ? 'Salvando...' : 'Salvar link'}
      </button>
      {submitError && <p className="text-sm text-red-600">{submitError}</p>}
    </form>
  )
}
