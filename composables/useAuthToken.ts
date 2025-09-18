export const useAuthToken = () => {
  const token = ref<string | null>(null)

  // Initialize from localStorage on client-side
  onMounted(() => {
    if (process.client) {
      token.value = localStorage.getItem('auth_token')
    }
  })

  const setToken = (newToken: string | null) => {
    token.value = newToken
    
    if (process.client) {
      if (newToken) {
        localStorage.setItem('auth_token', newToken)
      } else {
        localStorage.removeItem('auth_token')
      }
    }
    
    // Update API client token
    const api = useApi()
    api.setToken(newToken)
  }

  const clearToken = () => {
    setToken(null)
  }

  const isAuthenticated = computed(() => !!token.value)

  return {
    token: readonly(token),
    setToken,
    clearToken,
    isAuthenticated
  }
}