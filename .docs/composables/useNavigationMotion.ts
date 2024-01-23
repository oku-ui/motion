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
            label: 'Getting Started',
            description: 'Learn how to get started with Oku Motion.',
            icon: 'i-ph-rocket-launch-duotone',
            to: '/motion/getting-started',
            active: route.path.startsWith('/motion/getting-started'),
          },
          {
            label: 'Guide',
            description: 'Learn to build animations with Oku Motion',
            icon: 'i-ph-book-open-duotone',
            to: '/motion/guide/animation/simple-animations',
            active: route.path.startsWith('/motion/guide'),
          },
          {
            label: 'API',
            description: 'Explore the Oku Motion API.',
            icon: 'i-ph-brackets-curly-duotone',
            to: '/motion/api/components/motion',
            active: route.path.startsWith('/motion/api'),
          },
          {
            label: 'Examples',
            description: 'Discover and explore official and community examples.',
            icon: 'i-ph-app-window-duotone',
            to: '/motion/examples',
            active: route.path.startsWith('/motion/examples'),
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

export const useNavigationMotion = createSharedComposable(_useNavigation)
