import { execSync } from 'node:child_process'
import chokidar from 'chokidar'

execSync('pnpm build', { stdio: 'inherit' })

chokidar.watch('src/**/*').on('change', () => {
  console.warn('file changed')
  execSync('pnpm build', { stdio: 'inherit' })
})
