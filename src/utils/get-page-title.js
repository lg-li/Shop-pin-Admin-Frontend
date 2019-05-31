import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Pin后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
