import { useQuery } from "@tanstack/react-query"
import useCrud from "@/hooks/useCrud"

const useFetchEvents = (pagination, searchParams) => {
  const {getModel: getEvents} = useCrud('/api/v1/admin/events')

  const fetchEvents = async ({ queryKey }) =>{
    const [_key, { pageIndex, pageSize, search, fields }] = queryKey
    const searchQuery = search ? `&search_params=${search}&search_fields=${fields}` : ''
    console.log(`/api/v1/admin/events?page=${pageIndex + 1}&per_page=${pageSize}${searchQuery}`)
    const response = await getEvents(`/api/v1/admin/events?page=${pageIndex + 1}&per_page=${pageSize}${searchQuery}`)
    console.log(response)
    return response
  }
  return useQuery({
    queryKey: ['events', { ...pagination, search: searchParams.search, fields: searchParams.fields }],
    queryFn: fetchEvents,
    keepPreviousData: true,
  })
}
export default useFetchEvents