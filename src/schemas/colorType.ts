import {defineType, defineField} from 'sanity'
import {CustomColorPicker} from '../components/ColorInput'

export const colorType = defineType({
  name: 'color',
  title: 'Color',
  type: 'object',
  components: {
    input: CustomColorPicker,
  },
  fields: [
    defineField({name: 'hex', type: 'string'}),
    defineField({name: 'rgba', type: 'string'}),
    defineField({name: 'hsl', type: 'string'}),
    defineField({name: 'isGradient', type: 'boolean'}),
    defineField({name: 'hex2', type: 'string'}),
    defineField({name: 'angle', type: 'number'}),
    defineField({name: 'css', type: 'string'}),
  ],
})
