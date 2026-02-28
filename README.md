# sanity-plugin-color-input

A beautifully designed, highly customizable color picker plugin for Sanity Studio v3, v4, and v5.

## Features

- 🎨 **Visual Color Picker**: A stunning visual interface to pick any color.
- 🌈 **Gradient Support**: Toggle between solid colors and gorgeous linear gradients.
- 💅 **Rich Return Format**: Provides HEX, RGBA, and HSL for solids, plus full CSS `linear-gradient` strings for gradients.
- ✨ **Customizable Color Presets**: Use our meticulously crafted predefined presets or provide your own custom branded colors via options.
- 📋 **One-Click Copy**: Easily copy HEX, RGBA, HSL, and CSS Gradient values to clipboard.
- 🚀 **Built for Sanity**: Fully compatible with Sanity Studio v3, v4, and v5 architecture.

## Installation

```bash
# Using npm
npm install sanity-plugin-color-input

# Using yarn
yarn add sanity-plugin-color-input

# Using pnpm
pnpm add sanity-plugin-color-input
```

## Setup & Usage

Compatible with **Node.js 18, 20, 22, and 24**.

Add it as a plugin in your `sanity.config.ts` (or `sanity.config.js`):

```typescript
import {defineConfig} from 'sanity'
import {customColorPicker} from 'sanity-plugin-color-input'

export default defineConfig({
  // ...other config settings
  plugins: [
    // Add the plugin here
    customColorPicker(),
  ],
})
```

## Schema Usage

Now you can use the `color` type in your schemas.

```typescript
export default {
  name: 'myDocument',
  title: 'My Document',
  type: 'document',
  fields: [
    {
      name: 'brandColor',
      title: 'Brand Color',
      type: 'color',
    },
  ],
}
```

### Customizing the Preset Colors

You can easily override the default color presets by providing your own `colors` array in your field's `options`:

```typescript
export default {
  name: 'myDocument',
  title: 'My Document',
  type: 'document',
  fields: [
    {
      name: 'brandColor',
      title: 'Brand Color',
      type: 'color',
      options: {
        // This will override the default presets, useful for restricting choices
        // to brand-specific color palettes.
        colors: [
          // Solid color presets
          '#1A1A1A',
          '#F5F5F5',
          // Gradient preset
          {hex: '#E91E63', hex2: '#2196F3', angle: 45},
        ],
      },
    },
  ],
}
```

## Data Structure

The `color` field returns a solid color by default, or a gradient if selected:

```json
{
  "_type": "color",
  "hex": "#f44336",
  "rgba": "rgba(244, 67, 54, 1)",
  "hsl": "hsl(4, 90%, 58%)",
  "isGradient": true,
  "hex2": "#000000",
  "angle": 180,
  "css": "linear-gradient(180deg, #f44336, #000000)"
}
```

## License

MIT © Code-Journey
