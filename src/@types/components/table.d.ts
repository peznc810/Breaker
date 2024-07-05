interface Columns {
  label: string
  prop: string
}

export interface TableProps {
  data?: any[]
  columns?: Columns[]
  class?: string
}