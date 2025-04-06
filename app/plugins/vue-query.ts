import type { DehydratedState } from '@tanstack/vue-query'
import { QueryClient, VueQueryPlugin, hydrate, dehydrate } from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxtApp) => {
  const queryState = useState<DehydratedState | null>('vueQueryState', () => null)
  const queryClient = new QueryClient()
  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })

  if (import.meta.client) {
    nuxtApp.hook('app:created', () => {
      hydrate(queryClient, queryState.value)
    })
  }

  if (import.meta.server) {
    nuxtApp.hook('app:rendered', () => {
      queryState.value = dehydrate(queryClient)
    })
  }
})
