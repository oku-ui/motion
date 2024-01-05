import { createSharedComposable } from '@vueuse/core'

function _useNavigation() {
  const headerLinks = computed(() => {
    const route = useRoute()

    return [
      {
        label: 'Motion',
        icon: 'i-ph-book-bookmark-duotone',
        to: '/motion',
        search: false,
        children: [
          {
            label: 'Get Started',
            description: 'Learn how to get started with Nuxt.',
            icon: 'i-ph-rocket-launch-duotone',
            to: '/motion/getting-started',
            active: route.path.startsWith('/motion/getting-started'),
          },
          {
            label: 'Examples',
            description: 'Discover and explore official and community examples.',
            icon: 'i-ph-app-window-duotone',
            to: '/motion/examples',
            active: route.path.startsWith('/motion/examples'),
          },
          {
            label: 'Community',
            description: 'Find answers and support from the community.',
            icon: 'i-ph-chats-teardrop-duotone',
            to: '/motion/community',
            active: route.path.startsWith('/motion/community'),
          },
        ],
      },
      {
        label: 'Projects',
        icon: 'i-ph-folder-open-duotone',
        to: '/',
        search: false,
      },
    ]
  })

  return {
    headerLinks,

  }
}

export const useNavigation = createSharedComposable(_useNavigation)
