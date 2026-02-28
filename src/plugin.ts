import {definePlugin} from 'sanity'
import {colorType} from './schemas/colorType'

export interface ColorPickerPluginConfig {
  // Add plugin configuration properties if needed
}

export const customColorPicker = definePlugin<ColorPickerPluginConfig | void>((config) => {
  return {
    name: 'sanity-color-picker',
    schema: {
      types: [colorType],
    },
  }
})
