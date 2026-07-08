import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createLink, deleteLink, exportLinks, incrementAccess, listLinks } from '../api/links'

const LINKS_QUERY_KEY = ['links']

export function useLinksQuery() {
  return useQuery({ queryKey: LINKS_QUERY_KEY, queryFn: listLinks })
}

export function useCreateLink() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LINKS_QUERY_KEY })
    },
  })
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

export function useIncrementAccess() {
  return useMutation({ mutationFn: incrementAccess })
}

export function useExportLinks() {
  return useMutation({ mutationFn: exportLinks })
}
