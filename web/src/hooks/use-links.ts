import { useIsMutating, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createLink, deleteLink, exportLinks, incrementAccess, listLinks } from '../api/links'

const LINKS_QUERY_KEY = ['links']
const CREATE_LINK_MUTATION_KEY = ['create-link']

export function useLinksQuery() {
  return useQuery({ queryKey: LINKS_QUERY_KEY, queryFn: listLinks })
}

export function useCreateLink() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: CREATE_LINK_MUTATION_KEY,
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LINKS_QUERY_KEY })
    },
  })
}

export function useIsCreatingLink() {
  return useIsMutating({ mutationKey: CREATE_LINK_MUTATION_KEY }) > 0
}

export function useDeleteLink() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LINKS_QUERY_KEY })
    },
  })
}

export function useIncrementAccess(slug: string | undefined) {
  return useQuery({
    queryKey: ['increment-access', slug],
    queryFn: () => incrementAccess(slug as string),
    enabled: Boolean(slug),
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}

export function useExportLinks() {
  return useMutation({ mutationFn: exportLinks })
}
