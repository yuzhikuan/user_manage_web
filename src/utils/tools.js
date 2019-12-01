import Cookies from 'js-cookie'
import Settings from '@/settings'

export function getSession () {
  return Cookies.get(Settings.sessionName)
}

export function removeSession () {
  return Cookies.remove(Settings.sessionName)
}

export function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${Settings.title}`
  }
  return `${Settings.title}`
}

export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validUsername (str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}
