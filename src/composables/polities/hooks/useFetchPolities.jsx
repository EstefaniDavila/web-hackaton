import { useQuery } from "@tanstack/react-query"
import useCrud from "@/hooks/useCrud"

const useFetchPolities = (pagination, searchParams) => {
  const {getModel: getPolitical_parties} = useCrud('/api/v1/admin/political_parties')

  const fetchPolitical_parties = async ({ queryKey }) =>{
    const [_key, { pageIndex, pageSize, search, fields }] = queryKey
    const searchQuery = search ? `&search_params=${search}&search_fields=${fields}` : ''
    
    const response = await getPolitical_parties(`/api/v1/admin/political_parties?page=${pageIndex + 1}&per_page=${pageSize}${searchQuery}`)
    console.log(response)
    return {
      rows: response.political_parties,
      rowCount: response.total_political_parties,
    }
  }
  return useQuery({
    queryKey: ['political_parties', { ...pagination, search: searchParams.search, fields: searchParams.fields }],
    queryFn: fetchPolitical_parties,
    keepPreviousData: true,
  })
}
//test
export default useFetchPolities