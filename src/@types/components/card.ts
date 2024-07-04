interface CardItem {
  title: string
  icon?: string
  count: number
  data?: any[]
}

export interface CardProps {
  data: CardItem[],
  class?: string
}