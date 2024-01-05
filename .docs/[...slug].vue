<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation')

const route = useRoute()
const { navPageFromPath } = useContentHelpers()
const { headerLinks } = useNavigation()

const links = computed(() => headerLinks.value.find(link => link.to === '/pergel')?.children ?? [])

const navigationLinks = computed(() => {
  const path = ['/pergel', route.params.slug?.[0]].filter(Boolean).join('/')

  return mapContentNavigation(navPageFromPath(path, navigation!.value)?.children || [])
})
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside :links="links">
          <UDivider type="dashed" class="mb-6" />

          <UNavigationTree :links="navigationLinks" default-open :multiple="false" />
        </UAside>
      </template>

      <NuxtPage />
    </UPage>
  </UContainer>
</template>
