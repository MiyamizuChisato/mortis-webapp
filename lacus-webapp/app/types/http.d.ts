declare module '#app' {
  interface NuxtApp {
    $http: typeof $fetch
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof $fetch
  }
}

export {}
