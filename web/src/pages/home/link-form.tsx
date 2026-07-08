import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createLinkSchema, type CreateLinkInput } from '../../lib/schemas'
import { useCreateLink } from '../../hooks/use-links'
import { ApiError } from '../../api/client'
import { Input } from '../../components/input'
import { Button } from '../../components/button'

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
          setError('slug', { message: 'Informe uma url minúscula e sem espaço/caracter especial' })
          return
        }
        setSubmitError('Não foi possível salvar o link. Tente novamente.')
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Link original"
        type="text"
        error={errors.originalUrl?.message}
        {...register('originalUrl')}
      />
      <Input
        label="Link encurtado"
        type="text"
        prefix="brev.ly/"
        error={errors.slug?.message}
        {...register('slug')}
      />
      <Button type="submit" disabled={createLink.isPending}>
        {createLink.isPending ? 'Salvando...' : 'Salvar link'}
      </Button>
      {submitError && (
        <p className="flex items-center gap-1 text-sm text-danger">{submitError}</p>
      )}
    </form>
  )
}
