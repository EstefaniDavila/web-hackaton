import { useQuery } from "@tanstack/react-query"
import useCrud from "@/hooks/useCrud"

const useFetchPolities = (pagination, searchParams) => {
  const {getModel: getProducts} = useCrud('api/v1/admin/political_parties')

  const fetchProducts = async ({ queryKey }) =>{
    const [_key, { pageIndex, pageSize, search, fields }] = queryKey
    const searchQuery = search ? `&search_params=${search}&search_fields=${fields}` : ''
    const response = await getProducts(`api/v1/admin/political_parties?page=${pageIndex + 1}&per_page=${pageSize}${searchQuery}`)
    return {
      rows: response.products,
      rowCount: response.total_products,
    }
  }
  return useQuery({
    queryKey: ['products', { ...pagination, search: searchParams.search, fields: searchParams.fields }],
    queryFn: fetchProducts,
    keepPreviousData: true,
  })
}

export default useFetchPolities