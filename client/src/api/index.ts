import { ApiError } from "./error"

const defaultOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
}

const callApi = async <T>(url: string, options: RequestInit): Promise<T> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      ...defaultOptions,
      ...options,
    })
    if (!response.ok) {
      const body = await response.json().catch(() => undefined)
      throw new ApiError(body?.error ?? response.statusText, response.status)
    }
    return response.json() as Promise<T>
  } catch {
    throw new ApiError("Network Error", 0)
  }
}

export { callApi }
