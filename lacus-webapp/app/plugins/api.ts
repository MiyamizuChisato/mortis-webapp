export default defineNuxtPlugin(() => {
  const http = $fetch.create({
    baseURL: '/api/webapp',
    onRequest({ options }) {
      const token = useCookie('token').value
      if (token) {
        options.headers.set('authorization', `Bearer ${token}`)
      }
    },
    onResponse({ response }) {
      const data = response._data as { error: boolean, code: number, message: string, payload: unknown }
      if (data.error) {
        mitt.emit('ServiceError', data.message)
        return Promise.reject(response)
      }
      else {
        response._data = data.payload
      }
    },
    onResponseError({ response }) {
      mitt.emit('ServiceError', response)
    },
  })
  return {
    provide: {
      http,
    },
  }
})
