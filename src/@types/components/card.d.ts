export interface CardItem {
  title: string
  icon?: string
  count: number
  data?: any[]
}

export interface CardProps {
  data?: CardItem[] // 可以決定是否要渲染多個卡片
  class?: string 
}