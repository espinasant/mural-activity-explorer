import { useState, useEffect } from "react"
import { ApiError } from "@/api/error"

const useQuery = <TResponse>(fetchFunction: () => Promise<TResponse>) => {
  const [data, setData] = useState<TResponse | null>(null)
  const [error, setError] = useState<ApiError | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const query = async () => {
    setIsLoading(true)
    try {
      const response = await fetchFunction()
      if (response) {
        setData(response)
      }
    } catch (err) {
      const error = err instanceof ApiError ? err : new ApiError("Unknown Error", 0)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    query()
  }, [])

  return {
    data,
    error,
    isLoading,
  }
}

export default useQuery
