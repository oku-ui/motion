import type { visualElementStore } from 'framer-motion'

type VisualElementStore = typeof visualElementStore

declare module 'framer-motion/dist/es/render/store.mjs' {
  export const visualElementStore: VisualElementStore
}
