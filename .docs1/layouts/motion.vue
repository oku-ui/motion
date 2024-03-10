<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation')

const route = useRoute()
const { navPageFromPath } = useContentHelpers()
const { headerLinks } = useNavigationMotion()

const links = computed(() =>
  headerLinks.value.find(link => link.to === '/motion')?.children.map(link => ({
    ...link,
    label: link.label,
    suffix: link.label,
  }))
  ?? [])

const select = computed(() =>
  links.value.find(link => route.path.startsWith(link.to))
  ?? {
    label: 'Select docs',
    suffix: 'Motion',
    icon: 'i-ph-activity',
    to: '/motion',
  })

const navigationLinks = computed(() => {
  const path = ['/motion', route.params.slug?.[0]].filter(Boolean).join('/')

  return mapContentNavigation(navPageFromPath(path, navigation!.value)?.children || [])
})
</script>

<template>
  <MotionHeader :links="headerLinks" />
  <UContainer>
    <UPage>
      <template #left>
        <div class="hidden lg:block">
          <div class="mb-3 lg:mb-6">
            <label for="menu" class="mb-1.5 block text-sm/6 font-semibold">Docs</label>
            <USelectMenu
              id="menu"
              :model-value="select"
              name="menu"
              :options="links"
              color="gray"
              size="lg"
              :ui="{ icon: { trailing: { padding: { sm: 'pe-1.5' } } } }"
              :ui-menu="{ option: { container: 'gap-1.5' } }"
              @change="link => $router.push(link.to)"
            >
              <template #label>
                <Icon :name="select.icon" class="mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span class="font-medium">{{ select.label }}</span>
              </template>
            </USelectMenu>
          </div>

          <div class="my-6">
            <UDivider type="dashed" />
          </div>

          <UNavigationTree :links="navigationLinks" default-open :multiple="false" />
        </div>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
