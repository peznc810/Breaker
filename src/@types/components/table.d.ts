export interface Columns {
  label: string
  prop: string
  type?: 'currency'
  width?: string
}

export interface TableProps {
  data?: any[]
  columns?: Columns[]
  class?: string
  type?: 'default' | 'index' | 'checkbox'
}