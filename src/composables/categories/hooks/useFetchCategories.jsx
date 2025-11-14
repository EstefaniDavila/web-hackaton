import { useQuery } from "@tanstack/react-query"
import useCrud from "@/hooks/useCrud"

const useFetchCategories = (pagination, searchParams) => {
  const {getModel: getCategories} = useCrud('api/v1/admin/categories')

  const fetchCategories = async ({ queryKey }) => {
    const [_key, { pageIndex, pageSize, search, fields }] = queryKey
    const seachQuery = search ? `&search_params=${search}&search_fields=${fields}` : ''
    const response = await getCategories(`api/v1/admin/categories?page=${pageIndex + 1}&per_page=${pageSize}${seachQuery}`)
    return {
      rows: response.categories,
      rowCount: response.total_categories,
    }
  }
  return useQuery({
    queryKey: ['categories', { ...pagination, search: searchParams.search, fields: searchParams.fields }],
    queryFn: fetchCategories,
    keepPreviousData: true,
  })
}

export default useFetchCategories
