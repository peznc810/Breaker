export interface SelectItem {
  label: string,
  value?: number,
  path?: string
}
export interface SelectList {
  data: SelectItem[],
  icon?: string,
}