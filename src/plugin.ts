import {definePlugin} from 'sanity'
import {colorType} from './schemas/colorType'

export const customColorPicker = definePlugin(() => {
  return {
    name: 'sanity-plugin-color-input',
    schema: {
      types: [colorType],
    },
  }
})
