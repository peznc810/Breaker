export type Menu = 'user' | 'lang' | 'mobile'

export interface MenuItem {
  name: string
  value?: string
  icon?: string
  path?: string
}

export interface MobileMenu {
  name: string
  path?: string
  showChildren?: boolean
  children?: MenuItem[]
}