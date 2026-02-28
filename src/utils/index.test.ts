import {describe, it, expect} from 'vitest'
import {isValidHex, getContrastColor, hexToRgba, hexToHsl} from './index'

describe('Color Utilities', () => {
  describe('isValidHex', () => {
    it('should return true for valid 6-character hex codes', () => {
      expect(isValidHex('#ffffff')).toBe(true)
      expect(isValidHex('#000000')).toBe(true)
      expect(isValidHex('#FF0000')).toBe(true)
      expect(isValidHex('#1a2b3c')).toBe(true)
    })

    it('should return false for invalid hex codes', () => {
      expect(isValidHex('ffffff')).toBe(false)
      expect(isValidHex('#fff')).toBe(false)
      expect(isValidHex('#fffffg')).toBe(false)
      expect(isValidHex('#12345')).toBe(false)
      expect(isValidHex('#1234567')).toBe(false)
    })
  })

  describe('getContrastColor', () => {
    it('should return dark color for light backgrounds', () => {
      expect(getContrastColor('#ffffff')).toBe('rgba(0,0,0,0.6)')
      expect(getContrastColor('#f8f9fa')).toBe('rgba(0,0,0,0.6)')
      expect(getContrastColor('#e9ecef')).toBe('rgba(0,0,0,0.6)')
    })

    it('should return white for dark backgrounds', () => {
      expect(getContrastColor('#000000')).toBe('white')
      expect(getContrastColor('#212529')).toBe('white')
      expect(getContrastColor('#343a40')).toBe('white')
    })

    it('should return default dark color for invalid hex', () => {
      expect(getContrastColor('invalid')).toBe('rgba(0,0,0,0.6)')
      expect(getContrastColor('')).toBe('rgba(0,0,0,0.6)')
      expect(getContrastColor(undefined)).toBe('rgba(0,0,0,0.6)')
    })
  })

  describe('hexToRgba', () => {
    it('should correctly convert valid hex to rgba string', () => {
      expect(hexToRgba('#ff0000')).toBe('rgba(255, 0, 0, 1)')
      expect(hexToRgba('#00ff00')).toBe('rgba(0, 255, 0, 1)')
      expect(hexToRgba('#0000ff')).toBe('rgba(0, 0, 255, 1)')
      expect(hexToRgba('#000000')).toBe('rgba(0, 0, 0, 1)')
      expect(hexToRgba('#ffffff')).toBe('rgba(255, 255, 255, 1)')
    })

    it('should return empty string for invalid hex', () => {
      expect(hexToRgba('invalid')).toBe('')
      expect(hexToRgba('#123')).toBe('')
    })
  })

  describe('hexToHsl', () => {
    it('should correctly convert valid hex to hsl string', () => {
      expect(hexToHsl('#ff0000')).toBe('hsl(0, 100%, 50%)')
      expect(hexToHsl('#00ff00')).toBe('hsl(120, 100%, 50%)')
      expect(hexToHsl('#0000ff')).toBe('hsl(240, 100%, 50%)')
      expect(hexToHsl('#000000')).toBe('hsl(0, 0%, 0%)')
      expect(hexToHsl('#ffffff')).toBe('hsl(0, 0%, 100%)')
    })

    it('should return empty string for invalid hex', () => {
      expect(hexToHsl('invalid')).toBe('')
      expect(hexToHsl('#123')).toBe('')
    })
  })
})
