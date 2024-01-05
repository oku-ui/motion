<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const searchRef = ref()

const route = useRoute()
const colorMode = useColorMode()

const { data: navigation } = await useLazyAsyncData('navigation', () => fetchContentNavigation(), { default: () => [] })
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

const links = computed(() => {
  return [
    {
      label: 'Projects',
      icon: 'i-heroicons-book-open-solid',
      to: '/',
    },

  ]
})
const color = computed(() => (colorMode.value === 'dark' ? '#18181b' : 'white'))

// Head

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
    { rel: 'canonical', href: `https://oku-ui.com${withoutTrailingSlash(route.path)}` },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

useServerSeoMeta({
  ogSiteName: 'Motion',
  twitterCard: 'summary_large_image',
})

// Provide
provide('navigation', navigation)
provide('files', files)
provide('links', links)
</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <Footer />

    <ClientOnly>
      <LazyUDocsSearch ref="searchRef" :files="files" :navigation="navigation" />
    </ClientOnly>

    <UNotifications>
      <template #title="{ title }">
        <span v-html="title" />
      </template>

      <template #description="{ description }">
        <span v-html="description" />
      </template>
    </UNotifications>
  </div>
</template>
