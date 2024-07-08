import type { App } from 'vue'
import Button from './Button.vue'
import Select from './Select.vue'
import Card from './Card.vue'
import ButtonGroup from './ButtonGroup.vue'
import table from './Table.vue'

type Components = Record<string, any>

const components: Components = {
  'v-button-group': ButtonGroup,
  'v-button': Button,
  'v-select': Select,
  'v-card': Card,
  'v-table': table
}

export const registerComponents = (app: App) => {
  Object.keys(components).forEach(key => {
    app.component(key, components[key])
  })
}