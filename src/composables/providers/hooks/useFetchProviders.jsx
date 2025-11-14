import { useQuery } from "@tanstack/react-query"
import useCrud from "@/hooks/useCrud"

const useFetchProviders = (pagination, searchParams) => {
  const {getModel: getProviders} = useCrud('api/v1/admin/providers')

  const fetchProviders = async ({ queryKey }) => {
    const [_key, { pageIndex, pageSize, search, fields }] = queryKey
    const seachQuery = search ? `&search_params=${search}&search_fields=${fields}` : ''
    const response = await getProviders(`api/v1/admin/providers?page=${pageIndex + 1}&per_page=${pageSize}${seachQuery}`)
    return {
      rows: response.providers,
      rowCount: response.total_providers,
    }
  }
  return useQuery({
    queryKey: ['providers', { ...pagination, search: searchParams.search, fields: searchParams.fields }],
    queryFn: fetchProviders,
    keepPreviousData: true,
  })
}

export default useFetchProviders
