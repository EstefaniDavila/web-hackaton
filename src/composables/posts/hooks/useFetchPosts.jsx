import { useQuery } from "@tanstack/react-query"
import useCrud from "@/hooks/useCrud"

const useFetchPosts = (pagination, searchParams) => {
  const {getModel: getPosts} = useCrud('/api/v1/admin/posts_for_admin')

  const fetchPosts = async ({ queryKey }) =>{
    const [_key, { pageIndex, pageSize, search, fields }] = queryKey
    const searchQuery = search ? `&search_params=${search}&search_fields=${fields}` : ''
    const response = await getPosts(`/api/v1/admin/posts_for_admin?page=${pageIndex + 1}&per_page=${pageSize}${searchQuery}`)
    return response
  }
  return useQuery({
    queryKey: ['posts', { ...pagination, search: searchParams.search, fields: searchParams.fields }],
    queryFn: fetchPosts,
    keepPreviousData: true,
  })
}

export default useFetchPosts