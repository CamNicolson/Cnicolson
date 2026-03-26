import { useEffect, useRef, useState } from 'react'

const loadExternalScript = (src) =>
  new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`)
    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        resolve()
        return
      }

      existingScript.addEventListener('load', resolve, { once: true })
      existingScript.addEventListener('error', reject, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.addEventListener(
      'load',
      () => {
        script.dataset.loaded = 'true'
        resolve()
      },
      { once: true },
    )
    script.addEventListener('error', reject, { once: true })
    document.body.appendChild(script)
  })

const WEATHER_CODES = {
  0: { label: 'Clear', symbol: 'Sun' },
  1: { label: 'Mostly clear', symbol: 'Sun' },
  2: { label: 'Partly cloudy', symbol: 'Clouds' },
  3: { label: 'Overcast', symbol: 'Clouds' },
  45: { label: 'Fog', symbol: 'Mist' },
  48: { label: 'Fog', symbol: 'Mist' },
  51: { label: 'Light drizzle', symbol: 'Rain' },
  53: { label: 'Drizzle', symbol: 'Rain' },
  55: { label: 'Heavy drizzle', symbol: 'Rain' },
  61: { label: 'Light rain', symbol: 'Rain' },
  63: { label: 'Rain', symbol: 'Rain' },
  65: { label: 'Heavy rain', symbol: 'Rain' },
  71: { label: 'Light snow', symbol: 'Snow' },
  73: { label: 'Snow', symbol: 'Snow' },
  75: { label: 'Heavy snow', symbol: 'Snow' },
  80: { label: 'Rain showers', symbol: 'Rain' },
  81: { label: 'Showers', symbol: 'Rain' },
  82: { label: 'Heavy showers', symbol: 'Rain' },
  95: { label: 'Thunderstorm', symbol: 'Storm' },
}

const DEFAULT_WEATHER = {
  state: 'loading',
  temperature: null,
  label: 'Finding weather',
  location: 'Local area',
  high: null,
  low: null,
}

const WEATHER_ERROR_STATE = {
  state: 'error',
  temperature: null,
  label: 'Weather unavailable',
  location: 'Could not determine location',
  high: null,
  low: null,
}

const SNAKE_GRID_COLUMNS = 11
const SNAKE_GRID_ROWS = 7
const INITIAL_SNAKE = [
  { x: 2, y: 4 },
  { x: 1, y: 4 },
]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const PLAY_PATTERN = ['001000', '001100', '001110', '001100', '001000']
const DIGIT_PATTERNS = {
  0: ['111', '101', '101', '101', '111'],
  1: ['010', '110', '010', '010', '111'],
  2: ['111', '001', '111', '100', '111'],
  3: ['111', '001', '111', '001', '111'],
  4: ['101', '101', '111', '001', '001'],
  5: ['111', '100', '111', '001', '111'],
  6: ['111', '100', '111', '101', '111'],
  7: ['111', '001', '001', '001', '001'],
  8: ['111', '101', '111', '101', '111'],
  9: ['111', '101', '111', '001', '111'],
}

const THEME_PRESETS = [
  {
    label: 'Night',
    fog: {
      highlightColor: 0x0a1016,
      midtoneColor: 0x10283a,
      lowlightColor: 0x0c3b31,
      baseColor: 0x020304,
    },
    variables: {
      '--page-bg': '#020304',
      '--page-text': '#e7eefc',
      '--shell-radial-one': 'rgba(87, 133, 255, 0.14)',
      '--shell-radial-two': 'rgba(64, 236, 190, 0.1)',
      '--shell-base-start': '#04070b',
      '--shell-base-mid': '#07131c',
      '--shell-base-end': '#020304',
      '--orb-one': 'rgba(88, 133, 255, 0.28)',
      '--orb-two': 'rgba(73, 88, 255, 0.18)',
      '--orb-three': 'rgba(32, 224, 161, 0.18)',
      '--orb-four': 'rgba(23, 129, 255, 0.12)',
      '--surface-border': 'rgba(255, 255, 255, 0.09)',
      '--surface-fill-top': 'rgba(255, 255, 255, 0.045)',
      '--surface-fill-bottom': 'rgba(255, 255, 255, 0.02)',
      '--surface-shadow': 'rgba(0, 0, 0, 0.6)',
      '--weather-glow': 'rgba(96, 156, 255, 0.2)',
      '--snake-glow': 'rgba(96, 255, 180, 0.16)',
      '--hero-panel-glow': 'rgba(108, 125, 255, 0.18)',
      '--text-strong': 'rgba(255, 255, 255, 0.99)',
      '--text-muted': 'rgba(231, 238, 252, 0.72)',
      '--text-soft': 'rgba(231, 238, 252, 0.68)',
      '--chip-bg': 'rgba(77, 239, 163, 0.12)',
      '--chip-border': 'rgba(77, 239, 163, 0.16)',
      '--chip-text': '#92ffc9',
      '--primary-bg': '#ffffff',
      '--primary-text': '#000000',
      '--secondary-bg': 'rgba(255, 255, 255, 0.02)',
      '--secondary-border': 'rgba(255, 255, 255, 0.14)',
      '--secondary-text': 'rgba(255, 255, 255, 0.9)',
    },
  },
  {
    label: 'Ember',
    fog: {
      highlightColor: 0x33120b,
      midtoneColor: 0x6d2117,
      lowlightColor: 0xc85d1b,
      baseColor: 0x130604,
    },
    variables: {
      '--page-bg': '#140806',
      '--page-text': '#fff1e8',
      '--shell-radial-one': 'rgba(255, 188, 119, 0.22)',
      '--shell-radial-two': 'rgba(255, 95, 58, 0.2)',
      '--shell-base-start': '#2a0f09',
      '--shell-base-mid': '#451710',
      '--shell-base-end': '#140806',
      '--orb-one': 'rgba(255, 187, 105, 0.3)',
      '--orb-two': 'rgba(255, 87, 51, 0.28)',
      '--orb-three': 'rgba(255, 140, 82, 0.2)',
      '--orb-four': 'rgba(255, 222, 134, 0.18)',
      '--surface-border': 'rgba(255, 235, 220, 0.1)',
      '--surface-fill-top': 'rgba(255, 237, 226, 0.09)',
      '--surface-fill-bottom': 'rgba(255, 175, 120, 0.03)',
      '--surface-shadow': 'rgba(24, 11, 13, 0.7)',
      '--weather-glow': 'rgba(255, 136, 76, 0.24)',
      '--snake-glow': 'rgba(255, 193, 105, 0.16)',
      '--hero-panel-glow': 'rgba(255, 98, 69, 0.18)',
      '--text-strong': 'rgba(255, 247, 240, 0.99)',
      '--text-muted': 'rgba(247, 235, 227, 0.76)',
      '--text-soft': 'rgba(247, 235, 227, 0.7)',
      '--chip-bg': 'rgba(255, 186, 132, 0.16)',
      '--chip-border': 'rgba(255, 186, 132, 0.2)',
      '--chip-text': '#ffd7b4',
      '--primary-bg': '#fff0e3',
      '--primary-text': '#25150f',
      '--secondary-bg': 'rgba(255, 244, 236, 0.04)',
      '--secondary-border': 'rgba(255, 232, 214, 0.14)',
      '--secondary-text': 'rgba(255, 247, 240, 0.92)',
    },
  },
  {
    label: 'Glacier',
    fog: {
      highlightColor: 0x06161d,
      midtoneColor: 0x0f5264,
      lowlightColor: 0x3bd8c6,
      baseColor: 0x031116,
    },
    variables: {
      '--page-bg': '#031116',
      '--page-text': '#e4fbff',
      '--shell-radial-one': 'rgba(78, 255, 230, 0.18)',
      '--shell-radial-two': 'rgba(82, 186, 255, 0.16)',
      '--shell-base-start': '#061c24',
      '--shell-base-mid': '#093545',
      '--shell-base-end': '#031116',
      '--orb-one': 'rgba(66, 229, 255, 0.28)',
      '--orb-two': 'rgba(67, 141, 255, 0.22)',
      '--orb-three': 'rgba(82, 255, 214, 0.22)',
      '--orb-four': 'rgba(159, 255, 242, 0.16)',
      '--surface-border': 'rgba(212, 252, 255, 0.09)',
      '--surface-fill-top': 'rgba(228, 253, 255, 0.08)',
      '--surface-fill-bottom': 'rgba(95, 223, 255, 0.03)',
      '--surface-shadow': 'rgba(0, 13, 17, 0.68)',
      '--weather-glow': 'rgba(58, 196, 255, 0.24)',
      '--snake-glow': 'rgba(82, 255, 216, 0.18)',
      '--hero-panel-glow': 'rgba(82, 186, 255, 0.2)',
      '--text-strong': 'rgba(240, 253, 255, 0.99)',
      '--text-muted': 'rgba(228, 251, 255, 0.72)',
      '--text-soft': 'rgba(228, 251, 255, 0.68)',
      '--chip-bg': 'rgba(82, 186, 255, 0.16)',
      '--chip-border': 'rgba(82, 186, 255, 0.24)',
      '--chip-text': '#8fd5ff',
      '--primary-bg': '#e7ffff',
      '--primary-text': '#07161b',
      '--secondary-bg': 'rgba(225, 252, 255, 0.03)',
      '--secondary-border': 'rgba(214, 248, 255, 0.14)',
      '--secondary-text': 'rgba(240, 253, 255, 0.9)',
    },
  },
  {
    label: 'Signal',
    fog: {
      highlightColor: 0x17091d,
      midtoneColor: 0x4b1763,
      lowlightColor: 0xff2f7d,
      baseColor: 0x09040c,
    },
    variables: {
      '--page-bg': '#09040c',
      '--page-text': '#f9f0ff',
      '--shell-radial-one': 'rgba(255, 62, 120, 0.22)',
      '--shell-radial-two': 'rgba(115, 70, 255, 0.18)',
      '--shell-base-start': '#14071b',
      '--shell-base-mid': '#250a33',
      '--shell-base-end': '#09040c',
      '--orb-one': 'rgba(255, 69, 139, 0.3)',
      '--orb-two': 'rgba(116, 91, 255, 0.24)',
      '--orb-three': 'rgba(255, 190, 84, 0.16)',
      '--orb-four': 'rgba(255, 52, 98, 0.18)',
      '--surface-border': 'rgba(255, 235, 255, 0.09)',
      '--surface-fill-top': 'rgba(255, 242, 255, 0.08)',
      '--surface-fill-bottom': 'rgba(189, 119, 255, 0.03)',
      '--surface-shadow': 'rgba(10, 5, 14, 0.72)',
      '--weather-glow': 'rgba(116, 91, 255, 0.24)',
      '--snake-glow': 'rgba(255, 190, 84, 0.16)',
      '--hero-panel-glow': 'rgba(255, 69, 139, 0.18)',
      '--text-strong': 'rgba(255, 247, 255, 0.99)',
      '--text-muted': 'rgba(249, 240, 255, 0.74)',
      '--text-soft': 'rgba(249, 240, 255, 0.68)',
      '--chip-bg': 'rgba(160, 108, 255, 0.16)',
      '--chip-border': 'rgba(160, 108, 255, 0.24)',
      '--chip-text': '#c8a2ff',
      '--primary-bg': '#fff0fb',
      '--primary-text': '#1b0d1b',
      '--secondary-bg': 'rgba(255, 244, 255, 0.03)',
      '--secondary-border': 'rgba(255, 228, 255, 0.14)',
      '--secondary-text': 'rgba(255, 247, 255, 0.9)',
    },
  },
]

const Icon = ({ name, title }) => {
  const props = {
    role: 'img',
    'aria-label': title,
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  }

  if (name === 'github') {
    return (
      <svg {...props}>
        <path
          d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.1-1.49-1.1-1.49-.9-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.38-2.03 1.02-2.75-.1-.26-.44-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0 1 12 7.1c.83 0 1.67.12 2.45.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.21 2.44.1 2.7.64.72 1.02 1.63 1.02 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .26.18.58.69.48A10.2 10.2 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (name === 'linkedin') {
    return (
      <svg {...props}>
        <path
          d="M5.5 8.5A1.5 1.5 0 1 0 5.5 5.5a1.5 1.5 0 0 0 0 3ZM4.25 9.75h2.5v8.75h-2.5V9.75ZM9.25 9.75h2.4v1.2h.03c.33-.63 1.14-1.46 2.74-1.46 2.93 0 3.48 1.93 3.48 4.43v4.58h-2.5v-4.06c0-.97-.02-2.22-1.35-2.22-1.35 0-1.56 1.06-1.56 2.15v4.13h-2.5V9.75Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (name === 'link') {
    return (
      <svg {...props}>
        <path
          d="M10.59 13.41a1 1 0 0 1 0-1.41l3.18-3.18a1 1 0 1 1 1.41 1.41l-3.18 3.18a1 1 0 0 1-1.41 0Z"
          fill="currentColor"
        />
        <path
          d="M7.05 16.95a4.5 4.5 0 0 1 0-6.36l2.12-2.12a1 1 0 1 1 1.41 1.41l-2.12 2.12a2.5 2.5 0 0 0 3.54 3.54l2.12-2.12a1 1 0 1 1 1.41 1.41l-2.12 2.12a4.5 4.5 0 0 1-6.36 0Z"
          fill="currentColor"
        />
        <path
          d="M16.95 7.05a4.5 4.5 0 0 1 0 6.36l-2.12 2.12a1 1 0 1 1-1.41-1.41l2.12-2.12a2.5 2.5 0 0 0-3.54-3.54l-2.12 2.12a1 1 0 1 1-1.41-1.41l2.12-2.12a4.5 4.5 0 0 1 6.36 0Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (name === 'mail') {
    return (
      <svg {...props}>
        <path
          d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.68-.5 4.98 4.32c.2.17.48.17.68 0L17.32 6H6.68Zm11.32 2.24-4.34 3.76a2.5 2.5 0 0 1-3.32 0L6 8.24V17.5c0 .28.22.5.5.5h11c.28 0 .5-.22.5-.5V8.24Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (name === 'stocks') {
    return (
      <svg {...props} width={22} height={22}>
        <path
          d="M5.5 15.5 10 11 13 13.2 18.2 8"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.6 8H18.2v2.6"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'calendar') {
    return (
      <svg {...props}>
        <path
          d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9ZM5 6a1 1 0 0 0-1 1v1h16V7a1 1 0 0 0-1-1H5Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (name === 'clock') {
    return (
      <svg {...props}>
        <path
          d="M12 2.75A9.25 9.25 0 1 0 21.25 12 9.26 9.26 0 0 0 12 2.75Zm0 1.5A7.75 7.75 0 1 1 4.25 12 7.76 7.76 0 0 1 12 4.25Zm.75 3.25a.75.75 0 0 0-1.5 0v4.81c0 .2.08.39.22.53l2.85 2.85a.75.75 0 1 0 1.06-1.06l-2.63-2.64V7.5Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (name === 'weather') {
    return (
      <svg {...props}>
        <path
          d="M7.5 18.5a3.5 3.5 0 1 1 .55-6.96A5.25 5.25 0 0 1 18 10.5a3 3 0 1 1 .5 5.96h-11Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  return (
    <svg {...props}>
      <path
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5a1 1 0 1 0-2 0v.4c-1.47.26-2.5 1.3-2.5 2.74 0 1.9 1.6 2.55 3.12 3.02 1.44.44 1.88.7 1.88 1.32 0 .72-.74 1.18-1.9 1.18-1.1 0-1.87-.36-2.4-.76a1 1 0 1 0-1.2 1.6c.65.49 1.6.9 2.99 1.02V19a1 1 0 1 0 2 0v-.48c1.67-.28 2.9-1.36 2.9-3.02 0-1.98-1.63-2.62-3.18-3.1-1.45-.45-1.82-.7-1.82-1.24 0-.58.55-.95 1.5-.95.83 0 1.43.24 1.88.5a1 1 0 1 0 1.08-1.68c-.52-.33-1.27-.62-2.36-.76V7Z"
        fill="currentColor"
      />
    </svg>
  )
}

const projects = [
  {
    name: 'Personal Finance Tool',
    icon: 'stocks',
    domain: 'cnbudget.xyz',
    status: 'Live',
    href: 'https://cnbudget.xyz',
    marks: [
      { symbol: '£', label: 'Budget planning' },
      { symbol: '↗', label: 'Goal mapping' },
    ],
    accent: 'finance',
  },
  {
    name: 'Project Manager',
    icon: 'calendar',
    domain: 'jezisgay.xyz',
    status: 'Live',
    href: 'https://jezisgay.xyz',
    marks: [
      { symbol: '⏱', label: 'Fast setup' },
      { symbol: '⌘', label: 'Simple flow' },
    ],
    accent: 'timetable',
  },
  {
    name: 'Photo Video Converters',
    icon: 'github',
    domain: 'github.com/CamNicolson/Photo-Video-Converters',
    status: 'Source',
    href: 'https://github.com/CamNicolson/Photo-Video-Converters',
    marks: [
      { symbol: 'HEIC → JPG'},
      { symbol: 'MOV → MP4' },
    ],
    accent: 'finance',
  },
]

const formatWeather = (data) => {
  const current = data.current_weather ?? {
    temperature: data.current?.temperature_2m,
    weathercode: data.current?.weather_code,
  }
  const daily = data.daily

  if (
    typeof current?.temperature !== 'number' ||
    typeof current?.weathercode !== 'number' ||
    !Array.isArray(daily?.temperature_2m_max) ||
    !Array.isArray(daily?.temperature_2m_min)
  ) {
    throw new Error('Unexpected weather response shape')
  }

  const details = WEATHER_CODES[current.weathercode] ?? { label: 'Conditions', symbol: 'Now' }

  return {
    state: 'ready',
    temperature: Math.round(current.temperature),
    label: details.label,
    location: 'Local area',
    high: Math.round(daily.temperature_2m_max[0]),
    low: Math.round(daily.temperature_2m_min[0]),
    symbol: details.symbol,
  }
}

const fetchJson = async (url, signal) => {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`Request failed for ${url}`)
  }

  return response.json()
}

const parseCoordinate = (value) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  return null
}

const APPROXIMATE_LOCATION_SOURCES = [
  {
    url: 'https://ipwho.is/',
    parse: (data) => {
      if (data?.success === false) {
        throw new Error(data.message || 'ipwho.is lookup failed')
      }

      const latitude = parseCoordinate(data?.latitude)
      const longitude = parseCoordinate(data?.longitude)
      if (latitude === null || longitude === null) {
        throw new Error('ipwho.is returned no coordinates')
      }

      return {
        latitude,
        longitude,
        location: [data.city, data.region_code].filter(Boolean).join(', ') || 'Approximate location',
      }
    },
  },
  {
    url: 'https://ipapi.co/json/',
    parse: (data) => {
      const latitude = parseCoordinate(data?.latitude)
      const longitude = parseCoordinate(data?.longitude)
      if (latitude === null || longitude === null) {
        throw new Error('ipapi returned no coordinates')
      }

      return {
        latitude,
        longitude,
        location: [data.city, data.region_code].filter(Boolean).join(', ') || 'Approximate location',
      }
    },
  },
]

const loadApproximateLocation = async (signal) => {
  let lastError = null

  for (const source of APPROXIMATE_LOCATION_SOURCES) {
    try {
      const data = await fetchJson(source.url, signal)
      return source.parse(data)
    } catch (error) {
      if (error.name === 'AbortError') {
        throw error
      }

      lastError = error
      console.error(`Approximate location lookup failed for ${source.url}`, error)
    }
  }

  throw lastError ?? new Error('Approximate location unavailable')
}

const getTimezoneLocationQuery = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  if (!timeZone || timeZone === 'UTC') {
    return null
  }

  const parts = timeZone.split('/').filter(Boolean)
  const locality = parts.at(-1)?.replace(/_/g, ' ')
  const region = parts.length > 1 ? parts.at(-2)?.replace(/_/g, ' ') : ''

  if (!locality) {
    return null
  }

  return {
    query: [locality, region].filter(Boolean).join(', '),
    fallbackLabel: locality,
  }
}

const loadTimezoneFallbackLocation = async (signal) => {
  const timezoneLocation = getTimezoneLocationQuery()
  if (!timezoneLocation) {
    throw new Error('Timezone fallback unavailable')
  }

  const url =
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(timezoneLocation.query)}` +
    '&count=1&language=en&format=json'
  const data = await fetchJson(url, signal)
  const result = data?.results?.[0]

  if (typeof result?.latitude !== 'number' || typeof result?.longitude !== 'number') {
    throw new Error('Timezone geocoding returned no coordinates')
  }

  return {
    latitude: result.latitude,
    longitude: result.longitude,
    location:
      [result.name, result.admin1].filter(Boolean).join(', ') || timezoneLocation.fallbackLabel,
  }
}

const getRandomFood = (snake) => {
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`))
  const availableCells = []

  for (let y = 0; y < SNAKE_GRID_ROWS; y += 1) {
    for (let x = 0; x < SNAKE_GRID_COLUMNS; x += 1) {
      const key = `${x},${y}`
      if (!occupied.has(key)) {
        availableCells.push({ x, y })
      }
    }
  }

  return availableCells[Math.floor(Math.random() * availableCells.length)] ?? { x: 7, y: 4 }
}

const getScoreCells = (score) => {
  const digits = String(score).slice(-2).split('')
  const digitWidth = 3
  const digitHeight = 5
  const gap = digits.length > 1 ? 1 : 0
  const totalWidth = digits.length * digitWidth + (digits.length - 1) * gap
  const offsetX = Math.floor((SNAKE_GRID_COLUMNS - totalWidth) / 2)
  const offsetY = Math.floor((SNAKE_GRID_ROWS - digitHeight) / 2)
  const litCells = new Set()

  digits.forEach((digit, digitIndex) => {
    const pattern = DIGIT_PATTERNS[digit] ?? DIGIT_PATTERNS[0]
    pattern.forEach((row, rowIndex) => {
      row.split('').forEach((value, columnIndex) => {
        if (value === '1') {
          const x = offsetX + digitIndex * (digitWidth + gap) + columnIndex
          const y = offsetY + rowIndex
          litCells.add(`${x},${y}`)
        }
      })
    })
  })

  return litCells
}

const getPlayCells = () => {
  const iconWidth = PLAY_PATTERN[0].length
  const iconHeight = PLAY_PATTERN.length
  const offsetX = Math.floor((SNAKE_GRID_COLUMNS - iconWidth) / 2)
  const offsetY = Math.floor((SNAKE_GRID_ROWS - iconHeight) / 2)
  const litCells = new Set()

  PLAY_PATTERN.forEach((row, rowIndex) => {
    row.split('').forEach((value, columnIndex) => {
      if (value === '1') {
        litCells.add(`${offsetX + columnIndex},${offsetY + rowIndex}`)
      }
    })
  })

  return litCells
}

function SnakeWidget({ className = '' }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [food, setFood] = useState(() => getRandomFood(INITIAL_SNAKE))
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState('ready')

  const startGame = (nextDirection = INITIAL_DIRECTION) => {
    setSnake(INITIAL_SNAKE)
    setDirection(nextDirection)
    setFood(getRandomFood(INITIAL_SNAKE))
    setScore(0)
    setStatus('playing')
  }

  const restartGame = () => {
    startGame()
  }

  useEffect(() => {
    if (status !== 'playing') {
      return undefined
    }

    const timer = window.setInterval(() => {
      setSnake((currentSnake) => {
        const head = currentSnake[0]
        const nextHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        }

        const hitWall =
          nextHead.x < 0 ||
          nextHead.x >= SNAKE_GRID_COLUMNS ||
          nextHead.y < 0 ||
          nextHead.y >= SNAKE_GRID_ROWS

        const hitSelf = currentSnake.some(
          (segment) => segment.x === nextHead.x && segment.y === nextHead.y,
        )

        if (hitWall || hitSelf) {
          setStatus('over')
          return currentSnake
        }

        const ateFood = nextHead.x === food.x && nextHead.y === food.y
        const nextSnake = [nextHead, ...currentSnake]

        if (!ateFood) {
          nextSnake.pop()
        } else {
          setScore((currentScore) => currentScore + 1)
          setFood(getRandomFood(nextSnake))
        }

        return nextSnake
      })
    }, 180)

    return () => window.clearInterval(timer)
  }, [direction, food, status])

  useEffect(() => {
    if (status !== 'over') {
      return undefined
    }

    const resetTimer = window.setTimeout(() => {
      setStatus('ready')
    }, 5000)

    return () => window.clearTimeout(resetTimer)
  }, [status])

  const handleDirectionChange = (nextDirection) => {
    if (status === 'ready') {
      startGame(nextDirection)
      return
    }

    const reversing =
      direction.x + nextDirection.x === 0 && direction.y + nextDirection.y === 0

    if (reversing) {
      return
    }

    setDirection(nextDirection)
  }

  useEffect(() => {
    const handleWindowKeyDown = (event) => {
      const directionMap = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      }

      if (event.key === 'Enter') {
        event.preventDefault()
        if (status === 'ready') {
          startGame()
        } else {
          restartGame()
        }
        return
      }

      const nextDirection = directionMap[event.key]
      if (!nextDirection) {
        return
      }

      event.preventDefault()
      handleDirectionChange(nextDirection)
    }

    window.addEventListener('keydown', handleWindowKeyDown)
    return () => window.removeEventListener('keydown', handleWindowKeyDown)
  }, [direction, status])

  const playCells = status === 'ready' ? getPlayCells() : null
  const scoreCells = status === 'over' ? getScoreCells(score) : null

  const cells = Array.from({ length: SNAKE_GRID_COLUMNS * SNAKE_GRID_ROWS }, (_, index) => {
    const x = index % SNAKE_GRID_COLUMNS
    const y = Math.floor(index / SNAKE_GRID_COLUMNS)
    const isPlayCell = playCells?.has(`${x},${y}`)
    const isScoreCell = scoreCells?.has(`${x},${y}`)
    const isHead = snake[0].x === x && snake[0].y === y
    const isBody = snake.slice(1).some((segment) => segment.x === x && segment.y === y)
    const isFood = food.x === x && food.y === y

    return (
      <span
        className={`snake-cell${isPlayCell ? ' snake-play-cell' : ''}${isScoreCell ? ' snake-score-cell' : ''}${isHead && !scoreCells && !playCells ? ' snake-head' : ''}${isBody && !scoreCells && !playCells ? ' snake-body' : ''}${isFood && !scoreCells && !playCells ? ' snake-food' : ''}`}
        key={`${x}-${y}`}
      />
    )
  })

  return (
    <article className={`snake-card ${className}`.trim()}>
      <div className="utility-top">
        <span className="utility-label">Snake</span>
        <button className="snake-button" type="button" onClick={restartGame}>
          Restart
        </button>
      </div>

      <div
        className="snake-board"
        role="application"
        aria-label="Snake game board. Press Enter or click to start, use arrow keys to play, and press Enter to restart."
        onClick={() => {
          if (status === 'ready') {
            startGame()
          }
        }}
      >
        {cells}
      </div>
    </article>
  )
}

function App() {
  const siteShellRef = useRef(null)
  const [now, setNow] = useState(() => new Date())
  const [weather, setWeather] = useState(DEFAULT_WEATHER)
  const [themeIndex, setThemeIndex] = useState(0)
  const currentTheme = THEME_PRESETS[themeIndex]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    let fogEffect
    let cancelled = false

    const initializeFog = async () => {
      try {
        await loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js')
        await loadExternalScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js')

        if (cancelled || !siteShellRef.current || !window.VANTA?.FOG) {
          return
        }

        fogEffect = window.VANTA.FOG({
          el: siteShellRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          highlightColor: currentTheme.fog.highlightColor,
          midtoneColor: currentTheme.fog.midtoneColor,
          lowlightColor: currentTheme.fog.lowlightColor,
          baseColor: currentTheme.fog.baseColor,
          blurFactor: 0.62,
          speed: 1.15,
          zoom: 0.9,
        })
      } catch (error) {
        console.error('Vanta fog failed to load', error)
      }
    }

    initializeFog()

    return () => {
      cancelled = true
      fogEffect?.destroy?.()
    }
  }, [currentTheme])

  useEffect(() => {
    const controller = new AbortController()

    const loadWeather = async ({ latitude, longitude, location }) => {
      const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        '&current_weather=true&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=auto'

      try {
        const weatherData = await fetchJson(weatherUrl, controller.signal)
        setWeather({
          ...formatWeather(weatherData),
          location,
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Weather request failed', error)
          setWeather(WEATHER_ERROR_STATE)
        }
      }
    }

    const loadWeatherWithFallback = async () => {
      const fallbackToApproximate = async () => {
        try {
          const approximateLocation = await loadApproximateLocation(controller.signal)
          await loadWeather(approximateLocation)
        } catch (error) {
          if (error.name === 'AbortError') {
            throw error
          }

          console.error('Approximate location providers failed', error)
          const timezoneLocation = await loadTimezoneFallbackLocation(controller.signal)
          await loadWeather(timezoneLocation)
        }
      }

      if (!navigator.geolocation) {
        await fallbackToApproximate()
        return
      }

      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          let resolvedLocation = 'Local area'

          try {
            const timezoneLocation = await loadTimezoneFallbackLocation(controller.signal)
            resolvedLocation = timezoneLocation.location
          } catch (error) {
            if (error.name === 'AbortError') {
              return
            }

            console.error('Timezone location lookup failed', error)
          }

          loadWeather({
            latitude: coords.latitude,
            longitude: coords.longitude,
            location: resolvedLocation,
          })
        },
        () => {
          fallbackToApproximate().catch((error) => {
            if (error.name !== 'AbortError') {
              console.error('Weather fallback failed', error)
              setWeather(WEATHER_ERROR_STATE)
            }
          })
        },
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 15 * 60 * 1000 },
      )
    }

    loadWeatherWithFallback().catch((error) => {
      if (error.name !== 'AbortError') {
        console.error('Weather initialization failed', error)
        setWeather(WEATHER_ERROR_STATE)
      }
    })

    return () => controller.abort()
  }, [])

  const timeText = new Intl.DateTimeFormat([], {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(now)

  const dateText = new Intl.DateTimeFormat([], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(now)

  const timezoneText =
    new Intl.DateTimeFormat([], {
      timeZoneName: 'short',
    })
      .formatToParts(now)
      .find((part) => part.type === 'timeZoneName')?.value ?? 'Local time'

  return (
    <div className="site-shell" ref={siteShellRef} style={currentTheme.variables}>
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />
      <div className="background-orb orb-three" />
      <div className="background-orb orb-four" />

      <main className="container">
        <header className="hero">
          <div className="hero-copy">
            <div className="hero-text">
              <p className="eyebrow">cnicolson.xyz</p>
              <h1>Cam&apos;s Projects</h1>
              <p className="subhead">Pretend I put something interesting here</p>

              <div className="hero-actions">
                <a
                  className="primary-action"
                  href="https://github.com/CamNicolson"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="github" title="GitHub" />
                  GitHub
                </a>
                <a
                  className="secondary-action"
                  href="https://www.linkedin.com/in/camnicolson/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="linkedin" title="LinkedIn" />
                  LinkedIn
                </a>
                <a className="secondary-action" href="mailto:scenicolson@gmail.com">
                  <Icon name="mail" title="Email" />
                  Email Me
                </a>
              </div>

              <div className="theme-slider" aria-label="Theme selector">
                <div className="theme-slider-top">
                  <span className="theme-slider-label">Theme</span>
                </div>

                <input
                  aria-label="Theme slider"
                  className="theme-slider-input"
                  max={THEME_PRESETS.length - 1}
                  min="0"
                  onChange={(event) => setThemeIndex(Number(event.target.value))}
                  step="1"
                  type="range"
                  value={themeIndex}
                />

                <div
                  className="theme-slider-stops"
                  aria-hidden="true"
                  style={{ gridTemplateColumns: `repeat(${THEME_PRESETS.length}, minmax(0, 1fr))` }}
                >
                  {THEME_PRESETS.map((theme, index) => (
                    <span
                      className={`theme-stop${index === themeIndex ? ' is-active' : ''}`}
                      key={theme.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <SnakeWidget className="hero-panel-snake" />
        </header>

        <section className="utility-grid" aria-label="Daily dashboard widgets">
          <article className="utility-card">
            <div className="utility-top">
              <span className="utility-label">Time</span>
              <Icon name="clock" title="Clock" />
            </div>
            <div className="utility-body">
              <div className="utility-metric">
                <div className="utility-value">{timeText}</div>
              </div>
              <p className="utility-meta">
                <span>{`${dateText} • ${timezoneText}`}</span>
              </p>
            </div>
          </article>

          <article className="utility-card weather-card">
            <div className="utility-top">
              <span className="utility-label">Weather</span>
              <Icon name="weather" title="Weather" />
            </div>
            <div className="utility-body">
              <div className="utility-metric utility-inline">
                <div className="utility-value">
                  {weather.temperature !== null ? `${weather.temperature}°` : '--'}
                </div>
                <div className="utility-copy">
                  <span>{weather.label}</span>
                  <span>
                    {weather.high !== null && weather.low !== null
                      ? `H:${weather.high}°  L:${weather.low}°`
                      : 'Live conditions unavailable'}
                  </span>
                  <span>{weather.location}</span>
                </div>
              </div>
            </div>
          </article>

          <article className="utility-card">
            <div className="utility-top">
              <span className="utility-label">Projects</span>
              <span className="utility-chip">Live</span>
            </div>
            <div className="utility-body">
              <div className="utility-metric">
                <div className="utility-value">0{projects.length}</div>
              </div>
              <p className="utility-meta">
                Ready to launch
              </p>
            </div>
          </article>
        </section>

        <section className="section">
          <div className="section-heading">
            <h2>Jump in</h2>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.accent}`} key={project.name}>
                <div className="card-glow" />

                <div className="project-top">
                  <div className="project-icon" aria-hidden="true">
                    <Icon name={project.icon} title={project.name} />
                  </div>

                  <span className="status-badge">{project.status}</span>
                </div>

                <h3 className="project-title">{project.name}</h3>
                <div className="project-domain">{project.domain}</div>

                <div className="project-meta">
                  <div className="mark-row" aria-label="Project highlights">
                    {project.marks.map((mark) => (
                      <span className="mark-tile" key={mark.label} title={mark.label} aria-label={mark.label}>
                        <span className="mark-symbol" aria-hidden="true">
                          {mark.symbol}
                        </span>
                        <span className="mark-label">{mark.label}</span>
                      </span>
                    ))}
                  </div>

                  <a className="project-button" href={project.href} target="_blank" rel="noreferrer">
                    <Icon name="link" title="Open" />
                    <span>Open</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="footer">© {new Date().getFullYear()} cnicolson.xyz</footer>
      </main>
    </div>
  )
}

export default App
