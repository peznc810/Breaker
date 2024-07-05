import type { App } from 'vue'
import Button from './Button.vue'
import Select from './Select.vue'
import Card from './Card.vue'
import ButtonGroup from './ButtonGroup.vue'
import table from './Table.vue'

type Components = Record<string, any>

const components: Components = {
  'el-button-group': ButtonGroup,
  'el-button': Button,
  'el-select': Select,
  'el-card': Card,
  'el-table': table
}

export const registerComponents = (app: App) => {
  Object.keys(components).forEach(key => {
    app.component(key, components[key])
  })
}