<script lang="ts" setup>
import type { FormSubmitEvent, FormErrorEvent } from '@nuxt/ui'
import { z } from 'zod'
import { useCreateUser, useFindManyUser } from '~~/lib/hooks';
import { UserPrismaCreateSchema as schema } from '~~/lib/schemas/models'

const toast = useToast()

type User = z.infer<typeof schema>
const state = reactive<Partial<User>>({
  name: undefined,
  email: undefined,
})

const { mutate: createUser, isPending, isSuccess, isError } = useCreateUser()
const { data: users, isFetching } = useFindManyUser({
  select: {
    id: true,
    name: true,
    email: true,
    createdAt: true,
  },
  orderBy: {
    createdAt: 'desc',
  },
})

function onSubmit(payload: FormSubmitEvent<Partial<User>>) {
  const { data } = payload
  createUser({
    data: {
      id: crypto.randomUUID(),
      name: data.name!,
      email: data.email!,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

}

function onError(error: FormErrorEvent) {
  const { errors } = error
  if (errors) {
    toast.add({
      title: 'Error creating user',
      description: 'There was an error creating the user.',
      color: 'error',
    })
  }
}

watch(
  isSuccess,
  (success) => {
    if (success) {
      // Reset the form state
      state.name = ''
      state.email = ''
      toast.add({
        title: 'User created successfully',
        description: 'The user has been created successfully.',
        color: 'success',
      })
    }
  },
)
watch(
  isError,
  (error) => {
    if (error) {
      toast.add({
        title: 'Error creating user',
        description: 'There was an error creating the user.',
        color: 'error',
      })
    }
  },
)
</script>

<template>
  <UContainer>
    <header class="text-center px-4 py-2.5 border-b border-(--ui-border)">
      <h1 class="font-bold">Welcome to the CRUD API</h1>
    </header>
    <main class="mt-8 flex gap-4">
      <UCard class="w-full max-w-xs">
        <template #header>
          <h2 class="text-lg font-bold">Create User</h2>
          <p class="text-sm text-gray-500">Fill in the form below to create a new user.</p>
        </template>
        <UForm class="space-y-2" :schema :state @submit="onSubmit" @error="onError">
          <UFormField name="name" label="Name" required>
            <UInput v-model="state.name" type="text" placeholder="Enter your name" class="w-full" />
          </UFormField>
          <UFormField name="email" label="Email" required>
            <UInput v-model="state.email" type="email" placeholder="Enter your email" class="w-full" />
          </UFormField>
          <UButton type="submit" label="Create User" block :loading="isPending" :disabled="isPending" class="mt-4" />
        </UForm>
      </UCard>

      <UTable :loading="isFetching" :data="users" sticky class="flex-1 rounded-xl border border-(--ui-border)" />
    </main>
  </UContainer>
</template>