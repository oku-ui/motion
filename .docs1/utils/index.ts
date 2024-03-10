import { splitByCase, upperFirst } from 'scule'

export function createBreadcrumb(link: string = 'Missing link') {
  if (link.startsWith('http'))
    return link

  return link.split('/').filter(Boolean).map(part => splitByCase(part).map(p => upperFirst(p)).join(' ')).join(' > ').replace('Api', 'API')
}
