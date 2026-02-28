import {useCallback, useEffect, useMemo, useState} from 'react'
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Stack,
  Text,
  TextInput,
  useToast,
  Switch,
  Label,
} from '@sanity/ui'
import {PatchEvent, set, setIfMissing, unset, type ObjectInputProps} from 'sanity'
import {EditIcon} from './icons/EditIcon'
import {PRESET_COLORS} from '../constants'
import {isValidHex, getContrastColor, hexToRgba, hexToHsl} from '../utils'

export function CustomColorPicker(props: ObjectInputProps) {
  const {value, onChange, elementProps, schemaType} = props
  const toast = useToast()

  const optionsColors = schemaType?.options?.colors
  const colorsList =
    Array.isArray(optionsColors) && optionsColors.length > 0 ? optionsColors : PRESET_COLORS

  const currentHex = value?.hex || ''
  const currentHex2 = value?.hex2 || '#000000'
  const currentIsGradient = value?.isGradient || false
  const currentAngle = value?.angle || 180

  const [localValue, setLocalValue] = useState(currentHex)
  const [localValue2, setLocalValue2] = useState(currentHex2)
  const [isGradient, setIsGradient] = useState(currentIsGradient)
  const [angle, setAngle] = useState(currentAngle)

  useEffect(() => {
    setLocalValue(currentHex)
    setLocalValue2(currentHex2)
    setIsGradient(currentIsGradient)
    setAngle(currentAngle)
  }, [currentHex, currentHex2, currentIsGradient, currentAngle])

  useEffect(() => {
    if (
      localValue === currentHex &&
      localValue2 === currentHex2 &&
      isGradient === currentIsGradient &&
      angle === currentAngle
    )
      return

    const timeout = setTimeout(() => {
      if (!localValue) {
        onChange(PatchEvent.from(unset()))
        return
      }

      if (!isValidHex(localValue)) return

      const patches = [
        setIfMissing({_type: 'color'}),
        set(localValue, ['hex']),
        set(hexToRgba(localValue), ['rgba']),
        set(hexToHsl(localValue), ['hsl']),
        set(isGradient, ['isGradient']),
      ]

      if (isGradient) {
        patches.push(set(localValue2, ['hex2']))
        patches.push(set(angle, ['angle']))
        patches.push(set(`linear-gradient(${angle}deg, ${localValue}, ${localValue2})`, ['css']))
      }

      onChange(PatchEvent.from(patches))
    }, 300)

    return () => clearTimeout(timeout)
  }, [
    localValue,
    localValue2,
    isGradient,
    angle,
    currentHex,
    currentHex2,
    currentIsGradient,
    currentAngle,
    onChange,
  ])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.currentTarget.value)
  }, [])

  const handleInput2Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue2(e.currentTarget.value)
  }, [])

  const handleAngleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAngle(Number(e.currentTarget.value))
  }, [])

  const handlePresetClick = useCallback(
    (preset: string | {hex: string; hex2?: string; angle?: number}) => {
      if (typeof preset === 'string') {
        setLocalValue(preset)
        setIsGradient(false)
      } else {
        setLocalValue(preset.hex)
        if (preset.hex2) {
          setLocalValue2(preset.hex2)
          setIsGradient(true)
          if (preset.angle !== undefined) setAngle(preset.angle)
        } else {
          setIsGradient(false)
        }
      }
    },
    [],
  )

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.push({title: `Copied ${label}`, status: 'success'})
    } catch {
      toast.push({title: 'Copy failed', status: 'error'})
    }
  }

  const contrastColor = useMemo(() => getContrastColor(localValue), [localValue])

  return (
    <Stack space={3}>
      {/* Mode Toggle */}
      <Card padding={3} border radius={3}>
        <Flex align="center" gap={3}>
          <Switch checked={isGradient} onChange={() => setIsGradient(!isGradient)} />
          <Label>Gradient Mode</Label>
        </Flex>
      </Card>

      {/* Picker + Input */}
      <Stack space={3}>
        <Flex align="center" gap={3}>
          <Box style={{position: 'relative', width: 40, height: 40}}>
            <Flex
              align="center"
              justify="center"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: localValue || '#ffffff',
                borderRadius: 4,
                border: '1px solid #dfe1e5',
                position: 'absolute',
              }}
            >
              <EditIcon style={{color: getContrastColor(localValue), fontSize: 18}} />
            </Flex>

            <input
              type="color"
              value={isValidHex(localValue) ? localValue : '#000000'}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
              }}
            />
          </Box>

          <Box flex={1}>
            <TextInput
              {...elementProps}
              value={localValue}
              onChange={handleInputChange}
              placeholder="#000000"
            />
          </Box>
        </Flex>

        {isGradient && (
          <>
            <Flex align="center" gap={3}>
              <Box style={{position: 'relative', width: 40, height: 40}}>
                <Flex
                  align="center"
                  justify="center"
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: localValue2 || '#ffffff',
                    borderRadius: 4,
                    border: '1px solid #dfe1e5',
                    position: 'absolute',
                  }}
                >
                  <EditIcon style={{color: getContrastColor(localValue2), fontSize: 18}} />
                </Flex>

                <input
                  type="color"
                  value={isValidHex(localValue2) ? localValue2 : '#000000'}
                  onChange={handleInput2Change}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                />
              </Box>

              <Box flex={1}>
                <TextInput
                  value={localValue2}
                  onChange={handleInput2Change}
                  placeholder="#000000"
                />
              </Box>
            </Flex>

            <Stack space={2}>
              <Flex justify="space-between">
                <Text size={1} weight="bold">
                  Angle
                </Text>
                <Text size={1}>{angle}°</Text>
              </Flex>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={handleAngleChange}
                style={{width: '100%'}}
              />
            </Stack>
          </>
        )}
      </Stack>

      {/* Preview */}
      <Card padding={3} border radius={3}>
        <Stack space={2}>
          <Text size={1} weight="bold" muted>
            Preview
          </Text>
          <Box
            style={{
              height: 100,
              width: '100%',
              borderRadius: 8,
              background: isGradient
                ? `linear-gradient(${angle}deg, ${localValue}, ${localValue2})`
                : localValue,
              border: '1px solid #dfe1e5',
            }}
          />
        </Stack>
      </Card>

      {/* Presets */}
      <Card padding={2} border radius={2}>
        <Grid columns={[5, 10]} gap={2}>
          {colorsList.map((color, index) => {
            const isObj = typeof color === 'object'
            const h1 = isObj ? color.hex : color
            const h2 = isObj ? color.hex2 : null
            const ang = isObj ? color.angle || 180 : 180
            const bg = h2 ? `linear-gradient(${ang}deg, ${h1}, ${h2})` : h1

            return (
              <Box
                key={index}
                onClick={() => handlePresetClick(color)}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: bg,
                  cursor: 'pointer',
                  border: localValue === h1 ? '2px solid #1a0dab' : '2px solid transparent',
                }}
              />
            )
          })}
        </Grid>
      </Card>

      {/* Output Values */}
      <Card padding={3} border radius={3}>
        <Stack space={3}>
          {[
            {label: 'HEX', value: localValue.toUpperCase(), show: true},
            {label: 'HEX 2', value: localValue2.toUpperCase(), show: isGradient},
            {label: 'RGBA', value: hexToRgba(localValue), show: !isGradient},
            {label: 'HSL', value: hexToHsl(localValue), show: !isGradient},
            {
              label: 'CSS Gradient',
              value: `linear-gradient(${angle}deg, ${localValue}, ${localValue2})`,
              show: isGradient,
            },
          ]
            .filter((item) => item.show)
            .map((item) => (
              <Flex key={item.label} justify="space-between" align="center">
                <Box>
                  <Text size={1} weight="bold" muted>
                    {item.label}
                  </Text>
                  <code style={{fontSize: 13, wordBreak: 'break-all'}}>{item.value}</code>
                </Box>
                <Button
                  mode="ghost"
                  fontSize={1}
                  text="Copy"
                  onClick={() => copyToClipboard(item.value, item.label)}
                />
              </Flex>
            ))}
        </Stack>
      </Card>
    </Stack>
  )
}
