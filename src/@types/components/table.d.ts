export interface Column {
  label: string
  prop: string
  type?: string
  width?: string
  sortable?: boolean
}

export interface TableProps {
  data?: any[]
  columns?: Columns[]
  class?: string
  type?: 'default' | 'index' | 'checkbox'
}