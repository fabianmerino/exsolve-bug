<script lang="ts" setup>
import { provideHooksContext } from '~~/lib/hooks'

// CRUD api endpoint for the hooks
const url = useRequestURL()
const crudApiEndpoint = `${url.origin}/api/model`
provideHooksContext({ endpoint: crudApiEndpoint })
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtPage />
  </UApp>
</template>