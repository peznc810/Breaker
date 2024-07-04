export interface ButtonProps {
  class?: string
  disabled?: boolean
  loading?: boolean
  icon?: string
  iconSize?: string | number
  text?: string
}

export interface ButtonEmit {
  (e: 'click', payload?: any): void,
}