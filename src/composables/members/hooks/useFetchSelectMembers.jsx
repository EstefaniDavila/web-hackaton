import { useQuery } from "@tanstack/react-query"
import useCrud from "@/hooks/useCrud"

const useFetchSelectMembers = (pagination, searchParams) => {
  const {getModel: getSelectMembers} = useCrud('/api/v1/admin/select_member')

  const fetchMembers = async ({ queryKey }) =>{
    const [_key, { pageIndex, pageSize, search, fields }] = queryKey
    const searchQuery = search ? `&search_params=${search}&search_fields=${fields}` : ''
    const response = await getSelectMembers(`/api/v1/admin/select_member?page=${pageIndex + 1}&per_page=${pageSize}${searchQuery}`)
    console.log("Formatted Members: ", response)
    return response
  }
  return useQuery({
    queryKey: ['selectMembers', { ...pagination, search: searchParams.search, fields: searchParams.fields }],
    queryFn: fetchMembers,
    keepPreviousData: true,
  })
}

export default useFetchSelectMembers