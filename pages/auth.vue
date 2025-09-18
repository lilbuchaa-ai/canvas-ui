<template>
  <div class="min-h-screen bg-gradient-subtle">
    <!-- Background -->
    <StarfieldCanvas />
    
    <!-- Header -->
    <AppHeader />
    
    <!-- Main Content -->
    <main class="relative pt-24 pb-12 px-4" style="z-index: 10;">
      <div class="container mx-auto max-w-md">
        <!-- Auth Card -->
        <GlowCard class="p-8">
          <!-- Logo/Header -->
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-cosmic rounded-full flex items-center justify-center mx-auto mb-4">
              <component :is="SparklesIcon" :size="32" class="text-white" />
            </div>
            <h1 class="font-heading font-bold text-2xl text-text-base mb-2">
              {{ step === 'request' ? 'Join Cosmic' : 'Verify Code' }}
            </h1>
            <p class="text-text-muted">
              {{ step === 'request' 
                ? 'Enter your details to access personalized readings' 
                : 'Enter the verification code we sent you' 
              }}
            </p>
          </div>
          
          <!-- Request Code Step -->
          <div v-if="step === 'request'" class="space-y-6">
            <!-- Method Selection -->
            <div>
              <label class="block text-sm font-medium text-text-muted mb-3">Contact Method</label>
              <div class="flex gap-2">
                <button
                  @click="method = 'email'"
                  :class="[
                    'flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 focus-cosmic',
                    method === 'email'
                      ? 'bg-gradient-cosmic text-white'
                      : 'glass-surface glass-hover text-text-muted hover:text-text-base'
                  ]"
                >
                  Email
                </button>
                <button
                  @click="method = 'telegram'"
                  :class="[
                    'flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 focus-cosmic',
                    method === 'telegram'
                      ? 'bg-gradient-cosmic text-white'
                      : 'glass-surface glass-hover text-text-muted hover:text-text-base'
                  ]"
                >
                  Telegram
                </button>
              </div>
            </div>
            
            <!-- Contact Input -->
            <div>
              <label class="block text-sm font-medium text-text-muted mb-2">
                {{ method === 'email' ? 'Email Address' : 'Telegram Username' }}
              </label>
              <input 
                v-model="contact"
                :type="method === 'email' ? 'email' : 'text'"
                :placeholder="method === 'email' ? 'your@email.com' : '@username'"
                class="w-full px-4 py-3 glass-surface rounded-lg text-text-base focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-colors duration-200"
              />
            </div>
            
            <!-- Request Button -->
            <button 
              @click="requestVerificationCode"
              :disabled="!contact || requestLoading"
              class="w-full btn-cosmic py-3"
            >
              {{ requestLoading ? 'Sending...' : 'Send Verification Code' }}
            </button>
            
            <!-- Error Display -->
            <div v-if="requestError" class="text-center p-3 bg-rose/10 border border-rose/20 rounded-lg">
              <p class="text-rose text-sm">{{ requestError }}</p>
            </div>
          </div>
          
          <!-- Verify Code Step -->
          <div v-if="step === 'verify'" class="space-y-6">
            <!-- Code Input -->
            <div>
              <label class="block text-sm font-medium text-text-muted mb-2">Verification Code</label>
              <input 
                v-model="code"
                type="text" 
                placeholder="Enter 6-digit code"
                maxlength="6"
                class="w-full px-4 py-3 glass-surface rounded-lg text-text-base text-center font-mono text-lg tracking-wider focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-colors duration-200"
              />
            </div>
            
            <!-- Contact Info -->
            <div class="text-center text-sm text-text-muted">
              Code sent to {{ method === 'email' ? contact : `@${contact}` }}
            </div>
            
            <!-- Verify Button -->
            <button 
              @click="verifyCode"
              :disabled="!code || code.length !== 6 || verifyLoading"
              class="w-full btn-cosmic py-3"
            >
              {{ verifyLoading ? 'Verifying...' : 'Verify & Sign In' }}
            </button>
            
            <!-- Back Button -->
            <button 
              @click="goBackToRequest"
              class="w-full px-4 py-2 text-text-muted hover:text-text-base transition-colors duration-200 text-sm focus-cosmic"
            >
              ← Change contact method
            </button>
            
            <!-- Error Display -->
            <div v-if="verifyError" class="text-center p-3 bg-rose/10 border border-rose/20 rounded-lg">
              <p class="text-rose text-sm">{{ verifyError }}</p>
            </div>
          </div>
          
          <!-- Success Step -->
          <div v-if="step === 'success'" class="text-center space-y-6">
            <div class="w-16 h-16 bg-aurora-teal/20 rounded-full flex items-center justify-center mx-auto">
              <component :is="CheckIcon" :size="32" class="text-aurora-teal" />
            </div>
            
            <div>
              <h2 class="font-heading font-bold text-xl text-text-base mb-2">
                Welcome to Cosmic!
              </h2>
              <p class="text-text-muted">
                You're now signed in and ready to explore your celestial journey.
              </p>
            </div>
            
            <div class="space-y-3">
              <NuxtLink to="/astro" class="block w-full btn-cosmic py-3 text-center">
                Explore Astrology
              </NuxtLink>
              <NuxtLink to="/" class="block w-full px-4 py-2 text-text-muted hover:text-text-base transition-colors duration-200 text-sm">
                Return Home
              </NuxtLink>
            </div>
          </div>
        </GlowCard>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { requestCode, verifyCode: verifyCodeApi } = useApi()
const { setToken } = useAuthToken()
const router = useRouter()

const SparklesIcon = resolveComponent('IconSparkles')
const CheckIcon = resolveComponent('IconSparkles') // Using sparkles as check

const step = ref<'request' | 'verify' | 'success'>('request')
const method = ref<'email' | 'telegram'>('email')
const contact = ref('')
const code = ref('')

// Loading states
const requestLoading = ref(false)
const verifyLoading = ref(false)

// Error states
const requestError = ref('')
const verifyError = ref('')

const requestVerificationCode = async () => {
  if (!contact.value) return
  
  requestLoading.value = true
  requestError.value = ''
  
  try {
    const payload = {
      method: method.value,
      [method.value === 'email' ? 'email' : 'tg_username']: contact.value
    }
    
    await requestCode(payload)
    step.value = 'verify'
  } catch (error: any) {
    requestError.value = error.message || 'Failed to send verification code'
  } finally {
    requestLoading.value = false
  }
}

const verifyCode = async () => {
  if (!code.value || code.value.length !== 6) return
  
  verifyLoading.value = true
  verifyError.value = ''
  
  try {
    const payload = {
      method: method.value,
      contact: contact.value,
      code: code.value
    }
    
    const response = await verifyCodeApi(payload)
    
    // Token is automatically stored by the API client
    // setToken(response.access_token) // This is already done in the API client
    
    step.value = 'success'
    
    // Redirect to home after a short delay
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (error: any) {
    verifyError.value = error.message || 'Invalid verification code'
  } finally {
    verifyLoading.value = false
  }
}

const goBackToRequest = () => {
  step.value = 'request'
  code.value = ''
  verifyError.value = ''
}

// SEO
useHead({
  title: 'Sign In - Cosmic Astrology',
  meta: [
    { name: 'description', content: 'Sign in to access personalized astrology readings and cosmic guidance.' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>