export function useHttp() {
  const { $http } = useNuxtApp()

  return {
    get<T>(url: string, query?: Record<string, any>) {
      return $http<T>(url, {
        method: 'GET',
        query,
      })
    },

    post<T>(url: string, body?: any) {
      return $http<T>(url, {
        method: 'POST',
        body,
      })
    },

    put<T>(url: string, body?: any) {
      return $http<T>(url, {
        method: 'PUT',
        body,
      })
    },

    patch<T>(url: string, body?: any) {
      return $http<T>(url, {
        method: 'PATCH',
        body,
      })
    },

    delete<T>(url: string) {
      return $http<T>(url, {
        method: 'DELETE',
      })
    },
  }
}
